import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { menuItems, orders, orderItems} from '@/db/schema';
import {inArray, eq, and} from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const orderRouter = router({
    createCheckoutSession: protectedProcedure
        .input(
            z.object({
                cartItems: z.array(z.object({
                    id: z.string().uuid(),
                    quantity: z.number().min(1),
                })),
                restaurantId: z.string().uuid(),
                deliveryAddress: z.string().min(10),
                deliveryFeeCents: z.number().min(0),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { cartItems, restaurantId, deliveryAddress, deliveryFeeCents } = input;
            const itemIds = cartItems.map(item => item.id);

            const dbMenuItems = await ctx.db
                .select({ id: menuItems.id, priceCents: menuItems.priceCents, name : menuItems.name })
                .from(menuItems)
                .where(inArray(menuItems.id, itemIds));

            if (dbMenuItems.length !== itemIds.length) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Some items in the cart are not available.',
                });
            }

            const priceMap = new Map(dbMenuItems.map(item => [item.id, item.priceCents]));
            let subTotalCents = 0;

            for (const cartItem of cartItems) {
                const price = priceMap.get(cartItem.id);
                if (price === undefined) throw new TRPCError({ code: 'BAD_REQUEST', message: `Item ${cartItem.id} not found.` });
                subTotalCents += price * cartItem.quantity;
            }
            const totalCents = subTotalCents + deliveryFeeCents;

            const { newOrder, newOrderItems } = await ctx.db.transaction(async (tx) => {
                const [order] = await tx.insert(orders).values({
                    userId: ctx.user.id,
                    restaurantId,
                    totalCents,
                    deliveryAddress,
                    status: 'pending',
                }).returning();

                const itemsToInsert = cartItems.map(item => ({
                    orderId: order.id,
                    menuItemId: item.id,
                    quantity: item.quantity,
                    unitPriceCents: priceMap.get(item.id)!,
                }));
                const insertedItems = await tx.insert(orderItems).values(itemsToInsert).returning();

                return { newOrder: order, newOrderItems: insertedItems };
            });

            if (!newOrder || newOrderItems.length === 0) {
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to save order details.' });
            }

            try {
                const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
                dbMenuItems.forEach(dbItem => {
                    const cartItem = cartItems.find(ci => ci.id === dbItem.id);
                    if(cartItem) {
                        line_items.push({
                            price_data: {
                                currency: 'pen',
                                product_data: { name: dbItem.name },
                                unit_amount: dbItem.priceCents,
                            },
                            quantity: cartItem.quantity,
                        });
                    }
                });

                line_items.push({
                    price_data: {
                        currency: 'pen',
                        product_data: { name: 'Delivery Fee' },
                        unit_amount: deliveryFeeCents,
                    },
                    quantity: 1
                });

                const sessionParams: Stripe.Checkout.SessionCreateParams = {
                    payment_method_types: ['card'],
                    mode: 'payment',
                    line_items,
                    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${newOrder.id}`,
                    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?session_id={CHECKOUT_SESSION_ID}`,
                    metadata: {
                        orderId: newOrder.id,
                        userId: ctx.user.id,
                    },
                };

                if (process.env.NEXT_PUBLIC_DEMO_MODE === "true" && ctx.user.email ) {
                    sessionParams.customer_email = ctx.user.email;
                }

                const session = await stripe.checkout.sessions.create(sessionParams);

                if (!session.url) {
                    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Stripe session creation failed.' });
                }

                await ctx.db.update(orders).set({
                    stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id ?? null
                }).where(eq(orders.id, newOrder.id));

                return { url: session.url };

            } catch (error) {
                await ctx.db.delete(orders).where(eq(orders.id, newOrder.id));

                console.error("Stripe Error:", error);
                throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to create payment session.' });
            }

    }),

    getOrderById: protectedProcedure
        .input(z.object({ orderId: z.string().uuid() }))
        .query(async ({ ctx, input }) => {
            const { orderId } = input;

            const [order] = await ctx.db.query.orders.findMany({
                where: and(
                    eq(orders.id, orderId),
                    eq(orders.userId, ctx.user.id)
                ),
                with: {
                    restaurant: {
                        columns: { name: true }
                    },
                    orderItems: {
                        with: {
                            menuItem: { columns: { name: true } }
                        }
                    }
                }
            });

            if (!order) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Order not found or you do not have permission to view it.',
                });
            }

            return order;
        }),

    getOrderHistory: protectedProcedure.query(async ({ctx}) => {
        const userOrders = await ctx.db.query.orders.findMany({
            where: eq(orders.userId, ctx.user.id),
            with: {
                restaurant: {
                    columns: {
                        name: true
                    }
                },
                orderItems: {
                    with: {
                        menuItem: {
                            columns: {
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: (orders, { desc }) => [desc(orders.createdAt)],
        });
        return userOrders;
    })
});
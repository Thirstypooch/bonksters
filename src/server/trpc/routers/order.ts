import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { menuItems, orderItems, orders } from '@/db/schema';
import { inArray, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const orderRouter = router({
    createOrder: protectedProcedure
        .input(
            z.object({
                cartItems: z.array(z.object({
                    id: z.string().uuid(),
                    quantity: z.number().min(1),
                })),
                restaurantId: z.string().uuid(),
                deliveryAddress: z.string().min(10, 'Address is too short'),
                deliveryFeeCents: z.number().min(0),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { cartItems, restaurantId, deliveryAddress, deliveryFeeCents } = input;
            const itemIds = cartItems.map(item => item.id);

            // 1. Fetch the actual prices from the database to prevent client-side manipulation
            const dbMenuItems = await ctx.db
                .select({ id: menuItems.id, priceCents: menuItems.priceCents })
                .from(menuItems)
                .where(inArray(menuItems.id, itemIds));

            if (dbMenuItems.length !== itemIds.length) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Some items in the cart are not available.',
                });
            }

            // 2. Calculate total on the server
            let subTotalCents = 0;
            const priceMap = new Map(dbMenuItems.map(item => [item.id, item.priceCents]));

            for (const cartItem of cartItems) {
                subTotalCents += (priceMap.get(cartItem.id) ?? 0) * cartItem.quantity;
            }

            const totalCents = subTotalCents + deliveryFeeCents; // Assume tax is handled or added here if needed

            // 3. Use a transaction to create the order and its items atomically
            return ctx.db.transaction(async (tx) => {
                const [newOrder] = await tx
                    .insert(orders)
                    .values({
                        userId: ctx.user.id,
                        restaurantId,
                        totalCents,
                        deliveryAddress,
                        status: 'confirmed',
                    })
                    .returning();

                const orderItemsToInsert = cartItems.map(item => ({
                    orderId: newOrder.id,
                    menuItemId: item.id,
                    quantity: item.quantity,
                    unitPriceCents: priceMap.get(item.id)!,
                }));

                await tx.insert(orderItems).values(orderItemsToInsert);

                return { orderId: newOrder.id, success: true };
            });
        }),

    // We can add getOrderHistory here as well
    getOrderHistory: protectedProcedure.query(async ({ctx}) => {
        // Join orders with restaurants to get restaurant name
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
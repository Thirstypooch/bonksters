import { z } from 'zod';
import { protectedProcedure, router } from '../trpc';
import { addresses } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

export const addressRouter = router({
    getAddresses: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.query.addresses.findMany({
            where: eq(addresses.userId, ctx.user.id),
            orderBy: (addresses, { desc }) => [desc(addresses.isDefault), desc(addresses.createdAt)],
        });
    }),

    addAddress: protectedProcedure
        .input(
            z.object({
                label: z.string().optional(),
                fullAddress: z.string().min(10, 'Please enter a valid address.'),
                isDefault: z.boolean().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.isDefault) {
                await ctx.db.transaction(async (tx) => {
                    await tx
                        .update(addresses)
                        .set({ isDefault: false })
                        .where(and(eq(addresses.userId, ctx.user.id), eq(addresses.isDefault, true)));

                    await tx.insert(addresses).values({ ...input, userId: ctx.user.id });
                });
            } else {
                await ctx.db.insert(addresses).values({ ...input, userId: ctx.user.id });
            }

            return { success: true };
        }),

    deleteAddress: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            const [addressToDelete] = await ctx.db
                .select({ id: addresses.id })
                .from(addresses)
                .where(and(eq(addresses.id, input.id), eq(addresses.userId, ctx.user.id)));

            if (!addressToDelete) {
                throw new TRPCError({ code: 'FORBIDDEN' });
            }

            await ctx.db.delete(addresses).where(eq(addresses.id, input.id));
            return { success: true };
        }),

    setDefaultAddress: protectedProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db.transaction(async (tx) => {
                await tx
                    .update(addresses)
                    .set({ isDefault: false })
                    .where(and(eq(addresses.userId, ctx.user.id), eq(addresses.isDefault, true)));

                // Set the new default
                await tx
                    .update(addresses)
                    .set({ isDefault: true })
                    .where(and(eq(addresses.id, input.id), eq(addresses.userId, ctx.user.id)));
            });
            return { success: true };
        }),
});
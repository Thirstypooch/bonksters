import { protectedProcedure, router } from '../trpc';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const userRouter = router({
    getUserProfile: protectedProcedure.query(async ({ ctx }) => {
        const profile = await ctx.db
            .select()
            .from(users)
            .where(eq(users.id, ctx.user.id));

        return {
            ...(profile[0] || {}),
            email: ctx.user.email,
        };
    }),

    updateUserProfile: protectedProcedure
        .input(z.object({
            fullName: z.string().min(1, 'Name cannot be empty'),
            phoneNumber: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(users)
                .set({
                    fullName: input.fullName,
                    phoneNumber: input.phoneNumber,
                    updatedAt: new Date(),
                })
                .where(eq(users.id, ctx.user.id));

            return { success: true };
        }),
});
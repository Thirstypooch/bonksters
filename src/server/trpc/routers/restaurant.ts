import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { restaurants } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const restaurantRouter = router({
    getRestaurants: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(restaurants);
    }),

    // Procedure to get a single restaurant by its ID
    getRestaurantById: publicProcedure
        .input(
            z.object({
                id: z.string().uuid('Invalid UUID'),
            })
        )
        .query(async ({ ctx, input }) => {
            const restaurant = await ctx.db
                .select()
                .from(restaurants)
                .where(eq(restaurants.id, input.id));

            return restaurant[0] || null;
        }),
});
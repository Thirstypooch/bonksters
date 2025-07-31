import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import {menuItems, restaurants} from '@/db/schema';
import { eq } from 'drizzle-orm';

export const restaurantRouter = router({
    getRestaurants: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(restaurants);
    }),

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
    getMenuByRestaurantId: publicProcedure
        .input(z.object({ id: z.string().uuid('Invalid UUID') }))
        .query(async ({ ctx, input }) => {
            const items = await ctx.db
                .select()
                .from(menuItems)
                .where(eq(menuItems.restaurantId, input.id));

            // Group items by category
            const categories = items.reduce<Record<string, (typeof items[0])[]>>((acc, item) => {
                const category = item.category || 'Miscellaneous';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(item);
                return acc;
            }, {});

            // Transform into the structure the frontend expects
            return Object.entries(categories).map(([name, menuItems]) => ({
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name,
                items: menuItems.map(item => ({
                    ...item,
                    price: item.priceCents / 100
                })),
            }));
        }),
});
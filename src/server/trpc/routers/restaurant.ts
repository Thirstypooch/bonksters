import { z } from 'zod';
import { Redis } from '@upstash/redis';
import { publicProcedure, router } from '../trpc';
import { menuItems, restaurants } from '@/db/schema';
import {eq, ilike, or, sql} from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core'

const redis = Redis.fromEnv();

type TransformedMenuItem = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    priceCents: number;
    imageUrl: string | null;
    category: string | null;
    restaurantId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

type MenuReturnType = {
    id: string;
    name: string;
    items: TransformedMenuItem[];
}[];


export const restaurantRouter = router({
    getRestaurants: publicProcedure.query(async ({ ctx }) => {
        const cacheKey = 'restaurants:all';
        const cached = await redis.get<(typeof restaurants.$inferSelect)[]>(cacheKey);
        if (cached) {
            console.log('CACHE HIT: restaurants:all');
            return cached;
        }
        console.log('CACHE MISS: restaurants:all');
        const freshData = await ctx.db.select().from(restaurants);
        await redis.set(cacheKey, freshData, { ex: 3600 });
        return freshData;
    }),

    getRestaurantById: publicProcedure
        .input(z.object({ id: z.string().uuid('Invalid UUID') }))
        .query(async ({ ctx, input }) => {
            const restaurant = await ctx.db
                .select()
                .from(restaurants)
                .where(eq(restaurants.id, input.id));
            return restaurant[0] || null;
        }),

    getMenuByRestaurantId: publicProcedure
        .input(z.object({ id: z.string().uuid('Invalid UUID') }))
        .query(async ({ ctx, input }): Promise<MenuReturnType> => {
            const cacheKey = `menu:${input.id}`;

            const cached = await redis.get<MenuReturnType>(cacheKey);
            if (cached) {
                console.log(`CACHE HIT: menu:${input.id}`);
                return cached;
            }

            console.log(`CACHE MISS: menu:${input.id}`);
            const items = await ctx.db
                .select()
                .from(menuItems)
                .where(eq(menuItems.restaurantId, input.id));

            const categories = items.reduce<Record<string, (typeof items[0])[]>>((acc, item) => {
                const category = item.category || 'Miscellaneous';
                if (!acc[category]) acc[category] = [];
                acc[category].push(item);
                return acc;
            }, {});

            const freshData = Object.entries(categories).map(([name, menuItems]) => ({
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name,
                items: menuItems.map(item => ({
                    ...item,
                    price: item.priceCents / 100
                })),
            }));

            await redis.set(cacheKey, freshData, { ex: 1800 });
            return freshData;
        }),

    searchRestaurants: publicProcedure
        .input(
            z.object({
                query: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            if (input.query.length < 2) {
                return [];
            }

            const query = `%${input.query}%`;

            const searchMenuItems = alias(menuItems, 'search_menu_items');

            const searchResults = await ctx.db
                .selectDistinctOn([restaurants.id], {
                    id: restaurants.id,
                    name: restaurants.name,
                    coverImageUrl: restaurants.coverImageUrl,
                    matchedOn: sql<string>`
                        CASE
                            WHEN ${restaurants.name} ILIKE ${query} THEN ${restaurants.name}
                            ELSE ${searchMenuItems.name}
                        END
                    `.as('matched_on')
                })
                .from(restaurants)
                .leftJoin(searchMenuItems, eq(restaurants.id, searchMenuItems.restaurantId))
                .where( or(
                    ilike(restaurants.name, query),
                    ilike(searchMenuItems.name, query)
                ))
                .limit(8);

            return searchResults.filter(r => r.id);
        }),
});
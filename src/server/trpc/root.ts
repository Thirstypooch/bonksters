import { router } from './trpc';
import { restaurantRouter } from './routers/restaurant';

export const appRouter = router({
    restaurant: restaurantRouter,
});

export type AppRouter = typeof appRouter;
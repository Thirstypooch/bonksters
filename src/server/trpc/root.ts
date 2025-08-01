import { router } from './trpc';
import { restaurantRouter } from './routers/restaurant';
import { userRouter } from './routers/user';

export const appRouter = router({
    restaurant: restaurantRouter,
    user: userRouter,
});

export type AppRouter = typeof appRouter;
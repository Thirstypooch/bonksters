import { router } from './trpc';
import { restaurantRouter } from './routers/restaurant';
import { userRouter } from './routers/user';
import { orderRouter } from './routers/order';

export const appRouter = router({
    restaurant: restaurantRouter,
    user: userRouter,
    order: orderRouter,
});

export type AppRouter = typeof appRouter;
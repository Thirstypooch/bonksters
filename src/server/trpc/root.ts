import { router } from './trpc';
import { restaurantRouter } from './routers/restaurant';
import { userRouter } from './routers/user';
import { orderRouter } from './routers/order';
import { addressRouter } from './routers/address';

export const appRouter = router({
    restaurant: restaurantRouter,
    user: userRouter,
    order: orderRouter,
    address: addressRouter,
});

export type AppRouter = typeof appRouter;
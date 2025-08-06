import { appRouter } from '@/server/trpc/root';
import { db } from '@/db';

export const createCaller = appRouter.createCaller({
    db,
    user: null,
});
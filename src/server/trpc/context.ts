import { db } from '@/db';
import {NextRequest} from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext = async (_opts: { req: NextRequest }) => {
    return {
        db,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
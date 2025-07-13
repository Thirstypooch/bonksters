import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { db } from '@/db';
import {NextRequest} from "next/server"; // Import our Drizzle instance

export const createContext = async (opts: { req: NextRequest }) => {
    return {
        db, // Make the database connection available in the context
    };
};

// Updated way to infer the context type
export type Context = Awaited<ReturnType<typeof createContext>>;
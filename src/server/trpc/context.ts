import { db } from '@/db';
import { NextRequest } from "next/server";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createContext = async (_opts: { req: NextRequest }) => {
    const cookieStore = cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch {
                        // This will be invoked when a route handler is throwing a redirect or error.
                        // It's safe to ignore here, as there is no response to set cookies on.
                    }
                },
            }
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    return {
        db,
        user,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
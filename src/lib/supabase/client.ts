//This will export a singleton instance of the Supabase client for use on the client-side.
// This helper will use the createBrowserClient function from the new package, which is designed to manage authentication state in the browser.
// Create a browser-specific Supabase client instance.

'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}
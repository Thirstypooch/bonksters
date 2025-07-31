export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import React from "react";
import { Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TRPCProvider from '@/lib/trpc/Provider';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const nunito = Nunito({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-nunito',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Bonkster's Food Buddy",
  description: "Your friendly neighborhood food delivery app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
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
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // This is expected to fail on Server Components, which is fine.
            }
          },
        },
      }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${poppins.variable} font-sans`}>
      <TRPCProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header user={user}  />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </TRPCProvider>
      </body>
    </html>
  );
}

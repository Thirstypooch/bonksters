import type { Metadata } from "next";
import { Poppins, Nunito } from "next/font/google"; // We'll use the fonts from your tailwind.config.ts
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TRPCProvider from '@/lib/trpc/Provider';
import { createClient } from '@/lib/supabase/server';

// Setup the fonts based on your tailwind.config.ts
const nunito = Nunito({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-nunito', // CSS Variable for Tailwind
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins', // CSS Variable for Tailwind
});

// This is the metadata for your entire application (great for SEO)
export const metadata: Metadata = {
  title: "Bonkster's Food Buddy",
  description: "Your friendly neighborhood food delivery app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      {/* Apply the font variables to the body tag */}
      <body className={`${nunito.variable} ${poppins.variable} font-sans`}>
      <TRPCProvider>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header session={session} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </TRPCProvider>
      </body>
    </html>
  );
}

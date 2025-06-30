import type { Metadata } from "next";
import { Inter, Poppins, Nunito } from "next/font/google"; // We'll use the fonts from your tailwind.config.ts
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply the font variables to the body tag */}
      <body className={`${nunito.variable} ${poppins.variable} font-sans`}>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// 1. The Elegant Serif (Headings)
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600", "700"], 
  variable: "--font-cormorant",
  display: "swap",
});

// 2. The Clean Sans (Details)
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  weight: ["200", "400"], 
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SHAKYA | Himalayan Heritage",
  description: "A luxury archive of Himalayan art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 3. Added flex column layout so footer pushes to bottom */}
      <body className={`${cormorant.variable} ${montserrat.variable} bg-bone text-soft-black antialiased flex flex-col min-h-screen`}>
        <Navbar />
        
        {/* Main content grows to fill space */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

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
  metadataBase: new URL("https://shakyagallery.com"),
  title: {
    default: "SHAKYA | Premier Art Gallery in Nepal",
    template: "%s | SHAKYA Gallery",
  },
  description: "A luxury archive of Himalayan art. Discover authentic Paubha paintings and masterpieces from Nepal's most revered artists.",
  keywords: ["Nepal Art", "Paubha", "Thangka", "Buy Art Nepal", "Kathmandu Art Gallery", "Nepali Paintings", "Traditional Art"],
  openGraph: {
    title: "SHAKYA | Premier Art Gallery in Nepal",
    description: "A luxury archive of Himalayan art. Discover authentic Paubha paintings and masterpieces from Nepal's most revered artists.",
    url: "https://shakyagallery.com",
    siteName: "Shakya Gallery",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "SHAKYA | Premier Art Gallery in Nepal",
    description: "A luxury archive of Himalayan art. Discover authentic Paubha paintings and masterpieces from Nepal's most revered artists.",
    creator: "@shakyagallery", // Placeholder
    images: ["https://shakyagallery.com/opengraph-image.png"], // Placeholder
  },
  verification: {
    google: "google-site-verification=YOUR_CODE", // Placeholder
  },
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
        <SmoothScroll>
          <Navbar />

          {/* Main content grows to fill space */}
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
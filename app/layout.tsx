import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    default: "SHAKYA | Buy Original Fine Art in Nepal | Art Gallery Kathmandu",
    template: "%s | SHAKYA Gallery Nepal",
  },
  description: "Discover and buy original fine art in Nepal. SHAKYA Gallery features a curated collection of abstract, landscape, and portrait paintings by master Nepali artists. Secure global shipping available.",
  keywords: ["Buy Art Nepal", "Art Gallery Kathmandu", "Fine Art Nepal", "Nepali Artists", "Original Paintings Nepal", "Abstract Art Nepal", "Landscape Paintings Nepal", "Art Online Nepal", "Shakya Gallery"],
  openGraph: {
    title: "SHAKYA | Exclusive Fine Arts Gallery in Nepal",
    description: "Browse a curated collection of fine art paintings that capture emotion and beauty. Discover expressive abstracts, serene landscapes, and intimate portraits.",
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
    title: "SHAKYA | Exclusive Fine Arts Gallery in Nepal",
    description: "Browse a curated collection of fine art paintings that capture emotion and beauty. Capturing emotion through expressive abstracts, landscapes, and portraits.",
    images: ["/hero-1.jpg"], // Fallback to hero image
  },
  verification: {
    google: "zko8TNCFd-4MtnBqeyTU14V1ox8YIOvl3LsNg2Z0FlE",
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
        <ClientLayout>
          {children}
        </ClientLayout>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
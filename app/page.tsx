import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";
import { WhyBuy } from "@/components/sections/WhyBuy";
import { FAQ } from "@/components/sections/FAQ";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shakya Gallery | Original Nepalese Fine Art & Modern Abstract Collection",
  description: "Experience the legacy of fine art in Nepal. Buy original abstract, landscape, and portrait paintings from Kathmandu's leading art gallery. Certified authenticity and global shipping.",
  alternates: {
    canonical: "https://shakyagallery.com",
  },
};

export default async function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Shakya Gallery",
    "image": "https://shakyagallery.com/hero-1.jpg",
    "logo": "https://shakyagallery.com/icon.png",
    "description": "Exclusive Fine Arts Gallery in Nepal specializing in abstract, landscape, and portrait paintings. Established in 1998, we represent master Nepali artists.",
    "url": "https://shakyagallery.com",
    "telephone": "+977-9801234567",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Boudha",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.7215",
      "longitude": "85.3620"
    }
  };

  return (
    <div className="bg-bone min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="h-screen w-full">
        <AnimatedHero />
      </section>

      <section className="min-h-screen w-full flex items-center justify-center bg-bone">
        <HeritagePreview />
      </section>

      <section className="min-h-screen w-full bg-bone pt-20">
        <GalleryGrid limit={6} />
      </section>

      <WhyBuy />

      <FAQ />
    </div>
  );
}
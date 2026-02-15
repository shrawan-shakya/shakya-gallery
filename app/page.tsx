import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHAKYA | Premier Art Gallery in Nepal - Traditional & Contemporary Masterpieces",
  description: "Discover the finest collection of Nepalese art at Shakya Gallery. From traditional Paubha to contemporary paintings, buy authenticated masterpieces in Nepal.",
  alternates: {
    canonical: "https://shakyagallery.com",
  },
};

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Shakya Gallery",
    "image": "https://shakyagallery.com/opengraph-image.png", // We'll need to ensure this exists or use a hero image
    "description": "Premier Art Gallery in Nepal specializing in traditional Paubha and contemporary masterpieces.",
    "url": "https://shakyagallery.com",
    "telephone": "+977-9841234567" // Placeholder, user can update
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
    </div>
  );
}
import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";
import { WhyBuy } from "@/components/sections/WhyBuy";
import { FAQ } from "@/components/sections/FAQ";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHAKYA | Exclusive Fine Art Gallery in Kathmandu, Nepal",
  description: "Fine art from Kathmandu. Explore expressive abstracts, serene landscapes, and intimate portraits by Nepal’s finest local artists.",
  alternates: {
    canonical: "https://shakyagallery.com",
  },
};

export default async function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": "Shakya Gallery",
    "image": "https://shakyagallery.com/opengraph-image.png",
    "logo": "https://shakyagallery.com/icon.png",
    "description": "Exclusive Fine Arts Gallery in Nepal specializing in abstract, landscape, and portrait paintings that capture emotion and beauty.",
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

      <WhyBuy />

      <FAQ />
    </div>
  );
}
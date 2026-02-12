import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";



export default async function Home() {

  return (
    <main className="bg-bone min-h-screen">
      <AnimatedHero />

      <div className="relative z-10 bg-bone pt-10">
        <HeritagePreview />
        <GalleryGrid />
      </div>
    </main>
  );
}
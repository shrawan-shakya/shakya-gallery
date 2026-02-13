import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";



export default async function Home() {

  return (
    <main className="bg-bone min-h-screen">
      <section className="h-screen w-full">
        <AnimatedHero />
      </section>

      <section className="min-h-screen w-full flex items-center justify-center bg-bone">
        <HeritagePreview />
      </section>

      <section className="min-h-screen w-full bg-bone pt-20">
        <GalleryGrid limit={6} />
      </section>
    </main>
  );
}
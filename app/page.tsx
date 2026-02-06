import { Hero } from "@/components/sections/Hero";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";

export default function Home() {
  return (
    <main className="bg-bone min-h-screen">
      <Hero />
      <HeritagePreview />
      <GalleryGrid />
    </main>
  );
}
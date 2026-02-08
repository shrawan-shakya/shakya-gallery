import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";

// UPDATE: Fetch 5 artworks now
async function getHeroArt() {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc)[0...5] {
      title,
      "imageUrl": mainImage.asset->url
    }
  `;
  return await client.fetch(query);
}

export default async function Home() {
  const heroArt = await getHeroArt();

  return (
    <main className="bg-bone min-h-screen">
      <AnimatedHero heroArt={heroArt} />
      
      <div className="relative z-10 bg-bone pt-10">
        <HeritagePreview />
        <GalleryGrid />
      </div>
    </main>
  );
}
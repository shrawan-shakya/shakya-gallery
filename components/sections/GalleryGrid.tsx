import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { GalleryGridClient } from "./GalleryGridClient"; // We will create this next

// 1. The Query: Ask Sanity for data
async function getArtworks() {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      dimensions,
      year,
      artist,   // <--- Added
      material, // <--- Added
      "slug": slug.current, // <--- ADDED THIS LINE
      "imageUrl": mainImage.asset->url,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
  return await client.fetch(query);
}

export async function GalleryGrid() {
  // 2. Fetch the data (Server Side)
  const artworks = await getArtworks();

  return (
    <section className="py-24 px-4 md:px-12 bg-bone">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center">
        <h2 className="font-serif text-4xl text-primary italic mb-4">Selected Acquisitions</h2>
        <div className="w-12 h-[1px] bg-primary/20 mx-auto" />
      </div>

      {/* 3. Pass data to the Client Component for animation */}
      <GalleryGridClient artworks={artworks} />
    </section>
  );
}
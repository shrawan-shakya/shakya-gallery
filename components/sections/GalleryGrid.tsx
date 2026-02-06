import { client } from "@/sanity/lib/client";
import { GalleryGridClient } from "./GalleryGridClient";

// 1. The Query
async function getArtworks() {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      dimensions,
      year,
      artist,
      material,
      status, // <--- Added: Fetch if it is Sold/Available
      price,  // <--- Added: Fetch the price
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
  return await client.fetch(query);
}

export async function GalleryGrid() {
  const artworks = await getArtworks();

  return (
    <section className="py-24 md:py-32 px-6 bg-bone">
      
      {/* 2. THE HEADER */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-24 md:mb-32">
        <p className="font-sans text-[8px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-8 font-medium">
          The Collection
        </p>
        <h2 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-soft-black leading-tight mb-8">
          CURATED <span className="italic">MASTERS</span>
        </h2>
        <div className="max-w-2xl">
          <p className="font-serif text-lg md:text-xl italic text-soft-black/80 leading-relaxed">
            "From the intricate devotion of traditional Paubha to the bold strokes of contemporary visionaries, discover iconic creations from Nepal’s most revered artists right here."
          </p>
        </div>
      </div>

      {/* 3. The Grid (Passes data to Client) */}
      <GalleryGridClient artworks={artworks} />
    </section>
  );
}
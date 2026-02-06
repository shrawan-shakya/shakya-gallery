import { client } from "@/sanity/lib/client";
import { GalleryGridClient } from "./GalleryGridClient";

async function getArtworks() {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      dimensions,
      year,
      artist,
      material,
      status,
      price, // <--- Fetch Price
      "categories": categories[]->title, // <--- Fetch the Category Titles (Dereferencing)
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
    <section className="py-24 md:py-32 px-6 bg-bone min-h-screen">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 md:mb-24">
        <p className="font-sans text-[8px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-8 font-medium">
          The Collection
        </p>
        <h2 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-soft-black leading-tight mb-8">
          CURATED <span className="italic">MASTERS</span>
        </h2>
        <div className="max-w-2xl">
          <p className="font-serif text-lg md:text-xl italic text-soft-black/80 leading-relaxed">
            "Discover iconic creations from Nepal’s most revered artists."
          </p>
        </div>
      </div>

      {/* CLIENT COMPONENT */}
      <GalleryGridClient artworks={artworks} />
      
    </section>
  );
}
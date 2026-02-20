import { sanityFetch } from "@/sanity/lib/live";
import { GalleryGridClient } from "./GalleryGridClient";
import Link from "next/link";

// 1. The Query
async function getArtworks(limit?: number) {
  const query = `
    *[_type == "artwork"] | order(_updatedAt desc)${limit ? `[0...${limit}]` : ""} {
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
  const { data } = await sanityFetch({ query });
  return data;
}

export async function GalleryGrid({ limit }: { limit?: number }) {
  const artworks = await getArtworks(limit);

  return (
    <section className="py-24 md:py-32 px-6 bg-bone">

      {/* 2. THE HEADER */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-24 md:mb-32">
        <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-8 font-medium">
          The Collection
        </p>
        <h2 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-soft-black leading-tight mb-8">
          CURATED <span className="italic">MASTERS</span>
        </h2>
        <div className="max-w-2xl">
          <p className="font-serif text-lg md:text-xl italic text-soft-black/80 leading-relaxed">
            "From time-honored traditions to bold contemporary visions, discover iconic known creations from Nepal’s most revered fine artists."
          </p>
        </div>
      </div>

      {/* 3. The Grid (Passes data to Client) */}
      <GalleryGridClient artworks={artworks} />

      {/* 4. CTA (If limited) */}
      {limit && (
        <div className="flex justify-center mt-24">
          <Link
            href="/collection"
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-soft-black/20 hover:border-soft-black transition-colors duration-500"
          >
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-soft-black group-hover:tracking-[0.35em] transition-all duration-500">
              View Entire Collection
            </span>
            <span className="text-xl transform group-hover:translate-x-2 transition-transform duration-500">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
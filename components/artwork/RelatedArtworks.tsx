"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SanityImage } from "@/components/ui/SanityImage";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { Artwork } from "@/lib/types";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

interface RelatedArtworksProps {
  artworks: Artwork[];
}

export function RelatedArtworks({ artworks }: RelatedArtworksProps) {
  if (!artworks || artworks.length === 0) return null;

  return (
    <section className="mt-0 pt-20 border-t border-black/5 animate-in fade-in duration-1000 delay-500">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-soft-black mb-4 italic">
            Similar Artworks
          </h2>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500">
            Carefully curated pieces from the same collection
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16"
        >
          {artworks.map((art) => (
            <motion.div key={art._id} variants={staggerItem}>
              <Link
                href={`/artwork/${art.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <div className="relative mb-8">
                  <SanityImage
                    source={art.image}
                    alt={art.title}
                    lqip={art.lqip}
                    aspectRatio={art.aspectRatio}
                    hasMat={true}
                    className="transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {art.status === "sold" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-serif font-bold italic text-xl text-white bg-[#7D1818] shadow-lg -rotate-12 tracking-widest px-4 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        SOLD
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-2">
                  <MuseumPlaque
                    title={art.title}
                    artist={art.artist}
                    year={art.year}
                    price={art.price}
                    showPrice={art.showPrice}
                    startingPrice={art.startingPrice}
                    showButton={false}
                    showMedium={false}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <Link
            href="/collection"
            className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400 hover:text-soft-black transition-colors border-b border-transparent hover:border-black/20 pb-1"
          >
            View Entire Collection —
          </Link>
        </div>
      </div>
    </section>
  );
}

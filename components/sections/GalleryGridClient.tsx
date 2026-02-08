"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";

interface Artwork {
  _id: string;
  title: string;
  artist?: string;
  dimensions?: string;
  material?: string;
  year: string;
  imageUrl: string;
  slug: string;
  aspectRatio: number;
  status?: "available" | "sold" | "private";
  price?: number;
}

export function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  return (
    // THE OUTER GRID: 2 Columns, huge vertical gaps
    <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-32 md:gap-y-48 items-start px-6 pb-40">
      
      {artworks.map((art, index) => (
        <motion.div
          key={art._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full"
        >
          <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline group/card">
            
            {/* --- SCALING WRAPPER --- */}
            {/* This is the magic. It shrinks the painting to 75-85% of the column width 
                and centers it, creating that expensive whitespace on the sides. */}
            <div className="w-full max-w-[85%] md:max-w-[75%] mx-auto">

              {/* 1. THE FRAME ZONE */}
              <div className="relative group/image"> 
                <MuseumFrame aspectRatio={art.aspectRatio}>
                  {art.imageUrl && (
                    <img 
                      src={art.imageUrl} 
                      alt={art.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover/image:scale-105
                        ${(art.status === "sold" || art.status === "private") 
                          ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40" 
                          : "grayscale-[0.2] group-hover/image:grayscale-0"
                        }
                      `}
                    />
                  )}
                </MuseumFrame>

                {/* --- STATUS BADGES --- */}
                <div className="absolute inset-0 pointer-events-none p-4 md:p-6">
                  
                  {/* SOLD TAG */}
                  {(art.status === "sold" || art.status === "private") && (
                    <span className={`
                      absolute flex items-center gap-2 bg-soft-black text-white font-sans font-medium tracking-[0.2em] shadow-2xl z-20
                      transition-all duration-500 ease-in-out
                      
                      /* DEFAULT STATE */
                      top-4 right-4 px-3 py-1.5 text-[8px] md:text-[9px]

                      /* HOVER STATE (Center & Big) */
                      group-hover/image:top-1/2 group-hover/image:right-1/2 
                      group-hover/image:translate-x-1/2 group-hover/image:-translate-y-1/2 
                      group-hover/image:scale-125 group-hover/image:px-5 group-hover/image:py-2
                    `}>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> 
                      {art.status === "private" ? "PRIVATE" : "SOLD"}
                    </span>
                  )}

                  {/* PRICE TAG */}
                  {art.status === "available" && art.price && (
                    <span className="absolute top-4 right-4 bg-white/95 text-soft-black text-[9px] md:text-[10px] font-sans tracking-[0.2em] px-3 py-1.5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10">
                      ${art.price.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* 2. THE PLAQUE ZONE (Centered) */}
              <div className="relative z-0 mt-8 md:mt-12 flex flex-col items-center text-center">
                 <MuseumPlaque 
                   title={art.title}
                   artist={art.artist}
                   medium={art.material}
                   dimensions={art.dimensions}
                   year={art.year}
                   showButton={true}
                   className="" 
                 />
              </div>

            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
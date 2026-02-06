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
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-40 items-start px-6 md:px-12 pb-32">
      
      {artworks.map((art, index) => (
        <motion.div
          key={art._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline group/card">
            
            {/* 1. THE FRAME ZONE */}
            <div className="relative group/image overflow-hidden"> 
              <MuseumFrame aspectRatio={art.aspectRatio}>
                {art.imageUrl && (
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className={`w-full object-cover transition-all duration-700 ease-out scale-100 group-hover/image:scale-105
                      ${(art.status === "sold" || art.status === "private") 
                        ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40" // Heavily faded on hover to let badge pop
                        : "grayscale-[0.2] group-hover/image:grayscale-0"
                      }
                    `}
                  />
                )}
              </MuseumFrame>

              {/* --- STATUS BADGES --- */}
              {/* Container is full size to allow centering logic, pointer-events-none lets clicks pass through */}
              <div className="absolute inset-0 pointer-events-none p-6">
                
                {/* SOLD TAG ANIMATION */}
                {(art.status === "sold" || art.status === "private") && (
                  <span className={`
                    absolute flex items-center gap-3 bg-soft-black text-white font-sans font-medium tracking-[0.2em] shadow-2xl z-20
                    transition-all duration-500 ease-in-out
                    
                    /* DEFAULT STATE (Top Right, Small) */
                    top-6 right-6 px-4 py-2 text-[10px]

                    /* HOVER STATE (Center, Big) */
                    group-hover/image:top-1/2 group-hover/image:right-1/2 
                    group-hover/image:translate-x-1/2 group-hover/image:-translate-y-1/2 
                    group-hover/image:scale-150 group-hover/image:px-6 group-hover/image:py-3
                  `}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> 
                    {art.status === "private" ? "PRIVATE" : "SOLD"}
                  </span>
                )}

                {/* PRICE TAG (Available items only) */}
                {/* Keeps simple hover behavior: Fade in at top right */}
                {art.status === "available" && art.price && (
                  <span className="absolute top-6 right-6 bg-white/95 text-soft-black text-xs font-sans tracking-[0.2em] px-4 py-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10">
                    ${art.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* 2. THE PLAQUE ZONE */}
            <div className="relative z-0 mt-10">
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

          </Link>
        </motion.div>
      ))}
    </div>
  );
}
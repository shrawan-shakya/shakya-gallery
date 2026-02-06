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
}

export function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  return (
    // UPDATED: 
    // 1. gap-y-20 (Mobile) -> md:gap-y-40 (Desktop)
    // 2. px-6 (Mobile) -> md:px-12 (Desktop)
    // 3. Added pb-32 for bottom spacing
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-40 items-start px-6 md:px-12 pb-32">
      
      {artworks.map((art, index) => (
        <motion.div
          key={art._id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* GLOBAL LINK: 
             The whole area is still clickable (good UX), but we REMOVED the 'group' class 
             from here so hovering one part doesn't trigger the other.
          */}
          <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline">
            
            {/* 1. THE FRAME ZONE (Independent Hover) */}
            {/* We call this zone 'group/image' */}
            <div className="relative group/image"> 
              <MuseumFrame aspectRatio={art.aspectRatio}>
                {art.imageUrl && (
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    // UPDATED: Now listens to 'group-hover/image' instead of generic 'group-hover'
                    className="w-full object-cover grayscale-[0.2] group-hover/image:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover/image:scale-105"
                  />
                )}
              </MuseumFrame>
            </div>

            {/* 2. THE PLAQUE ZONE (Independent Hover) */}
            {/* UPDATED: Removed negative margin. Added 'mt-10' for proper spacing. */}
            <div className="relative z-0 mt-10">
               <MuseumPlaque 
                 title={art.title}
                 artist={art.artist}
                 medium={art.material}
                 dimensions={art.dimensions}
                 year={art.year}
                 showButton={true}
                 // The plaque has its own internal 'group' class in its component, 
                 // so it already handles its own hover separately.
                 className="" 
               />
            </div>

          </Link>
        </motion.div>
      ))}
    </div>
  );
}
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { cn } from "@/lib/utils";

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
  const [layout, setLayout] = useState<"grid" | "single">("single");
  const [showMat, setShowMat] = useState(true);

  return (
    <>
      {/* LAYOUT & MAT TOGGLE BAR (Desktop Only) */}
      <div className="sticky top-0 z-40 w-full bg-bone/95 backdrop-blur-sm border-b border-[#1A1A1A]/5 transition-all duration-300 mb-12 hidden md:block">
        <div className="flex justify-between max-w-[1800px] mx-auto px-8 py-4">

          {/* MAT TOGGLE */}
          <div className="flex gap-6">
            <button
              onClick={() => setShowMat(true)}
              className={cn(
                "font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300",
                showMat
                  ? "text-soft-black font-semibold border-b border-soft-black"
                  : "text-gray-400 hover:text-soft-black border-b border-transparent"
              )}
            >
              Mat
            </button>
            <button
              onClick={() => setShowMat(false)}
              className={cn(
                "font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300",
                !showMat
                  ? "text-soft-black font-semibold border-b border-soft-black"
                  : "text-gray-400 hover:text-soft-black border-b border-transparent"
              )}
            >
              No Mat
            </button>
          </div>

          {/* LAYOUT TOGGLE */}
          <div className="flex gap-6">
            <button
              onClick={() => setLayout("grid")}
              className={cn(
                "font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300",
                layout === "grid"
                  ? "text-soft-black font-semibold border-b border-soft-black"
                  : "text-gray-400 hover:text-soft-black border-b border-transparent"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setLayout("single")}
              className={cn(
                "font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300",
                layout === "single"
                  ? "text-soft-black font-semibold border-b border-soft-black"
                  : "text-gray-400 hover:text-soft-black border-b border-transparent"
              )}
            >
              Rows
            </button>
          </div>
        </div>
      </div>

      {/* THE OUTER GRID */}
      <div
        className={cn(
          "mx-auto items-start px-6 pb-40 transition-all duration-700 ease-in-out",
          layout === "grid"
            ? "max-w-[1800px] block columns-1 md:columns-2 gap-12"
            : "max-w-[800px] grid grid-cols-1 gap-y-32 md:gap-y-48"
        )}
      >

        {artworks.map((art, index) => (
          <motion.div
            key={art._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="w-full break-inside-avoid block align-top mt-0 mb-12 relative z-10"
          >
            <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline group/card">

              {/* --- SCALING WRAPPER --- */}
              {/* This is the magic. It shrinks the painting to 75-85% of the column width 
                and centers it, creating that expensive whitespace on the sides. */}
              {/* --- SCALING WRAPPER (DECOUPLED) --- */}
              <div className="w-full mx-auto">

                {/* 1. THE FRAME ZONE (Wider on Mobile) */}
                {/* Mobile: w-full (almost full width relative to pad). Desktop: max-w-[75%] */}
                <div className="w-full md:max-w-[75%] mx-auto relative group/image">
                  <MuseumFrame aspectRatio={art.aspectRatio} hasMat={showMat}>
                    {art.imageUrl && (
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={art.imageUrl}
                          alt={art.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className={`object-cover transition-all duration-700 ease-out scale-100 group-hover/image:scale-105
                            ${(art.status === "sold" || art.status === "private")
                              ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                              : "grayscale-[0.2] group-hover/image:grayscale-0"
                            }
                          `}
                        />
                      </div>
                    )}
                  </MuseumFrame>

                  {/* --- STATUS BADGES --- */}
                  <div className="absolute inset-0 pointer-events-none p-4 md:p-6">

                    {/* SOLD TAG */}
                    {art.status === "sold" && (
                      <span className={`
                      absolute inset-0 flex flex-col items-center justify-center z-20
                      opacity-0 group-hover/image:opacity-100 transition-opacity duration-500
                    `}>
                        <span className="font-serif font-bold italic text-3xl md:text-4xl text-white bg-[#7D1818] shadow-xl -rotate-12 tracking-widest px-6 py-2">
                          SOLD
                        </span>
                        <span className="mt-16 font-sans text-[8px] md:text-xs text-white tracking-[0.2em] uppercase font-medium drop-shadow-md">
                          Looking for something similar?
                        </span>
                      </span>
                    )}

                    {/* PRICE TAG */}
                    {art.status === "available" && art.price && (
                      <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 text-soft-black text-sm md:text-base font-sans tracking-[0.2em] px-6 py-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10">
                        ${art.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. THE PLAQUE ZONE (Centered, Kept Compact) */}
                {/* Mobile: max-w-[85%] (same as before). Desktop: max-w-[75%] */}
                <div className="w-full max-w-[85%] md:max-w-[75%] mx-auto relative z-0 mt-8 md:mt-12 flex flex-col items-center text-center">
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
      </div >
    </>
  );
}
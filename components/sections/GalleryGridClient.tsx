"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { EmptyState } from "@/components/ui/EmptyState";
import { SanityImage } from "@/components/ui/SanityImage";
import { LazyGridItem } from "@/components/ui/LazyGridItem";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";
import { cn } from "@/lib/utils";
import { Price } from "@/components/ui/Price";

interface Artwork {
  _id: string;
  title: string;
  artist?: string;
  dimensions?: string;
  material?: string;
  year: string;
  imageUrl: string;
  lqip?: string;
  slug: string;
  aspectRatio: number;
  status?: "available" | "sold" | "private";
  price?: number;
  showPrice?: boolean;
  startingPrice?: number;
}

import { staggerContainer, staggerItem } from "@/lib/motion-variants";

// --- ICONS ---
const FrameIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
    <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
);

const CanvasIcon = ({ className }: { className?: string }) => (
  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  const [layout, setLayout] = useState<"grid" | "single">("single");
  const [showMat, setShowMat] = useState(true);

  return (
    <>
      {/* ... toggle bar - Hidden on mobile, visible on desktop ... */}
      <div className="sticky top-0 z-40 w-full bg-bone/95 backdrop-blur-sm border-b border-[#1A1A1A]/5 transition-all duration-300 mb-12 hidden md:block">
        <div className="flex justify-between max-w-[1800px] mx-auto px-8 py-4">

          <div className="flex gap-4 md:gap-8">
            <button
              onClick={() => setShowMat(true)}
              className={cn(
                "flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                showMat
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black"
              )}
            >
              <FrameIcon />
              <span className="hidden sm:inline">View with Frame</span>
              {showMat && <motion.div layoutId="grid-active-mat" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black" />}
            </button>
            <button
              onClick={() => setShowMat(false)}
              className={cn(
                "flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                !showMat
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black"
              )}
            >
              <CanvasIcon />
              <span className="hidden sm:inline">Canvas Only</span>
              {!showMat && <motion.div layoutId="grid-active-mat" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black" />}
            </button>
          </div>

          {/* LAYOUT TOGGLE */}
          <div className="hidden sm:flex gap-4 md:gap-8">
            <button
              onClick={() => setLayout("grid")}
              className={cn(
                "flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                layout === "grid"
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Grid View</title>
                <rect x="1" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="1" width="7" height="7" stroke="currentColor" strokeWidth="1.5" /><rect x="1" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="10" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="hidden sm:inline">Grid</span>
              {layout === "grid" && <motion.div layoutId="grid-active-layout" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black" />}
            </button>
            <button
              onClick={() => setLayout("single")}
              className={cn(
                "flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                layout === "single"
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <title>Row View</title>
                <rect x="1" y="2" width="16" height="3" stroke="currentColor" strokeWidth="1.5" /><rect x="1" y="7.5" width="16" height="3" stroke="currentColor" strokeWidth="1.5" /><rect x="1" y="13" width="16" height="3" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span className="hidden sm:inline">Rows</span>
              {layout === "single" && <motion.div layoutId="grid-active-layout" className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black" />}
            </button>
          </div>
        </div>
      </div>

      {/* THE OUTER GRID */}
      <div className="mx-auto px-6 pb-8 transition-all duration-700 ease-in-out">

        {/* VIEW: SINGLE ROW */}
        {layout === "single" && (
          <div
            className="max-w-[1000px] mx-auto grid grid-cols-1 gap-y-20 md:gap-y-32"
          >
            {artworks.map((art, index) => (
              <LazyGridItem key={art._id} rootMargin="1000px 0px" aspectRatio={art.aspectRatio} disabled={index < 12}>
                <motion.div
                  variants={staggerItem}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "600px" }}
                  className="w-full relative z-10"
                  style={{ willChange: "transform, opacity" }}
                >
                  <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline group/card">
                    <div className="w-full mx-auto flex flex-col items-center">
                      <div
                        className="w-full relative group/image"
                        style={{ maxWidth: `min(100%, calc(90vh * ${Math.max(art.aspectRatio || 1, 0.4)}))` }}
                      >
                        <MuseumFrame aspectRatio={art.aspectRatio} hasMat={showMat} className="w-full h-auto mx-auto">
                          {art.imageUrl && (
                            <div className="absolute inset-0 w-full h-full">
                              <Image
                                src={art.imageUrl}
                                alt={`Buy ${art.title} - Original Nepali fine art at Shakya Gallery`}
                                fill
                                priority={index < 4}
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
                        {/* STATUS BADGES */}
                        <div className="absolute inset-x-0 bottom-0 pointer-events-none p-4 md:p-6 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:bg-none">
                          {art.status === "sold" && (
                            <>
                              {/* Desktop Hover */}
                              <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                                <span className="font-serif font-bold italic text-3xl md:text-4xl text-white bg-[#7D1818] shadow-xl -rotate-12 tracking-widest px-6 py-2">
                                  SOLD
                                </span>
                                <span className="mt-16 font-sans text-white tracking-[0.2em] uppercase font-medium drop-shadow-md text-xs leading-relaxed">
                                  Looking for something similar?
                                </span>
                              </div>
                              {/* Mobile Persistent */}
                              <div className="md:hidden flex items-center justify-between w-full px-2">
                                <span className="font-serif font-bold italic text-[11px] text-white bg-[#7D1818] px-2 py-0.5 tracking-wider">
                                  SOLD
                                </span>
                              </div>
                            </>
                          )}
                          {art.status === "available" && (
                            <>
                              {/* Desktop Hover */}
                              <span className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 text-soft-black text-sm md:text-base font-sans tracking-[0.2em] px-6 py-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10 whitespace-nowrap">
                                {art.showPrice && art.price ? (
                                  <Price amount={art.price} />
                                ) : (
                                  <PriceOnRequest startingPrice={art.startingPrice} variant="badge" />
                                )}
                              </span>
                              {/* Mobile Persistent */}
                              <div className="md:hidden flex justify-center w-full">
                                <span className="bg-white/90 text-soft-black text-[10px] font-sans tracking-[0.1em] px-3 py-1 backdrop-blur-sm shadow-sm border border-soft-black/5 whitespace-nowrap">
                                  {art.showPrice && art.price ? (
                                    <Price amount={art.price} />
                                  ) : (
                                    <PriceOnRequest startingPrice={art.startingPrice} variant="minimal" className="gap-1" />
                                  )}
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="w-full md:max-w-[75%] mx-auto relative z-0 mt-6 md:mt-8 flex flex-col items-center text-center">
                        <MuseumPlaque
                          title={art.title}
                          artist={art.artist}
                          medium={art.material}
                          dimensions={art.dimensions}
                          year={art.year}
                          price={art.price}
                          showPrice={art.showPrice}
                          startingPrice={art.startingPrice}
                          showButton={true}
                          className=""
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </LazyGridItem>
            ))}
          </div>
        )}

        {/* VIEW: GRID (JS Masonry - 2 Columns) */}
        {layout === "grid" && (
          <div className="max-w-[1800px] mx-auto flex flex-row gap-4 md:gap-12 items-start">
            {/* Split into 2 columns for Desktop Masonry */}
            {[0, 1].map((colIndex) => (
              <div
                key={colIndex}
                className="flex-1 flex flex-col gap-4 md:gap-12 w-full"
              >
                {artworks
                  .filter((_, index) => index % 2 === colIndex)
                  .map((art, index) => {
                    const globalIndex = index * 2 + colIndex;
                    return (
                      <LazyGridItem key={art._id} rootMargin="1000px 0px" aspectRatio={art.aspectRatio} disabled={globalIndex < 12}>
                        <motion.div
                          variants={staggerItem}
                          initial="initial"
                          whileInView="animate"
                          viewport={{ once: true, margin: "600px" }}
                          className="w-full relative z-10"
                          style={{ willChange: "transform, opacity" }}
                        >
                          <Link href={`/artwork/${art.slug}`} className="block cursor-pointer no-underline group/card">
                            <div className="w-full mx-auto">
                              <div
                                className="w-full relative group/image mx-auto"
                                style={{ maxWidth: `min(100%, calc(90vh * ${Math.max(art.aspectRatio || 1, 0.4)}))` }}
                              >
                                {/* GRIDS: Use w-full h-auto. The grid-based frame will expand height naturally. */}
                                <SanityImage
                                  src={art.imageUrl}
                                  alt={art.title}
                                  lqip={art.lqip}
                                  aspectRatio={art.aspectRatio}
                                  hasMat={showMat}
                                  priority={globalIndex < 4}
                                  imageClassName={cn(
                                    (art.status === "sold" || art.status === "private")
                                      ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                                      : "grayscale-[0.2] group-hover/image:grayscale-0"
                                  )}
                                />
                                <div className="absolute inset-x-0 bottom-0 pointer-events-none p-4 md:p-6 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:bg-none">
                                  {art.status === "sold" && (
                                    <>
                                      {/* Desktop Only Center Hover */}
                                      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                                        <span className="font-serif font-bold italic text-3xl md:text-4xl text-white bg-[#7D1818] shadow-xl -rotate-12 tracking-widest px-6 py-2">
                                          SOLD
                                        </span>
                                        <span className="mt-16 font-sans text-white tracking-[0.2em] uppercase font-medium drop-shadow-md text-xs leading-relaxed">
                                          Looking for something similar?
                                        </span>
                                      </div>
                                      {/* Mobile Only Persistent Bottom */}
                                      <div className="md:hidden flex items-center justify-between w-full px-2">
                                        <span className="font-serif font-bold italic text-[11px] text-white bg-[#7D1818] px-2 py-0.5 tracking-wider">
                                          SOLD
                                        </span>
                                      </div>
                                    </>
                                  )}
                                  {art.status === "available" && (
                                    <>
                                      {/* Desktop Hover */}
                                      <span className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 text-soft-black text-sm md:text-base font-sans tracking-[0.2em] px-6 py-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10 whitespace-nowrap">
                                        {art.showPrice && art.price ? (
                                          <Price amount={art.price} />
                                        ) : (
                                          <PriceOnRequest startingPrice={art.startingPrice} variant="badge" />
                                        )}
                                      </span>
                                      {/* Mobile Persistent */}
                                      <div className="md:hidden flex justify-center w-full">
                                        <span className="bg-white/90 text-soft-black text-[10px] font-sans tracking-[0.1em] px-3 py-1 backdrop-blur-sm shadow-sm border border-soft-black/5 whitespace-nowrap">
                                          {art.showPrice && art.price ? (
                                            <Price amount={art.price} />
                                          ) : (
                                            <PriceOnRequest startingPrice={art.startingPrice} variant="minimal" className="gap-1" />
                                          )}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="w-full relative z-0 mt-6 md:mt-8 flex flex-col items-center text-center">
                                <MuseumPlaque
                                  title={art.title}
                                  artist={art.artist}
                                  medium={art.material}
                                  dimensions={art.dimensions}
                                  year={art.year}
                                  price={art.price}
                                  showPrice={art.showPrice}
                                  startingPrice={art.startingPrice}
                                  showButton={true}
                                  className=""
                                />
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      </LazyGridItem>
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE FALLBACK */}
        {artworks.length === 0 && (
          <EmptyState />
        )}

      </div >
    </>
  );
}
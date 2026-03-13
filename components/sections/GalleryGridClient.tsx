"use client";

import { useState, useRef, useEffect } from "react";
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
import { Artwork } from "@/lib/types";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";

import { staggerContainer, staggerItem } from "@/lib/motion-variants";

// --- ICONS ---
const FrameIcon = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <rect
      x="4"
      y="4"
      width="10"
      height="10"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />
  </svg>
);

const CanvasIcon = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="1"
      y="1"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  const [layout, setLayout] = useState<"grid" | "single">("single");
  const [showMat, setShowMat] = useState(true);
  const [isStuck, setIsStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the sentinel is NOT intersecting, it means the sticky element has reached the top
        setIsStuck(!entry.isIntersecting);
      },
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* SENTINEL FOR STICKY DETECTION */}
      <div ref={sentinelRef} className="h-0 w-full" />
      {/* ... toggle bar - Hidden on mobile, visible on desktop ... */}
      <div
        className={cn(
          "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-500 mb-12 hidden md:block py-4",
          isStuck
            ? "bg-bone/40 backdrop-blur-md border-b border-black/[0.03]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="flex justify-between max-w-[1800px] mx-auto px-8">
          <div className="flex gap-4 md:gap-8">
            <button
              onClick={() => setShowMat(true)}
              className={cn(
                "flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                showMat
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black",
              )}
            >
              <FrameIcon />
              <span className="hidden sm:inline">View with Frame</span>
              {showMat && (
                <motion.div
                  layoutId="grid-active-mat"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                />
              )}
            </button>
            <button
              onClick={() => setShowMat(false)}
              className={cn(
                "flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                !showMat
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black",
              )}
            >
              <CanvasIcon />
              <span className="hidden sm:inline">Canvas Only</span>
              {!showMat && (
                <motion.div
                  layoutId="grid-active-mat"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                />
              )}
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
                  : "text-gray-400 hover:text-soft-black",
              )}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Grid View</title>
                <rect
                  x="1"
                  y="1"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="10"
                  y="1"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="10"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="10"
                  y="10"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="hidden sm:inline">Grid</span>
              {layout === "grid" && (
                <motion.div
                  layoutId="grid-active-layout"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                />
              )}
            </button>
            <button
              onClick={() => setLayout("single")}
              className={cn(
                "flex items-center gap-2 font-sans text-[10px] tracking-[0.25em] uppercase transition-all duration-300 py-1 relative",
                layout === "single"
                  ? "text-soft-black font-semibold"
                  : "text-gray-400 hover:text-soft-black",
              )}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Row View</title>
                <rect
                  x="1"
                  y="2"
                  width="16"
                  height="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="7.5"
                  width="16"
                  height="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="13"
                  width="16"
                  height="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="hidden sm:inline">Rows</span>
              {layout === "single" && (
                <motion.div
                  layoutId="grid-active-layout"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* THE OUTER GRID */}
      <div className="mx-auto px-6 pb-8 transition-all duration-700 ease-in-out">
        {/* VIEW: SINGLE ROW */}
        {layout === "single" && (
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-y-20 md:gap-y-32">
            {artworks.map((art, index) => (
              <ArtworkCard
                key={art._id}
                art={art}
                globalIndex={index}
                showMat={showMat}
                layout="single"
              />
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
                      <ArtworkCard
                        key={art._id}
                        art={art}
                        globalIndex={globalIndex}
                        showMat={showMat}
                        layout="grid"
                      />
                    );
                  })}
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE FALLBACK */}
        {artworks.length === 0 && <EmptyState />}
      </div>
    </>
  );
}

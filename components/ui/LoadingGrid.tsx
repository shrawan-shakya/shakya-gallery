"use client";

import { motion } from "framer-motion";
import { MuseumFrameSkeleton } from "./MuseumFrameSkeleton";

export function LoadingGrid() {
  return (
    <div className="flex gap-8 lg:gap-12 items-start w-full">
      {[...Array(3)].map((_, colIndex) => (
        <div
          key={colIndex}
          className={`flex-1 flex flex-col gap-12 lg:gap-16 ${colIndex === 2 ? "hidden lg:flex" : ""}`}
        >
          {[...Array(colIndex === 1 ? 4 : 3)].map((_, itemIndex) => (
            <div key={itemIndex} className="relative w-full">
              <MuseumFrameSkeleton
                aspectRatio={(itemIndex + colIndex) % 2 === 0 ? 0.8 : 1}
              />

              {/* Museum Plaque Skeleton */}
              <div className="mt-8 flex flex-col items-center">
                <div className="h-4 bg-black/5 animate-pulse w-3/4 mb-4" />
                <div className="h-3 bg-black/5 animate-pulse w-1/2 mb-2 opacity-60" />
                <div className="h-[1px] bg-black/10 w-8 my-3" />
                <div className="h-2 bg-black/5 animate-pulse w-1/3 opacity-40" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

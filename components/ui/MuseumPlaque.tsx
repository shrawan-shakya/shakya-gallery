"use client";

import { cn } from "@/lib/utils";
import { PriceOnRequest } from "./PriceOnRequest";

interface MuseumPlaqueProps {
  title: string;
  artist?: string;
  medium?: string;
  dimensions?: string;
  year?: string;
  price?: number;
  showPrice?: boolean;
  startingPrice?: number;
  showButton?: boolean;
  showMedium?: boolean;
  className?: string;
}

export function MuseumPlaque({
  title,
  artist = "Unknown Master",
  medium = "Mixed Media",
  dimensions,
  year,
  price,
  showPrice,
  startingPrice,
  showButton = true,
  showMedium = true,
  className
}: MuseumPlaqueProps) {
  const isSold = false; // We can pass this as a prop if needed, or infer from context
  return (
    <div
      className={cn(
        "relative mx-auto text-center z-40 group",
        "bg-[linear-gradient(135deg,#F8F8F8_0%,#FFFFFF_50%,#EBEBEB_100%)]",
        "border-[0.5px] border-[#D8D8D8]",
        "shadow-[0_10px_25px_rgba(0,0,0,0.06)]",
        // UPDATED: Constant 80% proportional width
        "px-2 py-3 md:px-8 md:py-6 w-[80%]",
        "overflow-hidden isolation-auto backface-hidden",
        className
      )}
    >
      {/* Light Sweep */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute top-0 -left-[150%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-25deg] transition-all duration-1000 ease-in-out group-hover:left-[150%]" />
      </div>

      {/* 4 Metallic Knots */}
      <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_1px_rgba(0,0,0,0.1)]" />
      <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_1px_rgba(0,0,0,0.1)]" />
      <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_1px_rgba(0,0,0,0.1)]" />
      <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_1px_rgba(0,0,0,0.1)]" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center gap-1.5">

        {/* Artist */}
        <h3 className="font-sans text-[8px] md:text-[10px] tracking-[0.2em] md:tracking-[0.45em] uppercase text-[#666666] font-semibold whitespace-nowrap">
          {artist}
        </h3>

        {/* Title */}
        <h3 className="font-serif text-sm md:text-xl text-[#1A1A1A] font-bold italic leading-tight my-0.5 line-clamp-2">
          {title}
        </h3>

        {/* Medium */}
        {showMedium && (
          <p className="font-sans text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-[#444444] font-medium">
            {medium}
          </p>
        )}

        {/* Separator */}
        <div className="w-[15px] md:w-[30px] h-[0.5px] bg-[#BBBBBB] my-1" />

        {/* Year */}
        <p className="font-sans text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] uppercase text-[#444444] font-medium">
          {dimensions ? `${dimensions} • ` : ""}{year}
        </p>

        {/* Pricing */}
        <div className="mt-1">
          {showPrice && price ? (
            <p className="font-sans text-[10px] md:text-sm text-[#1A1A1A] font-bold">
              ${price.toLocaleString()}
            </p>
          ) : (
            <PriceOnRequest startingPrice={startingPrice} variant="plaque" />
          )}
        </div>

        {/* Button */}
        {showButton && (
          <button className="mt-2 md:mt-4 px-4 py-1 md:px-6 md:py-1.5 border border-soft-black/20 hover:border-soft-black hover:bg-soft-black hover:text-white transition-all duration-300 bg-transparent group/btn w-auto min-w-[100px] flex items-center justify-center mx-auto">
            <span className="font-sans text-[8px] md:text-[10px] tracking-[0.15em] md:tracking-[0.2em] uppercase text-soft-black group-hover/btn:text-white transition-colors font-medium ml-1">
              Inquire
            </span>
          </button>
        )}

      </div>
    </div>
  );
}
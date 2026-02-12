import React from "react";
import { cn } from "@/lib/utils";

// Define the interface to explicitly include aspectRatio
interface MuseumFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  aspectRatio?: number;
}

export function MuseumFrame({
  children,
  className,
  aspectRatio, // Destructured here to prevent it from leaking to the DOM via ...props
  ...props
}: MuseumFrameProps) {
  return (
    <div
      className={cn("relative group select-none w-full h-full flex flex-col", className)}
      style={{ aspectRatio }}
      {...props} // Now only contains valid HTML attributes
    >
      {/* 1. The Outer Frame (Ebony) */}
      <div className="relative bg-frame-ebony p-[8px] md:p-[14px] shadow-museum w-full flex-1 flex flex-col">

        {/* 2. The Gold Fillet (Inner Border) */}
        <div className="border border-frame-gold w-full flex-1 flex flex-col p-[1.5px] shadow-gold-glow">

          {/* 3. The Matting (Bone White) */}
          <div className="bg-[#FCFCFC] p-[12px] md:p-[20px] shadow-inner-mat relative flex-1 flex flex-col transition-all duration-300">

            {/* 4. Artwork Container */}
            <div className="relative w-full flex-1 bg-gray-200 overflow-hidden shadow-sm">
              {children}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { cn } from "@/lib/utils";

interface MuseumFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  aspectRatio?: number;
  hasMat?: boolean;
}

export function MuseumFrame({
  children,
  className,
  aspectRatio = 1,
  hasMat = true,
  ...props
}: MuseumFrameProps) {
  // GOD-TIER ARCHITECTURE: "Subgrid Dimensionality"
  // Using Grid for all layers allows dimensions to flow in BOTH directions.

  const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!hasMat) return <>{children}</>;

    return (
      /* 1. The Outer Frame (Ebony Gradient + Bevel) */
      <div className="grid p-[8px] md:p-[20px] 
        bg-gradient-to-br from-[#2d2d2d] via-[#111111] to-[#050505]
        shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_1px_1px_0px_rgba(255,255,255,0.15),inset_-1px_-1px_0px_rgba(0,0,0,0.5)]"
      >
        {/* 2. The Gold Fillet (Metallic Gradient) */}
        <div className="grid p-[2px] shadow-sm
          bg-gradient-to-tr from-[#997b3a] via-[#fcf6ba] to-[#aa771c]"
        >
          {/* 3. The Matting (With Deep Inner Shadow) */}
          <div className="relative grid bg-[#FCFCFC] p-[4px] md:p-[16px] shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] transition-all duration-300">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative group select-none grid",
        className
      )}
      {...props}
    >
      <FrameWrapper>
        {/* 4. Artwork Container (The Master Proportions) */}
        <div
          className="relative bg-[#F9F9F9] overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] w-full h-full"

          style={{ aspectRatio }}
        >
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full">
              {children}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>
      </FrameWrapper>
    </div>
  );
}
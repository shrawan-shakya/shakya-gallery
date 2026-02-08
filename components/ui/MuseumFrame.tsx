import React from "react";
import { cn } from "@/lib/utils";

interface MuseumFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  aspectRatio?: number; 
  className?: string;
}

export function MuseumFrame({ 
  children, 
  aspectRatio = 1, 
  className,
  ...props 
}: MuseumFrameProps) {
  return (
    <div 
      className={cn(
        "relative group select-none w-full h-full", 
        className
      )}
      {...props}
    >
      {/* 1. The Outer Frame (Ebony Wood) - GOLDEN RATIO: Frame Thickness */}
      {/* Mobile: 8px | Desktop: 14px */}
      <div className="relative bg-frame-base p-[8px] md:p-[14px] shadow-museum rounded-[1px] h-full transition-all duration-300">
        
        {/* 2. The Silver Fillet (Outer) */}
        <div className="border border-accent/20 h-full w-full flex flex-col">
          
          {/* 3. The Museum Matting (Bone White) - GOLDEN RATIO: Mat Width */}
          {/* Mobile: 13px | Desktop: 23px (Exactly 1.618x the frame) */}
          <div className="bg-[#FCFCFC] p-[13px] md:p-[23px] shadow-inner-mat relative flex-grow flex flex-col transition-all duration-300">
            
            {/* 4. The Inner Bevel (Silver Fillet Inner) */}
            <div className="border border-accent/30 p-[1px] flex-grow relative w-full flex flex-col justify-center">
              
              {/* 5. The Artwork Container */}
              <div 
                 className="relative w-full overflow-hidden bg-gray-200"
                 style={{ aspectRatio: aspectRatio }}
              >
                {children}
                
                {/* Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
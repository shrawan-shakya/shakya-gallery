import React from "react";
import { cn } from "@/lib/utils";

interface MuseumFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  // Changed: Now accepts a specific number number (e.g., 0.75 for portrait, 1.5 for landscape)
  aspectRatio?: number; 
  className?: string;
}

export function MuseumFrame({ 
  children, 
  aspectRatio = 1, // Default to square if data is missing
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
      {/* 1. The Outer Frame (Ebony Wood) */}
      <div className="relative bg-frame-base p-[12px] shadow-museum rounded-[1px] h-full">
        
        {/* 2. The Silver Fillet (Outer) */}
        <div className="border border-accent/20 h-full w-full flex flex-col">
          
          {/* 3. The Museum Matting (Bone White) */}
          <div className="bg-[#FCFCFC] p-6 md:p-8 shadow-inner-mat relative flex-grow flex flex-col">
            
            {/* 4. The Inner Bevel (Silver Fillet Inner) */}
            <div className="border border-accent/30 p-[1px] flex-grow relative w-full">
              
              {/* 5. The Artwork Container - NOW DYNAMIC */}
              {/* We use inline styles because the ratio changes for every single image */}
              <div 
                 className="relative w-full overflow-hidden bg-gray-200"
                 style={{ aspectRatio: aspectRatio }}
              >
                {children}
                
                {/* Glass Reflection Overlay (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
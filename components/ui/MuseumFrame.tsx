import React from "react";
import { cn } from "@/lib/utils";

// Define the interface to explicitly include aspectRatio
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
  return (
    <div
      className={cn("relative group select-none w-full h-full flex flex-col", className)}
      style={{ aspectRatio }}
      {...props}
    >
      {/* 1. The Outer Frame (Ebony Gradient + Bevel) */}
      <div className="relative w-full flex-1 flex flex-col p-[8px] md:p-[22px]
        bg-gradient-to-br from-[#2d2d2d] via-[#111111] to-[#050505]
        shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_1px_1px_0px_rgba(255,255,255,0.15),inset_-1px_-1px_0px_rgba(0,0,0,0.5)]"
      >

        {/* 2. The Gold Fillet (Metallic Gradient) */}
        <div className="w-full flex-1 flex flex-col p-[2px] shadow-sm
          bg-gradient-to-tr from-[#997b3a] via-[#fcf6ba] to-[#aa771c]"
        >

          {/* 3. The Matting (With Deep Inner Shadow) */}
          <div className={cn(
            "relative flex-1 flex flex-col transition-all duration-300",
            hasMat ? "bg-[#FCFCFC] p-[4px] md:p-[20px] shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]" : "bg-transparent p-0"
          )}>

            {/* 4. Artwork Container (With Bevel Shadow) */}
            <div className="relative w-full flex-1 bg-gray-200 overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)]">
              {children}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
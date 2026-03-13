import React from "react";
import { cn } from "@/lib/utils";

interface MuseumFrameSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: number;
  hasMat?: boolean;
}

export function MuseumFrameSkeleton({
  className,
  aspectRatio = 1,
  hasMat = true,
  ...props
}: MuseumFrameSkeletonProps) {
  const FrameWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!hasMat) return <>{children}</>;

    return (
      <div
        className="grid p-[8px] md:p-[20px] 
        bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] animate-pulse
        shadow-[0_15px_30px_rgba(0,0,0,0.5),inset_1px_1px_0px_rgba(255,255,255,0.15),inset_-1px_-1px_0px_rgba(0,0,0,0.5)]"
      >
        <div
          className="grid p-[2px] shadow-sm
          bg-gradient-to-tr from-[#8a6e34] via-[#e6dfa8] to-[#996b19] animate-pulse"
        >
          <div className="relative grid bg-bone animate-pulse p-[4px] md:p-[16px] shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] transition-all duration-300">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("relative select-none grid", className)} {...props}>
      <FrameWrapper>
        <div
          className="relative bg-bone-dark animate-pulse overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] w-full h-full"
          style={{ aspectRatio }}
        />
      </FrameWrapper>
    </div>
  );
}

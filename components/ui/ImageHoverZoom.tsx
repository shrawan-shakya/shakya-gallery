"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageHoverZoomProps {
  src: string;
  alt: string;
  aspectRatio: number;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  zoomScale?: number;
}

export function ImageHoverZoom({
  src,
  alt,
  aspectRatio,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  zoomScale = 2.5,
}: ImageHoverZoomProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden cursor-crosshair group/zoom w-full h-full",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* BASE IMAGE */}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100",
          imageClassName,
        )}
        priority={priority}
        sizes={sizes}
      />

      {/* ZOOMED LAYER */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                backgroundSize: `${zoomScale * 100}%`,
                backgroundRepeat: "no-repeat",
              }}
            />

            {/* LUXURY OVERLAY: Subtle vignette to focus on the zoomed area */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FALLBACK/LOADING STATE OVERLAY */}
      <div className="absolute inset-0 bg-bone/5 pointer-events-none" />
    </div>
  );
}

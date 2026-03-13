"use client";

import Image from "next/image";
import { MuseumFrame } from "./MuseumFrame";
import { cn } from "@/lib/utils";

import { urlForImage } from "@/sanity/lib/image";

interface SanityImageProps {
    source: any;
    alt: string;
    lqip?: string;
    aspectRatio: number;
    hasMat?: boolean;
    priority?: boolean;
    sizes?: string;
    className?: string;
    imageClassName?: string;
}

/**
 * SanityImage component with luxury blur-up effect.
 * Integrates MuseumFrame with Sanity's image pipeline for a premium experience.
 */
export function SanityImage({
    source,
    alt,
    lqip,
    aspectRatio,
    hasMat = true,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className,
    imageClassName,
}: SanityImageProps) {
    // Generate optimized URL with a reasonable max width for high-density screens
    const imageUrl = source 
        ? urlForImage(source).auto('format').width(2000).url() 
        : null;

    return (
        <MuseumFrame
            className={cn("h-auto", className)}
            hasMat={hasMat}
            aspectRatio={aspectRatio}
        >
            <div className="relative w-full h-full overflow-hidden">
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={alt}
                        fill
                        priority={priority}
                        sizes={sizes}
                        placeholder={lqip ? "blur" : "empty"}
                        blurDataURL={lqip}
                        className={cn(
                            "object-cover transition-all duration-700 ease-out",
                            imageClassName
                        )}
                    />
                )}
            </div>
        </MuseumFrame>
    );
}

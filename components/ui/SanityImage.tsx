"use client";

import Image from "next/image";
import { MuseumFrame } from "./MuseumFrame";
import { cn } from "@/lib/utils";

interface SanityImageProps {
    src: string;
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
 * Integrates MuseumFrame with Sanity's LQIP for a premium loading experience.
 */
export function SanityImage({
    src,
    alt,
    lqip,
    aspectRatio,
    hasMat = true,
    priority = false,
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    className,
    imageClassName,
}: SanityImageProps) {
    return (
        <MuseumFrame
            className={cn("h-auto", className)}
            hasMat={hasMat}
            aspectRatio={aspectRatio}
        >
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={src}
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
            </div>
        </MuseumFrame>
    );
}

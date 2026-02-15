"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageType {
    url: string;
    aspectRatio: number;
}

interface ArtworkGalleryProps {
    mainImage: ImageType;
    relatedImages: ImageType[] | null;
    title: string;
}

export function ArtworkGallery({ mainImage, relatedImages, title }: ArtworkGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Combine main image and related images into one array for the gallery
    const allImages = [mainImage, ...(relatedImages || [])];
    const currentImage = allImages[currentIndex];

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* MAIN STAGE */}
            <div className="relative w-full">
                {/* The Frame adjusts to the CURRENT image's aspect ratio to avoid cropping */}
                {/* The Frame adjusts to the CURRENT image's aspect ratio to avoid cropping */}
                <div className="relative w-full transition-all duration-500 ease-in-out">
                    {currentIndex === 0 ? (
                        <MuseumFrame aspectRatio={currentImage.aspectRatio}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={currentImage.url}
                                        alt={`${title} - view ${currentIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </MuseumFrame>
                    ) : (
                        <div
                            className="relative w-full bg-bone shadow-md"
                            style={{ aspectRatio: currentImage.aspectRatio }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={currentImage.url}
                                        alt={`${title} - view ${currentIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Navigation Arrows (Only if multiple images) */}
                {allImages.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-soft-black backdrop-blur-sm transition-all shadow-sm opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-soft-black backdrop-blur-sm transition-all shadow-sm opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>

            {/* THUMBNAIL STRIP */}
            {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`relative flex-none w-20 h-20 overflow-hidden rounded-sm transition-all duration-300 border-2
                ${currentIndex === idx
                                    ? "border-soft-black opacity-100 ring-1 ring-soft-black/20"
                                    : "border-transparent opacity-60 hover:opacity-100"
                                }
              `}
                        >
                            <Image
                                src={img.url}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion-variants";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ImageType {
    url: string;
    aspectRatio: number;
}

interface MediaLightboxProps {
    isOpen: boolean;
    onClose: () => void;
    images: ImageType[];
    initialIndex: number;
    title: string;
}

export function MediaLightbox({
    isOpen,
    onClose,
    images,
    initialIndex,
    title
}: MediaLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, initialIndex]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
    }, [isOpen, onClose, handleNext, handlePrev]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed inset-0 z-[200] bg-soft-black/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
                >
                    <TransformWrapper
                        initialScale={1}
                        minScale={0.8}
                        maxScale={4}
                        centerOnInit={true}
                        wheel={{ step: 0.1 }}
                        doubleClick={{ step: 1.5 }}
                    >
                        {({ zoomIn, zoomOut, resetTransform }) => (
                            <>
                                {/* Top Bar */}
                                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
                                    <div className="flex flex-col">
                                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                                            Viewing Artwork
                                        </span>
                                        <span className="font-serif italic text-xl text-white">
                                            {title}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 z-[250]">
                                        <span className="hidden md:block font-sans text-[11px] tracking-widest text-white/40 uppercase">
                                            {currentIndex + 1} / {images.length}
                                        </span>
                                        {/* Zoom buttons removed for a more minimal layout */}
                                        <button
                                            onClick={onClose}
                                            className="text-white/60 hover:text-white transition-colors p-2"
                                            aria-label="Close Lightbox"
                                        >
                                            <X size={24} strokeWidth={1} />
                                        </button>
                                    </div>
                                </div>

                                {/* Main Content Area */}
                                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.05 }}
                                            transition={{ duration: 0.6, ease: LUXURY_EASE }}
                                            className="relative w-full h-full flex items-center justify-center select-none"
                                            onAnimationComplete={() => resetTransform()}
                                        >
                                            <TransformComponent
                                                wrapperClass="!w-full !h-full"
                                                contentClass="!w-full !h-full flex items-center justify-center"
                                            >
                                                <div
                                                    className="relative shadow-2xl overflow-hidden cursor-zoom-in active:cursor-grabbing"
                                                    style={{
                                                        width: currentImage.aspectRatio > 1 ? '90vw' : 'auto',
                                                        height: currentImage.aspectRatio > 1 ? 'auto' : '85vh',
                                                        maxWidth: currentImage.aspectRatio > 1 ? '1200px' : 'none',
                                                        maxHeight: currentImage.aspectRatio > 1 ? 'none' : '1000px',
                                                        aspectRatio: currentImage.aspectRatio
                                                    }}
                                                >
                                                    <Image
                                                        src={currentImage.url}
                                                        alt={`${title} - View ${currentIndex + 1}`}
                                                        fill
                                                        className="object-contain pointer-events-none"
                                                        priority
                                                        quality={100}
                                                        sizes="100vw"
                                                    />
                                                </div>
                                            </TransformComponent>
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Navigation Controls */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePrev();
                                                }}
                                                className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={32} strokeWidth={1} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleNext();
                                                }}
                                                className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-sm"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight size={32} strokeWidth={1} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </TransformWrapper>

                    {/* Bottom Indicator (Mobile) */}
                    <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-50">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-1 h-1 rounded-full transition-all duration-300",
                                    i === currentIndex ? "bg-white w-4" : "bg-white/30"
                                )}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}


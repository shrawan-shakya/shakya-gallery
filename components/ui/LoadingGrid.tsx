"use client";

import { motion } from "framer-motion";

export function LoadingGrid() {
    return (
        <div className="flex gap-8 lg:gap-12 items-start w-full">
            {[...Array(3)].map((_, colIndex) => (
                <div key={colIndex} className={`flex-1 flex flex-col gap-12 lg:gap-16 ${colIndex === 2 ? 'hidden lg:flex' : ''}`}>
                    {[...Array(colIndex === 1 ? 4 : 3)].map((_, itemIndex) => (
                        <div key={itemIndex} className="relative w-full">
                            {/* Frame Outline (Matches MuseumFrame aesthetic) */}
                            <div className="p-[1px] bg-black/5">
                                <div className="bg-bone-dark/50 p-6 md:p-12 relative">
                                    {/* Image Skeleton with varying heights */}
                                    <div
                                        className="bg-black/5 animate-pulse w-full relative overflow-hidden"
                                        style={{
                                            aspectRatio: (itemIndex + colIndex) % 2 === 0 ? "4/5" : "1/1",
                                            opacity: 1 - (itemIndex * 0.15)
                                        }}
                                    >
                                        {/* Shimmer effect */}
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Museum Plaque Skeleton */}
                            <div className="mt-8 flex flex-col items-center">
                                <div className="h-4 bg-black/5 animate-pulse w-3/4 mb-4" />
                                <div className="h-3 bg-black/5 animate-pulse w-1/2 mb-2 opacity-60" />
                                <div className="h-[1px] bg-black/10 w-8 my-3" />
                                <div className="h-2 bg-black/5 animate-pulse w-1/3 opacity-40" />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { Artwork } from "@/lib/types";

import { SanityImage } from "@/components/ui/SanityImage";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { Price } from "@/components/ui/Price";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";

interface FeaturedCollectionProps {
    artworks: Artwork[];
    heading: string;
}

export function FeaturedCollection({ artworks, heading }: FeaturedCollectionProps) {
    // Show only top 4 as featured
    const featured = artworks.slice(0, 4);

    return (
        <div className="py-12 animate-in fade-in duration-1000">
            <div className="max-w-2xl mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-soft-black mb-6 leading-tight">
                    {heading}
                </h2>
                <div className="h-px w-20 bg-soft-black/20" />
            </div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
                {featured.map((art) => (
                    <motion.div key={art._id} variants={staggerItem}>
                        <Link href={`/artwork/${art.slug}`} className="group block">
                            <div className="relative mb-4">
                                <SanityImage
                                    src={art.imageUrl}
                                    alt={art.title}
                                    lqip={art.lqip}
                                    aspectRatio={art.aspectRatio}
                                    hasMat={true}
                                    className="w-full"
                                />
                                {art.status === "available" && art.showPrice && art.price && (
                                    <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 text-soft-black text-sm md:text-base font-sans tracking-[0.2em] px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10">
                                        <Price amount={art.price} />
                                    </span>
                                )}
                            </div>
                            <h3 className="font-serif text-lg text-soft-black group-hover:text-gray-600 transition-colors">
                                {art.title}
                            </h3>
                            <p className="font-sans text-[10px] tracking-widest text-gray-400 uppercase mt-1 flex justify-between items-baseline">
                                <span>{art.artist}</span>
                                {!art.showPrice && (
                                    <PriceOnRequest startingPrice={art.startingPrice} variant="minimal" className="mt-1" />
                                )}
                            </p>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

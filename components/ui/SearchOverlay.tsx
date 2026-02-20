"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { searchArtworks, SearchResult } from "@/app/actions/search";

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Debounce logic
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length >= 2) {
                setIsSearching(true);
                try {
                    const data = await searchArtworks(query);
                    setResults(data);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setResults([]);
            }
        }, 300); // 300ms delay

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    // Clear query on close
    useEffect(() => {
        if (!isOpen) {
            setQuery("");
            setResults([]);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[60] bg-bone/95 backdrop-blur-sm flex flex-col"
                >
                    {/* Header (Close Button) */}
                    <div className="flex justify-end p-6 md:p-12">
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center relative group"
                        >
                            <span className="absolute w-8 h-[1px] bg-soft-black rotate-45 transition-colors duration-300 group-hover:bg-soft-black/60" />
                            <span className="absolute w-8 h-[1px] bg-soft-black -rotate-45 transition-colors duration-300 group-hover:bg-soft-black/60" />
                        </button>
                    </div>

                    {/* Search Container */}
                    <div className="flex-grow flex flex-col max-w-5xl mx-auto w-full px-6 md:px-12">

                        {/* Input Field */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="relative mb-12"
                        >
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search artists, titles, or styles..."
                                className="w-full bg-transparent border-b-2 border-soft-black/20 text-3xl md:text-5xl lg:text-6xl font-serif text-soft-black placeholder:text-soft-black/30 py-4 focus:outline-none focus:border-soft-black transition-colors"
                                autoFocus
                            />
                            {isSearching && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-8 h-8 animate-spin text-soft-black/50" />
                                </div>
                            )}
                        </motion.div>

                        {/* Results Grid */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar pb-20">
                            {results.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {results.map((art, i) => (
                                        <motion.div
                                            key={art._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Link
                                                href={`/artwork/${art.slug.current}`}
                                                onClick={onClose}
                                                className="group flex gap-4 items-start"
                                            >
                                                {/* Thumbnail */}
                                                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden bg-gray-100">
                                                    {art.mainImage && (
                                                        <Image
                                                            src={urlFor(art.mainImage).width(200).height(200).url()}
                                                            alt={art.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    )}
                                                </div>

                                                {/* Text Info */}
                                                <div className="flex flex-col">
                                                    <h3 className="font-serif text-xl text-soft-black group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                                                        {art.title}
                                                    </h3>
                                                    <p className="text-sm text-soft-black/60 uppercase tracking-wider mt-1">
                                                        {art.artist}
                                                    </p>
                                                    <p className="text-xs text-soft-black/40 mt-1 capitalize">
                                                        {art.status}
                                                    </p>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                // Empty State / Suggestions
                                query.length < 2 && (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 opacity-50">
                                        <div>
                                            <h4 className="font-serif text-xl mb-4 text-soft-black">Trending</h4>
                                            <ul className="space-y-2">
                                                <li className="text-sm uppercase tracking-widest cursor-pointer hover:text-soft-black/70">Abstract</li>
                                                <li className="text-sm uppercase tracking-widest cursor-pointer hover:text-soft-black/70">Landscapes</li>
                                                <li className="text-sm uppercase tracking-widest cursor-pointer hover:text-soft-black/70">Portraits</li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            )}

                            {query.length >= 2 && results.length === 0 && !isSearching && (
                                <p className="text-xl text-soft-black/50 font-serif italic">
                                    No artworks found for "{query}".
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

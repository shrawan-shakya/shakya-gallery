"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";

type Artwork = {
  _id: string;
  title: string;
  artist?: string;
  year?: string;
  slug: string;
  imageUrl: string;
  aspectRatio: number;
  status?: "available" | "sold" | "private";
  price?: number;
  categories?: string[]; // <--- Array of category names
};

export function GalleryGridClient({ artworks }: { artworks: Artwork[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // 1. AUTOMATICALLY GENERATE CATEGORY LIST
  // We look at all artworks, grab their categories, remove duplicates, and add "All" at the start.
  const categories = useMemo(() => {
    const allTags = artworks.flatMap((art) => art.categories || []);
    // 'Set' removes duplicates automatically
    return ["All", ...Array.from(new Set(allTags))];
  }, [artworks]);

  // 2. FILTER LOGIC
  const filteredArtworks = artworks.filter((art) => {
    // If "All" is selected, show everything
    if (activeCategory === "All") return true;
    // Otherwise, check if the artwork has the selected category tag
    return art.categories?.includes(activeCategory);
  });

  return (
    <div className="max-w-[1600px] mx-auto">
      
      {/* FILTER BAR (Scrollable on mobile) */}
      <div className="w-full overflow-x-auto pb-4 mb-12 no-scrollbar">
        <div className="flex justify-center min-w-max px-6 gap-8 md:gap-12 border-b border-black/5 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase transition-all duration-500 relative flex-shrink-0
                ${activeCategory === category ? "text-soft-black" : "text-gray-400 hover:text-gray-600"}
              `}
            >
              {category}
              {/* Active Dot Animation */}
              {activeCategory === category && (
                <motion.span 
                  layoutId="activeFilter"
                  className="absolute -bottom-5 left-1/2 w-1 h-1 bg-soft-black rounded-full -translate-x-1/2"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* THE GRID */}
      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art) => (
            <motion.div
              layout
              key={art._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col items-center"
            >
              <Link href={`/artwork/${art.slug}`} className="w-full">
                <div className="relative">
                  {/* FRAME */}
                  <MuseumFrame aspectRatio={art.aspectRatio}>
                    {art.imageUrl && (
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105
                          ${(art.status === "sold" || art.status === "private") ? "grayscale opacity-80" : ""}
                        `}
                      />
                    )}
                  </MuseumFrame>

                  {/* LABELS (Sold / Price) */}
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    
                    {/* SOLD TAG */}
                    {(art.status === "sold" || art.status === "private") && (
                      <span className="bg-red-900/90 text-white text-[8px] uppercase tracking-widest px-3 py-1.5 backdrop-blur-md">
                        Sold
                      </span>
                    )}

                    {/* PRICE TAG (Only if available & has price) */}
                    {art.status === "available" && art.price && (
                      <span className="bg-white/90 text-soft-black text-[9px] font-sans tracking-widest px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-sm">
                        ${art.price.toLocaleString()}
                      </span>
                    )}
                  </div>

                </div>

                {/* TEXT INFO */}
                <div className="mt-6 text-center space-y-1">
                  <h3 className="font-serif text-2xl text-soft-black group-hover:italic transition-all">
                    {art.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <p className="font-sans text-[10px] tracking-widest text-gray-500 uppercase">
                      {art.artist || "Unknown Master"} {art.year && `— ${art.year}`}
                    </p>
                    
                    {/* Categories (Small text below artist) */}
                    {art.categories && art.categories.length > 0 && (
                      <p className="font-sans text-[8px] tracking-widest text-gray-300 uppercase">
                        {art.categories.join(" • ")}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* EMPTY STATE */}
      {filteredArtworks.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-xl italic text-gray-400">
            No works found in this category.
          </p>
          <button 
            onClick={() => setActiveCategory("All")} 
            className="mt-4 font-sans text-xs tracking-widest text-soft-black underline"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
}
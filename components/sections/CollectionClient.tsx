"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";

// --- TYPES ---
type Category = {
  title: string;
  type: "style" | "subject" | "medium" | "collection";
};

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
  categories?: string[]; // Array of category titles
  dimensions?: string;
  material?: string;
};

export function CollectionClient({ 
  artworks, 
  allCategories 
}: { 
  artworks: Artwork[], 
  allCategories: Category[] 
}) {
  
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "sold">("all");
  const [sortOption, setSortOption] = useState<"newest" | "price_asc" | "price_desc">("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // --- FILTER LOGIC ---
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        // 1. Search (Title or Artist)
        const matchSearch = 
          art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          art.artist?.toLowerCase().includes(searchQuery.toLowerCase());
        
        // 2. Category Filter
        const matchCategory = selectedCategory 
          ? art.categories?.includes(selectedCategory) 
          : true;

        // 3. Status Filter
        const matchStatus = 
          statusFilter === "all" ? true :
          statusFilter === "available" ? art.status === "available" :
          (art.status === "sold" || art.status === "private");

        return matchSearch && matchCategory && matchStatus;
      })
      .sort((a, b) => {
        // 4. Sorting
        if (sortOption === "price_asc") return (a.price || 0) - (b.price || 0);
        if (sortOption === "price_desc") return (b.price || 0) - (a.price || 0);
        return 0; // Default is newest (as passed from Sanity order)
      });
  }, [artworks, searchQuery, selectedCategory, statusFilter, sortOption]);

  // --- CATEGORY GROUPING ---
  // Group categories by type (Style, Subject, etc.) for the sidebar
  const categoriesByType = allCategories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat.title);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">
      
      {/* MOBILE FILTER TOGGLE */}
      <div className="lg:hidden mb-8 flex justify-between items-center sticky top-24 z-30 bg-bone/90 backdrop-blur-md py-4 border-b border-black/5">
        <button 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="font-sans text-xs tracking-widest uppercase border border-black/10 px-4 py-2"
        >
          {isMobileFilterOpen ? "Close Filters" : "Filters +"}
        </button>
        <span className="font-sans text-[10px] tracking-widest text-gray-400">
          {filteredArtworks.length} Works
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* --- SIDEBAR (Filters) --- */}
        <aside className={`
          lg:w-64 flex-shrink-0 lg:block
          ${isMobileFilterOpen ? "block" : "hidden"}
        `}>
          <div className="sticky top-40 space-y-12">
            
            {/* SEARCH */}
            <div className="border-b border-black/10 pb-2">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-sans text-xs tracking-widest uppercase placeholder:text-gray-400"
              />
            </div>

            {/* STATUS FILTER */}
            <div className="space-y-4">
               <h3 className="font-serif text-lg italic text-soft-black">Availability</h3>
               <div className="flex flex-col gap-2">
                 {["all", "available", "sold"].map((status) => (
                   <button 
                     key={status}
                     onClick={() => setStatusFilter(status as any)}
                     className={`text-left font-sans text-[10px] tracking-widest uppercase transition-colors
                       ${statusFilter === status ? "text-soft-black font-semibold" : "text-gray-400 hover:text-soft-black"}
                     `}
                   >
                     {status}
                   </button>
                 ))}
               </div>
            </div>

            {/* DYNAMIC CATEGORY FILTERS */}
            {Object.entries(categoriesByType).map(([type, titles]) => (
              <div key={type} className="space-y-4">
                <h3 className="font-serif text-lg italic text-soft-black capitalize">{type}</h3>
                <div className="flex flex-col gap-2">
                  {titles.map((title) => (
                    <button 
                      key={title}
                      onClick={() => setSelectedCategory(selectedCategory === title ? null : title)}
                      className={`text-left font-sans text-[10px] tracking-widest uppercase transition-colors
                        ${selectedCategory === title ? "text-soft-black font-semibold" : "text-gray-400 hover:text-soft-black"}
                      `}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* SORTING */}
            <div className="space-y-4 pt-8 border-t border-black/5">
               <h3 className="font-serif text-lg italic text-soft-black">Sort By</h3>
               <div className="flex flex-col gap-2">
                 <button onClick={() => setSortOption("newest")} className={`text-left font-sans text-[10px] tracking-widest uppercase ${sortOption === "newest" ? "text-soft-black" : "text-gray-400"}`}>Newest</button>
                 <button onClick={() => setSortOption("price_asc")} className={`text-left font-sans text-[10px] tracking-widest uppercase ${sortOption === "price_asc" ? "text-soft-black" : "text-gray-400"}`}>Price: Low to High</button>
                 <button onClick={() => setSortOption("price_desc")} className={`text-left font-sans text-[10px] tracking-widest uppercase ${sortOption === "price_desc" ? "text-soft-black" : "text-gray-400"}`}>Price: High to Low</button>
               </div>
            </div>

          </div>
        </aside>

        {/* --- MAIN GRID --- */}
        <div className="flex-1">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
          >
            <AnimatePresence>
              {filteredArtworks.map((art) => (
                <motion.div
                  layout
                  key={art._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link href={`/artwork/${art.slug}`} className="block cursor-pointer group/card">
                    
                    {/* IMAGE FRAME */}
                    <div className="relative group/image"> 
                      <MuseumFrame aspectRatio={art.aspectRatio}>
                        {art.imageUrl && (
                          <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className="w-full object-cover transition-all duration-700 ease-out scale-100 group-hover/image:scale-105"
                          />
                        )}
                      </MuseumFrame>

                      {/* BADGES */}
                      <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
                        {(art.status === "sold" || art.status === "private") && (
                           <span className="flex items-center gap-2 bg-white/95 backdrop-blur-md text-soft-black text-[10px] font-sans tracking-widest px-3 py-1.5 border border-soft-black">
                             <span className="w-1.5 h-1.5 rounded-full bg-red-700" /> Sold
                           </span>
                        )}
                        {art.status === "available" && art.price && (
                           <span className="bg-white/95 text-soft-black text-[10px] font-sans tracking-widest px-3 py-1.5 opacity-0 group-hover/image:opacity-100 transition-opacity border border-soft-black">
                             ${art.price.toLocaleString()}
                           </span>
                        )}
                      </div>
                    </div>

                    {/* PLAQUE */}
                    <div className="mt-8">
                       <MuseumPlaque 
                         title={art.title}
                         artist={art.artist}
                         medium={art.material}
                         dimensions={art.dimensions}
                         year={art.year}
                         showButton={false} // Cleaner look for full collection
                       />
                    </div>

                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* EMPTY STATE */}
          {filteredArtworks.length === 0 && (
            <div className="h-[50vh] flex flex-col items-center justify-center text-center">
              <p className="font-serif text-2xl italic text-gray-400 mb-4">No artworks found.</p>
              <button onClick={() => {setSearchQuery(""); setSelectedCategory(null); setStatusFilter("all");}} className="font-sans text-xs underline uppercase tracking-widest text-soft-black">
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
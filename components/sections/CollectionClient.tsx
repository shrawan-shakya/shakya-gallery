"use client";

import { useState, useMemo, useEffect } from "react";
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
  categories?: string[];
  dimensions?: string;
  material?: string;
};

// --- REUSABLE COMPONENT: ACCORDION SECTION ---
const FilterSection = ({ 
  title, 
  isOpen, 
  onToggle, 
  children 
}: { 
  title: string; 
  isOpen: boolean; 
  onToggle: () => void; 
  children: React.ReactNode; 
}) => {
  return (
    <div className="border-b border-black/10">
      <button 
        onClick={onToggle}
        className="w-full flex justify-between items-center py-5 group bg-transparent"
      >
        <span className="font-serif text-lg italic text-soft-black group-hover:text-gray-600 transition-colors">
          {title}
        </span>
        <span className="font-sans text-lg text-soft-black/40 font-light group-hover:text-soft-black transition-colors">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} 
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 flex flex-col gap-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  
  // UI State
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    search: true,
    availability: false,
    sort: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileFilterOpen]);

  // --- FILTER LOGIC ---
  const filteredArtworks = useMemo(() => {
    return artworks
      .filter((art) => {
        const matchSearch = 
          art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          art.artist?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory ? art.categories?.includes(selectedCategory) : true;
        const matchStatus = 
          statusFilter === "all" ? true :
          statusFilter === "available" ? art.status === "available" :
          (art.status === "sold" || art.status === "private");

        return matchSearch && matchCategory && matchStatus;
      })
      .sort((a, b) => {
        if (sortOption === "price_asc") return (a.price || 0) - (b.price || 0);
        if (sortOption === "price_desc") return (b.price || 0) - (a.price || 0);
        return 0; 
      });
  }, [artworks, searchQuery, selectedCategory, statusFilter, sortOption]);

  const categoriesByType = allCategories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat.title);
    return acc;
  }, {} as Record<string, string[]>);

  // --- FILTER CONTENT RENDERER ---
  const FilterContent = () => (
    <>
      <FilterSection title="Search" isOpen={openSections["search"]} onToggle={() => toggleSection("search")}>
        <input 
          type="text" 
          placeholder="Artist or Title..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-b border-black/20 py-2 font-sans text-sm tracking-wide outline-none placeholder:text-gray-400 focus:border-black transition-colors"
        />
      </FilterSection>

      {Object.entries(categoriesByType).map(([type, titles]) => (
        <FilterSection 
          key={type}
          title={type.charAt(0).toUpperCase() + type.slice(1)} 
          isOpen={openSections[type] || false} 
          onToggle={() => toggleSection(type)}
        >
          {titles.map((title) => (
            <button 
              key={title}
              onClick={() => setSelectedCategory(selectedCategory === title ? null : title)}
              className={`text-left font-sans text-[11px] tracking-[0.2em] uppercase py-1 transition-all duration-300
                ${selectedCategory === title ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-400 hover:text-soft-black"}
              `}
            >
              {title}
            </button>
          ))}
        </FilterSection>
      ))}

      <FilterSection title="Availability" isOpen={openSections["availability"]} onToggle={() => toggleSection("availability")}>
        {["all", "available", "sold"].map((status) => (
          <button 
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`text-left font-sans text-[11px] tracking-[0.2em] uppercase py-1 transition-all duration-300
              ${statusFilter === status ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-400 hover:text-soft-black"}
            `}
          >
            {status}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Sort" isOpen={openSections["sort"]} onToggle={() => toggleSection("sort")}>
        <button onClick={() => setSortOption("newest")} className={`text-left font-sans text-[11px] tracking-[0.2em] uppercase py-1 ${sortOption === "newest" ? "text-soft-black font-semibold" : "text-gray-400"}`}>Newest</button>
        <button onClick={() => setSortOption("price_asc")} className={`text-left font-sans text-[11px] tracking-[0.2em] uppercase py-1 ${sortOption === "price_asc" ? "text-soft-black font-semibold" : "text-gray-400"}`}>Price: Low to High</button>
        <button onClick={() => setSortOption("price_desc")} className={`text-left font-sans text-[11px] tracking-[0.2em] uppercase py-1 ${sortOption === "price_desc" ? "text-soft-black font-semibold" : "text-gray-400"}`}>Price: High to Low</button>
      </FilterSection>
    </>
  );

  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">
      
      {/* --- MOBILE FILTER BUTTON (Static, at the top) --- */}
      {/* No sticky, no complex animation. Just a clean row at the start of the page. */}
      <div className="lg:hidden mb-12 flex justify-between items-end border-b border-black/5 pb-4">
        <button 
          onClick={() => setIsMobileFilterOpen(true)} 
          className="group flex items-center gap-2"
        >
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-soft-black group-hover:text-gray-600 transition-colors border-b border-black/20 pb-0.5">
            Filter + Sort
          </span>
        </button>
        <span className="font-sans text-[9px] tracking-widest text-gray-400 uppercase">
          {filteredArtworks.length} Results
        </span>
      </div>

      {/* --- MOBILE FULLSCREEN DRAWER --- */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "-100%" }} 
            transition={{ type: "tween", duration: 0.4, ease: "circOut" }} 
            className="fixed inset-0 z-[60] bg-bone h-full w-full flex flex-col"
          >
             <div className="flex justify-between items-center p-6 border-b border-black/5">
                <h2 className="font-serif text-3xl text-soft-black">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:opacity-50 transition-opacity"><span className="font-sans text-xl">✕</span></button>
             </div>
             <div className="flex-1 overflow-y-auto p-6 pb-32"><FilterContent /></div>
             <div className="p-6 border-t border-black/5 bg-bone">
                <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-soft-black text-white font-sans text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-black/80 transition-colors">Show {filteredArtworks.length} Results</button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-40">
            <div className="mb-8 pb-4 border-b border-black/5">
                <p className="font-sans text-[10px] tracking-widest text-gray-400 uppercase">{filteredArtworks.length} Results</p>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          
          {/* GRID TOGGLE (Desktop Only) */}
          <div className="hidden lg:flex justify-end mb-8 items-center gap-4">
            <span className="font-sans text-[9px] tracking-widest text-gray-400 uppercase mr-2">View</span>
            <button onClick={() => setGridCols(2)} className={`p-2 transition-colors duration-300 ${gridCols === 2 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="7" height="17" stroke="currentColor"/><rect x="10.5" y="0.5" width="7" height="17" stroke="currentColor"/></svg>
            </button>
            <button onClick={() => setGridCols(3)} className={`p-2 transition-colors duration-300 ${gridCols === 3 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="0.5" width="4" height="17" stroke="currentColor"/><rect x="7" y="0.5" width="4" height="17" stroke="currentColor"/><rect x="13" y="0.5" width="4" height="17" stroke="currentColor"/></svg>
            </button>
          </div>

          {/* THE GRID */}
          <motion.div 
            className={`grid grid-cols-1 gap-y-24 transition-all duration-700
              ${gridCols === 2 ? "md:grid-cols-2 gap-x-12" : "md:grid-cols-3 gap-x-8"}
            `}
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
                  className="relative z-0" 
                >
                  <Link href={`/artwork/${art.slug}`} className="block cursor-pointer group/card">
                    
                    {/* IMAGE FRAME */}
                    <div className="relative group/image"> 
                      <MuseumFrame aspectRatio={art.aspectRatio}>
                        {art.imageUrl && (
                          <img 
                            src={art.imageUrl} 
                            alt={art.title} 
                            className={`w-full object-cover transition-all duration-700 ease-out scale-100 group-hover/image:scale-105
                              ${(art.status === "sold" || art.status === "private") 
                                ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40" 
                                : "grayscale-[0.2] group-hover/image:grayscale-0"
                              }
                            `}
                          />
                        )}
                      </MuseumFrame>

                      {/* BADGES */}
                      <div className="absolute inset-0 pointer-events-none p-6">
                        {(art.status === "sold" || art.status === "private") && (
                          <span className={`
                            absolute flex items-center gap-3 bg-soft-black text-white font-sans font-medium tracking-[0.2em] shadow-2xl z-20 transition-all duration-500 ease-in-out
                            ${gridCols === 2 ? "top-6 right-6 px-4 py-2 text-[10px]" : "top-3 right-3 px-3 py-1.5 text-[9px]"} 
                            group-hover/image:top-1/2 group-hover/image:right-1/2 group-hover/image:translate-x-1/2 group-hover/image:-translate-y-1/2 group-hover/image:scale-125
                          `}>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" /> 
                            {gridCols === 2 ? (art.status === "private" ? "PRIVATE" : "SOLD") : "SOLD"}
                          </span>
                        )}

                        {art.status === "available" && art.price && (
                           <span className={`
                             absolute bg-white/95 text-soft-black font-sans tracking-[0.2em] opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10
                             ${gridCols === 2 ? "top-6 right-6 text-xs px-4 py-2" : "top-3 right-3 text-[9px] px-3 py-1.5"}
                           `}>
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
                         showButton={false}
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
                Reset Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
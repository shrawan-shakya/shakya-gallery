"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { EmptyState } from "@/components/ui/EmptyState";
import { SanityImage } from "@/components/ui/SanityImage";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FeaturedCollection } from "./FeaturedCollection";
import {
  Artwork,
  Category,
  filterArtworks
} from "@/lib/artworks";
import { accordion, staggerContainer, staggerItem } from "@/lib/motion-variants";

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
        <h3 className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray-600 group-hover:text-soft-black transition-colors">
          {title}
        </h3>
        <span className="font-sans text-lg text-soft-black/40 font-light group-hover:text-soft-black transition-colors">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={accordion}
            initial="initial"
            animate="animate"
            exit="exit"
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

// --- EXTRACTED COMPONENT: FILTER PANEL ---
const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  categoriesByType,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
  openSections,
  toggleSection,
  categoryCounts
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoriesByType: Record<string, string[]>;
  selectedCategory: string | null;
  setSelectedCategory: (val: string | null) => void;
  statusFilter: string;
  setStatusFilter: (val: any) => void;
  sortOption: string;
  setSortOption: (val: any) => void;
  openSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  categoryCounts: Record<string, number>;
}) => {
  return (
    <>
      <FilterSection title="Search" isOpen={openSections["search"]} onToggle={() => toggleSection("search")}>
        <input
          type="text"
          placeholder="Artist or Title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border-b border-black/20 py-2 font-sans text-sm tracking-wide outline-none placeholder:text-gray-500 focus:border-black transition-colors"
        />
      </FilterSection>

      {Object.entries(categoriesByType).map(([type, titles]) => (
        <FilterSection
          key={type}
          title={type.charAt(0).toUpperCase() + type.slice(1)}
          isOpen={openSections[type] || false}
          onToggle={() => toggleSection(type)}
        >
          {titles.map((title) => {
            const count = categoryCounts[title] || 0;
            return (
              <button
                key={title}
                onClick={() => setSelectedCategory(selectedCategory === title ? null : title)}
                className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 transition-all duration-300 flex justify-between items-center group/btn
                  ${selectedCategory === title ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}
                `}
              >
                <span>{title}</span>
                <span className="text-[10px] opacity-60 group-hover/btn:opacity-100 transition-opacity ml-2">({count})</span>
              </button>
            );
          })}
        </FilterSection>
      ))}

      <FilterSection title="Availability" isOpen={openSections["availability"]} onToggle={() => toggleSection("availability")}>
        {["all", "available", "sold"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 transition-all duration-300
              ${statusFilter === status ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}
            `}
          >
            {status}
          </button>
        ))}
      </FilterSection>

      <FilterSection title="Sort" isOpen={openSections["sort"]} onToggle={() => toggleSection("sort")}>
        <button onClick={() => setSortOption("newest")} className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 ${sortOption === "newest" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}>Newest</button>
        <button onClick={() => setSortOption("price_asc")} className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 ${sortOption === "price_asc" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}>Price: Low to High</button>
        <button onClick={() => setSortOption("price_desc")} className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 ${sortOption === "price_desc" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}>Price: High to Low</button>
      </FilterSection>
    </>
  );
};

export function CollectionClient({
  artworks,
  allCategories,
  initialCategory = null
}: {
  artworks: Artwork[],
  allCategories: Category[],
  initialCategory?: string | null
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- PARSE URL PARAMS ---
  const searchQuery = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || initialCategory;
  const statusFilter = (searchParams.get("status") as any) || "all";
  const sortOption = (searchParams.get("sort") as any) || "newest";

  // --- UI STATE (Still local) ---
  const [showMat, setShowMat] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    search: true,
    availability: false,
    sort: false,
  });

  // --- HELPERS ---
  const updateQueryParam = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    // URL-First Logic: Push updates to trigger re-render and animations
    // Use replace for search (to avoid flooding history) and push for others
    const method = name === "q" ? "replace" : "push";
    router[method](`${pathname}?${params.toString()}`, { scroll: false });
  };

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
    return filterArtworks(artworks, {
      searchQuery,
      selectedCategory,
      statusFilter,
      sortOption
    });
  }, [artworks, searchQuery, selectedCategory, statusFilter, sortOption]);

  const categoriesByType = allCategories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat.title);
    return acc;
  }, {} as Record<string, string[]>);

  // --- ITEM COUNTS ---
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    artworks.forEach((art) => {
      art.categories?.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, [artworks]);

  const filterProps = {
    searchQuery,
    setSearchQuery: (val: string) => updateQueryParam("q", val),
    categoriesByType,
    selectedCategory,
    setSelectedCategory: (val: string | null) => updateQueryParam("category", val),
    statusFilter,
    setStatusFilter: (val: any) => updateQueryParam("status", val),
    sortOption,
    setSortOption: (val: any) => updateQueryParam("sort", val),
    openSections,
    toggleSection,
    categoryCounts
  };

  return (
    <div className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-12 flex justify-between items-baseline border-b border-black/5 pb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="group flex items-center gap-2 border-b border-black/20 pb-0.5"
        >
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-soft-black group-hover:text-gray-600 transition-colors">
            Filter + Sort
          </span>
        </button>
        <span className="font-sans text-[10px] tracking-widest text-gray-400 uppercase">
          {filteredArtworks.length} Results
        </span>
      </div>

      {/* MOBILE DRAWER */}
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
            <div className="flex-1 overflow-y-auto p-6 pb-32" data-lenis-prevent>
              <FilterPanel {...filterProps} />
            </div>
            <div className="p-6 border-t border-black/5 bg-bone">
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-soft-black text-white font-sans text-xs tracking-[0.3em] uppercase py-4 hover:bg-black/80 transition-colors">Show {filteredArtworks.length} Results</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* DESKTOP SIDEBAR */}
        <aside
          className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"
          data-lenis-prevent
        >
          <div className="pb-8">
            <div className="mb-8 pb-4 border-b border-black/5">
              <p className="font-sans text-[11px] tracking-widest text-gray-500 uppercase">{filteredArtworks.length} Results</p>
            </div>
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">

          {/* GRID TOGGLE */}
          <div className="hidden lg:flex justify-end mb-8 items-center gap-4">
            <div className="flex items-center gap-4 border-r border-black/10 pr-6 mr-2">
              <button
                onClick={() => setShowMat(true)}
                className={`font-sans text-[11px] tracking-widest uppercase transition-all ${showMat ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-600"}`}
              >
                Mat
              </button>
              <button
                onClick={() => setShowMat(false)}
                className={`font-sans text-[11px] tracking-widest uppercase transition-all ${!showMat ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-600"}`}
              >
                No Mat
              </button>
            </div>

            <span className="font-sans text-[11px] tracking-widest text-gray-400 uppercase mr-2">View</span>
            <button onClick={() => setGridCols(2)} className={`p-2 transition-colors duration-300 ${gridCols === 2 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="7" height="17" stroke="currentColor" /><rect x="10.5" y="0.5" width="7" height="17" stroke="currentColor" /></svg>
            </button>
            <button onClick={() => setGridCols(3)} className={`p-2 transition-colors duration-300 ${gridCols === 3 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="0.5" width="4" height="17" stroke="currentColor" /><rect x="7" y="0.5" width="4" height="17" stroke="currentColor" /><rect x="13" y="0.5" width="4" height="17" stroke="currentColor" /></svg>
            </button>
          </div>

          {/* THE GRID - Key forces a reset on filter change to trigger animations */}
          <div
            key={`${searchQuery}-${selectedCategory}-${statusFilter}-${sortOption}`}
            className="flex gap-8 lg:gap-12 items-start transition-all duration-700"
          >
            {filteredArtworks.length > 0 ? (
              Array.from({ length: gridCols }).map((_, colIndex) => (
                <motion.div
                  key={colIndex}
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="flex-1 flex flex-col gap-12 lg:gap-16"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredArtworks
                      .filter((_, index) => index % gridCols === colIndex)
                      .map((art, index) => (
                        <motion.div
                          key={art._id}
                          variants={staggerItem}
                          layout
                          className="relative z-10 w-full"
                        >
                          <Link href={`/artwork/${art.slug}`} className="block cursor-pointer group/card">
                            <div className="relative group/image">
                              <SanityImage
                                src={art.imageUrl}
                                alt={art.title}
                                lqip={art.lqip}
                                aspectRatio={art.aspectRatio}
                                hasMat={showMat}
                                priority={index < 2}
                                imageClassName={cn(
                                  (art.status === "sold" || art.status === "private")
                                    ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                                    : "grayscale-[0.2] group-hover/image:grayscale-0"
                                )}
                              />
                              <div className="absolute inset-0 pointer-events-none p-6">
                                {art.status === "sold" && (
                                  <span className={`
                                    absolute inset-0 flex flex-col items-center justify-center z-20
                                    opacity-0 group-hover/image:opacity-100 transition-opacity duration-500
                                  `}>
                                    <span className="font-serif font-bold italic text-2xl md:text-3xl text-white bg-[#7D1818] shadow-xl -rotate-12 tracking-widest px-5 py-2">
                                      SOLD
                                    </span>
                                    <span className="mt-16 font-sans text-white tracking-[0.2em] uppercase font-medium drop-shadow-md text-center px-4 text-[10px] md:text-xs leading-relaxed max-w-[200px]">
                                      Commission a similar piece
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="mt-8">
                              <MuseumPlaque
                                title={art.title}
                                artist={art.artist}
                                year={art.year}
                                medium={art.material}
                                dimensions={art.dimensions}
                                showButton={false}
                              />
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="w-full">
                <FeaturedCollection
                  artworks={artworks}
                  heading="While we curate more pieces for this category, explore our featured masterpieces."
                />

                <div className="flex justify-center mt-12 mb-20 relative z-20">
                  <button
                    onClick={() => router.push(pathname)}
                    className="font-sans text-[10px] underline uppercase tracking-[0.3em] text-soft-black hover:opacity-60 transition-opacity"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
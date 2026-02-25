"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { EmptyState } from "@/components/ui/EmptyState";
import { SanityImage } from "@/components/ui/SanityImage";
import { LazyGridItem } from "@/components/ui/LazyGridItem";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";


import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FeaturedCollection } from "./FeaturedCollection";
import { Price } from "@/components/ui/Price";
import {
  Artwork,
  Category
} from "@/lib/types";

import { accordion, staggerContainer, staggerItem } from "@/lib/motion-variants";

// --- ICONS ---
const FrameIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
    <rect x="4" y="4" width="10" height="10" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
);

const CanvasIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="1" y="1" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

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
        <h3 className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-600 group-hover:text-soft-black transition-colors">
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
  selectedCategories,
  toggleCategory,
  statusFilter,
  setStatusFilter,
  sortOption,
  setSortOption,
  openSections,
  toggleSection,
  categoryCounts,
  clearFilters,
  hasActiveFilters,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categoriesByType: Record<string, string[]>;
  selectedCategories: string[];
  toggleCategory: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: any) => void;
  sortOption: string;
  setSortOption: (val: any) => void;
  openSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
  categoryCounts: Record<string, number>;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}) => {
  return (
    <>

      {Object.entries(categoriesByType).map(([type, titles]) => (
        <FilterSection
          key={type}
          title={type.charAt(0).toUpperCase() + type.slice(1)}
          isOpen={openSections[type] || false}
          onToggle={() => toggleSection(type)}
        >
          {titles.map((title) => {
            const count = categoryCounts[title] || 0;
            const isSelected = selectedCategories.includes(title);
            return (
              <button
                key={title}
                onClick={() => toggleCategory(title)}
                className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 transition-all duration-300 flex justify-between items-center group/btn
                  ${isSelected ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}
                `}
              >
                <span>{title}</span>
                <span className="text-[11px] opacity-60 group-hover/btn:opacity-100 transition-opacity ml-2">({count})</span>
              </button>
            );
          })}
        </FilterSection>
      ))}

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="mt-4 text-left font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-soft-black underline transition-colors"
        >
          Clear All Filters
        </button>
      )}

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

  const searchQuery = searchParams.get("q") || "";
  const selectedCategories = useMemo(() => {

    const fromUrl = searchParams.get("category");
    if (fromUrl) {
      const parts = fromUrl.split(",");
      const result = [];
      for (const p of parts) if (p) result.push(p);
      return result;
    }
    return initialCategory ? [initialCategory] : [];
  }, [searchParams, initialCategory]);

  const statusFilter = (searchParams.get("status") as any) || "all";
  const sortOption = (searchParams.get("sort") as any) || "newest";

  // --- UI STATE (Still local) ---
  const [showMat, setShowMat] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    theme: true,
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

    const method = name === "q" ? "replace" : "push";
    router[method](`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramVal = params.get("category");
    let current = [];
    if (paramVal) {
      const parts = paramVal.split(",");
      for (const p of parts) if (p) current.push(p);
    }
    if (initialCategory && !params.has("category")) {
      current = [initialCategory];
    }


    if (current.includes(category)) {
      const next = [];
      for (const c of current) {
        if (c !== category) next.push(c);
      }
      current = next;
    } else {
      current = [...current, category];
    }


    if (current.length > 0) {
      params.set("category", current.join(","));
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategories.length > 0 || statusFilter !== "all" || sortOption !== "newest";

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

  // --- GRID DISTRIBUTION (No client-side .filter in JSX) ---
  const columns = useMemo(() => {
    const cols: Artwork[][] = Array.from({ length: gridCols }, () => []);
    artworks.forEach((art, index) => {
      cols[index % gridCols].push(art);
    });
    return cols;
  }, [artworks, gridCols]);

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
    selectedCategories,
    toggleCategory,
    statusFilter,
    setStatusFilter: (val: any) => updateQueryParam("status", val),
    sortOption,
    setSortOption: (val: any) => updateQueryParam("sort", val),
    openSections,
    toggleSection,
    categoryCounts,
    clearFilters,
    hasActiveFilters
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

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
        <span className="font-sans text-[11px] tracking-widest text-gray-400 uppercase">
          {artworks.length} Results
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
              <button onClick={() => setIsMobileFilterOpen(false)} className="w-full bg-soft-black text-white font-sans text-xs tracking-[0.3em] uppercase py-4 hover:bg-black/80 transition-colors">Show {artworks.length} Results</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full">

        {/* DESKTOP SIDEBAR */}
        <aside
          className="hidden lg:block w-64 flex-shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"
          data-lenis-prevent
        >
          <div className="pb-8">
            <div className="mb-8 pb-4 border-b border-black/5">
              <p className="font-sans text-[11px] tracking-widest text-gray-500 uppercase">{artworks.length} Results</p>
            </div>
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">

          {/* VIEW CONTROLS - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex justify-end mb-8 items-center gap-4">
            <div className="flex items-center gap-2 lg:gap-4 lg:border-r lg:border-black/10 lg:pr-6 lg:mr-2">
              <button
                onClick={() => setShowMat(true)}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 transition-all relative",
                  showMat ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-600"
                )}
                title="View with Frame"
              >
                <FrameIcon />
                <span className="hidden sm:block font-sans text-[11px] tracking-widest uppercase whitespace-nowrap">View with Frame</span>
                {showMat && <motion.div layoutId="collection-active-mat" className="absolute bottom-0 left-0 right-0 h-[2px] bg-soft-black" />}
              </button>
              <button
                onClick={() => setShowMat(false)}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 transition-all relative",
                  !showMat ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-600"
                )}
                title="Canvas Only"
              >
                <CanvasIcon />
                <span className="hidden sm:block font-sans text-[11px] tracking-widest uppercase whitespace-nowrap">Canvas Only</span>
                {!showMat && <motion.div layoutId="collection-active-mat" className="absolute bottom-0 left-0 right-0 h-[2px] bg-soft-black" />}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="hidden lg:block font-sans text-[11px] tracking-widest text-gray-400 uppercase mr-2">View</span>
              <button onClick={() => setGridCols(2)} className={`p-2 transition-colors duration-300 ${gridCols === 2 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>2 Columns</title>
                  <rect x="0.5" y="0.5" width="7" height="17" stroke="currentColor" />
                  <rect x="10.5" y="0.5" width="7" height="17" stroke="currentColor" />
                </svg>
              </button>
              <button onClick={() => setGridCols(3)} className={`p-2 transition-colors duration-300 ${gridCols === 3 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <title>3 Columns</title>
                  <rect x="1" y="0.5" width="4" height="17" stroke="currentColor" />
                  <rect x="7" y="0.5" width="4" height="17" stroke="currentColor" />
                  <rect x="13" y="0.5" width="4" height="17" stroke="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* THE GRID - Key forces a reset on filter change to trigger animations */}
          <div
            key={`${searchQuery}-${selectedCategories.join("-")}-${statusFilter}-${sortOption}-${gridCols}`}
            className="flex gap-8 lg:gap-12 items-start transition-all duration-700"
          >
            {artworks.length > 0 ? (
              columns.map((columnArtworks, colIndex) => (
                <div
                  key={colIndex}
                  className="flex-1 flex flex-col gap-12 lg:gap-16"
                >
                  <AnimatePresence mode="popLayout">
                    {columnArtworks.map((art: Artwork, index: number) => {
                      // Total index across all columns for priority calculation
                      const globalIndex = index * gridCols + colIndex;
                      const isPriority = globalIndex < 4;

                      return (
                        <LazyGridItem
                          key={art._id}
                          className="relative z-10 w-full"
                          rootMargin="1000px 0px"
                          aspectRatio={art.aspectRatio}
                          disabled={globalIndex < 12}
                        >
                          <motion.div
                            variants={staggerItem}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "600px" }}
                            layout
                            style={{ willChange: "transform, opacity" }}
                          >
                            <Link href={`/artwork/${art.slug}`} className="block cursor-pointer group/card">
                              <div className="relative group/image">
                                <SanityImage
                                  src={art.imageUrl}
                                  alt={art.title}
                                  lqip={art.lqip}
                                  aspectRatio={art.aspectRatio}
                                  hasMat={showMat}
                                  priority={isPriority}
                                  imageClassName={cn(
                                    (art.status === "sold" || art.status === "private")
                                      ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                                      : "grayscale-[0.2] group-hover/image:grayscale-0"
                                  )}
                                />
                                <div className="absolute inset-x-0 bottom-0 pointer-events-none p-2 md:p-6 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:bg-none transition-opacity duration-500">
                                  {/* SOLD BADGE: Center on Desktop, persistent bottom bar on Mobile */}
                                  {art.status === "sold" && (
                                    <>
                                      {/* Desktop Only Hover Center */}
                                      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                                        <span className="font-serif font-bold italic text-3xl text-white bg-[#7D1818] shadow-xl -rotate-12 tracking-widest px-5 py-2">
                                          SOLD
                                        </span>
                                        <span className="mt-16 font-sans text-white tracking-[0.2em] uppercase font-medium drop-shadow-md text-center px-4 text-xs leading-relaxed max-w-[200px]">
                                          Commission a similar piece
                                        </span>
                                      </div>
                                      {/* Mobile Only Persistent Bottom */}
                                      <div className="md:hidden flex items-center justify-between w-full px-2">
                                        <span className="font-serif font-bold italic text-[11px] text-white bg-[#7D1818] px-2 py-0.5 tracking-wider">
                                          SOLD
                                        </span>
                                      </div>
                                    </>
                                  )}

                                  {/* PRICE BADGE: Bottom Center on Desktop Hover, persistent bottom bar on Mobile */}
                                  {art.status === "available" && (
                                    <>
                                      {/* Desktop Hover */}
                                      <span className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/95 text-soft-black text-base font-sans tracking-[0.2em] px-6 py-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 backdrop-blur-md shadow-md border border-soft-black/10 whitespace-nowrap">
                                        {art.showPrice && art.price ? (
                                          <Price amount={art.price} />
                                        ) : (
                                          <PriceOnRequest startingPrice={art.startingPrice} variant="badge" />
                                        )}
                                      </span>
                                      {/* Mobile Persistent */}
                                      <div className="md:hidden flex justify-center w-full">
                                        <span className="bg-white/90 text-soft-black text-[10px] font-sans tracking-[0.1em] px-3 py-1 backdrop-blur-sm shadow-sm border border-soft-black/5 whitespace-nowrap">
                                          {art.showPrice && art.price ? (
                                            <Price amount={art.price} />
                                          ) : (
                                            <PriceOnRequest startingPrice={art.startingPrice} variant="minimal" className="gap-1" />
                                          )}
                                        </span>
                                      </div>
                                    </>
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
                                  price={art.price}
                                  showPrice={art.showPrice}
                                  startingPrice={art.startingPrice}
                                  showButton={false}
                                  showMedium={false}
                                />
                              </div>
                            </Link>
                          </motion.div>
                        </LazyGridItem>
                      );
                    })}
                  </AnimatePresence>
                </div>
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
                    className="font-sans text-[11px] underline uppercase tracking-[0.3em] text-soft-black hover:opacity-60 transition-opacity"
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



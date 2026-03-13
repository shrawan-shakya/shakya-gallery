"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { EmptyState } from "@/components/ui/EmptyState";
import { SanityImage } from "@/components/ui/SanityImage";
import { LazyGridItem } from "@/components/ui/LazyGridItem";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";
import { ArtworkCard } from "@/components/artwork/ArtworkCard";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { FeaturedCollection } from "./FeaturedCollection";
import { Price } from "@/components/ui/Price";
import { Artwork, Category } from "@/lib/types";
import { useArtFilter } from "@/hooks/useArtFilter";
import { FilterPanel } from "@/components/collection/FilterPanel";
import { FrameIcon, CanvasIcon } from "@/components/ui/Icons";
import {
  staggerContainer,
  staggerItem,
} from "@/lib/motion-variants";

export function CollectionClient({
  artworks,
  allCategories,
  initialCategory = null,
}: {
  artworks: Artwork[];
  allCategories: Category[];
  initialCategory?: string | null;
}) {
  const {
    filteredArtworks,
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    statusFilter,
    setStatusFilter,
    sortOption,
    setSortOption,
    showMat,
    setShowMat,
    view,
    setView,
    clearFilters,
    hasActiveFilters,
    categoryCounts,
  } = useArtFilter(artworks, initialCategory);

  const router = useRouter();
  const pathname = usePathname();

  // --- UI STATE ---
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(2);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    theme: true,
    availability: false,
    sort: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // --- GRID DISTRIBUTION ---
  const columns = useMemo(() => {
    const colsCount = view === "rows" ? 1 : gridCols;
    const cols: Artwork[][] = Array.from({ length: colsCount }, () => []);
    filteredArtworks.forEach((art: Artwork, index: number) => {
      cols[index % colsCount].push(art);
    });
    return cols;
  }, [filteredArtworks, gridCols, view]);

  const categoriesByType = allCategories.reduce(
    (acc, cat) => {
      if (!acc[cat.type]) acc[cat.type] = [];
      acc[cat.type].push(cat.title);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  const filterProps = {
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
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:opacity-50 transition-opacity"
              >
                <span className="font-sans text-xl">✕</span>
              </button>
            </div>
            <div
              className="flex-1 overflow-y-auto p-6 pb-32"
              data-lenis-prevent
            >
              <FilterPanel {...filterProps} />
            </div>
            <div className="p-6 border-t border-black/5 bg-bone">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-soft-black text-white font-sans text-xs tracking-[0.3em] uppercase py-4 hover:bg-black/80 transition-colors"
              >
                Show {filteredArtworks.length} Results
              </button>
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
              <p className="font-sans text-[11px] tracking-widest text-gray-500 uppercase">
                {filteredArtworks.length} Results
              </p>
            </div>
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1">
          {/* VIEW CONTROLS - Static Glass Pill */}
          <div className="hidden lg:flex justify-end mb-8 items-center gap-4 bg-bone/40 underline-offset-4 backdrop-blur-md border border-black/[0.03] px-6 py-3 rounded-full transition-all duration-500">
            <div className="flex items-center gap-2 lg:gap-4 lg:border-r lg:border-black/10 lg:pr-6 lg:mr-2">
              <button
                onClick={() => setShowMat(true)}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 transition-all relative",
                  showMat
                    ? "text-soft-black font-semibold"
                    : "text-gray-400 hover:text-gray-600",
                )}
                title="View with Frame"
              >
                <FrameIcon />
                <span className="hidden sm:block font-sans text-[11px] tracking-widest uppercase whitespace-nowrap">
                  View with Frame
                </span>
                {showMat && (
                  <motion.div
                    layoutId="collection-active-mat"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                  />
                )}
              </button>
              <button
                onClick={() => setShowMat(false)}
                className={cn(
                  "flex items-center gap-2 h-8 px-2 transition-all relative",
                  !showMat
                    ? "text-soft-black font-semibold"
                    : "text-gray-400 hover:text-gray-600",
                )}
                title="Canvas Only"
              >
                <CanvasIcon />
                <span className="hidden sm:block font-sans text-[11px] tracking-widest uppercase whitespace-nowrap">
                  Canvas Only
                </span>
                {!showMat && (
                  <motion.div
                    layoutId="collection-active-mat"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-soft-black"
                  />
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="hidden lg:block font-sans text-[11px] tracking-widest text-gray-400 uppercase mr-2">
                View
              </span>
              <button
                onClick={() => {
                  setView("grid");
                  setGridCols(2);
                }}
                className={`p-2 transition-colors duration-300 ${view === "grid" && gridCols === 2 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>2 Columns</title>
                  <rect
                    x="0.5"
                    y="0.5"
                    width="7"
                    height="17"
                    stroke="currentColor"
                  />
                  <rect
                    x="10.5"
                    y="0.5"
                    width="7"
                    height="17"
                    stroke="currentColor"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setView("grid");
                  setGridCols(3);
                }}
                className={`p-2 transition-colors duration-300 ${view === "grid" && gridCols === 3 ? "text-soft-black" : "text-gray-300 hover:text-gray-500"}`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>3 Columns</title>
                  <rect
                    x="1"
                    y="0.5"
                    width="4"
                    height="17"
                    stroke="currentColor"
                  />
                  <rect
                    x="7"
                    y="0.5"
                    width="4"
                    height="17"
                    stroke="currentColor"
                  />
                  <rect
                    x="13"
                    y="0.5"
                    width="4"
                    height="17"
                    stroke="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* THE GRID - Key forces a reset on filter change to trigger animations */}
          <div
            key={`${searchQuery}-${selectedCategories.join("-")}-${statusFilter}-${sortOption}-${gridCols}`}
            className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start transition-all duration-700 w-full"
          >
            {filteredArtworks.length > 0 ? (
              <>
                {/* Mobile 1-Column Layout */}
                <div className="flex w-full flex-col gap-12 md:hidden">
                  <AnimatePresence mode="popLayout">
                    {filteredArtworks.map((art: Artwork, index: number) => (
                      <ArtworkCard
                        key={art._id}
                        art={art}
                        globalIndex={index}
                        showMat={showMat}
                        layout="grid"
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Desktop Masonry Layout */}
                {columns.map((columnArtworks, colIndex) => (
                  <div
                    key={colIndex}
                    className="hidden md:flex flex-1 flex-col gap-12 lg:gap-16 w-full"
                  >
                    <AnimatePresence mode="popLayout">
                      {columnArtworks.map((art: Artwork, index: number) => {
                        const globalIndex = index * gridCols + colIndex;
                        return (
                          <ArtworkCard
                            key={art._id}
                            art={art}
                            globalIndex={globalIndex}
                            showMat={showMat}
                            layout="grid"
                          />
                        );
                      })}
                    </AnimatePresence>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full">
                <FeaturedCollection
                  artworks={artworks} // keep showing all feature artworks as recommendation
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

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { accordion } from "@/lib/motion-variants";

// --- REUSABLE COMPONENT: ACCORDION SECTION ---
const FilterSection = ({
  title,
  isOpen,
  onToggle,
  children,
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
        className="w-full flex justify-between items-center py-5 group bg-transparent focus:outline-none"
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
            <div className="pb-6 pt-1 flex flex-col gap-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FilterPanelProps {
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
}

export const FilterPanel = ({
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
}: FilterPanelProps) => {
  return (
    <div className="flex flex-col">
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
                className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 transition-all duration-300 flex justify-between items-center group/btn focus:outline-none
                  ${isSelected ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}
                `}
              >
                <span>{title}</span>
                <span className="text-[11px] opacity-60 group-hover/btn:opacity-100 transition-opacity ml-2">
                  ({count})
                </span>
              </button>
            );
          })}
        </FilterSection>
      ))}

      <FilterSection
        title="Availability"
        isOpen={openSections["availability"]}
        onToggle={() => toggleSection("availability")}
      >
        {["all", "available", "sold"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 transition-all duration-300 focus:outline-none
              ${statusFilter === status ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}
            `}
          >
            {status}
          </button>
        ))}
      </FilterSection>

      <FilterSection
        title="Sort"
        isOpen={openSections["sort"]}
        onToggle={() => toggleSection("sort")}
      >
        <button
          onClick={() => setSortOption("newest")}
          className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 focus:outline-none ${sortOption === "newest" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}
        >
          Newest
        </button>
        <button
          onClick={() => setSortOption("price_asc")}
          className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 focus:outline-none ${sortOption === "price_asc" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => setSortOption("price_desc")}
          className={`text-left font-sans text-xs tracking-[0.2em] uppercase py-1 focus:outline-none ${sortOption === "price_desc" ? "text-soft-black font-semibold pl-2 border-l-2 border-soft-black" : "text-gray-500 hover:text-soft-black"}`}
        >
          Price: High to Low
        </button>
      </FilterSection>

      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-6 border-t border-black/5">
              <button
                onClick={clearFilters}
                className="w-full text-left font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-soft-black transition-colors flex justify-between items-center group focus:outline-none"
              >
                <span>Clear All Filters</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  ✕
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

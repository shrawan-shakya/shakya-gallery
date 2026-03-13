"use client";

import { useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Artwork, Category, FilterOptions } from "@/lib/types";

export function useArtFilter(
  artworks: Artwork[],
  initialCategory: string | null = null,
  initialView: FilterOptions["view"] = "grid",
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- PARSE PARAMS ---
  const searchQuery = searchParams.get("q") || "";

  const selectedCategories = useMemo(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) {
      return fromUrl.split(",").filter(Boolean);
    }
    return initialCategory ? [initialCategory] : [];
  }, [searchParams, initialCategory]);

  const statusFilter = (searchParams.get("status") ||
    "all") as FilterOptions["statusFilter"];
  const sortOption = (searchParams.get("sort") ||
    "newest") as FilterOptions["sortOption"];

  // View Preferences
  const showMat = searchParams.get("mat") !== "0"; // Default true
  const view = (searchParams.get("v") || initialView) as FilterOptions["view"];

  // --- FILTER LOGIC ---
  const filteredArtworks = useMemo(() => {
    let result = artworks;

    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (art) =>
          art.title?.toLowerCase().includes(q) ||
          art.artist?.toLowerCase().includes(q) ||
          art.material?.toLowerCase().includes(q),
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter((art) =>
        art.categories?.some((cat) => selectedCategories.includes(cat)),
      );
    }

    // 3. Status
    if (statusFilter === "available") {
      result = result.filter((art) => art.status === "available");
    } else if (statusFilter === "sold") {
      result = result.filter(
        (art) => art.status === "sold" || art.status === "private",
      );
    }

    // 4. Sort
    if (sortOption === "price_asc" || sortOption === "price_desc") {
      result = [...result].sort((a, b) => {
        if (sortOption === "price_asc") {
          const priceA = a.price ?? a.startingPrice ?? 99999999;
          const priceB = b.price ?? b.startingPrice ?? 99999999;
          return priceA - priceB;
        } else {
          const priceA = a.price ?? a.startingPrice ?? 0;
          const priceB = b.price ?? b.startingPrice ?? 0;
          return priceB - priceA;
        }
      });
    }

    return result;
  }, [artworks, searchQuery, selectedCategories, statusFilter, sortOption]);

  // --- ACTIONS ---
  const updateQueryParam = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      const method = name === "q" ? "replace" : "push";
      router[method](`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const toggleCategory = useCallback(
    (category: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const paramVal = params.get("category");
      let current = paramVal ? paramVal.split(",").filter(Boolean) : [];

      if (initialCategory && !params.has("category")) {
        current = [initialCategory];
      }

      if (current.includes(category)) {
        current = current.filter((c) => c !== category);
      } else {
        current = [...current, category];
      }

      if (current.length > 0) {
        params.set("category", current.join(","));
      } else {
        params.delete("category");
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, initialCategory],
  );

  const clearFilters = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    statusFilter !== "all" ||
    sortOption !== "newest";

  // --- CATEGORY COUNTS ---
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredArtworks.forEach((art) => {
      art.categories?.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1;
      });
    });
    return counts;
  }, [filteredArtworks]);

  return {
    filteredArtworks,
    searchQuery,
    setSearchQuery: (val: string) => updateQueryParam("q", val),
    selectedCategories,
    toggleCategory,
    statusFilter,
    setStatusFilter: (val: string) => updateQueryParam("status", val),
    sortOption,
    setSortOption: (val: string) => updateQueryParam("sort", val),
    showMat,
    setShowMat: (val: boolean) => updateQueryParam("mat", val ? "1" : "0"),
    view,
    setView: (val: "grid" | "rows") => updateQueryParam("v", val),
    clearFilters,
    hasActiveFilters,
    categoryCounts,
  };
}

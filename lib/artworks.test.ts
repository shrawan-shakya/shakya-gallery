import { describe, it, expect } from "vitest";
import { filterArtworks, Artwork, FilterOptions } from "./artworks";

const mockArtworks: Artwork[] = [
    {
        _id: "1",
        title: "Mountain peaks",
        artist: "Master A",
        slug: "mountain-peaks",
        imageUrl: "",
        aspectRatio: 1,
        status: "available",
        price: 1000,
        categories: ["Style A", "Landscape"],
    },
    {
        _id: "2",
        title: "Ocean breeze",
        artist: "Master B",
        slug: "ocean-breeze",
        imageUrl: "",
        aspectRatio: 1,
        status: "sold",
        price: 2000,
        categories: ["Style B", "Ocean"],
    },
    {
        _id: "3",
        title: "Mountain sunset",
        artist: "Master C",
        slug: "mountain-sunset",
        imageUrl: "",
        aspectRatio: 1,
        status: "available",
        price: 500,
        categories: ["Style A", "Landscape"],
    },
];

describe("filterArtworks logic check", () => {
    it("should filter by search query (title)", () => {
        const result = filterArtworks(mockArtworks, { searchQuery: "mountain" });
        expect(result).toHaveLength(2);
        expect(result.map(a => a._id)).toContain("1");
        expect(result.map(a => a._id)).toContain("3");
    });

    it("should filter by search query (artist)", () => {
        const result = filterArtworks(mockArtworks, { searchQuery: "Master B" });
        expect(result).toHaveLength(1);
        expect(result[0]._id).toBe("2");
    });

    it("should filter by category", () => {
        const result = filterArtworks(mockArtworks, { selectedCategory: "Style A" });
        expect(result).toHaveLength(2);
        expect(result.every(a => a.categories?.includes("Style A"))).toBe(true);
    });

    it("should filter by status (available)", () => {
        const result = filterArtworks(mockArtworks, { statusFilter: "available" });
        expect(result).toHaveLength(2);
        expect(result.every(a => a.status === "available")).toBe(true);
    });

    it("should filter by status (sold)", () => {
        const result = filterArtworks(mockArtworks, { statusFilter: "sold" });
        expect(result).toHaveLength(1);
        expect(result[0].status).toBe("sold");
    });

    it("should sort by price ascending", () => {
        const result = filterArtworks(mockArtworks, { sortOption: "price_asc" });
        expect(result[0]._id).toBe("3"); // 500
        expect(result[1]._id).toBe("1"); // 1000
        expect(result[2]._id).toBe("2"); // 2000
    });

    it("should sort by price descending", () => {
        const result = filterArtworks(mockArtworks, { sortOption: "price_desc" });
        expect(result[0]._id).toBe("2"); // 2000
        expect(result[1]._id).toBe("1"); // 1000
        expect(result[2]._id).toBe("3"); // 500
    });

    it("should combine multiple filters", () => {
        const result = filterArtworks(mockArtworks, {
            searchQuery: "mountain",
            selectedCategory: "Landscape",
            statusFilter: "available",
            sortOption: "price_desc"
        });
        expect(result).toHaveLength(2);
        expect(result[0]._id).toBe("1"); // 1000 (higher price)
        expect(result[1]._id).toBe("3"); // 500
    });
});

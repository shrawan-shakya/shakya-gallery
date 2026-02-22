export type Category = {
    title: string;
    type: "style" | "subject" | "medium" | "collection";
};

export type Artwork = {
    _id: string;
    title: string;
    artist?: string;
    year?: string;
    slug: string;
    imageUrl: string;
    lqip?: string;
    aspectRatio: number;
    status?: "available" | "sold" | "private";
    price?: number;
    showPrice?: boolean;
    packagedWeight?: number;
    shippingDimensions?: {
        length: number;
        width: number;
        height: number;
    };
    categories?: string[];
    dimensions?: string;
    material?: string;
};

export type FilterOptions = {
    searchQuery: string;
    selectedCategories: string[];
    statusFilter: "all" | "available" | "sold";
    sortOption: "newest" | "price_asc" | "price_desc";
};

/**
 * Pure function to filter and sort artworks based on given options.
 * This can be used with State, URL SearchParams, or even on the Server.
 */
export function filterArtworks(artworks: Artwork[], options: Partial<FilterOptions>): Artwork[] {
    const {
        searchQuery = "",
        selectedCategories = [],
        statusFilter = "all",
        sortOption = "newest"
    } = options;

    return artworks
        .filter((art) => {
            // 1. Search Query (Title or Artist)
            const matchSearch =
                art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (art.artist?.toLowerCase() || "").includes(searchQuery.toLowerCase());

            // 2. Category Filter (OR logic: match if artwork has ANY of the selected categories)
            const matchCategory =
                selectedCategories.length === 0
                    ? true
                    : selectedCategories.some((cat) => art.categories?.includes(cat));

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
            // Newest (Default/Zero)
            return 0;
        });
}

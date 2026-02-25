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
    startingPrice?: number;
    packagedWeight?: number;
    shippingDimensions?: {
        length: number;
        width: number;
        height: number;
    };
    categories?: string[];
    dimensions?: string;
    material?: string;
    description?: any[];
    provenance?: any[];
};


export type FilterOptions = {
    searchQuery: string;
    selectedCategories: string[];
    statusFilter: "all" | "available" | "sold";
    sortOption: "newest" | "price_asc" | "price_desc";
};

import { sanityFetch } from "@/sanity/lib/live";

import { Artwork, FilterOptions } from "./types";


/**
 * Server-side GROQ-based filtering for artworks.
 * Unified logic for Gallery and Search.
 */
export async function getFilteredArtworks(options: Partial<FilterOptions>) {
    const {
        searchQuery = "",
        selectedCategories = [],
        statusFilter = "all",
        sortOption = "newest"
    } = options;

    // Base filters
    const filters = [`_type == "artwork"`, `!(_id in path("drafts.**"))`];

    // 1. Search Logic (Consistent with Search Overlay)
    if (searchQuery) {
        filters.push(`(
            title match $searchQuery + "*" || 
            artist match $searchQuery + "*" || 
            material match $searchQuery + "*"
        )`);
    }

    // 2. Category Logic (OR logic)
    if (selectedCategories.length > 0) {
        filters.push(`count((categories[]->title)[@ in $selectedCategories]) > 0`);
    }

    // 3. Status Logic
    if (statusFilter === "available") {
        filters.push(`status == "available"`);
    } else if (statusFilter === "sold") {
        filters.push(`status in ["sold", "private"]`);
    }

    // 4. Sorting Logic
    let orderClause = "_createdAt desc";
    if (sortOption === "price_asc") orderClause = "price asc";
    else if (sortOption === "price_desc") orderClause = "price desc";

    const query = `
    *[${filters.join(" && ")}] | order(${orderClause}) {
      _id,
      title,
      dimensions,
      year,
      artist,
      material,
      status,
      price,
      showPrice,
      startingPrice,
      "categories": categories[]->title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio,
      description,
      provenance
    }

    `;

    const { data } = await sanityFetch({
        query,
        params: {
            searchQuery,
            selectedCategories
        }
    });

    return data as Artwork[];
}


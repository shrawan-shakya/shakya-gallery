"use server";

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export interface SearchResult {
    _id: string;
    title: string;
    slug: { current: string };
    artist: string;
    mainImage: any;
    status: string;
    price?: number;
}

export async function searchArtworks(term: string): Promise<SearchResult[]> {
    if (!term || term.length < 2) return [];

    // Wildcard search for title, artist, or description
    // We use *[_type == "artwork" && !(_id in path("drafts.**"))] to exclude drafts
    const query = groq`
    *[_type == "artwork" && !(_id in path("drafts.**")) && (
      title match $term + "*" ||
      artist match $term + "*" ||
      description match $term + "*" ||
      material match $term + "*"
    )] | order(title asc) [0...10] {
      _id,
      title,
      slug,
      artist,
      mainImage,
      status,
      price
    }
  `;

    try {
        const results = await client.fetch(query, { term });
        return results;
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

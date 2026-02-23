"use server";

import { getFilteredArtworks } from "@/lib/artworks";
import { Artwork } from "@/lib/types";


export type SearchResult = Artwork;

export async function searchArtworks(term: string): Promise<SearchResult[]> {
  if (!term || term.length < 2) return [];

  return getFilteredArtworks({
    searchQuery: term
  });
}


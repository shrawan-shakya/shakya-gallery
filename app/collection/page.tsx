import { sanityFetch } from "@/sanity/lib/live";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";
import { Suspense } from "react";
import { getFilteredArtworks } from "@/lib/artworks";
import { LoadingGrid } from "@/components/ui/LoadingGrid";

export const metadata: Metadata = {
  title: "Buy Original Fine Art in Nepal | Abstracts, Landscapes & Portraits",
  description: "Browse and buy original fine art paintings from Nepal's master artists. Our collection features exclusive abstracts, serene landscapes, and intimate portraits. Certified authenticity and secure global shipping.",
  alternates: {
    canonical: "https://shakyagallery.com/collection",
  },
};

export const revalidate = 0;

// 1. Fetch Categories (For the Sidebar)
async function getCategories() {
  const query = `
    *[_type == "category"] {
      title,
      type
    }
  `;
  const { data } = await sanityFetch({ query });
  return data;
}

interface Props {
  searchParams: Promise<{
    q?: string;
    category?: string;
    status?: string;
    sort?: string;
  }>;
}

export default async function CollectionPage({ searchParams }: Props) {
  const params = await searchParams;

  const artworks = await getFilteredArtworks({
    searchQuery: params.q,
    selectedCategories: params.category?.split(",").filter(Boolean) || [],
    statusFilter: params.status as any,
    sortOption: params.sort as any
  });

  const categories = await getCategories();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Shakya Gallery Collection",
    "description": "Explore our curated collection of fine art paintings, including abstracts, landscapes, and portraits.",
    "url": "https://shakyagallery.com/collection",
    "numberOfItems": artworks.length,
    "itemListElement": artworks.map((art: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://shakyagallery.com/artwork/${art.slug}`,
      "name": art.title
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">
        <Suspense fallback={<LoadingGrid />}>
          <CollectionClient artworks={artworks} allCategories={categories} />
        </Suspense>
      </div>
    </>
  );
}

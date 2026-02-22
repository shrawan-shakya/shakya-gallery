import { sanityFetch } from "@/sanity/lib/live";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Buy Original Fine Art in Nepal | Abstracts, Landscapes & Portraits",
  description: "Browse and buy original fine art paintings from Nepal's master artists. Our collection features exclusive abstracts, serene landscapes, and intimate portraits. Certified authenticity and secure global shipping.",
  alternates: {
    canonical: "https://shakyagallery.com/collection",
  },
};

// 1. Fetch Artworks
async function getArtworks() {
  const query = `
    *[_type == "artwork"] | order(_createdAt desc) {
      _id,
      title,
      dimensions,
      year,
      artist,
      material,
      status,
      price,
      showPrice,
      "categories": categories[]->title, // Get category names
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
  const { data } = await sanityFetch({ query });
  return data;
}

// 2. Fetch Categories (For the Sidebar)
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

export default async function CollectionPage() {
  const artworks = await getArtworks();
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
      <Suspense fallback={<div className="min-h-screen bg-bone pt-32 px-12 font-serif italic text-soft-black/40">Loading gallery...</div>}>
        <CollectionClient artworks={artworks} allCategories={categories} />
      </Suspense>
    </>
  );
}
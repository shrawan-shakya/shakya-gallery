import { client } from "@/sanity/lib/client";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Original Fine Arts | Abstracts, Landscapes & Portraits",
  description: "Explore our curated collection of fine art paintings. Buy original abstracts, landscapes, portraits, still lifes, and historical scenes from Nepal's finest artists.",
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
      "categories": categories[]->title, // Get category names
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
  return await client.fetch(query);
}

// 2. Fetch Categories (For the Sidebar)
async function getCategories() {
  const query = `
    *[_type == "category"] {
      title,
      type
    }
  `;
  return await client.fetch(query);
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
      <CollectionClient artworks={artworks} allCategories={categories} />
    </>
  );
}
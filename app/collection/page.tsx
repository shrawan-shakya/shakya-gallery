import { client } from "@/sanity/lib/client";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Paintings in Nepal | Curated Collection of Nepali Art",
  description: "Explore our curated selection of original paintings for sale in Nepal. Authentic Paubha, Thangka, and modern works available for acquisition.",
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

  return (
    <main>
      <CollectionClient artworks={artworks} allCategories={categories} />
    </main>
  );
}
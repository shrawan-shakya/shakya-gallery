import { client } from "@/sanity/lib/client";
import { CollectionClient } from "@/components/sections/CollectionClient";

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
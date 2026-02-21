import { sanityFetch } from "@/sanity/lib/live";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
    params: Promise<{ slug: string }>;
}

// 1. Fetch Artworks for Category
async function getArtworks(categorySlug: string) {
    const query = `
    *[_type == "artwork" && references(*[_type == "category" && slug.current == $slug]._id)] | order(_createdAt desc) {
      _id,
      title,
      dimensions,
      year,
      artist,
      material,
      status,
      price,
      "categories": categories[]->title,
      "slug": slug.current,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
    const { data } = await sanityFetch({ query, params: { slug: categorySlug } });
    return data;
}

// 2. Fetch Category Info
async function getCategory(slug: string) {
    const query = `*[_type == "category" && slug.current == $slug][0] { title, description }`;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data;
}

// 3. Fetch All Categories for Sidebar
async function getAllCategories() {
    const query = `*[_type == "category"] { title, type }`;
    const { data } = await sanityFetch({ query });
    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategory(slug);

    if (!category) return { title: "Category Not Found" };

    return {
        title: `Buy Original ${category.title} Paintings - 20-Year Legacy | SHAKYA Gallery`,
        description: `Explore our curated selection of original ${category.title.toLowerCase()} paintings from Nepal's master artists. Authentic fine art with over 20 years of gallery heritage.`,
        alternates: {
            canonical: `https://shakyagallery.com/collection/${slug}`,
        },
    };
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const category = await getCategory(slug);

    if (!category) return notFound();

    const artworks = await getArtworks(slug);
    const allCategories = await getAllCategories();

    return (
        <Suspense fallback={<div className="min-h-screen bg-bone pt-32 px-12 font-serif italic text-soft-black/40">Loading collection...</div>}>
            <CollectionClient
                artworks={artworks}
                allCategories={allCategories}
                initialCategory={category.title}
            />
        </Suspense>
    );
}

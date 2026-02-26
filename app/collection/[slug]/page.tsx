import { sanityFetch } from "@/sanity/lib/live";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getFilteredArtworks } from "@/lib/artworks";
import { Artwork, Category } from "@/lib/types";
import { LoadingGrid } from "@/components/ui/LoadingGrid";


interface Props {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{
        q?: string;
        category?: string;
        status?: string;
        sort?: string;
    }>;
}

// 1. Fetch Category Info
async function getCategory(slug: string) {
    const query = `*[_type == "category" && slug.current == $slug][0] { title, description }`;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data;
}

// 2. Fetch All Categories for Sidebar
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

export default async function CategoryPage({ params, searchParams }: Props) {
    const { slug } = await params;
    const sParams = await searchParams;
    const category = await getCategory(slug);

    if (!category) return notFound();

    // Merge URL categories with the slug-based category
    const urlParam = sParams.category;
    let urlCategories = [];
    if (urlParam) {
        const parts = urlParam.split(",");
        for (const p of parts) if (p) urlCategories.push(p);
    }

    const selectedCategories = Array.from(new Set([category.title, ...urlCategories]));

    const artworks = await getFilteredArtworks({
        searchQuery: sParams.q,
        selectedCategories: selectedCategories,
        statusFilter: sParams.status as any,
        sortOption: sParams.sort as any
    });

    const allCategories = await getAllCategories();

    return (
        <div className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">
            <div className="mb-12 md:mb-16 flex flex-col items-center text-center">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-soft-black mb-4">{category.title}</h1>
                {category.description && (
                    <p className="font-sans text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
                        {category.description}
                    </p>
                )}
            </div>
            <Suspense fallback={<LoadingGrid />}>
                <CollectionClient
                    artworks={artworks}
                    allCategories={allCategories}
                    initialCategory={category.title}
                />
            </Suspense>
        </div>
    );
}


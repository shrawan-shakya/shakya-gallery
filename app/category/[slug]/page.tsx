import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CollectionClient } from "@/components/sections/CollectionClient";
import { Suspense } from "react";
import { getFilteredArtworks } from "@/lib/artworks";
import { LoadingGrid } from "@/components/ui/LoadingGrid";

export const dynamicParams = true;
export const revalidate = 0;

// FETCH SLUGS FOR STATIC GENERATION
export async function generateStaticParams() {
  const query = `*[_type == "category"] { "slug": slug.current }`;
  const categories = await sanityFetch({ query, perspective: "published" });
  return categories.data.map((cat: { slug: string }) => ({
    slug: cat.slug,
  }));
}

// FETCH CATEGORY INFO
async function getCategory(slug: string) {
  const query = `*[_type == "category" && slug.current == $slug][0] { 
      title, 
      description
    }`;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

// FETCH ALL CATEGORIES FOR SIDEBAR
async function getAllCategories() {
  const query = `*[_type == "category"] { title, type }`;
  const { data } = await sanityFetch({ query });
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: "Category Not Found | SHAKYA Gallery",
    };
  }

  return {
    title: `${category.title} Artworks | SHAKYA Gallery`,
    description:
      category.description ||
      `Browse our collection of original ${category.title} artworks. Authentic Nepali art for sale at SHAKYA Gallery.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return notFound();

  // Fetch all artworks and categories for the CollectionClient (Filters Logic)
  const artworks = await getFilteredArtworks({});
  const allCategories = await getAllCategories();

  return (
    <div className="bg-bone min-h-screen pt-32 lg:pt-40 pb-20 px-6 md:px-12">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 md:mb-24 px-6 animate-in fade-in duration-1000">
        <nav className="flex flex-wrap items-baseline justify-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 mb-8">
          <Link href="/" className="hover:text-soft-black transition-colors">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <Link
            href="/collection"
            className="hover:text-soft-black transition-colors"
          >
            Collection
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-soft-black border-b border-black/20 pb-0.5">
            {category.title}
          </span>
        </nav>

        <h1 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-soft-black leading-tight mb-8 uppercase">
          {category.title}
        </h1>
        <div className="max-w-2xl">
          <p className="font-serif text-lg md:text-xl italic text-soft-black/80 leading-relaxed">
            {category.description ||
              `"A curated selection of ${category.title} from our gallery."`}
          </p>
        </div>
      </div>

      {/* COLLECTION/FILTER SECTION */}
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

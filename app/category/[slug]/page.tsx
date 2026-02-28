import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GalleryGridClient } from "@/components/sections/GalleryGridClient";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";

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

// FETCH CATEGORY AND ITS ARTWORKS
async function getCategoryData(slug: string) {
    const query = `
    *[_type == "category" && slug.current == $slug][0] {
      title,
      description,
      "artworks": *[_type == "artwork" && references(^._id)] | order(_updatedAt desc) {
        _id,
        title,
        dimensions,
        year,
        artist,
        material,
        status,
        price,
        showPrice,
        startingPrice,
        "slug": slug.current,
        "imageUrl": mainImage.asset->url,
        "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
      }
    }
  `;
    const { data } = await sanityFetch({ query, params: { slug } });
    return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getCategoryData(slug);

    if (!data) {
        return {
            title: "Category Not Found | SHAKYA Gallery",
        };
    }

    return {
        title: `${data.title} Artworks | SHAKYA Gallery`,
        description: data.description || `Browse our collection of original ${data.title} artworks. Authentic Nepali art for sale at SHAKYA Gallery.`,
        alternates: {
            canonical: `/category/${slug}`,
        },
    };
}

export default async function CategoryPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const data = await getCategoryData(slug);

    if (!data) return notFound();

    return (
        <div className="bg-bone min-h-screen pt-32 lg:pt-40">

            {/* HEADER SECTION */}
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-16 md:mb-24 px-6 animate-in fade-in duration-1000">
                <nav className="flex flex-wrap items-baseline justify-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 mb-8">
                    <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
                    <span className="text-gray-500">/</span>
                    <Link href="/collection" className="hover:text-soft-black transition-colors">Collection</Link>
                    <span className="text-gray-500">/</span>
                    <span className="text-soft-black border-b border-black/20 pb-0.5">{data.title}</span>
                </nav>

                <h1 className="font-serif text-4xl md:text-6xl tracking-[0.1em] text-soft-black leading-tight mb-8 uppercase">
                    {data.title}
                </h1>
                <div className="max-w-2xl">
                    <p className="font-serif text-lg md:text-xl italic text-soft-black/80 leading-relaxed">
                        {data.description || `"A curated selection of ${data.title} from our gallery."`}
                    </p>
                </div>
            </div>

            {/* GRID SECTION */}
            <SectionErrorBoundary sectionName="Category Grid">
                <GalleryGridClient artworks={data.artworks || []} />
            </SectionErrorBoundary>

        </div>
    );
}

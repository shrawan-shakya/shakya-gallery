import { client } from "@/sanity/lib/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Journal | Insights on Fine Art & Collecting | SHAKYA",
    description: "Explore 'The Journal' by Shakya Gallery. Expert guides on buying art, artist spotlights, and market insights for the discerning collector.",
};

// 1. Fetch Articles
async function getArticles() {
    const query = `
    *[_type == "article"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      category,
      "imageUrl": mainImage.asset->url
    }
  `;
    return await client.fetch(query);
}

// 2. Helper Components
const ArticleCard = ({ article, index }: { article: any; index: number }) => {
    return (
        <Link
            href={`/journal/${article.slug}`}
            className="group block"
        >
            <div className="flex flex-col gap-4">
                {/* Image Container with Zoom Effect */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {article.imageUrl ? (
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400 font-sans tracking-widest uppercase text-xs">
                            No Image
                        </div>
                    )}
                    {/* Category Badge */}
                    {article.category && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1">
                            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-soft-black">
                                {article.category}
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="font-sans text-[10px] tracking-widest uppercase text-gray-400">
                            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </span>
                    </div>

                    <h3 className="font-serif text-2xl text-soft-black leading-tight group-hover:text-gray-600 transition-colors">
                        {article.title}
                    </h3>

                    {article.excerpt && (
                        <p className="font-sans text-sm text-gray-500 leading-relaxed line-clamp-2">
                            {article.excerpt}
                        </p>
                    )}

                    <span className="inline-block font-sans text-[10px] tracking-[0.2em] uppercase border-b border-black/20 pb-1 group-hover:border-black transition-colors pt-2">
                        Read Article
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default async function JournalPage() {
    const articles = await getArticles();

    const featured = articles[0]; // The latest article
    const others = articles.slice(1);

    return (
        <main className="min-h-screen bg-bone pt-32 pb-20">

            {/* 1. HEADER */}
            <div className="t-container text-center mb-20 px-6">
                <p className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">
                    Curated Insights
                </p>
                <h1 className="font-serif text-5xl md:text-7xl text-soft-black leading-none mb-8">
                    THE <span className="italic">JOURNAL</span>
                </h1>
                <p className="font-serif text-xl italic text-gray-500 max-w-2xl mx-auto">
                    "A dedicated space for the art of collecting, storytelling, and appreciation."
                </p>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* 2. EMPTY STATE */}
                {articles.length === 0 && (
                    <div className="py-20 text-center border-y border-black/5">
                        <p className="font-sans text-sm text-gray-500 tracking-wide">
                            No articles published yet. Check back soon.
                        </p>
                    </div>
                )}

                {/* 3. FEATURED ARTICLE (If exists) */}
                {featured && (
                    <div className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <Link href={`/journal/${featured.slug}`} className="block relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden group">
                            {featured.imageUrl ? (
                                <Image
                                    src={featured.imageUrl}
                                    alt={featured.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                        </Link>
                        <div className="flex flex-col justify-center items-start lg:pl-12">
                            <span className="font-sans text-xs tracking-[0.2em] text-red-800 uppercase mb-6">
                                Latest Entry
                            </span>
                            <h2 className="font-serif text-4xl md:text-6xl text-soft-black leading-none mb-6">
                                <Link href={`/journal/${featured.slug}`} className="hover:text-gray-600 transition-colors">
                                    {featured.title}
                                </Link>
                            </h2>
                            <p className="font-sans text-base text-gray-500 leading-relaxed mb-8 max-w-md">
                                {featured.excerpt}
                            </p>
                            <Link href={`/journal/${featured.slug}`} className="px-8 py-3 bg-soft-black text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors">
                                Read Full Story
                            </Link>
                        </div>
                    </div>
                )}

                {/* 4. THE GRID */}
                {others.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 border-t border-black/10 pt-16">
                        {others.map((article: any, i: number) => (
                            <ArticleCard key={article.slug} article={article} index={i} />
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}

import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { ContentBody } from "@/components/ui/ContentBody";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Fetch Article
async function getArticle(slug: string) {
    const query = `
    *[_type == "article" && slug.current == $slug][0] {
      title,
      publishedAt,
      excerpt,
      category,
      body,
      mainImage
    }
  `;
    return await client.fetch(query, { slug });
}

// 2. Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return { title: "Article Not Found" };

    return {
        title: `${article.title} | The Journal by SHAKYA`,
        description: article.excerpt,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            images: article.mainImage?.asset ? [urlForImage(article.mainImage).url()] : [],
            type: "article",
            publishedTime: article.publishedAt,
        }
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) return notFound();

    return (
        <article className="min-h-screen bg-bone pt-32 pb-24">

            {/* HEADER */}
            <div className="max-w-3xl mx-auto px-6 text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-8">
                    <Link href="/journal" className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 hover:text-soft-black transition-colors">
                        The Journal
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-red-800">
                        {article.category || "Article"}
                    </span>
                </div>

                <h1 className="font-serif text-4xl md:text-6xl text-soft-black leading-tight mb-8">
                    {article.title}
                </h1>

                <p className="font-sans text-xs tracking-widest uppercase text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString(undefined, { dateStyle: "long" })}
                </p>
            </div>

            {/* HERO IMAGE */}
            {article.mainImage?.asset && (
                <div className="w-full max-w-[1200px] mx-auto px-6 mb-16">
                    <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm bg-gray-100">
                        <Image
                            src={urlForImage(article.mainImage).url()}
                            alt={article.mainImage.alt || article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* CONTENT */}
            <div className="max-w-2xl mx-auto px-6">
                {article.excerpt && (
                    <p className="font-serif text-xl md:text-2xl text-gray-600 italic leading-relaxed mb-12 border-b border-black/10 pb-12">
                        {article.excerpt}
                    </p>
                )}

                <div className="prose prose-stone max-w-none">
                    <ContentBody content={article.body} />
                </div>

                {/* FOOTER NAV */}
                <div className="mt-20 pt-12 border-t border-black/10 flex justify-between items-center">
                    <Link href="/journal" className="font-sans text-xs tracking-[0.2em] uppercase text-soft-black hover:opacity-60 transition-opacity">
                        ← Back to Journal
                    </Link>
                </div>
            </div>

        </article>
    );
}

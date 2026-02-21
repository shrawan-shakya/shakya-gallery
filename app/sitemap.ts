import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url;

    // 1. Static Pages
    const routes = [
        { url: "", priority: 1.0, changeFrequency: "weekly" as const },
        { url: "/collection", priority: 0.9, changeFrequency: "weekly" as const },
        { url: "/journal", priority: 0.8, changeFrequency: "weekly" as const },
        { url: "/guide/buying-art", priority: 0.8, changeFrequency: "monthly" as const },
        { url: "/legacy", priority: 0.7, changeFrequency: "yearly" as const },
        { url: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
    ].map((route) => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // 2. Dynamic Content (Artworks & Journal)
    const query = `{
        "artworks": *[_type == "artwork"] { "slug": slug.current, _updatedAt },
        "articles": *[_type == "article"] { "slug": slug.current, _updatedAt },
        "categories": *[_type == "category"] { "slug": slug.current, _updatedAt }
    }`;
    const data = await client.fetch(query);

    const artworkRoutes = data.artworks.map((art: any) => ({
        url: `${baseUrl}/artwork/${art.slug}`,
        lastModified: new Date(art._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    const articleRoutes = data.articles.map((post: any) => ({
        url: `${baseUrl}/journal/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    const categoryRoutes = data.categories.map((cat: any) => ({
        url: `${baseUrl}/collection/${cat.slug}`,
        lastModified: new Date(cat._updatedAt || new Date()),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    return [...routes, ...artworkRoutes, ...articleRoutes, ...categoryRoutes];
}

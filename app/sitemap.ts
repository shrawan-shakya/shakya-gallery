import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://shakyagallery.com";

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

    // 2. Dynamic Artworks
    const query = `*[_type == "artwork"] { "slug": slug.current, _updatedAt }`;
    const artworks = await client.fetch(query);

    const artworkRoutes = artworks.map((art: any) => ({
        url: `${baseUrl}/artwork/${art.slug}`,
        lastModified: new Date(art._updatedAt),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    return [...routes, ...artworkRoutes];
}

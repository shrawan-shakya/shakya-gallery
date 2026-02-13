import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://shakyagallery.com";

    // 1. Static Pages
    const routes = [
        "",
        "/collection",
        "/contact",
        "/legacy",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1 : 0.8,
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

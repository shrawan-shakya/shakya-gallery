import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import { RelatedArtworks } from "@/components/artwork/RelatedArtworks";
import Link from "next/link";

const builder = urlBuilder({ projectId, dataset });
const urlFor = (source: any) => builder.image(source);

export const revalidate = 0;

export async function generateStaticParams() {
  const query = `*[_type == "artist"] { "slug": slug.current }`;
  const artists = await sanityFetch({ query, perspective: "published" });
  return artists.data
    .filter((a: any) => a.slug)
    .map((artist: { slug: string }) => ({
      slug: artist.slug,
    }));
}

async function getArtist(slug: string) {
  const query = `
    *[_type == "artist" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      image,
      bio,
      specialties,
      socialLinks
    }
  `;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

async function getArtistArtworks(artistId: string) {
  const query = `
    *[_type == "artwork" && references($artistId)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset,
      "imageUrl": mainImage.asset->url,
      "lqip": mainImage.asset->metadata.lqip,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio,
      price,
      showPrice,
      startingPrice,
      status,
      "artist": coalesce(artist->name, artist),
      year
    }
  `;
  const { data } = await sanityFetch({ query, params: { artistId } });
  return data;
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artist = await getArtist(slug);

  if (!artist) return notFound();

  const artworks = await getArtistArtworks(artist._id);

  return (
    <div className="min-h-screen bg-bone pt-24 lg:pt-32 pb-40">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <Link
          href="/collection"
          className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase hover:text-soft-black transition-colors mb-8 inline-block"
        >
          ← Back to Collection
        </Link>
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-start text-center md:text-left">
          {artist.image && (
            <div className="relative w-48 h-48 md:w-64 md:h-64 shrink-0 overflow-hidden rounded-full shadow-sm border border-black/5">
              <Image
                src={urlFor(artist.image).width(800).height(800).url()}
                alt={artist.name || "Artist"}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-6 items-center md:items-start">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-soft-black leading-[1.1] tracking-tight">
              {artist.name}
            </h1>
            
            {artist.specialties && artist.specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {artist.specialties.map((spec: string) => (
                  <span
                    key={spec}
                    className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 bg-white px-3 py-1 border border-black/5"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {artist.bio && (
              <div className="prose prose-sm md:prose-base font-sans font-light text-gray-600 leading-relaxed text-justify md:text-left max-w-none">
                <PortableText value={artist.bio} />
              </div>
            )}

            {artist.socialLinks && artist.socialLinks.length > 0 && (
              <div className="flex gap-4 mt-2 justify-center md:justify-start">
                {artist.socialLinks.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-soft-black hover:text-gray-500 transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {artworks.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 border-t border-black/[0.04]">
          <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 font-semibold mb-10 text-center">
            Selected Works by {artist.name}
          </h2>
          <RelatedArtworks artworks={artworks} />
        </div>
      )}
    </div>
  );
}

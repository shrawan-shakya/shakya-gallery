import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { ScanClient } from "./ScanClient";
import Image from "next/image";

async function getScanArtwork(slug: string) {
  const query = `
    *[_type == "artwork" && slug.current == $slug][0] {
      _id,
      title,
      artist,
      currentLocation,
      "mainImage": {
        "url": mainImage.asset->url,
        "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio,
        "lqip": mainImage.asset->metadata.lqip
      }
    }
  `;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

export default async function ScanPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = await getScanArtwork(slug);

  if (!art) return notFound();

  return (
    <div className="min-h-screen bg-bone flex flex-col items-center pt-28 pb-12 px-6 lg:p-12 lg:justify-center relative overflow-hidden">
      {/* Background Blur */}
      {art.mainImage?.url && (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src={art.mainImage.url}
            alt={art.title}
            fill
            className="object-cover blur-[80px]"
            priority
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-md bg-white shadow-2xl p-8 md:p-12 flex flex-col gap-8 rounded-sm border border-black/[0.03]">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-12 h-[1px] bg-frame-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl md:text-3xl text-soft-black leading-tight">
            {art.title}
          </h1>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500">
            By {art.artist}
          </p>
          {art.currentLocation && (
            <p className="font-sans text-[9px] mt-4 tracking-wider uppercase text-frame-gold italic bg-frame-gold/5 py-2 px-4 inline-block">
              Currently featured at {art.currentLocation}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        {art.mainImage?.url && (
          <div className="relative w-full aspect-square border-4 border-white shadow-md bg-bone mx-auto max-w-[200px] overflow-hidden">
            <Image
              src={art.mainImage.url}
              alt={art.title}
              fill
              className="object-cover"
              sizes="200px"
            />
          </div>
        )}

        <ScanClient
          artworkId={art._id}
          artworkTitle={art.title}
          slug={slug}
          currentLocation={art.currentLocation}
        />
      </div>
    </div>
  );
}

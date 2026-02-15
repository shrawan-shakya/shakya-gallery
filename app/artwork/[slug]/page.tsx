import { client } from "@/sanity/lib/client";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArtworkInquiry } from "@/components/ArtworkInquiry";

// FETCH DATA
async function getArtwork(slug: string) {
  const query = `
    *[_type == "artwork" && slug.current == $slug][0] {
      title,
      sku, 
      year,
      dimensions,
      material,
      description,
      artist,
      status, 
      price,
      "imageUrl": mainImage.asset->url,
      "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
    }
  `;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = await getArtwork(slug);

  if (!art) {
    return {
      title: "Artwork Not Found | SHAKYA Gallery",
    };
  }

  return {
    title: `${art.title} by ${art.artist} | Buy Original Art in Nepal`,
    description: `Buy ${art.title}, an original artwork by ${art.artist}. ${art.material}, ${art.year}. Available at Shakya Gallery, Nepal's premier art destination.`,
    openGraph: {
      title: `${art.title} (${art.year}) | SHAKYA Gallery`,
      description: `View ${art.title} by ${art.artist}. ${art.dimensions}. Available now.`,
      images: [art.imageUrl],
      type: "article",
    },
  };
}

export default async function ArtworkPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const art = await getArtwork(slug);

  if (!art) return notFound();

  const isSold = art.status === "sold" || art.status === "private";

  // Reusable Breadcrumbs
  const Breadcrumbs = ({ className }: { className?: string }) => (
    <nav className={`flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 ${className}`}>
      <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
      <span className="text-gray-300">/</span>
      <Link href="/collection" className="hover:text-soft-black transition-colors">Collection</Link>
      <span className="text-gray-300">/</span>
      <span className="text-soft-black line-clamp-1 border-b border-black/20 pb-0.5">Current Work</span>
    </nav>
  );

  // JSON-LD for Artwork/Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["VisualArtwork", "Product"],
    "name": art.title,
    "image": art.imageUrl,
    "description": art.description,
    "sku": art.sku || art._id,
    "brand": {
      "@type": "Brand",
      "name": "Shakya Gallery"
    },
    "creator": {
      "@type": "Person",
      "name": art.artist
    },
    "artMedium": art.material,
    "artDimensions": art.dimensions,
    "dateCreated": art.year
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-bone pt-24 lg:pt-28 pb-40">


        {/* MOBILE BREADCRUMBS */}
        <div className="lg:hidden px-6 mb-10">
          <Breadcrumbs />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 px-6 md:px-12 max-w-[1400px] mx-auto">

          {/* LEFT COLUMN: The Art */}
          <div className="relative flex items-start justify-center lg:h-[calc(100vh-200px)] lg:sticky lg:top-32">
            {/* 
            SIZER WRAPPER STRATEGY:
            1. Wrapper is relative inline-block (or flex center).
            2. We render a "Sizer Image" (opacity-0) that has natural aspect ratio.
            3. We restrain the Sizer Image with `max-w-full` (for width limit) AND `max-h-[60vh]` (for height limit).
            4. The wrapper naturally shrinks to fit the Sizer Image.
            5. The MuseumFrame is `absolute inset-0`, perfectly covering the Sizer Image.
          */}
            <div className="relative shadow-2xl my-12 lg:my-0 flex-none bg-bone max-w-full">

              {/* THE SIZER (Invisible, drives dimensions) */}
              {art.imageUrl && (
                <img
                  src={art.imageUrl}
                  alt="sizer"
                  className="w-auto h-auto max-w-full max-h-[85vh] opacity-0 relative z-0 pointer-events-none block"
                />
              )}

              {/* THE FRAME (Visible, absolute overlay) */}
              <div className="absolute inset-0 z-10 w-full h-full">
                <MuseumFrame aspectRatio={art.aspectRatio}>
                  {art.imageUrl && (
                    <div className="absolute inset-0 w-full h-full">
                      <Image
                        src={art.imageUrl}
                        alt={art.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </MuseumFrame>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: The Story */}
          <div className="flex flex-col justify-start lg:pl-20 min-h-[50vh]">

            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-lg">

              {/* 1. HEADER */}
              <div className="flex flex-col gap-2">
                <Breadcrumbs className="hidden lg:flex mb-8" />

                {/* SOLD INDICATOR */}
                {art.status === "sold" && (
                  <div className="flex items-center gap-3 mb-6">
                    <span className="font-serif font-bold italic text-2xl text-white bg-[#7D1818] px-6 py-2 -rotate-12 tracking-widest shadow-lg">
                      SOLD
                    </span>
                  </div>
                )}

                <h1 className="font-serif text-3xl md:text-5xl text-soft-black leading-none">
                  {art.title}
                </h1>
                <div className="flex justify-between items-baseline mt-2">
                  <p className="font-serif italic text-xl md:text-2xl text-gray-500">
                    {art.artist}, {art.year}
                  </p>

                  {!isSold && art.price && (
                    <p className="font-sans text-lg text-soft-black">
                      ${art.price.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* 2. TECHNICAL DETAILS */}
              <div className="grid grid-cols-2 gap-x-8 py-6 border-y border-black/5">
                <div>
                  <p className="font-sans text-[11px] tracking-widest uppercase text-gray-400 mb-1">Material</p>
                  <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.material || "Mixed Media"}</p>
                </div>
                <div>
                  <p className="font-sans text-[11px] tracking-widest uppercase text-gray-400 mb-1">Dimensions</p>
                  <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.dimensions || "Variable"}</p>
                </div>
              </div>

              {/* 3. THE ACTION AREA (Moved Up) */}
              <div className="py-2">
                {isSold ? (
                  // OPTION A: SOLD MESSAGE
                  <div className="bg-black/[0.03] p-8 border border-black/5 flex flex-col gap-4">
                    <div>
                      <h3 className="font-serif text-xl text-soft-black italic mb-1">Looking for something similar?</h3>
                      <p className="font-sans text-[11px] leading-relaxed text-gray-500 tracking-wide">
                        While this specific work has been acquired, our curation team specializes in sourcing rare pieces similar to this one.
                      </p>
                    </div>
                    <div className="pt-2">
                      <ArtworkInquiry artwork={art} isSold={true} />
                    </div>
                  </div>
                ) : (
                  // OPTION B: AVAILABLE
                  <ArtworkInquiry artwork={art} isSold={false} />
                )}
              </div>

              {/* 4. THE NARRATIVE */}
              <div className="space-y-4 pt-4 border-t border-black/5">
                <h3 className="font-serif text-xl italic text-soft-black">About The Artwork</h3>
                <div className="font-sans font-light text-sm leading-[2.2] tracking-wide text-gray-600 text-justify">
                  {art.description}
                </div>
              </div>

              {/* 5. STATIC INFORMATION */}
              <div className="space-y-6 pt-8 border-t border-black/5">
                <div className="space-y-2">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Authenticity</h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    Every acquisition is accompanied by a Certificate of Authenticity signed by the Shakya Gallery curation team, guaranteeing the provenance and originality of the work.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Shipping & Insurance</h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    We provide specialized art logistics for global delivery. Each piece is custom crated and fully insured during transit. Shipping costs are calculated based on destination and will be provided in your personalized quote.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
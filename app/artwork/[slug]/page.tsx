import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArtworkInquiry } from "@/components/ArtworkInquiry";
import { ArtworkGallery } from "@/components/artwork/ArtworkGallery";

export const dynamicParams = true; // Ensure new items show up immediately

// FETCH SLUGS FOR STATIC GENERATION
export async function generateStaticParams() {
  const query = `*[_type == "artwork"] { "slug": slug.current }`;
  const artworks = await sanityFetch({ query, perspective: "published" });
  return artworks.data.map((art: { slug: string }) => ({
    slug: art.slug,
  }));
}

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
      showPrice,
      orientation,
      "mainImage": {
        "url": mainImage.asset->url,
        "aspectRatio": mainImage.asset->metadata.dimensions.aspectRatio
      },
      "relatedImages": relatedImages[]{
        "url": asset->url,
        "aspectRatio": asset->metadata.dimensions.aspectRatio
      }
    }
  `;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const art = await getArtwork(slug);

  if (!art) {
    return {
      title: "Artwork Not Found | SHAKYA Gallery",
    };
  }

  const artist = art.artist || "Master Artist";
  const material = art.material || "Fine Art";
  const title = `${art.title} by ${artist} | Original Nepali Art`;

  const description = art.description ?
    art.description.length > 160 ? `${art.description.substring(0, 157)}...` : art.description
    : `Buy ${art.title}, an original ${material} painting by ${artist}. Authentic Nepali art for sale at SHAKYA Gallery.`;

  return {
    title: `${title} | SHAKYA Gallery`,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: art.mainImage.url,
          width: 1200,
          height: 630,
          alt: art.title,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [art.mainImage.url],
    }
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
    <nav className={`flex flex-wrap items-baseline gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 ${className}`}>
      <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
      <span className="text-gray-300">/</span>
      <Link href="/collection" className="hover:text-soft-black transition-colors">Collection</Link>
      <span className="text-gray-300">/</span>
      <span className="text-soft-black border-b border-black/20 pb-0.5">Current Work</span>
    </nav>
  );

  // JSON-LD for Artwork/Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["VisualArtwork"],
    "name": art.title,
    "image": art.mainImage.url,
    "description": art.description,
    "sku": art.sku || art._id,
    "brand": {
      "@type": "Brand",
      "name": "Shakya Gallery"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://shakyagallery.com/artwork/${slug}`,
      "priceCurrency": "USD",
      "price": art.price,
      "availability": isSold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "creator": {
      "@type": "Person",
      "name": art.artist
    },
    "artMedium": art.material,
    "artDimensions": art.dimensions,
    "dateCreated": art.year,
    "material": art.material
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-bone pt-24 lg:pt-28 pb-40">


        {/* MOBILE BREADCRUMBS */}
        <div className="max-w-[1400px] mx-auto px-6 lg:hidden mb-10">
          <Breadcrumbs />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 px-6 md:px-12 max-w-[1400px] mx-auto">

          {/* LEFT COLUMN: The Art */}
          <div className="relative flex flex-col items-center justify-start lg:h-auto lg:sticky lg:top-32 gap-12 hover:group">

            <ArtworkGallery
              mainImage={art.mainImage}
              relatedImages={art.relatedImages}
              title={art.title}
              orientation={art.orientation}
            />

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

                <h1 className="font-serif text-2xl md:text-4xl text-soft-black leading-tight line-clamp-2 mt-4 md:mt-6">
                  {art.title}
                </h1>
                <div className="flex justify-between items-baseline mt-2 mb-6">
                  <p className="font-serif italic text-xl md:text-2xl text-gray-500">
                    {art.artist}, {art.year}
                  </p>
                </div>

                {/* MOVED PRICE (Now respects showPrice toggle) */}
                {!isSold && art.showPrice && art.price && (
                  <div className="mb-2">
                    <p className="font-serif text-3xl md:text-4xl text-soft-black">
                      ${art.price.toLocaleString()}
                    </p>
                  </div>
                )}
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

              {/* 5. FROM THE GALLERY (INTERNAL LINK HUB) */}
              <div className="pt-8 border-t border-black/5">
                <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-6">From The Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link href="/legacy" className="group p-4 bg-white border border-black/5 hover:border-black/20 transition-all">
                    <h4 className="font-serif text-lg italic text-soft-black mb-1 group-hover:text-soft-black/70 transition-colors">Our 20-Year Legacy</h4>
                    <p className="font-sans text-[10px] tracking-wider text-gray-400 uppercase">Learn about our heritage</p>
                  </Link>
                  <Link href="/guide/buying-art" className="group p-4 bg-white border border-black/5 hover:border-black/20 transition-all">
                    <h4 className="font-serif text-lg italic text-soft-black mb-1 group-hover:text-soft-black/70 transition-colors">Art Advisory</h4>
                    <p className="font-sans text-[10px] tracking-wider text-gray-400 uppercase">Collector's Guide</p>
                  </Link>
                </div>
              </div>

              {/* 6. STATIC INFORMATION */}
              <div className="space-y-6 pt-8 border-t border-black/5">
                <div className="space-y-2">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Presentation & Shipping</h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    To ensure maximum protection during transit, this painting arrives unframed and carefully rolled in a heavy-duty protective tube. This is the industry standard for high-value fine art, minimizing risk and optimizing international transport.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Authenticity</h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    Every acquisition is accompanied by a Certificate of Authenticity signed by the Shakya Gallery curation team, guaranteeing the provenance and originality of the work.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Shipping & Optional Framing</h4>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    We provide specialized art logistics for global delivery. While paintings ship tubed by default, custom museum-grade framing is available upon request. Mounting and framing will incur additional costs for the frame itself and increased weight-based shipping. Contact us for a bespoke framing quote.
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
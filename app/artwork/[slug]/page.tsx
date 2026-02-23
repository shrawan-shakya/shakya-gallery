import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArtworkGallery } from "@/components/artwork/ArtworkGallery";
import { PortableText } from "@portabletext/react";
import { ArtworkActions } from "@/components/artwork/ArtworkActions";
import { ArtworkTabs } from "@/components/artwork/ArtworkTabs";



export const dynamicParams = true;

const components = {
  block: {
    h1: ({ children }: any) => <h1 className="font-serif text-3xl md:text-4xl text-soft-black mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="font-serif text-2xl md:text-3xl text-soft-black mb-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="font-serif text-xl md:text-2xl text-soft-black mb-2 italic">{children}</h3>,
    normal: ({ children }: any) => <p className="font-sans font-light text-sm leading-[2.2] tracking-wide text-gray-600 text-justify mb-6">{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="ml-6 list-disc space-y-2 mb-6 font-sans text-sm text-soft-black">{children}</ul>,
    number: ({ children }: any) => <ol className="ml-6 list-decimal space-y-2 mb-6 font-sans text-sm text-soft-black">{children}</ol>,
  },
};


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
      provenance,
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

  // Extract a plain text snippet for the meta description
  const plainTextDescription = Array.isArray(art.description)
    ? art.description
      .map((block: any) => block._type === 'block' ? block.children?.map((child: any) => child.text).join('') : '')
      .join(' ')
      .trim()
    : "";

  const description = plainTextDescription
    ? plainTextDescription.length > 160 ? `${plainTextDescription.substring(0, 157)}...` : plainTextDescription
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
    <nav className={`flex flex-wrap items-baseline gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 ${className}`}>
      <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
      <span className="text-gray-500">/</span>
      <Link href="/collection" className="hover:text-soft-black transition-colors">Collection</Link>
      <span className="text-gray-500">/</span>
      <span className="text-soft-black border-b border-black/20 pb-0.5">Current Work</span>
    </nav>
  );

  // Extract plain text for JSON-LD description
  const plainTextDescription = Array.isArray(art.description)
    ? art.description
      .map((block: any) => block._type === 'block' ? block.children?.map((child: any) => child.text).join('') : '')
      .join(' ')
      .trim()
    : "";

  // JSON-LD for VisualArtwork (Resolves Search Console E-commerce Errors)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    "name": art.title,
    "image": art.mainImage.url,
    "description": plainTextDescription,

    "creator": [
      {
        "@type": "Person",
        "name": art.artist
      }
    ],
    "artMedium": art.material,
    "artDimensions": art.dimensions,
    "dateCreated": art.year,
    "material": art.material,
    "publisher": {
      "@type": "Organization",
      "name": "Shakya Gallery"
    }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 px-6 md:px-12 max-w-[1400px] mx-auto items-start">

          {/* BLOCK 1: GALLERY (Mob: 1, Desk: Col 1) */}
          <div className="lg:col-start-1 lg:row-start-1">
            <ArtworkGallery
              mainImage={art.mainImage}
              relatedImages={art.relatedImages}
              title={art.title}
              orientation={art.orientation}
            />
          </div>

          {/* BLOCK 2: TITLE SECTION (Mob: 2, Desk: Col 2) */}
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {/* Header */}
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

                <h1 className="font-serif text-2xl md:text-4xl text-soft-black leading-tight mt-4 md:mt-6">
                  {art.title}
                </h1>
                <div className="flex justify-between items-baseline mt-2 mb-6">
                  <p className="font-serif italic text-xl md:text-2xl text-soft-black">
                    {art.artist}, {art.year}
                  </p>
                </div>

                {!isSold && art.showPrice && art.price && (
                  <div className="mb-2">
                    <p className="font-serif text-3xl md:text-4xl text-soft-black">
                      ${art.price.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-2 gap-x-8 py-6 border-y border-black/5">
                <div>
                  <p className="font-sans text-[11px] tracking-widest uppercase text-gray-800 mb-1">Material</p>
                  <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.material || "Mixed Media"}</p>
                </div>
                <div>
                  <p className="font-sans text-[11px] tracking-widest uppercase text-gray-800 mb-1">Dimensions</p>
                  <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.dimensions || "Variable"}</p>
                </div>
              </div>

              {/* Action Area */}
              <div className="py-2" id="inquiry-section">
                <ArtworkActions artwork={art} isSold={isSold} />
              </div>
            </div>
          </div>

          {/* BLOCK 3: TABS (Mob: 3, Desk: Col 1) */}
          <div className="lg:col-start-1 lg:row-start-2 lg:mt-12 animate-in fade-in duration-1000 delay-300">
            <ArtworkTabs description={art.description} provenance={art.provenance} />
          </div>

          {/* BLOCK 4: FROM THE GALLERY (Mob: 4, Desk: Spans Bottom) */}
          <div className="col-span-1 lg:col-span-2 pt-20 border-t border-black/5 mt-12">
            <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 mb-8 text-center md:text-left">From The Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/legacy" className="group p-8 bg-white border border-black/5 hover:border-black/20 transition-all flex flex-col justify-between min-h-[160px]">
                <div>
                  <h4 className="font-serif text-xl italic text-soft-black mb-2 group-hover:text-soft-black/70 transition-colors">Our 20-Year Legacy</h4>
                  <p className="font-sans text-[10px] tracking-wider text-gray-800 uppercase">Discover the roots of Shakya excellence.</p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 group-hover:text-soft-black mt-4 inline-block">Learn More →</span>
              </Link>
              <Link href="/guide/buying-art" className="group p-8 bg-white border border-black/5 hover:border-black/20 transition-all flex flex-col justify-between min-h-[160px]">
                <div>
                  <h4 className="font-serif text-xl italic text-soft-black mb-2 group-hover:text-soft-black/70 transition-colors">Art Advisory</h4>
                  <p className="font-sans text-[10px] tracking-wider text-gray-800 uppercase">Expert guidance for first-time collectors.</p>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 group-hover:text-soft-black mt-4 inline-block">Collector's Guide →</span>
              </Link>
              {/* Additional Hub links could go here if we expand */}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
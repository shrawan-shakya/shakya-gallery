import { client } from "@/sanity/lib/client";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { notFound } from "next/navigation";
import Link from "next/link";
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
    <nav className={`flex items-center gap-3 font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 ${className}`}>
      <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
      <span className="text-gray-300">/</span>
      <Link href="/collection" className="hover:text-soft-black transition-colors">Collection</Link>
      <span className="text-gray-300">/</span>
      <span className="text-soft-black line-clamp-1 border-b border-black/20 pb-0.5">Current Work</span>
    </nav>
  );

  return (
    <main className="min-h-screen bg-bone pt-32 lg:pt-40 pb-20">
      
      {/* MOBILE BREADCRUMBS */}
      <div className="lg:hidden px-6 mb-10">
        <Breadcrumbs />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* LEFT COLUMN: The Art */}
        <div className="relative flex items-start justify-center lg:h-[calc(100vh-200px)] lg:sticky lg:top-48">
          <div className="relative w-full max-w-xl max-h-[50vh] lg:max-h-[60vh] flex items-center justify-center my-12 lg:my-0">
            <MuseumFrame aspectRatio={art.aspectRatio} className="shadow-2xl h-full w-auto">
              {art.imageUrl && (
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-full object-contain max-h-[50vh] lg:max-h-[60vh]"
                />
              )}
            </MuseumFrame>
          </div>
        </div>

        {/* RIGHT COLUMN: The Story */}
        <div className="flex flex-col justify-start lg:pl-20 lg:border-l border-black/5 min-h-[50vh]">
          
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-lg">
            
            {/* 1. HEADER */}
            <div className="flex flex-col gap-2">
                <Breadcrumbs className="hidden lg:flex mb-8" />
                
                {/* SOLD INDICATOR */}
                {isSold && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span className="font-sans text-[10px] tracking-[0.2em] text-red-800 uppercase font-medium">
                      {art.status === "private" ? "Private Collection" : "Sold"}
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
                    <p className="font-sans text-[9px] tracking-widest uppercase text-gray-400 mb-1">Material</p>
                    <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.material || "Mixed Media"}</p>
                </div>
                <div>
                    <p className="font-sans text-[9px] tracking-widest uppercase text-gray-400 mb-1">Dimensions</p>
                    <p className="font-serif text-base md:text-lg text-soft-black leading-tight">{art.dimensions || "Variable"}</p>
                </div>
            </div>

            {/* 3. THE NARRATIVE */}
            <div className="font-sans font-light text-sm leading-[2.2] tracking-wide text-gray-600 text-justify">
              {art.description}
            </div>

            {/* 4. THE ACTION AREA */}
            <div className="pt-6 pb-12">
              
              {isSold ? (
                // OPTION A: SOLD MESSAGE (Concierge Sourcing)
                <div className="bg-black/[0.03] p-8 border border-black/5 flex flex-col gap-4">
                  <div>
                    <h3 className="font-serif text-xl text-soft-black italic mb-1">Looking for something similar?</h3>
                    <p className="font-sans text-[11px] leading-relaxed text-gray-500 tracking-wide">
                      While this specific work has been acquired, our curation team specializes in sourcing rare pieces similar to this one.
                    </p>
                  </div>
                  
                  {/* --- UPDATED: USES THE POPUP COMPONENT WITH isSold=true --- */}
                  <div className="pt-2">
                    <ArtworkInquiry artwork={art} isSold={true} />
                  </div>

                </div>
              ) : (
                // OPTION B: AVAILABLE (Standard Inquiry)
                <ArtworkInquiry artwork={art} isSold={false} />
              )}

            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
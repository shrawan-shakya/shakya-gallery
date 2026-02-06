import { client } from "@/sanity/lib/client";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { notFound } from "next/navigation";
import Link from "next/link";

// FETCH DATA
async function getArtwork(slug: string) {
  const query = `
    *[_type == "artwork" && slug.current == $slug][0] {
      title,
      year,
      dimensions,
      material,
      description,
      artist,
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

  return (
    // MAIN CONTAINER
    <main className="min-h-screen bg-bone pt-32 lg:pt-40 pb-20">
      
      {/* MOBILE NAV (Hidden on Desktop) */}
      <div className="lg:hidden px-6 mb-6">
        <Link href="/" className="font-sans text-[10px] tracking-widest uppercase text-gray-400 hover:text-soft-black transition-colors block py-2">
          ← Return to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 px-6 md:px-12 max-w-[1400px] mx-auto">
        
        {/* LEFT COLUMN: The Art (Sticky) */}
        <div className="relative flex items-start justify-center lg:h-[calc(100vh-200px)] lg:sticky lg:top-48">
          
          {/* IMAGE CONTAINER 
             - my-12: Adds vertical spacing (top & bottom) ONLY on mobile.
             - lg:my-0: Removes that spacing on desktop so it aligns with the sticky container.
          */}
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

        {/* RIGHT COLUMN: The Story (Scrollable) */}
        <div className="flex flex-col justify-start lg:pl-20 lg:border-l border-black/5 min-h-[50vh]">
          
          <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-lg">
            
            {/* 1. Header */}
            <div className="flex flex-col gap-2">
                <Link href="/" className="hidden lg:block font-sans text-[9px] tracking-[0.2em] uppercase text-gray-400 hover:text-soft-black transition-colors mb-8">
                  ← Gallery
                </Link>
                <h1 className="font-serif text-3xl md:text-5xl text-soft-black leading-none">
                  {art.title}
                </h1>
                <p className="font-serif italic text-xl md:text-2xl text-gray-500 mt-1">
                  {art.artist}, {art.year}
                </p>
            </div>

            {/* 2. Technical Details */}
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

            {/* 3. The Narrative */}
            <div className="font-sans font-light text-sm leading-[2.2] tracking-wide text-gray-600 text-justify">
              {art.description}
            </div>

            {/* 4. The Action */}
            <div className="pt-6 pb-12">
              <a 
                href={`mailto:contact@shakyagallery.com?subject=Inquiry: ${art.title}`}
                className="group inline-flex items-center gap-4 px-0 py-3 border-b border-black hover:border-gray-400 transition-all duration-300 cursor-pointer"
              >
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-soft-black group-hover:text-gray-600 transition-colors">
                  Inquire to Acquire
                </span>
                <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-500">
                  →
                </span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
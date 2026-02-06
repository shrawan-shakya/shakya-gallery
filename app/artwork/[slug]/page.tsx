import { client } from "@/sanity/lib/client";
import { MuseumFrame } from "@/components/ui/MuseumFrame";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque"; // <--- Import it
import { notFound } from "next/navigation";
import Link from "next/link";

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
    <main className="min-h-screen bg-bone flex flex-col items-center justify-center py-24 px-6 md:px-12">
      
      {/* Back Button */}
      <div className="w-full max-w-7xl mb-12">
        <Link href="/" className="font-sans text-[10px] tracking-widest uppercase text-gray-500 hover:text-primary transition-colors">
          ← Return to Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 max-w-7xl w-full items-center">
        
        {/* LEFT: The Art */}
        <div className="w-full sticky top-24">
          <MuseumFrame aspectRatio={art.aspectRatio} className="shadow-2xl">
            {art.imageUrl && (
              <img 
                src={art.imageUrl} 
                alt={art.title} 
                className="w-full h-full object-cover"
              />
            )}
          </MuseumFrame>
        </div>

        {/* RIGHT: The New Plaque */}
        <div className="flex justify-center w-full">
          <MuseumPlaque 
            title={art.title}
            artist={art.artist}
            medium={art.material} // Maps 'material' to 'medium'
            year={art.year}
            dimensions={art.dimensions}// (Placeholder: Sanity doesn't have dimensions yet, you can add them later)
          />
        </div>

      </div>

      {/* Optional: Description below the plaque if you still want the story */}
      <div className="max-w-2xl mx-auto mt-24 text-center">
         <p className="font-serif text-lg leading-loose text-gray-600">
           {art.description}
         </p>
      </div>

    </main>
  );
}
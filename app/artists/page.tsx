import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import urlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = urlBuilder({ projectId, dataset });
const urlFor = (source: any) => builder.image(source);

export const revalidate = 0;

export const metadata = {
  title: "Artists | SHAKYA Gallery",
  description: "Discover the master artists represented by Shakya Gallery.",
};

async function getArtists() {
  const query = `
    *[_type == "artist"] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      image,
      specialties
    }
  `;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="min-h-screen bg-bone pt-32 pb-40 animate-in fade-in duration-1000">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-soft-black mb-6 text-center md:text-left">
          Our Artists
        </h1>
        <p className="font-sans font-light text-gray-600 max-w-2xl text-center md:text-left text-sm md:text-base leading-relaxed">
          Discover the master painters and sculptors behind the collection. Each artist represents the pinnacle of traditional Himalayan craftsmanship and contemporary expression.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {artists.map((artist: any) => (
          <Link
            key={artist._id}
            href={`/artist/${artist.slug || "#"}`}
            className="group flex flex-col items-center sm:items-start text-center sm:text-left gap-6 p-8 bg-white border border-black/5 hover:border-black/20 hover:shadow-sm transition-all duration-500"
          >
            {artist.image ? (
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 overflow-hidden rounded-full shadow-sm border border-black/5">
                <Image
                  src={urlFor(artist.image).width(400).height(400).url()}
                  alt={artist.name || "Artist"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full bg-gray-50 flex items-center justify-center border border-black/5">
                <span className="font-serif text-3xl text-gray-300">
                  {artist.name ? artist.name.charAt(0) : "A"}
                </span>
              </div>
            )}
            
            <div className="flex flex-col gap-3 w-full items-center sm:items-start">
              <h2 className="font-serif text-xl md:text-2xl text-soft-black group-hover:text-gray-600 transition-colors">
                {artist.name || "Unnamed Artist"}
              </h2>
              {artist.specialties && artist.specialties.length > 0 && (
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-500 line-clamp-2 leading-relaxed">
                  {artist.specialties.join(", ")}
                </p>
              )}
            </div>
            
            <span className="font-sans font-semibold text-[9px] tracking-[0.2em] uppercase text-soft-black mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
              <span className="w-4 h-[1px] bg-current block" />
              View Profile
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

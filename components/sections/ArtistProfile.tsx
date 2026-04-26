import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const builder = urlBuilder({ projectId, dataset });
const urlFor = (source: any) => builder.image(source);

interface ArtistProfileProps {
  artist: {
    name: string;
    slug?: { current: string };
    image?: any;
    bio?: any[];
    specialties?: string[];
  };
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
  if (!artist || !artist.name) return null;

  return (
    <div className="flex flex-col gap-6 py-8 border-t border-black/[0.06] mt-8">
      <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 font-semibold">
        About the Artist
      </h3>
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {artist.image?.asset && (
          <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-full border border-black/5 shadow-sm">
            <Image
              src={urlFor(artist.image).width(200).height(200).url()}
              alt={artist.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 text-center sm:text-left items-center sm:items-start">
          <Link 
            href={`/artist/${artist.slug?.current || "#"}`}
            className="font-serif text-xl md:text-2xl text-soft-black hover:text-gray-600 transition-colors"
          >
            {artist.name}
          </Link>
          {artist.specialties && artist.specialties.length > 0 && (
            <p className="font-sans text-[10px] tracking-wider text-gray-500 uppercase">
              {artist.specialties.join(", ")}
            </p>
          )}
          {artist.bio && (
            <div className="font-sans text-xs text-gray-600 line-clamp-3 mt-1 leading-relaxed text-justify sm:text-left">
              <PortableText value={artist.bio} />
            </div>
          )}
          {artist.slug?.current && (
            <Link
              href={`/artist/${artist.slug.current}`}
              className="font-sans font-semibold text-[9px] tracking-[0.2em] uppercase text-soft-black hover:text-gray-600 mt-2 inline-block"
            >
              View Full Profile →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

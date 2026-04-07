import { sanityFetch } from "@/sanity/lib/live";
import Image from "next/image";
import Link from "next/link";
import { QrCode } from "lucide-react";

async function getAllArtworks() {
  const query = `
    *[_type == "artwork"] | order(title asc) {
      _id,
      title,
      "artist": coalesce(artist->name, artist),
      "slug": slug.current,
      "imageUrl": mainImage.asset->url
    }
  `;
  const { data } = await sanityFetch({ query });
  return data;
}

export default async function AdminQRDashboard() {
  const artworks = await getAllArtworks();

  return (
    <div className="min-h-screen bg-bone pt-32 px-8 md:px-12 lg:px-20 pb-20">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-black/10 pb-8">
          <h1 className="font-serif text-3xl md:text-5xl text-soft-black">
            QR Code Generator
          </h1>
          <p className="font-sans text-sm text-gray-500 max-w-xl">
            Select an artwork below to generate and print its physical
            exhibition QR code. Make sure your local server is accessible via
            Ngrok or a public URL if you plan to scan from a mobile device while
            testing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-4">
          {artworks.map((art: any) => (
            <Link
              key={art._id}
              href={`/admin/qr/${art.slug}`}
              className="group bg-white p-4 border border-black/5 hover:border-black/20 hover:shadow-sm transition-all flex flex-col gap-4"
            >
              <div className="relative w-full aspect-[4/3] bg-bone overflow-hidden">
                {art.imageUrl ? (
                  <Image
                    src={art.imageUrl}
                    alt={art.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <QrCode className="w-12 h-12" />
                  </div>
                )}
              </div>
              <div className="space-y-1 pb-2">
                <h3 className="font-serif text-base text-soft-black line-clamp-1">
                  {art.title}
                </h3>
                <p className="font-sans text-[9px] tracking-widest text-gray-500 uppercase line-clamp-1">
                  {art.artist}
                </p>
              </div>
              <div className="mt-auto pt-3 border-t border-black/5 flex items-center justify-between">
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-frame-gold group-hover:text-black transition-colors">
                  Print QR
                </span>
                <QrCode className="w-3 h-3 text-frame-gold group-hover:text-black transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

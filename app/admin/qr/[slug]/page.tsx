import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import QRCode from "react-qr-code";
import { PrintButton } from "./PrintButton";

async function getArtworkForQR(slug: string) {
  const query = `
    *[_type == "artwork" && slug.current == $slug][0] {
      title,
      "artist": coalesce(artist->name, artist)
    }
  `;
  const { data } = await sanityFetch({ query, params: { slug } });
  return data;
}

export default async function AdminQRPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const art = await getArtworkForQR(slug);

  if (!art) return notFound();

  const headersList = await headers();
  const host = headersList.get("host") || "shakyagallery.com";
  const protocol =
    host.includes("localhost") || host.match(/^\d{1,3}\.\d{1,3}/)
      ? "http"
      : "https";
  const scanUrl = `${protocol}://${host}/scan/${slug}`;

  return (
    <div className="min-h-screen bg-bone flex flex-col items-center pt-40 p-8">
      <div
        className="bg-white p-8 shadow-sm border border-black/10 flex flex-col items-center text-center w-[3.5in] h-[4in] shrink-0"
        id="qr-container"
      >
        {/* Gallery Branding */}
        <div className="mb-6 space-y-1">
          <h1 className="font-serif text-2xl tracking-widest uppercase text-soft-black">
            Shakya
          </h1>
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-frame-gold">
            THE GALLERY
          </p>
        </div>

        {/* The QR Code */}
        <div className="bg-white p-2 border border-black/5 mb-6">
          <QRCode
            value={scanUrl}
            size={140}
            level="H" // High error correction
            bgColor="#FFFFFF"
            fgColor="#1C1C1C" // Soft black
          />
        </div>

        {/* Artwork Details */}
        <div className="space-y-3 mb-6 w-full px-2 flex-grow flex flex-col justify-center">
          <h2 className="font-serif text-lg text-soft-black leading-tight line-clamp-2">
            {art.title}
          </h2>
          <div className="w-6 h-[1px] bg-frame-gold mx-auto" />
          <p className="font-sans text-[9px] tracking-[0.2em] text-gray-500 uppercase line-clamp-1">
            {art.artist}
          </p>
        </div>

        <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-gray-400 mt-auto">
          Scan to Discover
        </p>
      </div>

      <div className="mt-8">
        <PrintButton />
      </div>

      {/* CSS rules strictly for the print layout so it prints perfectly */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
                @page {
                    size: auto;
                    margin: 0;
                }
                html, body {
                    background: white !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                body * {
                    visibility: hidden;
                }
                #qr-container, #qr-container * {
                    visibility: visible;
                }
                #qr-container {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 3.5in !important;
                    height: 4in !important;
                    box-shadow: none !important;
                    border: 1px solid #E5E7EB !important;
                    padding: 0.5in !important;
                    margin: 0 !important;
                    display: flex !important;
                    flex-direction: column !important;
                    align-items: center !important;
                    justify-content: center !important;
                    -webkit-print-color-adjust: exact;
                }
            }
        `,
        }}
      />
    </div>
  );
}

import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import QRCode from "react-qr-code";
import { PrintButton } from "./PrintButton";

async function getArtworkForQR(slug: string) {
  const query = `
    *[_type == "artwork" && slug.current == $slug][0] {
      title,
      artist
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
    <div className="min-h-screen bg-bone flex flex-col items-center justify-center p-8">
      <div
        className="bg-white p-12 shadow-sm border border-black/10 flex flex-col items-center text-center max-w-sm w-full"
        id="qr-container"
      >
        {/* Gallery Branding */}
        <div className="mb-8 space-y-2">
          <h1 className="font-serif text-3xl tracking-widest uppercase text-soft-black">
            Shakya
          </h1>
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-frame-gold">
            Fine Art Gallery
          </p>
        </div>

        {/* The QR Code */}
        <div className="bg-white p-4 border border-black/5 mb-8">
          <QRCode
            value={scanUrl}
            size={160}
            level="H" // High error correction
            bgColor="#FFFFFF"
            fgColor="#1C1C1C" // Soft black
          />
        </div>

        {/* Artwork Details */}
        <div className="space-y-4 mb-8 w-full px-4">
          <h2 className="font-serif text-2xl text-soft-black leading-tight">
            {art.title}
          </h2>
          <div className="w-8 h-[1px] bg-frame-gold mx-auto" />
          <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            {art.artist}
          </p>
        </div>

        <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400 mt-2">
          Scan to Discover
        </p>
      </div>

      <PrintButton />

      {/* CSS rules strictly for the print layout so it prints perfectly */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
                html, body {
                    background: white !important;
                }
                body * {
                    visibility: hidden;
                }
                #qr-container, #qr-container * {
                    visibility: visible;
                }
                #qr-container {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    max-width: 400px;
                    box-shadow: none !important;
                    border: 1px solid #E5E7EB !important; /* light gray border for cutting */
                    padding: 2rem !important;
                }
            }
        `,
        }}
      />
    </div>
  );
}

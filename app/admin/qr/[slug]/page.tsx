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
    <div className="min-h-screen bg-bone">
      {/* 1. UI PREVIEW (Hidden in Print) */}
      <div className="flex flex-col items-center pt-40 p-8 print:hidden">
        <div className="bg-white p-8 shadow-sm border border-black/10 flex flex-col items-center text-center w-[3.5in] h-[4in] shrink-0">
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
              level="H"
              bgColor="#FFFFFF"
              fgColor="#1C1C1C"
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
      </div>

      {/* 2. ACTUAL PRINT CONTAINER (Only visible in Print) */}
      <div
        id="qr-container"
        className="hidden print:flex bg-white flex-col items-center text-center"
        style={{
          width: "3.5in",
          height: "4in",
          padding: "0.5in",
          position: "relative",
          margin: "0",
          border: "1px solid #E5E7EB",
        }}
      >
        <div className="mb-6 space-y-1 w-full">
          <h1
            className="font-serif text-2xl tracking-widest uppercase text-soft-black"
            style={{ margin: 0 }}
          >
            Shakya
          </h1>
          <p className="font-sans text-[8px] tracking-[0.4em] uppercase text-frame-gold">
            THE GALLERY
          </p>
        </div>

        <div className="mb-6">
          <QRCode
            value={scanUrl}
            size={140}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#1C1C1C"
          />
        </div>

        <div className="space-y-3 mb-6 w-full flex-grow flex flex-col justify-center">
          <h2 className="font-serif text-lg text-soft-black leading-tight">
            {art.title}
          </h2>
          <div
            className="w-6 h-[1px] bg-frame-gold mx-auto"
            style={{ backgroundColor: "#D4AF37", margin: "12px auto" }}
          />
          <p className="font-sans text-[9px] tracking-[0.2em] text-gray-500 uppercase">
            {art.artist}
          </p>
        </div>

        <p className="font-sans text-[8px] tracking-[0.3em] uppercase text-gray-400 mt-auto">
          Scan to Discover
        </p>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
                @page {
                    size: 3.5in 4.0in;
                    margin: 0;
                }
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .min-h-screen {
                    min-height: auto !important;
                    height: auto !important;
                }
            }
        `,
        }}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";

interface ScanClientProps {
  artworkId: string;
  artworkTitle: string;
  slug: string;
  currentLocation?: string;
}

export function ScanClient({
  artworkId,
  artworkTitle,
  slug,
  currentLocation,
}: ScanClientProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (action: "whatsapp" | "website") => {
    setIsSubmitting(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
          email: email.trim() || undefined,
          scannedArtworkId: artworkId,
          scanLocation: currentLocation,
          actionTaken: action,
        }),
      });

      if (action === "whatsapp") {
        const locationText = currentLocation
          ? ` at ${currentLocation}`
          : " at your exhibition";
        const whatsappName = name.trim() ? `I am ${name}. ` : "";
        const message = encodeURIComponent(
          `Hi Shakya Gallery, ${whatsappName}I am currently viewing "${artworkTitle}"${locationText} and would like to know more.`,
        );
        // Standard Shakya WhatsApp number
        window.location.href = `https://wa.me/61450704907?text=${message}`;
      } else {
        router.push(`/artwork/${slug}`);
      }
    } catch (error) {
      console.error(error);
      // If the lead capture fails, still let them through
      if (action === "website") {
        router.push(`/artwork/${slug}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-2">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Full Name (Optional)"
            className="w-full border-b border-black/20 pb-3 font-sans text-sm focus:outline-none focus:border-black transition-colors bg-white rounded-none placeholder:text-gray-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email (Optional)"
            className="w-full border-b border-black/20 pb-3 font-sans text-sm focus:outline-none focus:border-black transition-colors bg-white rounded-none placeholder:text-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="pt-2 flex flex-col gap-3">
        <button
          onClick={() => handleSubmit("whatsapp")}
          disabled={isSubmitting}
          className="w-full py-4 bg-soft-black text-white flex items-center justify-center gap-3 hover:bg-black transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase">
            Chat on WhatsApp
          </span>
        </button>

        <div className="text-center py-1">
          <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest">
            or
          </span>
        </div>

        <button
          onClick={() => handleSubmit("website")}
          disabled={isSubmitting}
          className="group w-full py-4 bg-white border border-black/10 text-soft-black flex items-center justify-center gap-2 hover:bg-bone transition-colors disabled:opacity-50"
        >
          <span className="font-sans text-[10px] tracking-[0.2em] uppercase">
            View Artwork Detail
          </span>
          <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}

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

export function ScanClient({ artworkId, artworkTitle, slug, currentLocation }: ScanClientProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (action: 'whatsapp' | 'website') => {
        if (!name.trim()) {
            alert("Please enter your name to continue.");
            return;
        }

        setIsSubmitting(true);

        try {
            await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    scannedArtworkId: artworkId,
                    scanLocation: currentLocation,
                    actionTaken: action,
                }),
            });

            if (action === "whatsapp") {
                const locationText = currentLocation ? ` at ${currentLocation}` : ' at your exhibition';
                const message = encodeURIComponent(`Hi Shakya Gallery, I am ${name}. I am currently viewing "${artworkTitle}"${locationText} and would like to know more.`);
                // Standard Shakya WhatsApp number
                window.location.href = `https://wa.me/61450704907?text=${message}`;
            } else {
                router.push(`/artwork/${slug}`);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-2">
            <div className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Your Full Name *"
                        className="w-full border-b border-black/20 pb-3 font-sans text-sm focus:outline-none focus:border-black transition-colors bg-white rounded-none placeholder:text-gray-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                    onClick={() => handleSubmit('whatsapp')}
                    disabled={isSubmitting || !name.trim()}
                    className="w-full py-4 bg-[#25D366] text-white flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors disabled:opacity-50"
                >
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Chat on WhatsApp</span>
                </button>

                <div className="text-center py-1">
                    <span className="font-sans text-[9px] text-gray-400 uppercase tracking-widest">or</span>
                </div>

                <button
                    onClick={() => handleSubmit('website')}
                    disabled={isSubmitting || !name.trim()}
                    className="group w-full py-4 bg-white border border-black/10 text-soft-black flex items-center justify-center gap-2 hover:bg-bone transition-colors disabled:opacity-50"
                >
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase">View Museum Details</span>
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
            </div>
        </div>
    );
}

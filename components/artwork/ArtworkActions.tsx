"use client";

import { useState } from "react";
import { ArtworkInquiry } from "@/components/ArtworkInquiry";
import { ShippingModal } from "@/components/ui/ShippingModal";
import { Globe } from "lucide-react";

interface ArtworkActionsProps {
    artwork: any;
    isSold?: boolean;
}

export function ArtworkActions({ artwork, isSold = false }: ArtworkActionsProps) {
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);

    const handleInquireFromShipping = () => {
        setIsShippingOpen(false);
        // Brief delay to allow shipping modal to begin close animation
        setTimeout(() => {
            setIsInquiryOpen(true);
        }, 300);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* 1. PRIMARY INQUIRY TRIGGER */}
            <ArtworkInquiry
                artwork={artwork}
                isSold={isSold}
                externalOpen={isInquiryOpen}
                onOpenChange={setIsInquiryOpen}
            />

            {/* 2. SHIPPING ESTIMATE TRIGGER (OBVIOUS) */}
            {!isSold && (
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setIsShippingOpen(true)}
                        className="group inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.2em] uppercase text-gray-600 hover:text-soft-black transition-colors"
                    >
                        <Globe className="w-4 h-4 text-gray-500 group-hover:text-soft-black transition-colors" />
                        <span>Estimate Worldwide Shipping</span>
                        <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">→</span>
                    </button>

                    <p className="font-sans text-[9px] text-gray-500 tracking-wider uppercase ml-8 italic">
                        Complimentary on orders over $1,500
                    </p>
                </div>
            )}

            {/* 3. THE SHIPPING MODAL */}
            <ShippingModal
                price={artwork.price}
                isOpen={isShippingOpen}
                onClose={() => setIsShippingOpen(false)}
                onInquire={handleInquireFromShipping}
            />
        </div>
    );
}

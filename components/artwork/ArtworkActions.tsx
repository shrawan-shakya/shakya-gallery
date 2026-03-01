"use client";

import { useState, useEffect } from "react";
import { ShippingModal } from "@/components/ui/ShippingModal";
import { Globe } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";

interface ArtworkActionsProps {
    artwork: any;
    isSold?: boolean;
}

export function ArtworkActions({ artwork, isSold = false }: ArtworkActionsProps) {
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { items, addItem, openCart } = useCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isInCart = mounted && artwork?._id ? items.some((item) => item._id === artwork._id) : false;

    const handleActionClick = () => {
        if (!artwork?._id) return;

        if (isInCart) {
            openCart();
            return;
        }

        addItem({
            _id: artwork._id,
            title: artwork.title,
            artist: artwork.artist,
            year: artwork.year,
            price: artwork.price,
            showPrice: artwork.showPrice,
            startingPrice: artwork.startingPrice,
            imageUrl: artwork.mainImage?.url || "",
        });

        openCart();
    };

    const handleInquireFromShipping = () => {
        setIsShippingOpen(false);
        setTimeout(() => {
            handleActionClick();
        }, 300);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* 1. PRIMARY INQUIRY TRIGGER */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-black/5 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:relative lg:bottom-auto lg:left-auto lg:right-auto lg:z-auto lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none lg:shadow-none transition-all duration-300">
                <button
                    onClick={handleActionClick}
                    disabled={!mounted || isSold || !artwork?._id}
                    className="group w-full inline-flex items-center justify-center gap-4 px-8 py-4 bg-soft-black text-white hover:bg-black transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase">
                        {isSold ? "Contact Concierge" : (isInCart ? "View Your Selection" : "Add to Inquiry Selection")}
                    </span>
                    {!isSold && (
                        <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-500">
                            →
                        </span>
                    )}
                </button>
            </div>

            {/* 2. SHIPPING ESTIMATE TRIGGER (OBVIOUS) */}
            {!isSold && (
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setIsShippingOpen(true)}
                        className="group inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-600 hover:text-soft-black transition-colors"
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

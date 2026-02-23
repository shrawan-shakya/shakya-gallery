"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLenis } from "@studio-freight/react-lenis";
import { useCurrency } from "@/hooks/use-currency";

const zones = [
    { id: "ktm", name: "Kathmandu Valley (Local Pickup)", multiplier: 0 },
    { id: "asia", name: "Asia", multiplier: 1 },
    { id: "eu", name: "Europe / UK", multiplier: 1.4 },
    { id: "us", name: "United States / Canada", multiplier: 1.5 },
    { id: "au", name: "Australia / NZ", multiplier: 1.6 },
    { id: "row", name: "Rest of World", multiplier: 1.8 },
];

const sizes = [
    { id: "sm", name: "Small", desc: "Up to 60×80 cm", base: [65, 95] },
    { id: "md", name: "Medium", desc: "Up to 100×120 cm", base: [120, 180] },
    { id: "lg", name: "Large", desc: "Up to 150×180 cm", base: [280, 390] },
    { id: "xl", name: "Extra Large", desc: "Sculpture / Oversized", base: [600, 950] },
];

interface ShippingModalProps {
    price?: number;
    isOpen: boolean;
    onClose: () => void;
    onInquire: () => void;
}

export function ShippingModal({ price, isOpen, onClose, onInquire }: ShippingModalProps) {
    const [zone, setZone] = useState(zones[0].id);
    const [size, setSize] = useState(sizes[0].id);
    const [estimate, setEstimate] = useState<[number, number] | null>(null);
    const lenis = useLenis();
    const { formatPrice, currency, exchangeRate } = useCurrency();

    const isFree = price && price >= 1500;

    // Lock Body Scroll & Lenis
    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "unset";
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = "unset";
        };
    }, [isOpen, lenis]);

    useEffect(() => {
        const activeZone = zones.find((z) => z.id === zone);
        const activeSize = sizes.find((s) => s.id === size);

        if (activeZone && activeSize) {
            if (activeZone.multiplier === 0 || isFree) {
                setEstimate([0, 0]);
            } else {
                const min = Math.round(activeSize.base[0] * activeZone.multiplier);
                const max = Math.round(activeSize.base[1] * activeZone.multiplier);
                setEstimate([min, max]);
            }
        }
    }, [zone, size, isFree]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl bg-bone shadow-2xl border border-white/20 max-h-[90vh] flex flex-col rounded-sm overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-2xl text-gray-800 hover:text-soft-black transition-colors z-20"
                        >
                            ✕
                        </button>

                        <div
                            data-lenis-prevent
                            className="overflow-y-auto p-8 md:p-12 overscroll-contain
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-black/10
                hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
                        >
                            <h3 className="font-serif text-3xl text-soft-black mb-8 leading-tight">Estimate Your Shipping</h3>

                            <div className="space-y-8">
                                {/* Destination */}
                                <div className="space-y-3">
                                    <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-800">Destination</label>
                                    <div className="relative">
                                        <select
                                            value={zone}
                                            onChange={(e) => setZone(e.target.value)}
                                            className="w-full bg-transparent border-b border-black/10 py-3 font-sans text-lg outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                                        >
                                            {zones.map((z) => (
                                                <option key={z.id} value={z.id}>
                                                    {z.name}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-800 pointer-events-none">▼</span>
                                    </div>
                                </div>

                                {/* Size Selection */}
                                <div className="space-y-3">
                                    <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-800">Artwork Size</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {sizes.map((s) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setSize(s.id)}
                                                className={cn(
                                                    "flex flex-col items-center justify-center p-4 border transition-all duration-500 gap-1",
                                                    size === s.id
                                                        ? "border-soft-black bg-soft-black/5"
                                                        : "border-black/5 hover:border-black/20 bg-transparent"
                                                )}
                                            >
                                                <span className={cn(
                                                    "font-serif text-sm transition-colors",
                                                    size === s.id ? "text-soft-black font-semibold" : "text-gray-800"
                                                )}>
                                                    {s.name}
                                                </span>
                                                <span className="font-sans text-[8px] tracking-wider uppercase text-gray-800 text-center">
                                                    {s.desc}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Results */}
                                <AnimatePresence mode="wait">
                                    {estimate && (
                                        <motion.div
                                            key={`${zone}-${size}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                                            className="bg-white border border-black/5 p-8 text-center space-y-4"
                                        >
                                            <div className="space-y-1">
                                                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gray-800">Estimated Transit Cost</p>
                                                <p className="font-serif text-4xl text-soft-black font-sans font-light">
                                                    {estimate[0] === 0 ? (
                                                        <span className="flex flex-col items-center gap-2">
                                                            <span className="text-xl font-sans font-light">
                                                                {zone === "ktm" ? "Hand-Delivery" : "Complimentary"}
                                                            </span>
                                                            <span className="font-sans text-[10px] text-frame-gold tracking-widest italic uppercase">
                                                                {zone === "ktm" ? "Kathmandu Exclusive" : "Gallery Privilege"}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        currency === "NPR"
                                                            ? `Rs\u00A0${Math.round(estimate[0] * exchangeRate).toLocaleString("en-NP")} – Rs\u00A0${Math.round(estimate[1] * exchangeRate).toLocaleString("en-NP")}`
                                                            : `$\u00A0${estimate[0].toLocaleString()} – $\u00A0${estimate[1].toLocaleString()}`
                                                    )}
                                                </p>
                                            </div>

                                            {zone === "ktm" ? (
                                                <p className="font-sans text-[10px] text-gray-800 uppercase tracking-wider">
                                                    Complimentary doorstep delivery within the Valley <br /> or visit our Kathmandu Gallery for pickup.
                                                </p>
                                            ) : (
                                                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] font-sans tracking-[0.1em] text-gray-800 uppercase">
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-frame-gold rounded-full" />
                                                        7–21 days (air)
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-frame-gold rounded-full" />
                                                        Door-to-door
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <span className="w-1 h-1 bg-frame-gold rounded-full" />
                                                        Fully insured
                                                    </span>
                                                </div>
                                            )}

                                            {zone !== "ktm" && (
                                                <div className="pt-4 border-t border-black/5 mt-4 flex items-center justify-center gap-2">
                                                    <span className="text-xs">🛡️</span>
                                                    <span className="font-sans text-[9px] text-gray-800 uppercase tracking-widest">No Surprise Fees • Duties & Taxes Included</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* CTA */}
                                <div className="space-y-4">
                                    <button
                                        onClick={onInquire}
                                        className="group w-full inline-flex items-center justify-center gap-4 px-8 py-4 bg-soft-black text-white hover:bg-black transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl"
                                    >
                                        <span className="font-sans text-xs tracking-[0.3em] uppercase">
                                            Inquire for Exact Quote
                                        </span>
                                        <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-500">
                                            →
                                        </span>
                                    </button>

                                    <p className="font-sans text-[9px] text-center text-gray-800 tracking-wider uppercase">
                                        This is an estimate only. Final quote within 24 business hours.
                                        {(!price || price < 1500) && (
                                            <span className="block mt-2 text-frame-gold italic">
                                                Complimentary shipping on all acquisitions over {formatPrice(1500)}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

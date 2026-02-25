"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { Price } from "@/components/ui/Price";

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
    { id: "xl", name: "Extra Large", desc: "Oversized Masterworks", base: [600, 950] },
];

export function ShippingWidget() {
    const [zone, setZone] = useState(zones[0].id);
    const [size, setSize] = useState(sizes[0].id);
    const [estimate, setEstimate] = useState<[number, number] | null>(null);
    const { currency, exchangeRate, formatPrice } = useCurrency();

    useEffect(() => {
        const activeZone = zones.find((z) => z.id === zone);
        const activeSize = sizes.find((s) => s.id === size);

        if (activeZone && activeSize) {
            if (activeZone.multiplier === 0) {
                setEstimate([0, 0]);
            } else {
                const min = Math.round(activeSize.base[0] * activeZone.multiplier);
                const max = Math.round(activeSize.base[1] * activeZone.multiplier);
                setEstimate([min, max]);
            }
        }
    }, [zone, size]);

    return (
        <div className="bg-white border border-black/5 p-8 md:p-10 shadow-sm rounded-sm space-y-10">
            <h3 className="font-serif text-2xl text-soft-black leading-tight">Quick Estimate</h3>

            <div className="space-y-8">
                {/* Destination */}
                <div className="space-y-3">
                    <label className="font-serif italic text-xs text-gray-500">Destination</label>
                    <div className="relative">
                        <select
                            value={zone}
                            onChange={(e) => setZone(e.target.value)}
                            className="w-full bg-transparent border-b border-black/10 py-3 font-sans font-light text-base outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                        >
                            {zones.map((z) => (
                                <option key={z.id} value={z.id}>
                                    {z.name}
                                </option>
                            ))}
                        </select>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</span>
                    </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                    <label className="font-serif italic text-xs text-gray-500">Artwork Size</label>
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
                                    size === s.id ? "text-soft-black font-semibold" : "text-gray-600"
                                )}>
                                    {s.name}
                                </span>
                                <span className="font-sans text-[8px] tracking-wider uppercase text-gray-400 text-center">
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
                            transition={{ duration: 0.5 }}
                            className="bg-bone/50 p-8 text-center space-y-4 rounded-sm"
                        >
                            <div className="space-y-1">
                                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gray-400">Estimated Transit Cost</p>
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
                                <p className="font-sans text-[11px] text-gray-500 uppercase tracking-wider leading-relaxed">
                                    Complimentary doorstep delivery within the Valley <br /> or visit our Kathmandu Gallery for pickup.
                                </p>
                            ) : (
                                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[foot-note] font-sans tracking-[0.1em] text-gray-400 uppercase text-[9px]">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-frame-gold rounded-full" />
                                        7–21 days
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 bg-frame-gold rounded-full" />
                                        Fully insured
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <p className="font-sans text-[9px] text-center text-gray-400 tracking-wider uppercase leading-relaxed">
                    Estimate only. For oversized pieces or white-glove requests, please contact our concierge.
                </p>
            </div>
        </div>
    );
}

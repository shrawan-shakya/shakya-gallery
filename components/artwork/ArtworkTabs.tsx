"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";

interface ArtworkTabsProps {
    description?: any[];
    provenance?: any[];
}

const components = {
    block: {
        h1: ({ children }: any) => <h1 className="font-serif text-2xl text-soft-black mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="font-serif text-xl text-soft-black mb-3">{children}</h2>,
        normal: ({ children }: any) => <p className="font-sans font-light text-sm leading-relaxed text-soft-black mb-4 text-justify">{children}</p>,
    },
};

export function ArtworkTabs({ description, provenance }: ArtworkTabsProps) {
    const [activeTab, setActiveTab] = useState("story");

    const tabs = [
        { id: "story", label: "The Story" },
        { id: "shipping", label: "Shipping" },
        { id: "framing", label: "Framing Options" },
        { id: "authenticity", label: "Authenticity" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "story":
                return (
                    <div className="space-y-10 animate-in fade-in duration-700">
                        {description && description.length > 0 && (
                            <div className="space-y-4">
                                <h4 className="font-serif text-lg italic text-soft-black">About The Artwork</h4>
                                <div className="prose prose-sm max-w-none">
                                    <PortableText value={description} components={components} />
                                </div>
                            </div>
                        )}
                        {provenance && provenance.length > 0 && (
                            <div className="pt-8 border-t border-frame-gold/20 space-y-4">
                                <h4 className="font-serif text-lg italic text-soft-black">Provenance & History</h4>
                                <div className="prose prose-sm max-w-none">
                                    <PortableText value={provenance} components={components} />
                                </div>
                            </div>
                        )}
                        {!description && !provenance && (
                            <p className="font-sans text-sm text-gray-500 italic">No narrative available for this piece.</p>
                        )}
                    </div>
                );
            case "shipping":
                return (
                    <div className="space-y-6 animate-in fade-in duration-700">
                        <h4 className="font-serif text-lg italic text-soft-black">Presentation & Shipping</h4>
                        <div className="font-sans font-light text-sm leading-relaxed text-soft-black space-y-4 text-justify">
                            <p>
                                To ensure maximum protection during transit, this painting arrives unframed and carefully rolled in a heavy-duty protective tube. This is the industry standard for high-value fine art, minimizing risk and optimizing international transport.
                            </p>
                            <p>
                                Every acquisition is fully insured and handled by specialized art couriers, including UPS, DHL, and FedEx. We handle all export documentation from Nepal to ensure a seamless delivery to your doorstep.
                            </p>
                        </div>
                    </div>
                );
            case "framing":
                return (
                    <div className="space-y-6 animate-in fade-in duration-700">
                        <h4 className="font-serif text-lg italic text-soft-black">Framing Available</h4>
                        <div className="font-sans font-light text-sm leading-relaxed text-soft-black space-y-4 text-justify">
                            <p>
                                Paintings are shipped professionally rolled in a protective tube by default. This is the safest method for international transit.
                            </p>
                            <p>
                                Custom museum-grade framing—including traditional hand-carved Newari frames and modern minimalist options—is available upon request. Please contact us for a bespoke quote and options.
                            </p>
                        </div>
                    </div>
                );
            case "authenticity":
                return (
                    <div className="space-y-6 animate-in fade-in duration-700">
                        <h4 className="font-serif text-lg italic text-soft-black">Guarantee of Authenticity</h4>
                        <div className="font-sans font-light text-sm leading-relaxed text-soft-black space-y-4 text-justify">
                            <p>
                                Every acquisition is accompanied by a formal Certificate of Authenticity signed by the Shakya Gallery curation team. This document guarantees the provenance, medium, and originality of the masterwork.
                            </p>
                            <p>
                                We maintain archival records of every piece that passes through our gallery, ensuring that your collection's lineage is preserved for generations.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full space-y-6 md:space-y-8">
            {/* Tab Navigation */}
            <div className="w-full relative overflow-hidden z-10">
                <div className="flex w-full overflow-x-auto hide-scrollbar border-b border-black/[0.05] snap-x snap-mandatory flex-nowrap">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "font-sans text-[11px] tracking-[0.25em] uppercase px-4 md:px-6 py-4 transition-colors relative whitespace-nowrap snap-start shrink-0 font-medium",
                                activeTab === tab.id
                                    ? "text-soft-black"
                                    : "text-gray-400 hover:text-gray-600",
                                index === 0 ? "pl-0" : "", // Remove left padding from first item so it aligns with content
                                index === tabs.length - 1 ? "pr-8 md:pr-0" : "" // Add right padding to last item for mobile scroll clearance
                            )}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeArtworkTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-soft-black"
                                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[250px] md:min-h-[300px] py-2 md:py-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

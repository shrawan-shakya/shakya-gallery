"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, Heart, Lock } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

const iconMap = {
    "Certified Authenticity": <ShieldCheck className="w-8 h-8 text-soft-black" />,
    "Worldwide & Local Access": <Globe className="w-8 h-8 text-soft-black" />,
    "Support Local Artists": <Heart className="w-8 h-8 text-soft-black" />,
    "Secure Invoicing": <Lock className="w-8 h-8 text-soft-black" />,
};

const whyBuyItems = siteConfig.benefits.map((benefit) => ({
    ...benefit,
    icon: iconMap[benefit.title as keyof typeof iconMap] || <ShieldCheck className="w-8 h-8 text-soft-black" />,
}));

export function WhyBuy() {
    return (
        <section className="bg-white py-24 px-6 border-t border-black/5">
            <div className="max-w-[1400px] mx-auto">

                {/* 1. SECTION TITLE */}
                <div className="text-center mb-20">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gray-800 uppercase mb-6">Why Collect With Us</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-soft-black leading-none">THE SHAKYA <span className="italic">PROMISE</span></h2>
                </div>

                {/* 2. BENEFITS GRID */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24"
                >
                    {whyBuyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="p-4 bg-bone rounded-full mb-2">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl text-soft-black">{item.title}</h3>
                            <p className="font-sans text-sm text-soft-black leading-relaxed max-w-xs">{item.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

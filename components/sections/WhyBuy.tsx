"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Globe, Heart, Lock } from "lucide-react";

const whyBuyItems = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-soft-black" />,
        title: "Certified Authenticity",
        description: "Every artwork is accompanied by a signed Certificate of Authenticity, verifying its origin and the artist's legacy."
    },
    {
        icon: <Globe className="w-8 h-8 text-soft-black" />,
        title: "Global Shipping",
        description: "We provide secure, insured international shipping to collectors worldwide, ensuring your masterpiece arrives safely."
    },
    {
        icon: <Heart className="w-8 h-8 text-soft-black" />,
        title: "Support Local Artists",
        description: "Your acquisition directly supports the livelihood of master artists in Kathmandu and the preservation of Himalayan heritage."
    },
    {
        icon: <Lock className="w-8 h-8 text-soft-black" />,
        title: "Secure Transactions",
        description: "Purchase with confidence using our encrypted payment processing, offering peace of mind for every transaction."
    }
];

export function WhyBuy() {
    return (
        <section className="bg-white py-24 px-6 border-t border-black/5">
            <div className="max-w-[1400px] mx-auto">

                {/* 1. SECTION TITLE */}
                <div className="text-center mb-20">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">Why Collect With Us</p>
                    <h2 className="font-serif text-4xl md:text-5xl text-soft-black leading-none">THE SHAKYA <span className="italic">PROMISE</span></h2>
                </div>

                {/* 2. BENEFITS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    {whyBuyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <div className="p-4 bg-bone rounded-full mb-2">
                                {item.icon}
                            </div>
                            <h3 className="font-serif text-xl text-soft-black">{item.title}</h3>
                            <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-xs">{item.description}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

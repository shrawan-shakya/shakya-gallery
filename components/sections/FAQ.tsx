"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import { accordion } from "@/lib/motion-variants";

import { siteConfig } from "@/lib/config";

const faqs = siteConfig.faqs;

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-bone py-24 px-6 border-t border-black/5">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-16">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gray-800 uppercase mb-4">Common Questions</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-soft-black">Collector's <span className="italic">Guide</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-black/10 last:border-0">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between py-6 text-left group"
                            >
                                <span className="font-serif text-lg md:text-xl text-soft-black group-hover:text-black transition-colors">
                                    {faq.question}
                                </span>
                                <span className="text-gray-600 group-hover:text-black transition-colors">
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        variants={accordion}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="overflow-hidden"
                                    >
                                        <p className="font-sans text-sm md:text-base text-soft-black leading-relaxed pb-8 pr-8">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "Is every artwork an original piece?",
        answer: "Yes, Shakya Gallery exclusively represents original fine art from Nepal. Whether it is an expressive abstract painting, a detailed landscape, or an intimate portrait, every piece is a unique creation by a master artist from the Kathmandu Valley, accompanied by a signed Certificate of Authenticity."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Absolutely. We specialize in securely shipping large-format canvas paintings to collectors worldwide. Our team handles all export documentation, custom crating, and insurance to ensure your artwork arrives safely, no matter where you are located."
    },
    {
        question: "Can I commission a custom painting?",
        answer: "Yes, many of our featured artists accept commissions. If you are looking for a specific size, color palette, or subject—such as a family portrait or a specific Himalayan landscape—we can facilitate a bespoke creation tailored to your vision."
    },
    {
        question: "How do you support Nepalese artists?",
        answer: "Since 1998, our mission has been to provide a global platform for local talent. By acquiring art through SHAKYA, you are directly supporting the livelihoods of traditional and contemporary artists in Nepal, helping to preserve our rich cultural heritage."
    },
    {
        question: "What if the artwork arrives damaged?",
        answer: "In the unlikely event of damage during transit, your shipment is fully insured. Simply contact our concierge team within 48 hours of delivery with photos, and we will arrange for a full refund or restoration, completely hassle-free."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-bone py-24 px-6 border-t border-black/5">
            <div className="max-w-3xl mx-auto">

                <div className="text-center mb-16">
                    <p className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-gray-400 uppercase mb-4">Common Questions</p>
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
                                <span className="text-gray-400 group-hover:text-black transition-colors">
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed pb-8 pr-8">
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

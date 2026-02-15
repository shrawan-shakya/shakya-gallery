"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "How do I pay for an artwork?",
        answer: "We facilitate secure transactions for all clients. International collectors can pay via Bank Wire Transfer (SWIFT) or International Credit Card (upon request). For local clients in Nepal, we accept Bank Transfer, Digital Wallets (Fonepay/eSewa), or Cash on Delivery."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, we specialize in global logistics. For international orders, we provide custom crating, export documentation, and insured shipping via DHL/FedEx. For local clients in Kathmandu, we offer complimentary hand-delivery or gallery pickup."
    },
    {
        question: "Can I see the artwork before buying?",
        answer: "Absolutely. For local clients, we invite you to a private viewing at our Kathmandu gallery. For international collectors, we offer high-resolution detail shots and a 'Virtual Preview' service—just send us a photo of your wall, and we will digitally place the artwork for you."
    },
    {
        question: "Is every artwork an original piece?",
        answer: "Yes, Shakya Gallery exclusively represents original fine art. Whether it is an expressive abstract or a detailed Paubha, every piece is a unique creation by a master artist, accompanied by a signed Certificate of Authenticity."
    },
    {
        question: "How do you support Nepalese artists?",
        answer: "Since 1998, our mission has been to provide a global platform for local talent. By acquiring art through SHAKYA, you are directly supporting the livelihoods of traditional and contemporary artists in Nepal, helping to preserve our rich cultural heritage."
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

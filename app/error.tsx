"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-bone text-soft-black px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md"
            >
                <h2 className="font-serif text-3xl md:text-4xl italic font-bold mb-4 text-[#7D1818]">
                    Something went wrong
                </h2>
                <p className="font-sans text-sm md:text-base tracking-wide text-gray-600 mb-8 leading-relaxed">
                    We encountered an unexpected error while loading this page.
                    <br />
                    If the issue persists, please contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-soft-black underline">{siteConfig.contact.email}</a>.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={() => reset()}
                        className="px-8 py-3 bg-[#1A1A1A] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#333] transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-8 py-3 border border-[#1A1A1A]/20 text-soft-black font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-all"
                    >
                        Return Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

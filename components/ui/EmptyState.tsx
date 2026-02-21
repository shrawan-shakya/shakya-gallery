"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface EmptyStateProps {
    title?: string;
    message?: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: string;
}

import { fadeIn, fadeInUp } from "@/lib/motion-variants";

export function EmptyState({
    title = "No Masterpieces Found",
    message = "This specific collection is currently in our archives or being curated.",
    actionLabel = "Explore All Works",
    actionHref = "/collection",
    icon = "🖼️",
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-bone min-h-[400px]">
            <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="max-w-md"
            >
                <div className="text-6xl mb-8 grayscale opacity-50">{icon}</div>
                <h3 className="font-serif text-3xl text-soft-black mb-4 italic">
                    {title}
                </h3>
                <p className="font-sans text-sm text-gray-500 mb-10 leading-relaxed uppercase tracking-widest">
                    {message}
                </p>
                <Link
                    href={actionHref}
                    className="inline-block px-10 py-4 bg-soft-black text-white font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-black transition-colors"
                >
                    {actionLabel}
                </Link>
            </motion.div>
        </div>
    );
}

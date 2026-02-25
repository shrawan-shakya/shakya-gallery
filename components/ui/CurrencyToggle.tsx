"use client";

import { useCurrency } from "@/hooks/use-currency";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * A premium sliding toggle for switching between currencies.
 * Designed to fit seamlessly into the dark footer with high-contrast active states.
 */
export function CurrencyToggle({ className }: { className?: string }) {
    const { currency, setCurrency } = useCurrency();
    const options: ("USD" | "NPR")[] = ["USD", "NPR"];

    return (
        <div className={cn(
            "inline-flex items-center p-1 bg-black/20 border border-white/5 rounded-[2px] backdrop-blur-sm self-center md:self-auto",
            className
        )}>
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => setCurrency(opt)}
                    className={cn(
                        "relative px-4 md:px-5 py-1.5 font-sans text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-colors duration-500",
                        currency === opt ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-200"
                    )}
                >
                    <span className="relative z-10">{opt}</span>
                    {currency === opt && (
                        <motion.span
                            layoutId="active-currency"
                            className="absolute inset-0 bg-white rounded-[2px] z-0 shadow-sm"
                            transition={{
                                type: "spring",
                                bounce: 0.15,
                                duration: 0.6
                            }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
}

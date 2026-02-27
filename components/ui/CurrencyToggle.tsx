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
                        "relative px-4 md:px-5 py-1.5 font-sans text-[9px] md:text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 flex items-center gap-2",
                        currency === opt ? "text-soft-black font-semibold" : "text-gray-400 hover:text-gray-200"
                    )}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {opt === "USD" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[14px] h-[10px] md:w-[16px] md:h-[11px] rounded-[1px]">
                                <rect width="512" height="512" fill="#f0f0f0"></rect>
                                <g fill="#d80027"><rect width="512" height="39.4"></rect><rect y="78.8" width="512" height="39.4"></rect><rect y="157.5" width="512" height="39.4"></rect><rect y="236.3" width="512" height="39.4"></rect><rect y="315.1" width="512" height="39.4"></rect><rect y="393.8" width="512" height="39.4"></rect><rect y="472.6" width="512" height="39.4"></rect></g>
                                <rect width="256" height="275.7" fill="#0052b4"></rect>
                                <g fill="#fff"><path d="M50 49l4-14 4 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM92 49l5-14 4 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM135 49l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-12 9 4-13zM177 49l4-14 5 14zm-5-8h15l-12 9 4 13-11-9-12 9 5-13zM219 49l4-14 5 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM50 119l4-14 4 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM92 119l5-14 4 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM135 119l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-12 9 4-13zM177 119l4-14 5 14zm-5-8h15l-12 9 4 13-11-9-12 9 5-13zM219 119l4-14 5 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM50 189l4-14 4 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM92 189l5-14 4 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM135 189l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-12 9 4-13zM177 189l4-14 5 14zm-5-8h15l-12 9 4 13-11-9-12 9 5-13zM219 189l4-14 5 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM50 259l4-14 4 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM92 259l5-14 4 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM135 259l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-12 9 4-13zM177 259l4-14 5 14zm-5-8h15l-12 9 4 13-11-9-12 9 5-13zM219 259l4-14 5 14zm-4-8h15l-12 9 4 13-11-9-12 9 5-13zM71 84l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM113 84l5-14 4 14zm-5-8h16l-12 9 4 13-12-9-12 9 5-13zM156 84l4-14 5 14zm-5-8h15l-12 9 4 13-12-9-12 9 5-13zM198 84l4-14 5 14zm-4-8h15l-12 9 4 13-12-9-12 9 5-13zM71 154l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM113 154l5-14 4 14zm-5-8h16l-12 9 4 13-12-9-12 9 5-13zM156 154l4-14 5 14zm-5-8h15l-12 9 4 13-12-9-12 9 5-13zM198 154l4-14 5 14zm-4-8h15l-12 9 4 13-12-9-12 9 5-13zM71 224l4-14 5 14zm-5-8h16l-13 9 5 13-12-9-13 9 5-13zM113 224l5-14 4 14zm-5-8h16l-12 9 4 13-12-9-12 9 5-13zM156 224l4-14 5 14zm-5-8h15l-12 9 4 13-12-9-12 9 5-13zM198 224l4-14 5 14zm-4-8h15l-12 9 4 13-12-9-12 9 5-13z"></path></g>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[10px] h-[12px] md:w-[12px] md:h-[14px]">
                                <path fill="#d80027" d="M11 0l397 218-208 41 268 253H11V0z"></path>
                                <path fill="#0052b4" d="M0 0v512h512L249 265l194-38L0 0zm32 63l330 181-209 41 247 234H32V63z"></path>
                                <g fill="#f0f0f0"><path d="M141 346l13-40 41-9-33-25 13-40-33 26-33-26 12 40-32 25 41 9z"></path><path d="M129 184a48 48 0 0192 0c-3-22-31-40-46-40s-43 18-46 40z"></path><path d="M140 184l3-8 9-2-7-5 3-8-7 6-7-6 2 8-7 5 9 2z"></path></g>
                            </svg>
                        )}
                        {opt}
                    </span>
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

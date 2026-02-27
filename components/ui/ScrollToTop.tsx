"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

import { useLenis } from "@studio-freight/react-lenis";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const lenis = useLenis();

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] flex flex-col items-center gap-4">
                    {/* Chat Placeholder Space - 
                        The flex-col layout ensures that a future chat widget 
                        could sit right below or above this button nicely. 
                        We keep it minimal to not clash with chat bubbles.
                    */}

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className={cn(
                            "w-12 h-12 flex items-center justify-center rounded-none",
                            "bg-white/80 backdrop-blur-md border border-soft-black/10 shadow-sm transition-all duration-300",
                            "text-soft-black hover:bg-white hover:shadow-md hover:border-soft-black/20 group"
                        )}
                    >
                        <ChevronUp
                            size={20}
                            strokeWidth={1.5}
                            className="transition-transform duration-300 group-hover:-translate-y-1"
                        />
                    </motion.button>

                    {/* Chat widget would occupy this space intuitively later. 
                        For now, space is guaranteed by the fixed positioning
                        and the gap of the flex container above. */}
                </div>
            )}
        </AnimatePresence>
    );
}

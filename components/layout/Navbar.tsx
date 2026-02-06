"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-500 ease-in-out px-6 md:px-12 py-4",
        isScrolled ? "bg-bone/95 backdrop-blur-sm shadow-sm border-b border-black/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo - Hides when at top to avoid clashing with Hero, appears on scroll */}
        <Link href="/" className="group">
            <span className={cn(
                "font-serif text-xl tracking-widest font-bold text-primary transition-opacity duration-500",
                // isScrolled ? "opacity-100" : "opacity-0"
            )}>
                SHAKYA
            </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-8 md:gap-12">
          {["Collection", "Our Story", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(" ", "-")}`} 
              className="font-sans text-[11px] tracking-micro uppercase text-soft-black/70 hover:text-primary transition-colors relative group"
            >
              {item}
              {/* Subtle underline hover effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary/40 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
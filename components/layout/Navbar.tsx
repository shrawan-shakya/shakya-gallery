"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SearchOverlay } from "@/components/ui/SearchOverlay";

const links = [
  { name: "Collection", href: "/collection" },
  { name: "Journal", href: "/journal" },
  { name: "How to Buy", href: "/guide/buying-art" },
  { name: "Legacy", href: "/legacy" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Dynamic Text Color Logic
  // Home & Top: White
  // Scrolled OR Not Home: Soft Black
  const textColor = (isHome && !isScrolled) ? "text-white" : "text-soft-black";
  const hoverColor = (isHome && !isScrolled) ? "hover:text-white/70" : "hover:text-gray-500";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // 1. Scrolled State (For Shadow/Color)
    // We increase the threshold to 10px to avoid flickering at the very top
    if (latest > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // 2. Hide State (For Scrolling Down)
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isSearchOpen]);

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}

        // THE FIX:
        // 1. At Top: bg-transparent (Let Hero color show through)
        // 2. Scrolled: bg-[#FDFCF8] (Solid Bone color)
        // 3. pointer-events-none: Allows clicking THROUGH the transparent navbar
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center w-full transition-all duration-500 ease-in-out pointer-events-none
          ${isScrolled
            ? "py-4 bg-bone border-b border-black/5 shadow-sm" // Scrolled: Solid & Compact
            : "py-6 md:py-10 bg-transparent border-none shadow-none" // Top: Invisible Background
          }
        `}
      >

        {/* LOGO */}
        <Link href="/" className="z-50 group pointer-events-auto">
          <div className={`font-serif tracking-[0.3em] relative font-thin transition-all duration-500 ${textColor}
            ${isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-3xl"}
          `}>
            SHAKYA
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-full" />
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className={`hidden md:flex gap-12 items-center font-thin pointer-events-auto ${textColor}`}>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-sans text-sm tracking-[0.25em] uppercase ${hoverColor} transition-colors`}
            >
              {link.name}
            </Link>
          ))}

          {/* SEARCH ICON (Desktop) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`${hoverColor} transition-colors`}
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className={`md:hidden z-50 flex items-center gap-6 pointer-events-auto ${textColor}`}>
          {/* SEARCH ICON (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-8 h-8 flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-end gap-1.5"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`w-8 h-[1px] bg-current block ${isOpen ? "bg-soft-black" : "bg-current"}`}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1px] bg-current block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7, width: 32 } : { rotate: 0, y: 0, width: 16 }}
              className={`w-4 h-[1px] bg-current block ${isOpen ? "bg-soft-black" : "bg-current"}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU (Matches Bone Color) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-bone z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-serif text-4xl text-[#1A1A1A] italic hover:text-[#999999] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

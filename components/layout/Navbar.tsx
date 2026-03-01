"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, ShoppingBag } from "lucide-react";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { CartDrawer } from "@/components/ui/CartDrawer";

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

  // Zustand state
  const { items, isOpen: isCartOpen, openCart, closeCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Dynamic Text Color Logic
  // Home & Top: White
  // Scrolled OR Not Home: Soft Black
  const textColor = (pathname === "/" && !isScrolled) ? "text-white" : "text-soft-black";
  const hoverColor = (pathname === "/" && !isScrolled) ? "hover:text-white/70" : "hover:text-gray-500";

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
    if (isOpen || isSearchOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isSearchOpen, isCartOpen]);

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />

      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}

        // THE FIX:
        // 1. At Top on Home: bg-transparent (Let Hero color show through)
        // 2. Scrolled or Not Home: bg-bone (Solid color)
        // 3. pointer-events-none: Allows clicking THROUGH the transparent navbar
        className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-12 flex justify-between items-center w-full transition-all duration-300 ease-in-out
          ${pathname === "/" && !isScrolled ? "pointer-events-none bg-transparent py-6 lg:py-10 border-none shadow-none" : "pointer-events-auto bg-bone py-4 border-b border-black/5 shadow-sm"}
        `}
      >

        {/* LOGO */}
        <Link href="/" className="z-50 group pointer-events-auto flex items-center h-8">
          <div className={`font-serif tracking-[0.3em] relative font-thin transition-all duration-500 flex items-center leading-none ${textColor}
            ${isScrolled ? "text-xl lg:text-2xl" : "text-2xl lg:text-3xl"}
          `}>
            SHAKYA
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current transition-all duration-500 group-hover:w-full" />
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className={`hidden lg:flex gap-12 items-center font-thin pointer-events-auto ${textColor}`}>
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

          {/* CART ICON (Desktop) */}
          <button
            onClick={openCart}
            className={`relative ${hoverColor} transition-colors`}
            aria-label="Inquiry Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {mounted && items.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-700 text-white text-[9px] font-sans w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className={`lg:hidden z-50 flex items-center gap-1.5 pointer-events-auto ${textColor}`}>
          {/* SEARCH ICON (Mobile) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-8 h-8 flex items-center justify-center p-0 m-0"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* CART ICON (Mobile) */}
          <button
            onClick={openCart}
            className="w-8 h-8 flex items-center justify-center relative p-0 m-0"
            aria-label="Inquiry Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {mounted && items.length > 0 && !isOpen && (
              <span className="absolute top-1 right-1 bg-red-700 text-white text-[8px] font-sans w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>

          {/* HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
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

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// --- COMPONENTS ---

const Section = ({ 
  year, 
  title, 
  text, 
  image, 
  alignment = "left" 
}: { 
  year: string; 
  title: string; 
  text: string; 
  image: string;
  alignment?: "left" | "right";
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
      
      {/* BACKGROUND YEAR (Parallax) */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`absolute top-1/2 -translate-y-1/2 text-[20vw] font-serif text-black/[0.03] leading-none select-none z-0
          ${alignment === "left" ? "right-[-5%]" : "left-[-5%]"}
        `}
      >
        {year}
      </motion.div>

      <div className={`container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center ${alignment === "right" ? "md:grid-flow-col-dense" : ""}`}>
        
        {/* IMAGE SIDE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
          className={`${alignment === "right" ? "md:col-start-2" : ""}`}
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-2xl">
            <div className="absolute inset-0 bg-black/10 z-10" /> {/* VINTAGE OVERLAY */}
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
        </motion.div>

        {/* TEXT SIDE */}
        <motion.div 
          initial={{ opacity: 0, x: alignment === "left" ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`${alignment === "right" ? "md:col-start-1 text-right items-end" : "text-left items-start"} flex flex-col justify-center`}
        >
          <span className="font-sans text-xs tracking-[0.3em] text-red-800 uppercase mb-6 flex items-center gap-4">
             {alignment === "right" && <span className="h-px w-12 bg-red-800/40"></span>}
             {year}
             {alignment === "left" && <span className="h-px w-12 bg-red-800/40"></span>}
          </span>
          
          <h2 className="font-serif text-4xl md:text-6xl text-soft-black leading-tight mb-8">
            {title}
          </h2>
          
          <p className="font-sans text-sm md:text-base leading-loose text-gray-600 font-light max-w-md">
            {text}
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default function LegacyPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-bone">
      
      {/* 1. HERO HEADER */}
      <section className="h-[80vh] flex flex-col items-center justify-center text-center px-6 relative border-b border-black/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl"
        >
           <p className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-8">
             Our Heritage
           </p>
           <h1 className="font-serif text-5xl md:text-8xl text-soft-black leading-none mb-12">
             THE <span className="italic">JOURNEY</span>
           </h1>
           <p className="font-serif text-xl italic text-gray-500 max-w-2xl mx-auto">
             "From the ancient streets of Kathmandu to a global digital stage."
           </p>
        </motion.div>

        {/* SCROLL LINE */}
        <motion.div 
          style={{ scaleY: scrollYProgress }} 
          className="absolute bottom-0 left-1/2 w-px h-32 bg-soft-black origin-top"
        />
      </section>

      {/* 2. THE CHAPTERS */}
      
      {/* CHAPTER 1: 1998 */}
      <Section 
        year="1998"
        title="Mountain Art Gallery"
        text="Founded in the heart of Kathmandu, our journey began as a humble sanctuary for local artisans. For over two decades, 'Mountain Art Gallery' served as a bridge between the spiritual craftsmanship of the Himalayas and collectors who sought authenticity."
        image="https://images.unsplash.com/photo-1544634076-a901606f4180?q=80&w=2800&auto=format&fit=crop" // Placeholder: Vintage Kathmandu Vibe
        alignment="left"
      />

      {/* CHAPTER 2: THE CRAFT */}
      <Section 
        year="CRAFT"
        title="The Hands of Masters"
        text="We didn't just sell art; we curated devotion. Every Paubha painting and gilded statue that passed through our hands was selected for its adherence to strict iconographic traditions. We built our reputation on one simple promise: Uncompromising Authenticity."
        image="https://images.unsplash.com/photo-1628151016056-b04044a2b904?q=80&w=2800&auto=format&fit=crop" // Placeholder: Artisan Hands / Detail
        alignment="right"
      />

      {/* CHAPTER 3: 2026 */}
      <Section 
        year="2026"
        title="The Rebirth as Shakya"
        text="The world has changed, and so have we. Transitioning from a physical gallery to 'SHAKYA', we are bringing our 25-year legacy into the digital age. This is not just a rebrand; it is a commitment to making Himalayan masterworks accessible to the global connoisseur."
        image="https://images.unsplash.com/photo-1507643179173-1f062ddc6f5d?q=80&w=2800&auto=format&fit=crop" // Placeholder: Modern Minimalist Gallery
        alignment="left"
      />

      {/* 3. FOOTER SIGNATURE */}
      <section className="py-32 flex flex-col items-center justify-center text-center px-6 border-t border-black/5 bg-white">
         <div className="max-w-2xl">
           <img 
             src="/signature.png" // We will use text if image fails
             alt="" 
             className="h-24 mx-auto mb-8 opacity-60"
             onError={(e) => {e.currentTarget.style.display='none'}} 
           />
           <p className="font-serif text-3xl italic text-soft-black mb-12">
             "We invite you to be part of our next chapter."
           </p>
           <a 
             href="/collection" 
             className="inline-block bg-soft-black text-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gray-800 transition-colors"
           >
             View The Collection
           </a>
         </div>
      </section>

    </main>
  );
}
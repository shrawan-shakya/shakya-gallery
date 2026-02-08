"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ContainerScroll, 
  ContainerScale, 
  ContainerSwipeIndicator, 
  BentoGrid, 
  BentoCell 
} from "@/components/ui/hero-scroll";

/**
 * STATIC_ART: Hardcoded local or external assets to ensure 
 * the landing experience is instant and reliable.
 */
const STATIC_ART = [
  { id: 1, url: "/hero-1.jpg", alt: "Traditional Paubha" },
  { id: 2, url: "/hero-2.jpg", alt: "Himalayan Landscape" },
  { id: 3, url: "/hero-3.jpg", alt: "Contemporary Vision" },
  { id: 4, url: "/hero-4.jpg", alt: "Ancient Script" },
  { id: 5, url: "/hero-5.jpg", alt: "Bronze Statue" },
];

export function AnimatedHero() {
  
  /**
   * MANUAL LUXURY FRAME CONFIG
   * Ebony outer border with a Gold inner ring fillet.
   * Matting is kept white (#FFFFFF) to pop against the gallery background.
   */
  const frameStyle = `
    bg-white p-[15px] md:p-[25px] 
    border-[10px] md:border-[16px] border-frame-ebony 
    ring-[1.5px] ring-frame-gold ring-inset 
    shadow-museum box-border flex flex-col
  `;
  
  const mobileCellStyle = "flex-none h-[55vh] w-auto aspect-auto snap-center";
  const desktopCellStyle = "xl:h-full xl:w-full";
  const imageClasses = "h-full w-full object-cover block shadow-sm";

  // Defined grid spans for the cinematic Bento layout
  const gridSpans = [
    "xl:col-span-6 xl:row-span-2", // Primary Feature
    "xl:col-span-6 xl:row-span-1", // Secondary Feature
    "xl:col-span-2 xl:row-span-1", // Lower Trio - Left
    "xl:col-span-2 xl:row-span-1", // Lower Trio - Center
    "xl:col-span-2 xl:row-span-1"  // Lower Trio - Right
  ];

  return (
    /**
     * THE GRADIENT BACKDROP:
     * Using the 'gallery' color tokens from tailwind.config.js to 
     * create atmospheric lighting behind the frames.
     */
    <ContainerScroll className="bg-gradient-to-b from-gallery-top via-gallery-center to-gallery-bottom">
      
      {/* 1. HERO BRANDING & TEXT */}
      <ContainerScale>
        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
          {/* Large watermark background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-serif text-[40vw] leading-none text-soft-black/5 opacity-50 blur-[1px] translate-y-8">S</span>
          </div>
          
          <div className="z-10 flex flex-col items-center text-center">
             <p className="font-sans text-[10px] md:text-xs tracking-[2em] text-gray-400 uppercase mb-6 ml-2">Est. 1998</p>
             <h1 className="font-serif font-bold text-7xl md:text-9xl text-soft-black tracking-wide leading-none">SHAKYA</h1>
             <div className="flex flex-col items-center mt-4">
               <p className="font-sans text-[10px] md:text-sm tracking-[0.8em] text-primary/80 uppercase ml-3">The Gallery</p>
               <div className="w-16 h-[1px] bg-gray-300 mt-10 mb-8" />
             </div>
          </div>
          
          <motion.div 
            className="absolute bottom-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400 ml-1">Scroll to Explore</p>
            <div className="w-[1px] h-24 bg-gray-200 overflow-hidden relative border-l border-gray-100">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-soft-black/30"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
            </div>
          </motion.div>
        </div>
      </ContainerScale>

      {/* 2. SWIPE INDICATOR (Mobile only) */}
      <ContainerSwipeIndicator className="bottom-24 xl:hidden">
        <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-sm border border-gray-100"
        >
            <span className="font-serif italic text-xs text-gray-600">Swipe</span>
            <span className="text-gray-400 text-[10px]">&rarr;</span>
        </motion.div>
      </ContainerSwipeIndicator>

      {/* 3. BENTO GALLERY GRID */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <BentoGrid className="scrollbar-hide flex flex-row overflow-x-auto items-center justify-start gap-6 px-8 snap-x snap-mandatory xl:grid xl:grid-cols-12 xl:grid-rows-[repeat(2,1fr)] xl:items-center xl:justify-center xl:overflow-visible xl:px-0 w-full xl:w-[75%] h-screen">
        
        {STATIC_ART.map((art, i) => (
          <BentoCell key={art.id} className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} ${gridSpans[i]}`}>
             <div className="relative w-full h-full overflow-hidden bg-gray-100">
                <img 
                  src={art.url} 
                  className={imageClasses} 
                  alt={art.alt} 
                />
                {/* Subtle glass reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
             </div>
          </BentoCell>
        ))}

      </BentoGrid>

    </ContainerScroll>
  );
}
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

export function AnimatedHero({ heroArt }: { heroArt: any[] }) {
  // CONFIG:
  // Desktop: Thicker Frame + Mat
  // Mobile: Thinner Frame + Mat
  const frameStyle = "bg-white p-[12px] md:p-[23px] border-[8px] md:border-[14px] border-[#1a1a1a] shadow-2xl box-border";
  
  // MOBILE CELL:
  // - Fixed Height (55vh)
  // - Auto Width
  // - Snap Center
  const mobileCellStyle = "flex-none h-[55vh] w-auto aspect-auto snap-center";

  // DESKTOP CELL:
  // - Full Fit
  const desktopCellStyle = "xl:h-full xl:w-full";

  return (
    <ContainerScroll>
      
      {/* 1. HERO TEXT (Fades OUT) */}
      <ContainerScale>
        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
          {/* Watermark S */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="font-serif text-[40vw] leading-none text-soft-black/5 opacity-50 blur-[1px] translate-y-8">S</span>
          </div>
          
          {/* Main Title */}
          <div className="z-10 flex flex-col items-center text-center">
             <p className="font-sans text-[10px] md:text-xs tracking-[2em] text-gray-500 uppercase mb-6 ml-2">Est. 1998</p>
             <h1 className="font-serif font-bold text-7xl md:text-9xl text-soft-black tracking-wide leading-none">SHAKYA</h1>
             <div className="flex flex-col items-center mt-4">
               <p className="font-sans text-[10px] md:text-sm tracking-[0.8em] text-primary/80 uppercase ml-3">The Gallery</p>
               <div className="w-16 h-[1px] bg-gray-300 mt-10 mb-8" />
             </div>
          </div>
          
          {/* SCROLL INDICATOR (Vertical) */}
          <motion.div 
            className="absolute bottom-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400 ml-1">Scroll to Explore</p>
            <div className="w-[1px] h-24 bg-gray-200 overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full bg-soft-black/30"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
            </div>
          </motion.div>
        </div>
      </ContainerScale>

      {/* 2. SWIPE INDICATOR (Fades IN) */}
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

      {/* 3. GALLERY (Hybrid Grid) */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* UPDATED: Changed xl:w-[85%] to xl:w-[75%] for bigger margins */}
      <BentoGrid className={`
        scrollbar-hide
        flex flex-row overflow-x-auto items-center justify-start gap-6 px-8 snap-x snap-mandatory 
        xl:grid xl:grid-cols-12 xl:grid-rows-[repeat(2,1fr)] xl:items-center xl:justify-center xl:overflow-visible xl:px-0
        w-full xl:w-[75%] h-screen
      `}>
        
        {/* IMAGE 1 (Big Left) */}
        <BentoCell className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} xl:col-span-6 xl:row-span-2`}>
           {heroArt[0]?.imageUrl && <img src={heroArt[0].imageUrl} className="h-full w-auto object-contain xl:object-cover xl:w-full xl:h-full" alt="Art" />}
        </BentoCell>

        {/* IMAGE 2 (Top Right Wide) */}
        <BentoCell className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} xl:col-span-6 xl:row-span-1`}>
           {heroArt[1]?.imageUrl && <img src={heroArt[1].imageUrl} className="h-full w-auto object-contain xl:object-cover xl:w-full xl:h-full" alt="Art" />}
        </BentoCell>

        {/* BOTTOM RIGHT TRIO */}
        <BentoCell className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} xl:col-span-2 xl:row-span-1`}>
           {heroArt[2]?.imageUrl && <img src={heroArt[2].imageUrl} className="h-full w-auto object-contain xl:object-cover xl:w-full xl:h-full" alt="Art" />}
        </BentoCell>
        
        <BentoCell className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} xl:col-span-2 xl:row-span-1`}>
           {heroArt[3]?.imageUrl && <img src={heroArt[3].imageUrl} className="h-full w-auto object-contain xl:object-cover xl:w-full xl:h-full" alt="Art" />}
        </BentoCell>
        
        <BentoCell className={`${frameStyle} ${mobileCellStyle} ${desktopCellStyle} xl:col-span-2 xl:row-span-1`}>
           {heroArt[4]?.imageUrl && <img src={heroArt[4].imageUrl} className="h-full w-auto object-contain xl:object-cover xl:w-full xl:h-full" alt="Art" />}
        </BentoCell>

      </BentoGrid>

    </ContainerScroll>
  );
}
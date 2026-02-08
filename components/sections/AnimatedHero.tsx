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

const STATIC_ART = [
  { id: 1, url: "/hero-1.jpg", alt: "Traditional Paubha" },
  { id: 2, url: "/hero-2.jpg", alt: "Himalayan Landscape" },
  { id: 3, url: "/hero-3.jpg", alt: "Contemporary Vision" },
  { id: 4, url: "/hero-4.jpg", alt: "Ancient Script" },
  { id: 5, url: "/hero-5.jpg", alt: "Bronze Statue" },
];

export function AnimatedHero() {
  
  // OUTER EBONY WOOD STYLE
  const outerFrameStyle = "border-[14px] md:border-[24px] border-frame-ebony shadow-museum box-border flex flex-col relative overflow-hidden";
  
  const mobileCellStyle = "flex-none h-[55vh] w-auto aspect-auto snap-center";
  const desktopCellStyle = "xl:h-full xl:w-full";
  const imageClasses = "h-full w-full object-cover block";

  const gridSpans = [
    "xl:col-span-6 xl:row-span-2",
    "xl:col-span-6 xl:row-span-1",
    "xl:col-span-2 xl:row-span-1",
    "xl:col-span-2 xl:row-span-1",
    "xl:col-span-2 xl:row-span-1"
  ];

  return (
    <ContainerScroll className="bg-gradient-to-b from-gallery-top via-gallery-center to-gallery-bottom">
      
      <ContainerScale>
        {/* ... Hero Branding Content remains the same ... */}
        <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
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
          {/* ... Scroll indicator ... */}
        </div>
      </ContainerScale>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <BentoGrid className="scrollbar-hide flex flex-row overflow-x-auto items-center justify-start gap-6 px-8 snap-x snap-mandatory xl:grid xl:grid-cols-12 xl:grid-rows-[repeat(2,1fr)] xl:items-center xl:justify-center xl:overflow-visible xl:px-0 w-full xl:w-[75%] h-screen">
        
        {STATIC_ART.map((art, i) => (
          <BentoCell key={art.id} className={`${outerFrameStyle} ${mobileCellStyle} ${desktopCellStyle} ${gridSpans[i]}`}>
             
             {/* 1. TOP SHINE EFFECT (NEW) 
                 A 1px line that sits on the very top edge of the ebony border.
             */}
             <div className="absolute top-0 left-0 w-full h-[1px] bg-frame-gold opacity-60 z-50 pointer-events-none" />

             {/* 2. DOUBLE LIGHTER FILLET SYSTEM */}
             {/* The "Step" (Deep Gold) */}
             <div className="absolute inset-0 z-20 pointer-events-none ring-[6px] ring-frame-gold-deep ring-inset opacity-90" />
             
             {/* The "Glow" (Champagne Gold highlight) */}
             <div className="absolute inset-0 z-30 pointer-events-none border-[2px] border-frame-gold m-[4px] shadow-[0_0_10px_rgba(229,209,176,0.3)]" />

             {/* 3. ARTWORK CONTAINER */}
             <div className="relative w-full h-full overflow-hidden z-0 bg-gray-100">
                <img 
                  src={art.url} 
                  className={imageClasses} 
                  alt={art.alt} 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
             </div>
          </BentoCell>
        ))}

      </BentoGrid>

    </ContainerScroll>
  );
}
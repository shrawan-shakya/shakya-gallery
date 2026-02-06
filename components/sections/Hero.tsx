"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    // UPDATED: h-[80vh] for mobile, h-screen for desktop.
    // UPDATED: px-6 (mobile) vs md:px-12 (desktop)
    <section className="relative h-[80vh] md:h-screen w-full overflow-hidden bg-bone flex flex-col items-center justify-center px-6 md:px-12">
      
      {/* 1. The Watermark "S" (Background Layer) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[40vw] leading-none text-soft-black/5 opacity-50 blur-[1px] translate-y-8">
          S
        </span>
      </div>

      {/* 2. The Main Content (Foreground) */}
      <div className="z-10 flex flex-col items-center text-center max-w-5xl">
        
        {/* Top Tagline: EST. 1998 */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          // UPDATED: Smaller text for mobile
          className="font-sans text-[9px] md:text-xs tracking-[0.3em] md:tracking-[2em] text-gray-500 uppercase mb-4 md:mb-6 ml-1 md:ml-2"
        >
          Est. 1998
        </motion.p>

        {/* Main Title: SHAKYA */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          // UPDATED: Responsive Text Sizes (5xl -> 7xl -> 9xl)
          className="font-serif font-bold text-5xl md:text-7xl lg:text-9xl text-soft-black tracking-wide leading-none"
        >
          SHAKYA
        </motion.h1>

        {/* Subtitle: THE GALLERY */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center mt-4"
        >
          <p className="font-sans text-[9px] md:text-sm tracking-[0.5em] md:tracking-[0.8em] text-primary/80 uppercase ml-2 md:ml-3">
            The Gallery
          </p>
          
          {/* Small Horizontal Divider */}
          <div className="w-12 md:w-16 h-[1px] bg-gray-300 mt-8 md:mt-10 mb-6 md:mb-8" />
        </motion.div>
      </div>

      {/* 3. Bottom Scroll Indicator (Animated) */}
      <motion.div 
        className="absolute bottom-0 flex flex-col items-center gap-4 pb-6 md:pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-gray-400 ml-1">
          Scroll to Explore
        </p>
        
        {/* The Animated Line */}
        <div className="w-[1px] h-16 md:h-24 bg-gray-200 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-soft-black/30"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
        </div>
      </motion.div>

    </section>
  );
}
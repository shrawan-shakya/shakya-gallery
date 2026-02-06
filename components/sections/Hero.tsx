"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-bone flex flex-col items-center justify-center">
      
      {/* 1. The Watermark "S" (Background Layer) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif text-[40vw] leading-none text-soft-black/5 opacity-50 blur-[1px] translate-y-8">
          S
        </span>
      </div>

      {/* 2. The Main Content (Foreground) */}
      <div className="z-10 flex flex-col items-center text-center">
        
        {/* Top Tagline: EST. 1998 */}
        {/* Updated: Widely spaced, uppercase sans-serif to match the bottom */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-[10px] md:text-xs tracking-[2em] text-gray-500 uppercase mb-6 ml-2"
        >
          Est. 1998
        </motion.p>

        {/* Main Title: SHAKYA (Thick & Sharp) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-serif font-bold text-7xl md:text-9xl text-soft-black tracking-wide leading-none"
        >
          SHAKYA
        </motion.h1>

        {/* Subtitle: THE GALLERY (Extremely Wide) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center mt-4"
        >
          <p className="font-sans text-[10px] md:text-sm tracking-[0.8em] text-primary/80 uppercase ml-3">
            The Gallery
          </p>
          
          {/* Small Horizontal Divider */}
          <div className="w-16 h-[1px] bg-gray-300 mt-10 mb-8" />
        </motion.div>
      </div>

      {/* 3. Bottom Scroll Indicator (Animated) */}
      <motion.div 
        className="absolute bottom-0 flex flex-col items-center gap-4 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {/* Updated: Changed from Italic to Uppercase Sans to match the top */}
        <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400 ml-1">
          Scroll to Explore
        </p>
        
        {/* The Animated Line */}
        <div className="w-[1px] h-24 bg-gray-200 overflow-hidden relative">
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
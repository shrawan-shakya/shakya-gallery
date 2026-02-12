"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedHero() {
  return (
    <div className="relative bg-bone h-screen w-full flex flex-col items-center justify-center overflow-hidden">

      {/* Background Watermark (Centered) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif text-[40vw] leading-none text-soft-black/5 opacity-50 blur-[1px] translate-y-4">S</span>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center z-10 px-4 mt-[30vh]"
      >
        <p className="font-sans text-[10px] md:text-xs tracking-[2em] text-gray-400 uppercase mb-6 ml-2">Est. 1998</p>
        <h1 className="font-serif font-bold text-7xl md:text-9xl text-soft-black tracking-wide leading-none">SHAKYA</h1>
        <div className="flex flex-col items-center mt-4">
          <p className="font-sans text-[10px] md:text-sm tracking-[0.8em] text-primary/80 uppercase ml-3">The Gallery</p>
          <div className="w-16 h-[1px] bg-gray-300 mt-10 mb-8" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400 ml-1">Scroll</p>
          <div className="w-[1px] h-16 bg-gray-200 overflow-hidden relative border-l border-gray-100">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-soft-black/30"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
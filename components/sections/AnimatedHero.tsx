"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedHero() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bone">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero intro.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY (For Text Readability) - Adjusted opacity for video */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Background Watermark (Centered) - Lower opacity for video */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif text-[40vw] leading-none text-white/5 opacity-30 blur-[1px] translate-y-4">S</span>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center z-10 px-4 mt-[15vh] md:mt-[22vh]"
      >
        <p className="font-sans text-[10px] md:text-xs tracking-[2em] text-white/80 uppercase mb-6 ml-2">Est. 1998</p>

        <h1 className="sr-only">
          Shakya Gallery | Buy Original Fine Art in Nepal | Premier Art Gallery Kathmandu
        </h1>

        {/* Visual Title (Decorative) */}
        <div className="font-serif font-bold text-7xl md:text-9xl text-white tracking-wide leading-none drop-shadow-md">
          SHAKYA
        </div>
        <div className="flex flex-col items-center mt-4">
          <p className="font-sans text-[10px] md:text-sm tracking-[0.8em] text-white/90 uppercase ml-3">The Gallery</p>
          <div className="w-16 h-[1px] bg-white/50 mt-10 mb-8" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/70 ml-1">Scroll</p>
          <div className="w-[1px] h-16 bg-white/20 overflow-hidden relative border-l border-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-white"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}
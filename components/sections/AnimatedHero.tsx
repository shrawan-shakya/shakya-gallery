"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, LUXURY_DURATION, LUXURY_EASE } from "@/lib/motion-variants";
import Link from "next/link";

export function AnimatedHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // A slight delay ensures the DOM is fully interactive
    // and the previous page's unmount doesn't interrupt the promise natively
    const timer = setTimeout(() => {
      if (videoRef.current) {
        // If the video is already cached and loaded from a previous visit, show it instantly
        if (videoRef.current.readyState >= 3) {
          setIsVideoLoaded(true);
        }

        // Explicitly set these again just to be safe for iOS Safari
        videoRef.current.defaultMuted = true;
        videoRef.current.muted = true;

        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Autoplay was prevented.
            console.warn("Video autoplay prevented:", error);
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bone">

      {/* POSTER / FALLBACK BACKGROUND */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: 'url("/hero-1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* VIDEO BACKGROUND */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: LUXURY_EASE }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-1.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/hero intro.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <span className="font-serif text-[40vw] leading-none text-white/5 opacity-30 blur-[1px] translate-y-4">S</span>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="flex flex-col items-center text-center z-10 px-4 mt-[10vh] md:mt-[15vh]"
      >
        <p className="font-sans text-[11px] md:text-xs tracking-[2em] text-white/80 uppercase mb-6 ml-2">Est. 1998</p>

        <h1 className="sr-only">
          Buy Original Nepalese Fine Art
        </h1>

        <div className="font-serif font-bold text-7xl md:text-9xl text-white tracking-wide leading-none drop-shadow-md">
          SHAKYA
        </div>
        <div className="flex flex-col items-center mt-4">
          <p className="font-sans text-[11px] md:text-sm tracking-[0.8em] text-white/90 uppercase ml-3">The Gallery</p>
          <div className="w-16 h-[1px] bg-white/50 mt-10 mb-8" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: LUXURY_DURATION, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-12 w-full px-4"
        >
          <Link
            href="/collection"
            className="group w-full sm:w-[240px] h-[52px] bg-white text-soft-black hover:bg-gray-100 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl pointer-events-auto"
          >
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium">Explore Collection</span>
            <span className="text-lg transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>

          <Link
            href="/legacy"
            className="group w-full sm:w-[240px] h-[52px] bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-500 flex items-center justify-center gap-3 pointer-events-auto"
          >
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-medium">Our Legacy</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
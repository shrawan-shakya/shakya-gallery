"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12 flex flex-col justify-between">
      
      {/* 1. BIG HEADER */}
      <div className="max-w-[1400px] mx-auto w-full border-b border-black/5 pb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-5xl md:text-8xl text-soft-black"
        >
          CONTACT
        </motion.h1>
      </div>

      {/* 2. INFO GRID */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mt-20">
        
        {/* Column 1: Visit */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Visit</span>
          <div className="font-serif text-2xl text-soft-black leading-relaxed">
            <p>Shakya Gallery</p>
            <p>Thamel, Kathmandu</p>
            <p>Nepal, 44600</p>
          </div>
          <p className="font-sans text-sm text-gray-500 mt-2">
            Open by appointment only.<br/>
            Monday — Friday, 10am — 6pm.
          </p>
        </motion.div>

        {/* Column 2: Inquiries */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-6"
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Inquiries</span>
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-serif text-xl text-soft-black mb-2">Acquisitions</p>
              <a href="mailto:sales@shakyagallery.com" className="font-sans text-sm text-gray-500 hover:text-black transition-colors border-b border-transparent hover:border-black inline-block pb-1">
                sales@shakyagallery.com
              </a>
            </div>
            <div>
              <p className="font-serif text-xl text-soft-black mb-2">Press & Studio</p>
              <a href="mailto:info@shakyagallery.com" className="font-sans text-sm text-gray-500 hover:text-black transition-colors border-b border-transparent hover:border-black inline-block pb-1">
                info@shakyagallery.com
              </a>
            </div>
          </div>
        </motion.div>

        {/* Column 3: Socials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Follow</span>
          <div className="flex flex-col gap-2">
            <a href="https://instagram.com" target="_blank" className="font-serif text-2xl text-soft-black hover:italic transition-all">Instagram ↗</a>
            <a href="https://linkedin.com" target="_blank" className="font-serif text-2xl text-soft-black hover:italic transition-all">LinkedIn ↗</a>
          </div>
        </motion.div>

      </div>

      {/* 3. IMAGE OR MAP FILLER (Optional) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full h-[30vh] md:h-[40vh] bg-black/5 mt-20 md:mt-32 grayscale opacity-50 overflow-hidden"
      >
        {/* You can replace this with a real image of Kathmandu or your gallery later */}
         <div className="w-full h-full flex items-center justify-center">
            <p className="font-sans text-[10px] tracking-widest text-gray-400 uppercase">Kathmandu Valley</p>
         </div>
      </motion.div>

    </main>
  );
}
"use client";

import { motion } from "framer-motion";

export function HeritagePreview() {
  return (
    <section className="bg-bone px-6 border-b border-primary/5 w-full">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

        {/* 1. Small Top Tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[10px] md:text-xs tracking-[0.3em] text-primary uppercase mb-8 font-medium"
        >
          Our Heritage
        </motion.p>

        {/* 2. Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-6xl tracking-[0.2em] text-soft-black leading-[1.1] mb-12"
        >
          THE LEGACY OF <br />
          SHAKYA
        </motion.h2>

        {/* 3. The Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8 max-w-2xl"
        >
          <p className="font-serif text-2xl md:text-3xl italic text-soft-black/80 leading-relaxed">
            "Evolving more than twenty-five years of local expertise into a global legacy, SHAKYA is the singular home for authenticated Nepalese art."
          </p>
        </motion.div>

        {/* 4. The Body Text (Sans Serif) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="max-w-3xl"
        >
          <p className="font-sans text-sm md:text-lg leading-loose text-gray-800 font-light">
            Established in 1998 as the Mountain Art Gallery, our transition to the Shakya digital platform marks a significant new era. We have dedicated more than twenty-five years to the curation of Nepalese artistry, moving from a local physical shop in Kathmandu to an international stage. Today, SHAKYA continues to represent the profound masters of Nepalese art, ensuring their legacy is preserved and recognized by collectors worldwide.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
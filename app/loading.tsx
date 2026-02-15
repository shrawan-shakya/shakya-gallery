"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-bone flex items-center justify-center z-[9999]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center gap-6"
            >
                {/* Logo / Text */}
                <h1 className="font-serif text-4xl md:text-5xl text-soft-black tracking-widest uppercase">
                    Shakya
                </h1>

                {/* Elegant Progress Line */}
                <div className="h-[1px] bg-soft-black/20 w-32 overflow-hidden relative">
                    <motion.div
                        className="absolute inset-0 bg-soft-black"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                            repeatDelay: 0.5
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

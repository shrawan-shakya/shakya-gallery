"use client";

import { useEffect } from "react";
import "./globals.css";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

// Re-define fonts since layout.tsx won't run on global-error
const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["200", "400"],
    variable: "--font-montserrat",
    display: "swap",
});

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <html lang="en">
            <body className={`${cormorant.variable} ${montserrat.variable} bg-bone text-soft-black antialiased`}>
                <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
                    <div className="max-w-md">
                        <h2 className="font-serif text-4xl md:text-5xl italic font-bold mb-6 text-[#7D1818]">
                            Critical Error
                        </h2>
                        <p className="font-sans text-sm md:text-base tracking-wide text-gray-600 mb-10 leading-relaxed">
                            A critical system error occurred. We apologize for the inconvenience.
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-10 py-4 bg-[#1A1A1A] text-white font-sans text-xs tracking-[0.25em] uppercase hover:bg-[#333] transition-colors"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}

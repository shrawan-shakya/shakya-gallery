/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003153", 
        bone: "#FAF9F6",    
        "soft-black": "#1A1A1A", 
        accent: "#C0C0C0",  
        "frame-base": "#111111", 
        // NEW: Centralized Gold and Ebony for the "Mix"
        "frame-gold": "#D4AF37",  
        "frame-ebony": "#111111",
        // "hero-bg": "#E8E8E3",
        "gallery-top": "#F2F0E9",    // Warm Linen (Lightest)
        "gallery-center": "#E8E8E3", // Stone Grey (Medium)
        "gallery-bottom": "#DFDDD5", // Muted Taupe (Deepest)
          "frame-ebony": "#111111",
    "frame-gold": "#D4AF37",      // Brighter highlight
    "frame-gold-deep": "#B8860B", // Deeper shadow for 3D depth
    "gallery-top": "#F2F0E9",
    "gallery-center": "#E8E8E3",
    "gallery-bottom": "#DFDDD5",
"frame-ebony": "#111111",
    "frame-gold": "#797979",      // Light Champagne/Pale Gold highlight
    "frame-gold-deep": "#e4c96f", // Muted Gold for the 3D depth
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        'museum': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-mat': 'inset 0 0 10px rgba(0,0,0,0.1)', 
        // NEW: A tighter shadow for the gold fillet
        'gold-glow': '0 0 4px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
};
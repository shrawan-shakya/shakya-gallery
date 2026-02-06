/** @type {import('tailwindcss').Config} */
module.exports = {
  // WE CHANGED THIS PART TO BE SAFER:
content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",   // Scans everything in src
    "./app/**/*.{js,ts,jsx,tsx,mdx}",   // Scans everything in app (if you have one in root)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components in root
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
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
      },
      letterSpacing: {
        signature: "0.5em", 
        micro: "0.4em",     
      },
      boxShadow: {
        'museum': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner-mat': 'inset 0 0 10px rgba(0,0,0,0.1)', 
      }
    },
  },
  plugins: [],
};
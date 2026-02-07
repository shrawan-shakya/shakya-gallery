"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ArtworkInquiry({ artwork, isSold = false }: { artwork: any, isSold?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    // DYNAMIC MESSAGE based on status
    message: isSold 
      ? "I am interested in sourcing a piece similar to this. Please contact me with options."
      : "I am interested in acquiring this piece. Please provide more details."
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "dd980e1f-daa2-4f43-a832-3b887232392b", // <--- CHECK YOUR KEY
        // DYNAMIC SUBJECT
        subject: isSold 
          ? `Sourcing Request: Similar to ${artwork.title}` 
          : `Inquiry: ${artwork.title} (SKU: ${artwork.sku || "N/A"})`,
        from_name: "Shakya Gallery Website",
        ...formData,
        artwork_details: `
          Title: ${artwork.title}
          SKU: ${artwork.sku || "N/A"}
          Status: ${isSold ? "Sold / Private" : "Available"}
          URL: ${window.location.href}
        `
      }),
    });

    const result = await response.json();
    if (result.success) {
      setIsSuccess(true);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      {/* 1. THE TRIGGER BUTTON (Dynamic Text) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-3 px-0 py-2 border-b border-black hover:border-gray-400 transition-all duration-300 cursor-pointer"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-soft-black group-hover:text-gray-600 transition-colors">
          {isSold ? "Contact Concierge" : "Inquire to Acquire"}
        </span>
        <span className="text-lg transform group-hover:translate-x-2 transition-transform duration-500">
          →
        </span>
      </button>

      {/* 2. THE MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-soft-black/40 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-bone p-8 md:p-12 shadow-2xl border border-white/20"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-soft-black transition-colors"
              >
                ✕
              </button>

              {isSuccess ? (
                <div className="text-center py-12 space-y-6">
                  <span className="text-4xl">💎</span>
                  <h3 className="font-serif text-2xl text-soft-black">Request Received</h3>
                  <p className="font-sans text-xs leading-relaxed text-gray-500">
                    {isSold 
                      ? "Our curation team has received your sourcing request. We will review our private collection for similar pieces."
                      : `Thank you for your interest in ${artwork.title}. Our private sales team will review availability.`
                    }
                  </p>
                  <button onClick={() => setIsOpen(false)} className="text-xs uppercase underline tracking-widest mt-4">Close</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  
                  {/* HONEYPOT */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div>
                    <p className="font-sans text-[9px] tracking-[0.2em] text-gray-400 uppercase mb-2">
                      {isSold ? "Sourcing Request" : "Acquisition Request"}
                    </p>
                    <h2 className="font-serif text-2xl text-soft-black">{artwork.title}</h2>
                    <p className="font-serif text-sm italic text-gray-500 mt-1">SKU: {artwork.sku || "Unlisted"}</p>
                  </div>

                  <div className="space-y-4">
                    <input required type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-3 font-serif text-lg outline-none focus:border-black transition-colors placeholder:text-gray-300" />
                    <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-3 font-serif text-lg outline-none focus:border-black transition-colors placeholder:text-gray-300" />
                    <input type="tel" placeholder="Phone (Optional)" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-3 font-serif text-lg outline-none focus:border-black transition-colors placeholder:text-gray-300" />
                    <textarea rows={3} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent border-b border-black/10 py-3 font-serif text-lg outline-none focus:border-black transition-colors placeholder:text-gray-300 resize-none" />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full bg-soft-black text-white py-4 font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors disabled:opacity-50">
                    {isSubmitting ? "Processing..." : "Confirm Request"}
                  </button>

                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
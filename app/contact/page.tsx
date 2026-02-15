"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<"inquiry" | "visit">("inquiry");

  // --- FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    interest: "Acquiring Art", // Default interest
    _honey: "" // Anti-spam honeypot
  });

  // --- HANDLE INPUT CHANGES ---
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- HANDLE SUBMIT (The Logic) ---
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Stop page refresh
    setIsSubmitting(true);

    try {
      // 1. Send data to Internal API (Resend)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "", interest: "Acquiring Art", _honey: "" }); // Clear form
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">

      {/* HEADER ... (Same as before) */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-sans text-xs tracking-[0.3em] text-gray-400 uppercase mb-6">Concierge Service</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-5xl md:text-7xl text-soft-black leading-none mb-8">GET IN <span className="italic">TOUCH</span></motion.h1>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

        {/* LEFT COLUMN ... (Same as before) */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-16">
          <div className="space-y-8">
            <h3 className="font-sans text-xs tracking-[0.2em] text-soft-black border-b border-black/10 pb-4 uppercase">Direct Lines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div><p className="font-serif text-lg italic text-gray-500 mb-2">Acquisitions</p><a href="mailto:concierge@shakyagallery.com" className="font-sans text-sm tracking-wide text-soft-black hover:opacity-70 transition-opacity">concierge@shakyagallery.com</a></div>
              <div><p className="font-serif text-lg italic text-gray-500 mb-2">General</p><a href="mailto:mag.boudha@gmail.com" className="font-sans text-sm tracking-wide text-soft-black hover:opacity-70 transition-opacity">mag.boudha@gmail.com</a></div>
            </div>
          </div>

          {/* LOCATION */}
          <div className="space-y-8">
            <h3 className="font-sans text-xs tracking-[0.2em] text-soft-black border-b border-black/10 pb-4 uppercase">Visit The Gallery</h3>
            <div className="space-y-4">
              <p className="font-serif text-2xl text-soft-black leading-relaxed">
                Kathmandu,<br />
                Nepal
              </p>
              <a
                href="https://maps.google.com/?q=Shakya+Gallery+Kathmandu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-sans text-xs tracking-[0.2em] uppercase border-b border-black/30 hover:border-black transition-colors pb-1"
              >
                View on Map
              </a>
            </div>
          </div>

        </motion.div>

        {/* RIGHT COLUMN: THE FORM (WIRED UP) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 md:p-12 border border-black/5 shadow-2xl shadow-black/[0.02]"
        >
          {isSuccess ? (
            // SUCCESS STATE
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
              <span className="text-4xl">✉️</span>
              <h3 className="font-serif text-2xl text-soft-black">Message Sent</h3>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-xs">
                Thank you. Our curation team will review your inquiry and respond shortly.
              </p>
              <button onClick={() => setIsSuccess(false)} className="mt-8 font-sans text-[10px] tracking-[0.2em] uppercase border-b border-black hover:opacity-60 transition-opacity">Send Another</button>
            </div>
          ) : (
            // FORM STATE
            <form onSubmit={handleSubmit} className="space-y-12">

              {/* --- SPAM PROTECTION (HONEYPOT) --- */}
              {/* Note: In a real custom API we might handle honeypot on server, but for now we focus on the main fields */}

              <div className="space-y-6">
                <label className="block font-sans text-xs tracking-[0.2em] text-gray-400 uppercase">I am interested in...</label>
                <div className="flex flex-wrap gap-4">
                  {["Acquiring Art", "Commissioning", "Valuation", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { setActiveTab(option as any); setFormData({ ...formData, interest: option }) }}
                      className={`font-sans text-[10px] tracking-[0.2em] uppercase px-6 py-3 border transition-all duration-300
                        ${formData.interest === option ? "border-soft-black bg-soft-black text-white" : "border-black/10 text-gray-500 hover:border-black/30"}
                      `}
                    >
                      {option}
                    </button> // ... continued
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* HONEYPOT (Hidden) */}
                <div className="hidden">
                  <input
                    name="_honey"
                    value={(formData as any)._honey}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-sans text-[10px] tracking-[0.2em] text-gray-400 uppercase">Name</label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    className="w-full border-b border-black/20 py-2 font-serif text-xl text-soft-black focus:border-black outline-none bg-transparent placeholder:text-black/20"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-sans text-[10px] tracking-[0.2em] text-gray-400 uppercase">Email</label>
                  <input
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full border-b border-black/20 py-2 font-serif text-xl text-soft-black focus:border-black outline-none bg-transparent placeholder:text-black/20"
                    placeholder="email@address.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-sans text-[10px] tracking-[0.2em] text-gray-400 uppercase">Message</label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border-b border-black/20 py-2 font-serif text-xl text-soft-black focus:border-black outline-none bg-transparent resize-none placeholder:text-black/20"
                  placeholder="Tell us about your collection..."
                />
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isSubmitting} className="group flex items-center gap-4 text-soft-black disabled:opacity-50">
                  <span className="font-sans text-xs tracking-[0.3em] uppercase border-b border-black pb-1 group-hover:border-gray-400 transition-colors">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <span className="text-xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </div>

            </form>
          )}
        </motion.div>

      </div>
    </main>
  );
}

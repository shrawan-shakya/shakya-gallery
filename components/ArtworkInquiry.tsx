"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

export function ArtworkInquiry({
  artwork,
  isSold = false,
  externalOpen,
  onOpenChange
}: {
  artwork: any,
  isSold?: boolean,
  externalOpen?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  const lenis = useLenis();

  // Lock Body Scroll & Lenis
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+977"); // Default to Nepal
  const [mobile, setMobile] = useState("");

  // Shipping Details
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [message, setMessage] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState(""); // Anti-spam field

  const countryCodes = [
    { code: "+977", iso: "NP", country: "Nepal" },
    { code: "+1", iso: "US", country: "USA/Canada" },
    { code: "+44", iso: "UK", country: "UK" },
    { code: "+61", iso: "AU", country: "Australia" },
    { code: "+86", iso: "CN", country: "China" },
    { code: "+91", iso: "IN", country: "India" },
    { code: "+81", iso: "JP", country: "Japan" },
    { code: "+33", iso: "FR", country: "France" },
    { code: "+49", iso: "DE", country: "Germany" },
    { code: "+971", iso: "AE", country: "UAE" },
    { code: "+65", iso: "SG", country: "Singapore" },
    // Add more as needed
  ];

  // ... inside rendering of select
  {
    countryCodes.map((c) => (
      <option key={c.country} value={c.code}>
        {c.iso} {c.code}
      </option>
    ))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    // Access key is now handled server-side
    formData.append("subject", isSold
      ? `Sourcing Request: Similar to ${artwork.title}`
      : `Bespoke Acquisition: ${artwork.title}`
    );
    formData.append("from_name", "Shakya Gallery Website");

    // Fields
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Mobile", `${countryCode} ${mobile}`); // Combine code and number

    // Combined Address
    const fullAddress = `
      ${street}
      ${city}, ${state} ${zip}
      ${country}
    `;
    formData.append("Shipping Address", fullAddress);

    // HONEYPOT (Spam Protection)
    // If this field is filled, the backend will reject it silently.
    if (honeypot) {
      formData.append("_honey", honeypot);
    }

    if (file) {
      formData.append("Virtual Preview", file);
    }

    const detailsText = `
      Title: ${artwork.title}
      SKU: ${artwork.sku || "N/A"}
      Status: ${isSold ? "Sold / Private" : "Available"}
      URL: ${window.location.href}
      User Message: ${message || "No additional message provided."}
    `;

    formData.append("Artwork Details", detailsText);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData, // Sending FormData supports files
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error", error);
      alert("Network error. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* 1. THE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="group w-full md:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 bg-soft-black text-white hover:bg-black transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
      >
        <span className="font-sans text-xs tracking-[0.3em] uppercase">
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
              className="relative w-full max-w-xl bg-bone shadow-2xl border border-white/20 max-h-[90vh] flex flex-col rounded-sm overflow-hidden"
            >
              {/* Sticky Close Button Area */}
              <div className="absolute top-0 right-0 p-6 z-20 pointer-events-none">
                <button
                  onClick={() => setIsOpen(false)}
                  className="pointer-events-auto text-2xl text-gray-800 hover:text-soft-black transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Content */}
              <div
                data-lenis-prevent
                className="overflow-y-auto p-8 md:p-12 overscroll-contain
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:bg-black/10
                hover:[&::-webkit-scrollbar-thumb]:bg-black/20"
              >
                {isSuccess ? (
                  <div className="text-center py-12 space-y-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-soft-black text-2xl mb-4">
                      ✓
                    </div>

                    <h3 className="font-serif text-3xl text-soft-black">Your inquiry is with our curators.</h3>

                    <p className="font-sans text-sm leading-loose text-soft-black max-w-md mx-auto">
                      We are currently calculating shipping costs and preparing your virtual preview. To maintain the quality of our service, a gallery advisor will reach out via email within 24 hours with your personalized quote.
                    </p>

                    <div className="pt-8 border-t border-black/5 mt-8">
                      <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-800 mb-4">
                        Prefer an immediate update?
                      </p>
                      <a
                        href="https://wa.me/9779841234567" // Placeholder Number
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-soft-black hover:text-[#25D366] transition-colors font-serif italic text-lg"
                      >
                        <span className="text-xl">💬</span> Message us on WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">

                    {/* HEADER */}
                    <div className="pr-8"> {/* Padding right to avoid overlap with close button */}
                      <p className="font-sans text-[11px] tracking-[0.3em] text-gray-400 uppercase mb-2">
                        Bespoke Acquisition
                      </p>
                      <h2 className="font-serif text-3xl text-soft-black leading-tight">{artwork.title}</h2>
                      <p className="font-serif text-sm italic text-gray-600 mt-1">Ref: {artwork.sku || "Unlisted"}</p>
                    </div>

                    {/* FIELDS */}
                    <div className="space-y-6">

                      {/* HONEYPOT (Hidden from humans) */}
                      <div className="hidden">
                        <input
                          type="text"
                          name="_honey"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      {/* Name & Email */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="font-serif italic text-xs text-gray-500">Full Name</label>
                          <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-serif italic text-xs text-gray-500">Email Address</label>
                          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors" />
                        </div>
                      </div>

                      {/* Mobile with Country Code */}
                      <div className="space-y-1">
                        <label className="font-serif italic text-xs text-gray-500">Mobile Number <span className="text-red-400">*</span></label>
                        <div className="flex gap-4">
                          <div className="relative w-1/3">
                            <select
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                              className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                            >
                              {countryCodes.map((c) => (
                                <option key={c.country} value={c.code}>
                                  {c.iso} {c.code}
                                </option>
                              ))}
                            </select>
                            {/* Custom Arrow */}
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</span>
                          </div>
                          <input
                            required
                            type="tel"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="Phone Number"
                            className="w-2/3 bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm"
                          />
                        </div>
                      </div>

                      {/* Detailed Shipping Address */}
                      <div className="space-y-4">
                        <label className="font-serif italic text-xs text-gray-500">Shipping Destination</label>

                        {/* Street */}
                        <input required type="text" placeholder="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />

                        {/* City & State */}
                        <div className="grid grid-cols-2 gap-6">
                          <input required type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                          <input required type="text" placeholder="State / Province" value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                        </div>

                        {/* Zip & Country */}
                        <div className="grid grid-cols-2 gap-6">
                          <input required type="text" placeholder="Zip / Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                          <input required type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                        </div>
                      </div>

                      {/* Custom Message */}
                      <div className="space-y-1">
                        <label className="font-serif italic text-xs text-gray-500">Additional Message / Questions <span className="font-sans ml-1 text-[10px] text-gray-400 opacity-70">(Optional)</span></label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your space, ask about framing, or make a bespoke request..."
                          rows={3}
                          className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm resize-none"
                        />
                      </div>

                      {/* File Upload */}
                      <div className="space-y-3">
                        <label className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-600 block">Virtual Preview (Optional)</label>
                        <div className="relative border border-dashed border-black/20 hover:border-black/40 transition-colors rounded-sm p-6 text-center group cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <span className="text-2xl mb-2 block text-gray-800 group-hover:text-soft-black transition-colors">📷</span>
                          <p className="font-serif text-sm text-soft-black">
                            {file ? `Selected: ${file.name}` : "Upload a photo of your wall."}
                          </p>
                          <p className="font-sans text-[11px] text-gray-800 mt-2">
                            We will digitally place the artwork for you to ensure it brings peace to your space.
                          </p>
                        </div>
                      </div>

                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-soft-black text-white py-4 font-sans text-xs tracking-[0.2em] uppercase hover:bg-black transition-colors disabled:opacity-50">
                      {isSubmitting ? "Processing..." : "Submit Inquiry"}
                    </button>

                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
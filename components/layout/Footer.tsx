"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // 1. Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "dd980e1f-daa2-4f43-a832-3b887232392b", // <--- Your Real Key
        subject: "New Newsletter Subscriber",
        from_name: "Shakya Gallery Footer",
        email: email, // The user's email
        message: "Please add this user to the Collector's Circle mailing list.",
        botcheck: (e.target as any).botcheck.checked ? "true" : "" // Honeypot logic
      }),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("idle"); // If it fails, let them try again
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="bg-soft-black text-bone pt-24 pb-12 px-6 md:px-12 border-t border-white/10">

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

        {/* 1. BRAND & NEWSLETTER (Col 1-5) */}
        <div className="lg:col-span-5 space-y-12">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
              SHAKYA
            </h2>
            <p className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase leading-relaxed max-w-sm">
              Curating Himalayan Masterworks<br />Since 1998.
            </p>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl italic text-white/80">
              Join the Collector's Circle
            </h3>

            {status === "success" ? (
              <div className="space-y-2">
                <p className="font-sans text-sm tracking-widest text-green-400 uppercase">
                  Welcome to the inner circle.
                </p>
                <p className="font-sans text-xs text-gray-500">
                  You will be the first to know about new acquisitions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4 max-w-sm">

                {/* HONEYPOT (Spam Trap) */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="relative border-b border-white/20 focus-within:border-white transition-colors duration-300">
                  <label htmlFor="footer-email" className="sr-only">Email Address</label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-transparent py-4 font-sans text-sm text-white placeholder:text-gray-600 outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? "Joining..." : "Subscribe"}
                  </button>
                </div>
              </form>
            )}

            {status !== "success" && (
              <p className="font-sans text-xs text-gray-600 leading-relaxed">
                Receive advance notice of new acquisitions and private viewing rooms.
              </p>
            )}
          </div>
        </div >

        {/* 2. SITEMAP (Col 6-12) */}
        < div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8" >

          {/* Column A: Explore */}
          < div className="space-y-8" >
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-500 uppercase">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/collection" className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all">
                  Collection
                </Link>
              </li>
              <li>
                <Link href="/legacy" className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all">
                  Legacy
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="font-serif text-lg text-white/40 hover:text-white hover:italic transition-all">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/coming-soon" className="font-serif text-lg text-white/40 hover:text-white hover:italic transition-all">
                  Viewing Rooms
                </Link>
              </li>
            </ul>
          </div >

          {/* Column B: Services */}
          < div className="space-y-8" >
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-500 uppercase">Services</h4>
            <ul className="space-y-4">
              {["Advisory", "Valuation", "Consignment", "Logistics"].map((item) => (
                <li key={item}>
                  <Link href="/coming-soon" className="font-serif text-lg text-white/40 hover:text-white hover:italic transition-all">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div >

          {/* Column C: Contact & Social */}
          < div className="space-y-8" >
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-500 uppercase">Connect</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/contact" className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div >

        </div >
      </div >

      {/* 3. SUB-FOOTER (Copyright) */}
      < div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6" >
        <p className="font-sans text-xs tracking-[0.2em] text-gray-600 uppercase">
          © {new Date().getFullYear()} Shakya Gallery. All Rights Reserved.
        </p>
        <div className="flex gap-8">
          <Link href="/privacy-policy" className="font-sans text-xs tracking-[0.2em] text-gray-600 uppercase hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="font-sans text-xs tracking-[0.2em] text-gray-600 uppercase hover:text-white transition-colors">Terms</Link>
        </div>
      </div >

    </footer >
  );
}
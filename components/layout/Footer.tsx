"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/config";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { ShieldCheck, Truck, Lock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // 1. Send to Web3Forms
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("idle");
      alert(result.message || "Something went wrong. Please try again.");
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
            <p className="font-sans text-xs tracking-[0.2em] text-gray-300 uppercase leading-relaxed max-w-sm">
              Curating Himalayan Masterworks
              <br />
              Since {siteConfig.since}.
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
                <p className="font-sans text-xs text-gray-400">
                  You will be the first to know about new acquisitions.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-4 max-w-sm"
              >
                {/* HONEYPOT (Spam Trap) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                />

                <div className="relative border-b border-white/20 focus-within:border-white transition-colors duration-300">
                  <label htmlFor="footer-email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "submitting"}
                    className="w-full bg-transparent py-4 font-sans text-sm text-white placeholder:text-gray-400 outline-none disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="absolute right-0 top-1/2 -translate-y-1/2 font-sans text-xs tracking-[0.2em] uppercase text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {status === "submitting" ? "Joining..." : "Subscribe"}
                  </button>
                </div>
              </form>
            )}

            {status !== "success" && (
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Receive advance notice of new acquisitions and private viewing
                rooms.
              </p>
            )}
          </div>
        </div>

        {/* 2. SITEMAP (Col 6-12) */}
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-8">
          {/* Column A: Explore */}
          <div className="space-y-8">
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase">
              Explore
            </h4>
            <ul className="space-y-4">
              {["Collection", "Legacy", "Exhibitions", "Viewing Rooms"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={
                        item === "Collection"
                          ? "/collection"
                          : item === "Legacy"
                            ? "/legacy"
                            : "/coming-soon"
                      }
                      className={cn(
                        "font-serif text-lg transition-all hover:italic",
                        item === "Exhibitions" || item === "Viewing Rooms"
                          ? "text-white/40 hover:text-white"
                          : "text-white/80 hover:text-white",
                      )}
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column B: Services */}
          <div className="space-y-8">
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase">
              Services
            </h4>
            <ul className="space-y-4">
              {["Advisory", "Valuation", "Consignment", "Logistics"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/coming-soon"
                      className="font-serif text-lg text-white/40 hover:text-white hover:italic transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column C: Contact & Social */}
          <div className="space-y-8">
            <h4 className="font-sans text-xs tracking-[0.2em] text-gray-400 uppercase">
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/contact"
                  className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all"
                >
                  Contact Concierge
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg text-white/80 hover:text-white hover:italic transition-all"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* TRUST & PAYMENTS (THE ASSURANCE ROW) */}
      <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 lg:mt-32 pt-12 md:pt-16 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Trust Badges - Strict Left-Alignment */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-x-12 lg:gap-x-16 gap-y-10 md:gap-y-16">
            <div className="flex flex-col items-start text-left gap-5">
              <ShieldCheck
                className="w-6 h-6 text-white/40 shrink-0 -ml-0.5"
                strokeWidth={1}
              />
              <div className="space-y-2">
                <h5 className="font-serif text-sm italic text-white/90 leading-none">
                  Authenticity
                </h5>
                <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase leading-relaxed">
                  Signed Certificates
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start text-left gap-5">
              <Truck
                className="w-6 h-6 text-white/40 shrink-0 -ml-0.5"
                strokeWidth={1}
              />
              <div className="space-y-2">
                <h5 className="font-serif text-sm italic text-white/90 leading-none">
                  Logistics
                </h5>
                <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase leading-relaxed">
                  Insured Delivery
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start text-left gap-5">
              <Lock
                className="w-6 h-6 text-white/40 shrink-0 -ml-0.5"
                strokeWidth={1}
              />
              <div className="space-y-2">
                <h5 className="font-serif text-sm italic text-white/90 leading-none">
                  Payments
                </h5>
                <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase leading-relaxed">
                  Secure Transfers
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start text-left gap-5">
              <Award
                className="w-6 h-6 text-white/40 shrink-0 -ml-0.5"
                strokeWidth={1}
              />
              <div className="space-y-2">
                <h5 className="font-serif text-sm italic text-white/90 leading-none">
                  Legacy
                </h5>
                <p className="font-sans text-[10px] tracking-[0.2em] text-gray-500 uppercase leading-relaxed">
                  Since 1998
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/5 lg:pl-16 flex flex-col justify-center gap-10 mt-12 lg:mt-0 pt-10 lg:pt-0 border-t border-white/5 lg:border-t-0">
            <div className="space-y-4">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-500 block leading-none">
                International
              </span>
              <p className="font-serif text-white/80 italic text-base lg:text-lg leading-tight lg:mt-1">
                Wise, Payoneer, SWIFT Transfer
              </p>
            </div>
            <div className="space-y-4">
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-gray-500 block leading-none">
                Local (Nepal)
              </span>
              <p className="font-serif text-white/80 italic text-base lg:text-lg leading-tight lg:mt-1">
                eSewa, Khalti, Bank Transfer, COD
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SUB-FOOTER (Utility & Legal) */}
      <div className="max-w-[1400px] mx-auto mt-16 md:mt-24 lg:mt-32 pb-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        {/* Left: Copyright & Links */}
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 order-2 md:order-1 w-full md:w-auto text-center md:text-left">
          <p className="font-sans text-[10px] tracking-widest text-gray-500 uppercase flex-shrink-0">
            © {new Date().getFullYear()} Shakya Gallery
          </p>
          <div className="hidden md:block w-px h-3 bg-white/10" />
          <div className="flex items-center justify-center gap-3 md:gap-4">
            <Link
              href="/privacy-policy"
              className="font-sans text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase"
            >
              Privacy
            </Link>
            <span className="text-white/20 text-[10px]">•</span>
            <Link
              href="/terms"
              className="font-sans text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase"
            >
              Terms
            </Link>
            <span className="text-white/20 text-[10px]">•</span>
            <Link
              href="/refund-policy"
              className="font-sans text-[10px] tracking-widest text-gray-500 hover:text-white transition-colors uppercase"
            >
              Refunds
            </Link>
          </div>
        </div>

        {/* Right: Currency Toggle */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end w-full md:w-auto border-b md:border-b-0 border-white/5 pb-6 md:pb-0 mb-4 md:mb-0">
          <CurrencyToggle />
        </div>
      </div>
    </footer>
  );
}

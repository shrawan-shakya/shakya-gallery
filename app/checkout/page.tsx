"use client";

import { useCartStore } from "@/lib/store/useCartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Price } from "@/components/ui/Price";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, getCartTotals, clearCart } = useCartStore();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+977");
    const [mobile, setMobile] = useState("");

    // Shipping Details
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    const [honeypot, setHoneypot] = useState("");

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
    ];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0 && !isSuccess) {
        return (
            <div className="min-h-screen bg-bone pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <h1 className="font-serif text-3xl md:text-5xl text-soft-black mb-6">Your Selection is Empty</h1>
                <p className="font-sans text-gray-500 mb-8 max-w-md">Browse our collection to add pristine Nepalese art to your inquiry selection.</p>
                <Link href="/collection" className="font-sans text-xs tracking-[0.2em] uppercase text-soft-black border-b border-black pb-1 hover:text-black/60 transition-colors">
                    Return to Collection
                </Link>
            </div>
        );
    }

    const { total, hasEstimate } = getCartTotals();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("subject", `Multi-Item Inquiry from ${name}`);
        formData.append("from_name", "Shakya Gallery Website");

        formData.append("Name", name);
        formData.append("Email", email);
        formData.append("Mobile", `${countryCode} ${mobile}`);

        const fullAddress = `
      ${street}
      ${city}, ${state} ${zip}
      ${country}
    `;
        formData.append("Shipping Address", fullAddress);

        if (honeypot) {
            formData.append("_honey", honeypot);
        }

        // Serialize cart items for the backend to render in Emails
        formData.append("cartData", JSON.stringify(items));
        formData.append("cartTotal", total.toString());
        formData.append("hasEstimate", hasEstimate.toString());
        formData.append("message", message);

        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                setIsSuccess(true);
                clearCart();
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Submission Error", error);
            alert("Network error. Please try again.");
        }

        setIsSubmitting(false);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-bone pt-40 pb-20 px-6 flex flex-col items-center justify-center text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-soft-black text-2xl mb-8">
                    ✓
                </div>
                <h1 className="font-serif text-3xl md:text-5xl text-soft-black mb-6">Inquiry Received</h1>
                <p className="font-sans text-sm leading-loose text-soft-black max-w-lg mx-auto mb-12">
                    Thank you for choosing Shakya Gallery. Our curators are reviewing your selection of masterworks. We are currently calculating custom shipping quotes to your address and will send a secured manual invoice via email within 24 hours.
                </p>
                <Link href="/collection" className="font-sans text-xs tracking-[0.2em] uppercase text-soft-black border-b border-black pb-1 hover:text-black/60 transition-colors">
                    Return to Collection
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bone pt-32 lg:pt-40 pb-40">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* LEFT COMPONENT: The Form */}
                <div className="lg:col-span-7 lg:order-1 order-2">
                    <h1 className="font-serif text-3xl md:text-4xl text-soft-black mb-2">Request to Purchase</h1>
                    <p className="font-sans text-sm text-gray-500 mb-10">
                        Submit your details below. You will receive a secure invoice containing exact shipping costs and bank transfer details within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        {/* HONEYPOT (Hidden from humans) */}
                        <div className="hidden">
                            <input type="text" name="_honey" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
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
                                            <option key={c.country} value={c.code}>{c.iso} {c.code}</option>
                                        ))}
                                    </select>
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 pointer-events-none">▼</span>
                                </div>
                                <input
                                    required type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Phone Number"
                                    className="w-2/3 bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm"
                                />
                            </div>
                        </div>

                        {/* Detailed Shipping Address */}
                        <div className="space-y-4 pt-4">
                            <h3 className="font-serif text-lg text-soft-black border-b border-black/5 pb-2 mb-4">Shipping Destination</h3>

                            <input required type="text" placeholder="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />

                            <div className="grid grid-cols-2 gap-6">
                                <input required type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                                <input required type="text" placeholder="State / Province" value={state} onChange={(e) => setState(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <input required type="text" placeholder="Zip / Postal Code" value={zip} onChange={(e) => setZip(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                                <input required type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm" />
                            </div>
                        </div>

                        <div className="space-y-1 pt-4">
                            <label className="font-serif italic text-xs text-gray-500">Additional Instructions <span className="font-sans ml-1 text-[10px] text-gray-400 opacity-70">(Optional)</span></label>
                            <textarea
                                value={message} onChange={(e) => setMessage(e.target.value)}
                                placeholder="Any special handling requests or questions..."
                                rows={3} className="w-full bg-transparent border-b border-black/10 py-2 font-sans font-light text-base outline-none focus:border-black transition-colors placeholder:text-gray-500 placeholder:text-sm resize-none"
                            />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-soft-black text-white py-4 mt-8 font-sans text-xs tracking-[0.2em] uppercase hover:bg-black transition-colors disabled:opacity-50">
                            {isSubmitting ? "Processing..." : "Submit Inquiry"}
                        </button>
                    </form>
                </div>

                {/* RIGHT COMPONENT: Order Summary */}
                <div className="lg:col-span-5 lg:order-2 order-1">
                    <div className="bg-white p-6 md:p-8 shadow-sm border border-black/5 sticky top-24">
                        <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-6 border-b border-black/5 pb-4">Inquiry Summary</h2>

                        <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto pr-2
               [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/10">
                            {items.map((item, idx) => (
                                <div key={item._id || `item-${idx}`} className="flex gap-4">
                                    <div className="relative w-20 h-20 bg-gray-100 flex-shrink-0">
                                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-serif text-lg leading-tight text-soft-black">{item.title}</h3>
                                        <p className="font-sans text-[10px] tracking-widest uppercase text-gray-500 mt-1">{item.artist}</p>
                                        <div className="font-sans text-xs mt-2 text-soft-black">
                                            {(item.showPrice && item.price) ? <Price amount={item.price} /> : (
                                                item.startingPrice ? <span className="italic font-serif">Starts at ${item.startingPrice.toLocaleString()}</span> : <span className="italic font-serif">Price on Request</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-black/10 flex flex-col gap-3">
                            <div className="flex justify-between font-sans text-xs text-gray-500">
                                <span>Subtotal ({items.length} items)</span>
                                <span>
                                    {hasEstimate ? "Starting at " : ""}
                                    <Price amount={total} />
                                </span>
                            </div>
                            <div className="flex justify-between font-sans text-xs text-gray-500">
                                <span>Shipping</span>
                                <span>TBD</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-black/10 flex justify-between items-end">
                            <span className="font-serif italic text-gray-600 text-lg">Estimated Total</span>
                            <span className="font-serif text-2xl text-soft-black text-right flex flex-col items-end">
                                {hasEstimate && <span className="text-[10px] font-sans text-gray-500 tracking-widest uppercase mb-1 leading-none">Starting at</span>}
                                <span><Price amount={total} /></span>
                            </span>
                        </div>
                        <p className="font-sans text-[9px] text-gray-400 tracking-wider uppercase mt-4 text-center leading-relaxed">
                            Final price will be decided after shipping<br />or additional bespoke framing requests.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}

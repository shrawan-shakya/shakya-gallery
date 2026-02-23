import { ShippingWidget } from "@/components/ui/ShippingWidget";
import Link from "next/link";

export const metadata = {
    title: "World-Class Fine Art Shipping & Logistics | SHAKYA Gallery",
    description: "Learn about our museum-grade global shipping, custom crating, and white-glove delivery for international art collectors.",
};

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-bone pt-32 pb-40">
            <div className="max-w-[1400px] mx-auto px-6">

                {/* HERO SECTION */}
                <div className="max-w-3xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <nav className="flex items-baseline gap-3 font-sans text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-8">
                        <Link href="/" className="hover:text-soft-black transition-colors">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-soft-black border-b border-black/20 pb-0.5">Shipping & Logistics</span>
                    </nav>

                    <h1 className="font-serif text-5xl md:text-7xl text-soft-black leading-tight mb-8">
                        Global Logistics, <br />
                        <span className="italic text-gray-400">Museum Protection.</span>
                    </h1>

                    <p className="font-sans font-light text-lg leading-relaxed text-gray-600 tracking-wide max-w-2xl">
                        Acquiring fine art from Kathmandu is a journey of trust. We ensure that every masterpiece arrives at your doorstep with the same serenity and perfection it possesses in our gallery.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* LEFT: THE WIDGET */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
                        <ShippingWidget />

                        <div className="mt-12 p-8 bg-white border border-black/5 space-y-6">
                            <h4 className="font-serif text-xl italic text-soft-black">Direct Assistance</h4>
                            <p className="font-sans text-xs leading-relaxed text-gray-500">
                                For oversized pieces, multi-piece collections, or specific white-glove delivery requirements, please contact our logistics concierge directly.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.3em] uppercase text-soft-black border-b border-soft-black pb-1 hover:opacity-50 transition-opacity"
                            >
                                Inquire via Email →
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT: THE POLICIES */}
                    <div className="lg:col-span-7 space-y-16">

                        <section className="space-y-6">
                            <h2 className="font-serif text-3xl text-soft-black">The Art of the Tube</h2>
                            <div className="prose prose-sm max-w-none font-sans font-light text-gray-600 leading-relaxed text-justify space-y-4">
                                <p>
                                    To ensure maximum protection during international transit, paintings are typically shipped unframed and carefully rolled in heavy-duty, moisture-sealed protective tubes. This is the global industry standard for high-value fine art, significantly reducing the risk of structural damage and optimizing logistics costs.
                                </p>
                                <p>
                                    Each piece is layered between acid-free glassine paper, preventing any contact with the tube's interior and preserving the integrity of the pigments and canvas.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="font-serif text-3xl text-soft-black">Full Insurance & Tracking</h2>
                            <div className="prose prose-sm max-w-none font-sans font-light text-gray-600 leading-relaxed text-justify space-y-4">
                                <p>
                                    Every acquisition is fully insured for its declared value from the moment it leaves our gallery in Kathmandu until it reaches your door. We partner with specialized art couriers including UPS, DHL, and FedEx to provide end-to-end tracking.
                                </p>
                                <p>
                                    A gallery representative monitors every shipment daily, providing you with real-time updates and ensuring a smooth clearance through international customs.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="font-serif text-3xl text-soft-black">Custom Crating & Large Masterworks</h2>
                            <div className="prose prose-sm max-w-none font-sans font-light text-gray-600 leading-relaxed text-justify space-y-4">
                                <p>
                                    For framed works and oversized paintings, we utilize custom-built ISPM-15 certified wooden crates. These crates are engineered to withstand the rigors of international air freight, featuring internal shock-absorption and climate-stabilizing linings.
                                </p>
                                <p>
                                    Oversized masterworks may require specialized cargo handling. Our team coordinates all aspects of specialized transit, including specialized airport-to-door delivery vehicles.
                                </p>
                            </div>
                        </section>

                        <section className="p-10 bg-soft-black text-white space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🛡️</span>
                                <div className="space-y-4">
                                    <h2 className="font-serif text-3xl italic">No Surprise Fees, Guaranteed.</h2>
                                    <p className="font-sans text-sm font-light leading-relaxed opacity-80">
                                        The price you see is the price you pay. Our global logistics team manages all export taxes, documentation, and handles customs clearance on your behalf. If any unexpected administrative fees or duties arise during transit, they are covered entirely by the gallery.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="font-serif text-3xl text-soft-black">For Our Local Collectors</h2>
                            <div className="prose prose-sm max-w-none font-sans font-light text-gray-600 leading-relaxed text-justify space-y-4">
                                <p>
                                    Collectors within the Kathmandu Valley enjoy complimentary white-glove hand-delivery. Our team will personally bring the artwork to your home or office, ensuring it is placed exactly where you desire.
                                </p>
                                <p>
                                    Alternatively, we invite you to visit our main gallery in Patan for a private viewing and personal collection. We offer traditional silk wrapping and custom packaging for local transport to ensure your acquisition stays protected.
                                </p>
                            </div>
                        </section>


                        <section className="p-10 bg-frame-gold/[0.03] border-l-2 border-frame-gold/30 space-y-4">
                            <h3 className="font-serif text-xl italic text-soft-black">Customs & Duties</h3>
                            <p className="font-sans text-xs leading-relaxed text-gray-500">
                                While we handle all export documentation from Nepal, international shipments may be subject to import duties or taxes depending on your destination country. Most original fine art is exempt from duties in major regions (like the US and UK), but local VAT/Sales Tax may apply.
                            </p>
                        </section>

                    </div>
                </div>

            </div>
        </div>
    );
}

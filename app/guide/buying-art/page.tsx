import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Buy Fine Art | The Collector's Guide | SHAKYA",
    description: "A comprehensive guide on buying original fine art in Nepal. Learn how to select, verify, and acquire authentic abstracts, landscapes, and portraits.",
};

const Step = ({ number, title, text }: { number: string; title: string; text: React.ReactNode }) => (
    <div className="flex gap-6 md:gap-10 items-start w-full">
        <span className="font-serif text-5xl md:text-6xl text-black/10 leading-none select-none shrink-0">
            {number}
        </span>
        <div className="pt-2 flex-1 min-w-0">
            <h3 className="font-serif text-2xl text-black mb-3">{title}</h3>
            <div className="font-sans text-sm md:text-base text-black leading-relaxed max-w-2xl">
                {text}
            </div>
        </div>
    </div>
);

export default function BuyingGuidePage() {
    return (
        <main className="min-h-screen bg-bone">

            {/* 1. HERO */}
            <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto">
                <p className="font-sans text-xs tracking-[0.3em] text-red-800 uppercase mb-6">
                    The Collector's Guide
                </p>
                <h1 className="font-serif text-5xl md:text-7xl text-black leading-none mb-10">
                    HOW TO <span className="italic">ACQUIRE</span> ART
                </h1>
                <p className="font-serif text-xl italic text-zinc-900 max-w-2xl mx-auto leading-relaxed">
                    "Collecting fine art is a journey of emotion, taste, and legacy. Here is how to navigate the acquisition process with confidence."
                </p>
            </section>

            {/* 2. THE STEPS */}
            <section className="py-20 px-6 md:px-12 bg-white border-y border-black/5">
                <div className="max-w-4xl mx-auto space-y-20">
                    <Step
                        number="01"
                        title="Discover & Connect"
                        text={
                            <div className="space-y-4">
                                <p>
                                    Begin by exploring our digital collection. Every painting shows its size, artist, year and <span className="text-black font-semibold">“Price on request – starts at $XXX”</span> (e.g. starts at $240).
                                </p>
                                <p>
                                    This means you immediately know the lowest possible price. Because each piece is unique, we confirm the exact final price in your personal quote.
                                </p>
                                <p>
                                    When a piece speaks to you — whether an expressive abstract or a serene landscape — read its story. Art is personal; trust your instinct.
                                </p>
                                <Link href="/guide/choosing-art" className="inline-block underline font-semibold hover:opacity-70 transition-opacity mt-2">
                                    Read our guide on how to choose art.
                                </Link>
                            </div>
                        }
                    />
                    <Step
                        number="02"
                        title="Curate Your Selection"
                        text={
                            <div className="space-y-4">
                                <p>
                                    As you find pieces that resonate, click <span className="text-black font-semibold">“Add to Inquiry Selection”</span>. You can curate multiple artworks into your personal gallery cart.
                                </p>
                                <p>
                                    When you are ready, review your selection in the side drawer and submit a single, comprehensive inquiry in under 20 seconds.
                                </p>
                                <p>
                                    Our curation team will review your complete selection and reply within 24 hours (often the same day) with high-resolution details, exact pricing, and a personalized, combined shipping quote.
                                </p>
                            </div>
                        }
                    />
                    <Step
                        number="03"
                        title="Secure the Work"
                        text={
                            <div className="space-y-6">
                                <p>
                                    Once you decide to proceed, we issue a simple, secure invoice. Upon payment, the artwork is marked <span className="italic">“Sold”</span> and reserved for you.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="bg-bone/40 p-6 border border-black/10">
                                        <h4 className="font-serif text-lg text-black mb-4">International Buyers</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-900">•</span>
                                                <span><strong className="font-semibold">Wise</strong> (Recommended — fast, low fees)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-900">•</span>
                                                <span>Payoneer</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-900">•</span>
                                                <span>Bank transfer (SWIFT)</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="bg-bone/40 p-6 border border-black/10">
                                        <h4 className="font-serif text-lg text-black mb-4">Buyers in Nepal</h4>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-900">•</span>
                                                <span>eSewa, Khalti, or IME Pay</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-red-900">•</span>
                                                <span>Direct bank transfer</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-sm italic text-black">
                                    We send clear instructions + screenshots with every quote. Most buyers complete payment within 48 hours.
                                </p>
                            </div>
                        }
                    />
                    <Step
                        number="04"
                        title="Professional Delivery"
                        text={
                            <div className="space-y-6">
                                <div className="overflow-x-auto border border-black/5">
                                    <table className="w-full text-left text-sm">
                                        <thead>
                                            <tr className="bg-bone/60 font-serif text-black">
                                                <th className="p-4 border-b border-black/5">Destination</th>
                                                <th className="p-4 border-b border-black/5">Cost Example (35×40 in)</th>
                                                <th className="p-4 border-b border-black/5">Time</th>
                                                <th className="p-4 border-b border-black/5">Notes</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5 text-black">
                                            <tr>
                                                <td className="p-4 font-medium text-black">Kathmandu Valley</td>
                                                <td className="p-4">Free</td>
                                                <td className="p-4">1–2 days</td>
                                                <td className="p-4 italic">Door delivery</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium text-black">International</td>
                                                <td className="p-4">$220 – $320</td>
                                                <td className="p-4">7–14 days</td>
                                                <td className="p-4 italic">Crating + Insurance included</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-medium text-black">Orders over $1,500</td>
                                                <td className="p-4 text-red-800 font-medium">FREE</td>
                                                <td className="p-4">7–14 days</td>
                                                <td className="p-4 italic">Worldwide</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="space-y-4 pt-2">
                                    <p className="text-black">
                                        Paintings are carefully packed (rolled in protective tubes or fully crated). We handle all export paperwork and provide the <span className="italic font-medium text-black">non-antiquity certificate</span>.
                                    </p>
                                    <p className="text-black">
                                        If you prefer your artwork to arrive pre-framed, our curators can arrange custom museum-grade framing for an additional fee.
                                    </p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </section>

            {/* 3. ASSURANCE & CONTACT */}
            <section className="py-24 px-6 md:px-12 bg-bone">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">

                    <div className="space-y-8">
                        <div>
                            <h2 className="font-serif text-3xl text-black mb-6">Authenticity Guaranteed</h2>
                            <p className="font-sans text-sm md:text-base text-black leading-relaxed mb-6">
                                Every artwork from SHAKYA Gallery is an original creation. We work directly with Nepal’s most established fine artists to ensure absolute provenance.
                            </p>
                            <p className="font-sans text-sm md:text-base text-black leading-relaxed">
                                Included with every acquisition is a signed <strong className="text-black">Certificate of Authenticity</strong>, detailing the artist, medium, year, and value — essential for insurance and legacy.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="font-serif text-3xl text-black mb-6">Need Consultation?</h2>
                            <p className="font-sans text-sm md:text-base text-black leading-relaxed mb-8">
                                Unsure where to start? Our curators offer complimentary advisory services to help you build a cohesive collection that fits your space and budget.
                            </p>
                            <div className="space-y-6">
                                <Link
                                    href="https://wa.me/9779843320342"
                                    target="_blank"
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-green-600 transition-colors"
                                >
                                    <span>Contact on WhatsApp</span>
                                </Link>
                                <div className="font-sans text-sm text-black">
                                    <p className="mb-1 font-medium text-black font-serif text-lg tracking-tight">Direct: +977-9843320342</p>
                                    <p className="text-black/70 italic">Available for video calls & virtual gallery tours.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 4. CTA */}
            <section className="py-20 text-center bg-white border-t border-black/5">
                <h2 className="font-serif text-3xl italic text-black mb-8">Ready to begin?</h2>
                <Link href="/collection" className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-600 hover:border-gray-400 transition-all">
                    Browse The Collection
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </section>

        </main>
    );
}

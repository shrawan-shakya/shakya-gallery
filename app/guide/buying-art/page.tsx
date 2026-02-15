import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Buy Fine Art | The Collector's Guide | SHAKYA",
    description: "A comprehensive guide on buying original fine art in Nepal. Learn how to select, verify, and acquire authentic abstracts, landscapes, and portraits.",
};

const Step = ({ number, title, text }: { number: string; title: string; text: React.ReactNode }) => (
    <div className="flex gap-6 md:gap-10 items-start">
        <span className="font-serif text-5xl md:text-6xl text-black/10 leading-none select-none">
            {number}
        </span>
        <div className="pt-2">
            <h3 className="font-serif text-2xl text-soft-black mb-3">{title}</h3>
            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed font-light max-w-lg">
                {text}
            </p>
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
                <h1 className="font-serif text-5xl md:text-7xl text-soft-black leading-none mb-10">
                    HOW TO <span className="italic">ACQUIRE</span> ART
                </h1>
                <p className="font-serif text-xl italic text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    "Collecting fine art is a journey of emotion, taste, and legacy. Here is how to navigate the acquisition process with confidence."
                </p>
            </section>

            {/* 2. THE STEPS */}
            <section className="py-20 px-6 md:px-12 bg-white border-y border-black/5">
                <div className="max-w-3xl mx-auto space-y-16">
                    <Step
                        number="01"
                        title="Discover & Connect"
                        text={
                            <>
                                Begin by exploring our digital collection. When a piece speaks to you—whether an expressive abstract or a serene landscape—read its story. Art is personal; trust your instinct. {" "}
                                <Link href="/coming-soon" className="underline hover:text-soft-black transition-colors">
                                    Read our guide on how to choose art.
                                </Link>
                            </>
                        }
                    />
                    <Step
                        number="02"
                        title="Inquire for Details"
                        text="Use the 'Inquire' button on any artwork page. Our curation team will provide high-resolution details, provenance history, and a personalized shipping quote."
                    />
                    <Step
                        number="03"
                        title="Secure the Work"
                        text="Once you decide to proceed, we issue a secure invoice. We facilitate bank transfers and digital payments. Upon payment, the artwork is marked as 'Sold'."
                    />
                    <Step
                        number="04"
                        title="Professional Delivery"
                        text="We carefully pack and ship every piece to ensure it arrives safely. Fully insured delivery brings your new artwork directly to your doorstep, ready to hang."
                    />
                </div>
            </section>

            {/* 3. FAQ / ASSURANCE */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">

                    <div>
                        <h2 className="font-serif text-3xl text-soft-black mb-8">Authenticity Guaranteed</h2>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-6">
                            Every artwork from SHAKYA Gallery is an original creation. We work directly with Nepal's most established fine artists to ensure absolute provenance.
                        </p>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                            Included with every acquisition is a signed <strong>Certificate of Authenticity</strong>, detailing the artist, medium, year, and value—essential for insurance and legacy.
                        </p>
                    </div>

                    <div>
                        <h2 className="font-serif text-3xl text-soft-black mb-8">Need Consultation?</h2>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed mb-8">
                            Unsure where to start? Our curators offer complimentary advisory services to help you build a cohesive collection that fits your space and budget.
                        </p>
                        <Link href="/contact" className="inline-block px-8 py-4 bg-soft-black text-white font-sans text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors">
                            Contact a Curator
                        </Link>
                    </div>

                </div>
            </section>

            {/* 4. CTA */}
            <section className="py-20 text-center bg-gray-100">
                <h2 className="font-serif text-3xl italic text-soft-black mb-8">Ready to begin?</h2>
                <Link href="/collection" className="font-sans text-xs tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-gray-600 hover:border-gray-400 transition-colors">
                    Browse The Collection
                </Link>
            </section>

        </main>
    );
}

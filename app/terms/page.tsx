import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms & Conditions | SHAKYA Gallery",
    description: "Terms of Service for acquiring artwork from Shakya Gallery. Authenticity, payment, shipping, and returns policy.",
};

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
            <h1 className="font-serif text-4xl md:text-5xl italic font-bold text-[#1A1A1A] mb-12 text-center">
                Terms & Conditions
            </h1>

            <div className="prose prose-stone max-w-none font-sans text-gray-600 leading-relaxed">
                <p className="mb-8 font-serif italic text-lg text-gray-500 text-center">
                    Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>

                <p className="mb-12">
                    These Terms & Conditions govern the sale of fine art by <strong>Shakya Gallery</strong> ("we", "us") and the Client ("you"). By acquiring an artwork, you agree to these terms.
                </p>

                {/* 1. AUTHENTICITY */}
                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">1. Guarantee of Authenticity</h2>
                <p className="mb-4">
                    We guarantee the authenticity of every artwork we sell. Each piece is an original creation by the stated artist and is accompanied by a signed <strong>Certificate of Authenticity</strong> (COA).
                </p>
                <p className="mb-8">
                    In the unlikely event that an artwork is proven to be inauthentic by a recognized authority within five (5) years of purchase, we will refund the full purchase price upon return of the work in its original condition.
                </p>

                {/* 2. PAYMENT & TITLE */}
                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">2. Payment & Transfer of Title</h2>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>Prices are listed in <strong>USD</strong> unless otherwise stated.</li>
                    <li>We accept payment via Bank Wire Transfer (SWIFT), Credit Card (subject to surcharge), or local digital wallets (Nepalese clients).</li>
                    <li><strong>Title of Ownership</strong> passes to the buyer only upon our receipt of full payment in cleared funds.</li>
                    <li>We reserve the right to cancel any order if payment is not received within 7 days of invoicing.</li>
                </ul>

                {/* 3. SHIPPING & DUTIES */}
                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">3. Shipping & Import Duties</h2>
                <p className="mb-4">
                    <strong>International Shipments:</strong> We provide professional crating and insured shipping via registered couriers (DHL/FedEx/Cargo).
                </p>
                <div className="bg-bone p-6 border border-black/5 mb-8">
                    <p className="font-semibold text-soft-black mb-2">⚠️ Important Note on Customs:</p>
                    <p className="text-sm">
                        The Buyer is responsible for all <strong>import duties, VAT, taxes, and customs clearance fees</strong> levied by the destination country. Shakya Gallery is not responsible for delays caused by customs processing.
                    </p>
                </div>

                {/* 4. RETURNS */}
                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">4. Returns & Refunds</h2>
                <p className="mb-4">
                    We want you to be delighted with your acquisition.
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li><strong>Online Sales:</strong> You may request a return within <strong>7 days</strong> of delivery if the artwork differs significantly from its description.</li>
                    <li>The artwork must be returned in its original condition and packaging.</li>
                    <li>Shipping costs (both ways) and any custom duties paid are non-refundable.</li>
                    <li><strong>Damaged Goods:</strong> If an artwork arrives damaged, you must notify us within 48 hours with photographic evidence to initiate an insurance claim.</li>
                </ul>

                {/* 5. GOVERNING LAW */}
                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">5. Governing Law</h2>
                <p className="mb-8">
                    These terms are governed by the laws of <strong>Nepal</strong>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in <strong>Kathmandu, Nepal</strong>.
                </p>

                <hr className="border-black/10 my-12" />

                <p className="text-sm text-center">
                    For inquiries offering legal concern, please contact us at <a href="mailto:concierge@shakyagallery.com" className="underline hover:text-soft-black">concierge@shakyagallery.com</a>.
                </p>
            </div>
        </div>
    );
}

import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund & Return Policy | SHAKYA Gallery",
  description:
    "Our policy on returns and refunds for fine art acquisitions. All sales are final with exceptions for transit damage.",
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-bone pt-32 pb-20 px-6 md:px-12">
      <h1 className="font-serif text-4xl md:text-5xl text-soft-black leading-tight italic font-bold mb-12 text-center tracking-luxury-wide uppercase">
        Refund Policy
      </h1>

      <div className="prose prose-stone max-w-none font-sans text-gray-600 leading-relaxed">
        <p className="mb-8 font-serif italic text-lg text-gray-500 text-center">
          Effective Date:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="space-y-12">
          {/* 1. FINAL SALE */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              1. All Sales are Final
            </h2>
            <p className="mb-4">
              At <strong>Shakya Gallery</strong>, we curate and ship original
              fine art that carries significant cultural and artistic value.
              Given the unique nature of these works and the complexities of
              international logistics,{" "}
              <strong>all purchases are considered final.</strong>
            </p>
            <p>
              We provide high-resolution imagery and detailed descriptions for
              every piece. We encourage collectors to contact our concierge for
              additional photos or videos before finalizing an acquisition.
            </p>
          </section>

          {/* 2. TRANSIT DAMAGE */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              2. Damaged Shipments
            </h2>
            <p className="mb-4">
              We take extreme care in professional crating and use premium
              couriers (DHL/FedEx). However, if an artwork arrives sustained by
              damage during handling or shipping, it is eligible for a return or
              insurance claim.
            </p>
            <div className="bg-bone p-6 border border-black/5">
              <p className="font-semibold text-soft-black mb-2 uppercase text-xs tracking-widest">
                ⚠️ 5-Day Notification Rule:
              </p>
              <p className="text-sm">
                You must notify Shakya Gallery of any transit damage within{" "}
                <strong>five (5) days</strong> of receiving the artwork.
                Requests received after this window will not be eligible for a
                refund or return.
              </p>
            </div>
          </section>

          {/* 3. RETURN PROCESS */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              3. Initiation of a Claim
            </h2>
            <p className="mb-4">
              To report damage, please email{" "}
              <a
                href="mailto:concierge@shakyagallery.com"
                className="underline hover:text-soft-black uppercase tracking-tighter"
              >
                concierge@shakyagallery.com
              </a>{" "}
              with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your order number and proof of purchase.</li>
              <li>High-quality photographs of the damaged artwork.</li>
              <li>
                Photographs of the external packaging (showing any visible
                impact or punctures).
              </li>
            </ul>
          </section>

          {/* 4. REFUNDS */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              4. Processing
            </h2>
            <p className="mb-4">
              Once your claim is validated, we will coordinate the return
              shipment (at our expense for damaged goods). Upon receipt and
              inspection of the artwork, a full refund will be processed to your
              original payment method.
            </p>
            <p className="text-sm italic">
              *Please note that processing times depend on your financial
              institution and may take 7-14 business days.
            </p>
          </section>
        </div>

        <hr className="border-black/10 my-16" />

        <p className="text-sm text-center text-gray-400">
          For further assistance, please contact our gallery headquarters in
          Kathmandu. <br />
          Since {siteConfig.since}.
        </p>
      </div>
    </main>
  );
}

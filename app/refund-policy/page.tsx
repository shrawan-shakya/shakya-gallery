import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Refund & Return Policy | SHAKYA Gallery",
  description:
    "Our policy on returns and refunds for fine art acquisitions. All sales are final with exceptions for transit damage.",
  alternates: {
    canonical: "/refund-policy",
  },
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
          {/* 1. EXCHANGE POLICY */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              1. 7-Day Exchange Policy
            </h2>
            <p className="mb-4">
              At <strong>Shakya Gallery</strong>, we curate and ship original
              fine art that carries significant cultural and artistic value.
              We want you to be satisfied with your acquisition. If you are not entirely pleased, we offer a
              <strong> 7-day exchange window</strong> from the date of delivery.
            </p>
            <p className="mb-4">
              Please note that <strong>we do not have a refund policy.</strong> All acquisitions are eligible for exchange only.
            </p>
            <p>
              We provide high-resolution imagery and detailed descriptions for
              every piece. We encourage collectors to contact our concierge for
              additional photos or videos before finalizing an acquisition to ensure it meets your expectations.
            </p>
          </section>

          {/* 2. CANCELLATIONS */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              2. Cancellations
            </h2>
            <p className="mb-4">
              We understand that plans can change. If you wish to cancel your order, please contact us within
              <strong> 48 hours of placing your order.</strong>
            </p>
            <p>
              As we initiate professional crating and logistics quickly to ensure your purchase arrives within our
              <strong> 7-14 business day shipping window</strong>, we cannot accept cancellations once the 48-hour period has passed or once the item has been dispatched.
            </p>
          </section>

          {/* 3. TRANSIT DAMAGE */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              3. Damaged Shipments
            </h2>
            <p className="mb-4">
              We take extreme care in professional crating and use premium
              couriers (DHL/FedEx). However, if an artwork arrives sustained by
              damage during handling or shipping, it is eligible for an urgent exchange or
              insurance claim.
            </p>
            <div className="bg-bone p-6 border border-black/5">
              <p className="font-semibold text-soft-black mb-2 uppercase text-xs tracking-widest">
                ⚠️ 5-Day Notification Rule:
              </p>
              <p className="text-sm">
                You must notify Shakya Gallery of any transit damage within{" "}
                <strong>five (5) days</strong> of receiving the artwork.
                Requests received after this window will not be eligible for an
                exchange or claim.
              </p>
            </div>
          </section>

          {/* 4. EXCHANGE PROCESS */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              4. Initiation of an Exchange
            </h2>
            <p className="mb-4">
              To initiate an exchange or report damage, please email{" "}
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
              <li>Reason for exchange or high-quality photographs of any transit damage.</li>
              <li>
                Photographs of the external packaging if reporting damage.
              </li>
            </ul>
          </section>

          {/* 5. LOGISTICS */}
          <section>
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-6 font-semibold border-b border-black/10 pb-2">
              5. Processing & Logistics
            </h2>
            <p className="mb-4">
              Once your exchange request or claim is validated, we will coordinate the return
              shipment. For damaged goods, return shipping is at our expense. For general exchanges, the collector is responsible for
              insured return shipping and any applicable duties.
            </p>
            <p className="text-sm italic">
              *Please note that processing an exchange or gallery credit takes 7-14 business days after receipt and inspection of the artwork.
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

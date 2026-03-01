import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/Price";

async function getOrder(orderId: string) {
    const query = `
    *[_type == "order" && orderNumber == $orderId][0] {
      _id,
      orderNumber,
      status,
      customerName,
      customerEmail,
      shippingAddress,
      currency,
      subtotal,
      shippingCost,
      total,
      "artworks": artworks[]->{
        title,
        artist,
        year,
        "imageUrl": mainImage.asset->url
      }
    }
  `;
    return await client.fetch(query, { orderId });
}

export default async function InvoicePage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params;
    const order = await getOrder(orderId);

    if (!order) return notFound();

    const isPaid = order.status === "paid_shipped" || order.status === "payment_processing";

    return (
        <div className="min-h-screen bg-bone pt-32 pb-40">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <Link href="/" className="font-serif tracking-[0.3em] font-light text-2xl text-soft-black block mb-12">
                        SHAKYA
                    </Link>
                    <h1 className="font-serif text-3xl md:text-5xl text-soft-black mb-4">Secure Invoice</h1>
                    <p className="font-sans text-xs tracking-widest text-gray-500 uppercase">
                        Order Ref: {order.orderNumber}
                    </p>
                </div>

                <div className="bg-white shadow-xl shadow-black/5 border border-black/5 flex flex-col md:flex-row">

                    {/* LEFT: Order Summary */}
                    <div className="w-full md:w-5/12 bg-gray-50/50 p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/5">
                        <h2 className="font-sans text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-8 border-b border-black/5 pb-4">
                            Acquisition Summary
                        </h2>

                        <div className="space-y-6 mb-8">
                            {order.artworks?.map((art: any, i: number) => (
                                <div key={i} className="flex gap-4">
                                    <div className="relative w-16 h-16 bg-gray-100 flex-shrink-0">
                                        <Image src={art.imageUrl} alt={art.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="font-serif text-base text-soft-black leading-tight">{art.title}</h3>
                                        <p className="font-sans text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{art.artist}, {art.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 pt-6 border-t border-black/5 font-sans text-xs text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{order.currency} {order.subtotal?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Bespoke Shipping</span>
                                <span>{order.currency} {order.shippingCost?.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-black/10 flex justify-between items-end">
                            <span className="font-serif italic text-gray-700 text-lg">Total Due</span>
                            <span className="font-serif text-2xl text-soft-black">
                                {order.currency} {order.total?.toLocaleString()}
                            </span>
                        </div>

                        <div className="mt-12 space-y-2">
                            <h4 className="font-sans text-[10px] tracking-widest uppercase text-gray-400">Shipping To</h4>
                            <p className="font-sans text-sm text-soft-black whitespace-pre-line leading-relaxed">
                                {order.customerName}
                                <br />
                                {order.shippingAddress}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Payment Instructions */}
                    <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">

                        {isPaid ? (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-green-600 text-green-600 text-2xl mb-6">
                                    ✓
                                </div>
                                <h2 className="font-serif text-3xl text-soft-black mb-4">Payment Confirmed</h2>
                                <p className="font-sans text-gray-500 leading-relaxed max-w-sm mx-auto">
                                    Thank you for your acquisition. We are currently preparing your art for secure transport. You will receive tracking details via email shortly.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="mb-10">
                                    <h2 className="font-serif text-2xl text-soft-black mb-4">Transfer Instructions</h2>
                                    <p className="font-sans text-sm text-gray-500 leading-relaxed">
                                        To complete your acquisition, please initiate a secure bank transfer or use Wise to send the exact total of <strong>{order.currency} {order.total?.toLocaleString()}</strong> to the gallery account details below.
                                    </p>
                                </div>

                                {/* WISE DETAILS - Hardcoded for demonstration, ideally fetched from global settings */}
                                <div className="bg-bone p-6 border border-black/5 space-y-4 mb-10">
                                    <div className="flex justify-between items-center pb-4 border-b border-black/5">
                                        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Account Name</span>
                                        <span className="font-sans text-sm text-soft-black select-all">Shrawan Shakya</span>
                                    </div>
                                    {order.currency === 'USD' ? (
                                        <>
                                            <div className="flex justify-between items-center pb-4 border-b border-black/5">
                                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Routing Number</span>
                                                <span className="font-sans text-sm text-soft-black select-all">026009593</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-4 border-b border-black/5">
                                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Account Number</span>
                                                <span className="font-sans text-sm text-soft-black select-all">1234567890</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400">Account Type</span>
                                                <span className="font-sans text-sm text-soft-black">Checking</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center py-4">
                                            <p className="font-sans text-xs text-gray-500">Please contact the gallery for {order.currency} specific transfer details.</p>
                                        </div>
                                    )}
                                </div>

                                <form action={async () => {
                                    "use server";
                                    // This would typically trigger an email via resend to tell the owner to check their Wise account
                                    console.log("Client clicked transfer complete for order", order._id);
                                }}>
                                    <button type="submit" className="w-full bg-soft-black hover:bg-black text-white py-4 font-sans text-[11px] tracking-[0.2em] uppercase transition-colors">
                                        I have transferred the funds
                                    </button>
                                    <p className="font-sans text-[10px] text-gray-400 text-center mt-4">
                                        Clicking this will notify our curators to verify the transfer.
                                    </p>
                                </form>
                            </>
                        )}

                    </div>

                </div>

                <div className="mt-16 text-center">
                    <p className="font-sans text-[10px] uppercase tracking-widest text-gray-400">
                        Protected by TLS Encryption. Processed manually for security.
                    </p>
                </div>

            </div>
        </div>
    );
}

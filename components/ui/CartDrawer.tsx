import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { Price } from "./Price";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, getCartTotals } = useCartStore();
    const { total, hasEstimate } = getCartTotals();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-[110] backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-bone z-[120] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-black/10">
                            <h2 className="font-serif text-2xl text-soft-black">Your Inquiry Selection</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 transition-colors rounded-full"
                            >
                                <X className="w-5 h-5 text-soft-black" />
                            </button>
                        </div>

                        {/* Content List */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                                    <p className="font-serif text-lg">Your selection is empty.</p>
                                    <button onClick={onClose} className="font-sans text-xs tracking-widest uppercase border-b border-black pb-1">
                                        Continue Browsing
                                    </button>
                                </div>
                            ) : (
                                items.map((item, idx) => (
                                    <div key={item._id || `cart-item-${idx}`} className="flex gap-4 items-start pb-6 border-b border-black/5 last:border-0">
                                        {/* Image Thumbnail */}
                                        <div className="relative w-24 h-24 bg-gray-100 flex-shrink-0">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 flex flex-col h-24 justify-between pt-1">
                                            <div>
                                                <h3 className="font-serif text-lg leading-tight">{item.title}</h3>
                                                <p className="font-sans text-[10px] tracking-widest uppercase text-gray-500 mt-1">
                                                    {item.artist}, {item.year}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="font-sans text-xs">
                                                    {(item.showPrice && item.price) ? (
                                                        <Price amount={item.price} />
                                                    ) : (
                                                        item.startingPrice ? <span className="italic font-serif">Starts at ${item.startingPrice.toLocaleString()}</span> : <span className="text-gray-500 italic">Price on request</span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="text-gray-400 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer Action */}
                        {items.length > 0 && (
                            <div className="p-6 bg-white border-t border-black/10">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="font-sans text-xs tracking-widest text-gray-500 uppercase">Estimated Total</span>
                                    <span className="font-serif text-xl text-soft-black text-right min-w-[50%] flex flex-col items-end">
                                        {hasEstimate && <span className="text-[10px] font-sans text-gray-500 tracking-widest uppercase mb-1 leading-none">Starting at</span>}
                                        <span><Price amount={total} /></span>
                                    </span>
                                </div>
                                <p className="font-sans text-[10px] text-gray-500 mb-4 text-center leading-relaxed">
                                    Submit this selection to receive a unified shipping quote and finalize your order.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="w-full flex justify-center items-center py-4 bg-soft-black hover:bg-black text-white font-sans text-[10px] tracking-[0.2em] uppercase transition-colors"
                                >
                                    Proceed to Inquiry ({items.length})
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

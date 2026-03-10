"use client";

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="mt-8 px-8 py-4 bg-soft-black text-white font-sans text-[10px] tracking-[0.2em] uppercase hover:bg-black transition-colors print:hidden"
        >
            Print QR Tag
        </button>
    );
}

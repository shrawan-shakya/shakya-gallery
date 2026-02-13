export default function Loading() {
    return (
        <div className="fixed inset-0 bg-bone flex items-center justify-center z-[9999]">
            <div className="relative">
                {/* Pulsing S Logo */}
                <div className="font-serif text-6xl text-soft-black animate-pulse">
                    S
                </div>

                {/* Optional: Subtle Spinner Ring */}
                <div className="absolute inset-[-20px] rounded-full border border-black/5 w-[calc(100%+40px)] h-[calc(100%+40px)] animate-[spin_3s_linear_infinite]" />
            </div>
        </div>
    );
}

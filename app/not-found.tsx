import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-bone flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

            {/* BACKGROUND WATERMARK */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-serif text-black/[0.02] leading-none select-none z-0 pointer-events-none">
                404
            </div>

            <div className="relative z-10 max-w-lg">
                <p className="font-sans text-xs tracking-[0.3em] text-red-800 uppercase mb-8">
                    Page Not Found
                </p>

                <h1 className="font-serif text-5xl md:text-7xl text-soft-black leading-tight mb-8">
                    This canvas is <span className="italic">blank</span>.
                </h1>

                <p className="font-serif text-lg text-gray-500 italic mb-12">
                    "The art you are looking for has either been moved or does not exist."
                </p>

                <Link
                    href="/collection"
                    className="inline-block bg-soft-black text-white font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-gray-800 transition-colors"
                >
                    Return to Collection
                </Link>
            </div>

        </main>
    );
}

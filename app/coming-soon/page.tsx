import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coming Soon | SHAKYA Gallery",
    description: "This section of Shakya Gallery is currently under development.",
};

export default function ComingSoonPage() {
    return (
        <main className="min-h-screen bg-bone flex flex-col items-center justify-center p-6 text-center">

            <div className="max-w-md space-y-8">
                <p className="font-sans text-xs tracking-[0.3em] text-red-800 uppercase">
                    Under Curation
                </p>

                <h1 className="font-serif text-5xl md:text-6xl text-soft-black leading-none">
                    COMING <span className="italic">SOON</span>
                </h1>

                <div className="w-16 h-[1px] bg-black/10 mx-auto"></div>

                <p className="font-serif text-xl italic text-gray-400">
                    "We are currently archiving this section of our collection. Please check back shortly."
                </p>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-block px-8 py-4 border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-sans text-xs tracking-[0.2em] uppercase"
                    >
                        Return Home
                    </Link>
                </div>
            </div>

        </main>
    );
}

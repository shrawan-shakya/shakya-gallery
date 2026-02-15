"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <SmoothScroll>
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </SmoothScroll>
    );
}

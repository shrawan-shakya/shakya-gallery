"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CurrencyProvider } from "@/hooks/use-currency";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <CurrencyProvider>
            <SmoothScroll>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
                <ScrollToTop />
            </SmoothScroll>
        </CurrencyProvider>
    );
}

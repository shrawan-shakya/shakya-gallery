"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Reset scroll position on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,         // Linear interpolation (smoothness). Lower = smoother/slower. 0.1 is standard, 0.05 is very heavy.
                duration: 1.5,     // Duration of the scroll animation in seconds. 1.5s is "slower/premium".
                smoothWheel: true, // Enable smooth scrolling for mouse wheel events.
                wheelMultiplier: 1,// How much the scroll position changes per wheel tick.
            }}
        >
            {children}
        </ReactLenis>
    );
}

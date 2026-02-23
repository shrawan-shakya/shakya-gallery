"use client";

import { useRef, ReactNode } from "react";
import { useInView } from "framer-motion";

interface LazyGridItemProps {

    children: ReactNode;
    fallback?: ReactNode;
    threshold?: number;
    rootMargin?: any;
    className?: string;
    aspectRatio?: number;
    disabled?: boolean;
}


/**
 * Performance-optimized wrapper that only renders its children when in view.
 * Now uses aspectRatio to prevent layout shift during mounting.
 */
export function LazyGridItem({
    children,
    fallback,
    threshold = 0.01,
    rootMargin = "1000px 0px", // Increased for earlier mounting
    className,
    aspectRatio = 1,
    disabled = false
}: LazyGridItemProps) {

    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        amount: threshold,
        margin: rootMargin
    });

    return (
        <div ref={ref} className={className}>
            {disabled || isInView ? children : fallback || (

                <div
                    className="w-full bg-[#F9F9F9] shadow-sm"
                    style={{ aspectRatio: `${aspectRatio}` }}
                />
            )}
        </div>
    );
}


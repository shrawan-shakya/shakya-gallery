"use client";

import { cn } from "@/lib/utils";

interface PriceOnRequestProps {
    startingPrice?: number;
    className?: string;
    variant?: "minimal" | "plaque" | "detail" | "badge";
}

export function PriceOnRequest({ startingPrice, className, variant = "minimal" }: PriceOnRequestProps) {
    if (!startingPrice) return null;

    return (
        <div className={cn("flex items-center gap-1.5", className)}>
            <span className={cn(
                "font-sans uppercase tracking-[0.1em] text-gray-500",
                variant === "minimal" && "text-[8px] md:text-[9px]",
                variant === "plaque" && "text-[9px] md:text-[11px]",
                variant === "detail" && "text-xs md:text-sm tracking-[0.15em]",
                variant === "badge" && "text-[11px] md:text-sm tracking-widest"
            )}>
                Price on request <span className="lowercase">—</span> starts at
            </span>
            <span className={cn(
                "font-sans font-bold text-soft-black",
                variant === "minimal" && "text-[8px] md:text-[9px]",
                variant === "plaque" && "text-[9px] md:text-[11px]",
                variant === "detail" && "text-sm md:text-lg",
                variant === "badge" && "text-[11px] md:text-sm"
            )}>
                ${startingPrice.toLocaleString()}
            </span>
        </div>
    );
}

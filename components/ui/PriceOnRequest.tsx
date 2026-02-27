"use client";

import { useCurrency } from "@/hooks/use-currency";
import { cn } from "@/lib/utils";

interface PriceOnRequestProps {
    startingPrice?: number;
    className?: string;
    variant?: "minimal" | "plaque" | "detail" | "badge";
}

export function PriceOnRequest({ startingPrice, className, variant = "minimal" }: PriceOnRequestProps) {
    const { formatPrice } = useCurrency();

    if (!startingPrice) return null;

    return (
        <div className={cn(
            "flex",
            (variant === "badge" || variant === "minimal") ? "items-center justify-center gap-1.5 whitespace-nowrap" : "flex-wrap items-baseline gap-x-2 gap-y-1",
            className
        )}>
            <span className={cn(
                "font-sans uppercase tracking-[0.1em] text-gray-500 whitespace-nowrap",
                variant === "minimal" && "text-[9px] md:text-[11px] text-soft-black/70",
                variant === "plaque" && "text-[10px] md:text-[12px]",
                variant === "detail" && "text-[9.5px] sm:text-[11px] md:text-sm tracking-[0.05em] sm:tracking-[0.1em] md:tracking-[0.15em]",
                variant === "badge" && "text-[11px] md:text-[14px] tracking-widest text-soft-black/70"
            )}>
                {(variant !== "badge" && variant !== "minimal") && (
                    <>Price on request <span className="lowercase">—</span> </>
                )}
                starts at
            </span>
            <span className={cn(
                "font-sans font-bold text-soft-black whitespace-nowrap",
                variant === "minimal" && "text-[10px] md:text-[11px]",
                variant === "plaque" && "text-[11px] md:text-[12px]",
                variant === "detail" && "text-[24px]",
                variant === "badge" && "text-[12px] md:text-[14px]"
            )}>
                {formatPrice(startingPrice)}
            </span>
        </div>
    );
}

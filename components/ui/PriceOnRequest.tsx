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
        <div className={cn("flex items-center gap-1.5", className)}>
            <span className={cn(
                "font-sans uppercase tracking-[0.1em] text-gray-500",
                variant === "minimal" && "text-[10px] md:text-[11px]",
                variant === "plaque" && "text-[11px] md:text-[12px]",
                variant === "detail" && "text-xs md:text-sm tracking-[0.15em]",
                variant === "badge" && "text-[12px] md:text-[14px] tracking-widest"
            )}>
                Price on request <span className="lowercase">—</span> starts at
            </span>
            <span className={cn(
                "font-sans font-bold text-soft-black whitespace-nowrap",
                variant === "minimal" && "text-[10px] md:text-[11px]",
                variant === "plaque" && "text-[11px] md:text-[12px]",
                variant === "detail" && "text-sm md:text-lg",
                variant === "badge" && "text-[12px] md:text-[14px]"
            )}>
                {formatPrice(startingPrice)}
            </span>
        </div>
    );
}

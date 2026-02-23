"use client";

import { useCurrency } from "@/hooks/use-currency";
import { cn } from "@/lib/utils";

interface PriceProps {
    amount: number;
    className?: string;
}

export function Price({ amount, className }: PriceProps) {
    const { formatPrice } = useCurrency();

    return (
        <span className={cn("inline-block font-sans font-light", className)}>
            {formatPrice(amount)}
        </span>
    );
}

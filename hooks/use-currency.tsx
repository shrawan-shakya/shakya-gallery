"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig } from "@/lib/config";

type Currency = "USD" | "NPR";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (priceUsd: number) => string;
    exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const [currency, setCurrencyState] = useState<Currency>("USD");
    const exchangeRate = siteConfig.currency.usdToNpr;

    // Load preference from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("preferred-currency") as Currency;
        if (saved && (saved === "USD" || saved === "NPR")) {
            setCurrencyState(saved);
        }
    }, []);

    const setCurrency = (c: Currency) => {
        setCurrencyState(c);
        localStorage.setItem("preferred-currency", c);
    };

    const formatPrice = (priceUsd: number) => {
        if (currency === "NPR") {
            const priceNpr = Math.round(priceUsd * exchangeRate);
            return `Rs\u00A0${priceNpr.toLocaleString("en-NP")}`;
        }
        return `$\u00A0${priceUsd.toLocaleString("en-US")}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, exchangeRate }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}

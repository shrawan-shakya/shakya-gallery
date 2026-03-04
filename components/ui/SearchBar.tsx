"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";

interface SearchBarProps {
    onSearchFocus: () => void;
    placeholder?: string;
    className?: string;
}

export function SearchBar({ onSearchFocus, placeholder = "Search artworks, artists...", className }: SearchBarProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            className={cn(
                "relative flex items-center transition-all duration-500 ease-in-out group",
                isFocused ? "w-64 lg:w-80" : "w-40 lg:w-48",
                className
            )}
        >
            <div className="absolute left-3 pointer-events-none">
                <Search
                    className={cn(
                        "w-4 h-4 transition-colors duration-300",
                        isFocused ? "text-soft-black" : "text-gray-400"
                    )}
                    strokeWidth={1.5}
                />
            </div>
            <input
                type="text"
                readOnly
                onClick={onSearchFocus}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className={cn(
                    "w-full bg-bone/20 hover:bg-bone/40 border-b border-black/10 group-hover:border-black/20 py-2 pl-10 pr-4 font-serif text-xs md:text-sm italic tracking-widest placeholder:text-gray-400 outline-none transition-all cursor-pointer",
                    isFocused && "border-soft-black/40 bg-bone/60"
                )}
            />

            {/* LUXURY INDICATOR */}
            <div className={cn(
                "absolute bottom-0 left-0 h-[1px] bg-soft-black transition-all duration-700 ease-out",
                isFocused ? "w-full" : "w-0"
            )} />
        </div>
    );
}

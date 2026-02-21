"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion-variants";

interface Props {
    children: ReactNode;
    sectionName?: string;
}

interface State {
    hasError: boolean;
}

export class SectionErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error(`Error in section "${this.props.sectionName}":`, error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="w-full py-20 px-6 bg-bone/50 flex flex-col items-center justify-center text-center border-y border-black/5">
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        className="max-w-sm"
                    >
                        <p className="font-sans text-[10px] tracking-[0.3em] text-red-800 uppercase mb-4">
                            Display Issue
                        </p>
                        <h3 className="font-serif text-xl text-soft-black mb-4">
                            Unable to load {this.props.sectionName || "this section"}
                        </h3>
                        <p className="font-sans text-xs text-gray-500 leading-relaxed uppercase tracking-widest">
                            A temporary error occurred while rendering this portion of the gallery.
                            The rest of the experience remains available.
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="mt-8 font-sans text-[10px] tracking-[0.2em] uppercase border-b border-black hover:opacity-60 transition-opacity"
                        >
                            Reload Section
                        </button>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

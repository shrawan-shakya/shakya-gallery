import { Variants } from "framer-motion";

/**
 * LUXURY MOTION DESIGN SYSTEM
 * Constraint: duration: 0.6, ease: [0.22, 1, 0.36, 1] (Quart Out)
 */

export const LUXURY_EASE = [0.22, 1, 0.36, 1];
export const LUXURY_DURATION = 0.6;

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    },
    exit: {
        opacity: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        }
    }
};

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const accordion: Variants = {
    initial: { height: 0, opacity: 0 },
    animate: {
        height: "auto",
        opacity: 1,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: LUXURY_DURATION, ease: LUXURY_EASE }
    }
};

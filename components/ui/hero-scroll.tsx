"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

// --- 1. CONTEXT ---
interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}

// --- 2. MAIN CONTAINER ---
export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        // HEIGHT: 250vh (Slow, cinematic scroll)
        className={cn("relative min-h-[250vh] w-full bg-bone", className)}
        {...props}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </ContainerScrollContext.Provider>
  )
}

// --- 3. TEXT SCALER (Fades OUT on Scroll) ---
export const ContainerScale = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, style, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext()
  
  // Fades OUT as you scroll down (0 -> 60%)
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9])
  const filter = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(8px)"])

  return (
    <motion.div
      ref={ref}
      className={cn("absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none", className)}
      style={{ scale, opacity, filter, ...style }}
      {...props}
    />
  )
})
ContainerScale.displayName = "ContainerScale"

// --- 4. SWIPE INDICATOR (Fades IN on Scroll) ---
// NEW: Shows up only when images are visible (40% -> 60% scroll)
export const ContainerSwipeIndicator = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, style, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext()
  
  // Fades IN as you scroll down
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

  return (
    <motion.div
      ref={ref}
      className={cn("absolute inset-0 z-30 flex flex-col items-center justify-end pointer-events-none", className)}
      style={{ opacity, ...style }}
      {...props}
    />
  )
})
ContainerSwipeIndicator.displayName = "ContainerSwipeIndicator"


// --- 5. BENTO GRID WRAPPER ---
const bentoGridVariants = cva(
  "absolute inset-0 w-full h-screen p-4 md:p-8 max-w-[1920px] mx-auto items-center justify-center gap-6 z-10",
  {
    variants: {
      variant: {
        default: "", 
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export const BentoGrid = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext()

  // Grid fades in (15% -> 50%)
  const opacity = useTransform(scrollYProgress, [0.15, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0.15, 0.5], [0.9, 1])

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  )
})
BentoGrid.displayName = "BentoGrid"

// --- 6. BENTO CELL ---
export const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("relative w-full h-full overflow-hidden", className)}
        style={style}
        {...props}
      />
    )
  }
)
BentoCell.displayName = "BentoCell"
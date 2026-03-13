import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-soft-black text-white hover:bg-soft-black/90",
        destructive: "bg-danger text-destructive-foreground hover:bg-danger/90",
        outline: "border border-soft-black/20 bg-transparent hover:bg-soft-black hover:text-white hover:border-soft-black font-sans uppercase tracking-widest text-xs",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-soft-black underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-sm px-8",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        slide: "group relative overflow-hidden",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none"
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    if (animation === 'slide' && !asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, animation, className }))}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 transition-colors group-hover:text-white flex items-center gap-3">
             {children}
          </span>
          <div className="absolute inset-0 h-full w-full scale-0 bg-soft-black transition-all duration-300 ease-out group-hover:scale-100" />
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

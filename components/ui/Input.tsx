import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'underline'
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'underline', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full font-serif text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          variant === 'default' && "h-12 rounded-sm border border-border bg-transparent px-3 py-1 shadow-sm focus-visible:ring-1 focus-visible:ring-ring",
          variant === 'underline' && "h-10 bg-transparent border-b border-soft-black/10 py-2 focus:border-soft-black",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

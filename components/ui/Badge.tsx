import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-sm font-serif italic border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-widest",
  {
    variants: {
      variant: {
        default:
          "bg-popover text-popover-foreground shadow-sm",
        danger:
          "bg-danger text-white shadow-xl -rotate-12",
        secondary:
           "bg-secondary text-secondary-foreground",
        outline: "text-foreground",
      },
      size: {
         default: "px-4 py-1.5 text-xl font-bold",
         sm: "px-2 py-0.5 text-micro font-bold",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "eduwill-btn",
    {
        variants: {
            variant: {
                primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm", // Yellow
                secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent",
                outline: "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900",
                ghost: "hover:bg-gray-100 hover:text-gray-900",
                danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                sm: "h-8 rounded-md px-3 text-xs",
                default: "h-10 px-4 py-2",
                lg: "h-12 rounded-md px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }

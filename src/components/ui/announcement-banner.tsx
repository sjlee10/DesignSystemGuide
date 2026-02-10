import * as React from "react"
import { cn } from "@/lib/utils"
import { Megaphone, X, ArrowRight } from "lucide-react"
import { Button } from "./button"

interface AnnouncementBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "sticky"
    message: string
    actionLabel?: string
    onAction?: () => void
    onClose?: () => void
}

export function AnnouncementBanner({
    className,
    variant = "default",
    message,
    actionLabel,
    onAction,
    onClose,
    ...props
}: AnnouncementBannerProps) {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible) return null

    return (
        <div
            className={cn(
                "flex items-center justify-between px-6 py-3 transition-all duration-300",
                variant === "sticky"
                    ? "sticky top-0 z-50 shadow-md bg-[#FFBE00] text-gray-900 border-b border-yellow-500/20"
                    : "rounded-lg bg-yellow-50 border border-yellow-200 text-gray-900 mb-4",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className={cn(
                    "flex items-center justify-center rounded-full shrink-0",
                    variant === "sticky" ? "w-8 h-8 bg-black/10 text-gray-900" : "w-8 h-8 bg-yellow-100 text-yellow-700"
                )}>
                    <Megaphone className="w-4 h-4" />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm font-medium truncate">
                    <span className="truncate">{message}</span>
                    {variant === "sticky" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-red-500 text-white font-bold animate-pulse">
                            D-Day Important
                        </span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                {actionLabel && (
                    <button
                        onClick={onAction}
                        className={cn(
                            "text-sm font-semibold hover:underline flex items-center gap-1",
                            variant === "sticky" ? "text-gray-900" : "text-yellow-800"
                        )}
                    >
                        {actionLabel}
                        <ArrowRight className="w-3 h-3" />
                    </button>
                )}

                {onClose && (
                    <button
                        onClick={() => {
                            setIsVisible(false)
                            onClose?.()
                        }}
                        className={cn(
                            "p-1 rounded-full transition-colors",
                            variant === "sticky" ? "hover:bg-black/10" : "hover:bg-yellow-200"
                        )}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    )
}

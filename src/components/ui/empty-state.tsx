import * as React from "react"
import { cn } from "@/lib/utils"
import { SearchX, FolderOpen, AlertCircle } from "lucide-react"
import { Button } from "./button"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: "search" | "folder" | "alert"
    title: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export function EmptyState({
    className,
    icon = "folder",
    title,
    description,
    actionLabel,
    onAction,
    ...props
}: EmptyStateProps) {

    const IconComponent = {
        search: SearchX,
        folder: FolderOpen,
        alert: AlertCircle
    }[icon]

    return (
        <div className={cn("flex flex-col items-center justify-center text-center p-12 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200", className)} {...props}>
            <div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center mb-4">
                <IconComponent className="w-8 h-8 text-[#FFBE00]" />
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
                    {description}
                </p>
            )}

            {actionLabel && (
                <Button
                    variant="primary"
                    onClick={onAction}
                    className="min-w-[140px]"
                >
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

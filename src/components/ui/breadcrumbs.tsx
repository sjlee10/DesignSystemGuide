import React from "react"
import { Home, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav className={cn("text-sm text-gray-400 bg-white/50 backdrop-blur-sm py-3 border-b border-gray-100", className)}>
            <div className="max-w-7xl mx-auto w-full px-4 flex items-center gap-2">
                <Home className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5 opacity-30" />

                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className={cn(
                            "font-medium transition-colors",
                            index === items.length - 1 ? "text-gray-900 font-bold" : "hover:text-gray-600 cursor-pointer"
                        )}>
                            {item.label}
                        </span>
                        {index < items.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 opacity-30" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </nav>
    )
}

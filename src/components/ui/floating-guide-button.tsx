import * as React from "react"
import { Button } from "./button"
import { BookOpen, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingGuideButtonProps {
    onClick: () => void
    className?: string
}

export function FloatingGuideButton({ onClick, className }: FloatingGuideButtonProps) {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible) return null

    return (
        <div className={cn("fixed bottom-8 right-8 z-[50] flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500", className)}>
            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 mb-1 text-xs font-medium text-gray-600 speech-bubble-arrow relative">
                디자인 가이드
            </div>
            <div className="relative group">
                <Button
                    onClick={onClick}
                    size="icon"
                    className="w-14 h-14 rounded-full bg-[#FFBE00] hover:bg-[#FFAA00] text-gray-900 shadow-xl border-2 border-white transition-transform hover:scale-110"
                >
                    <BookOpen className="w-6 h-6" />
                </Button>
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsVisible(false)
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
                >
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
    )
}

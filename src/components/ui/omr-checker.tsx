import * as React from "react"
import { cn } from "@/lib/utils"

interface OMRCheckerProps extends React.HTMLAttributes<HTMLDivElement> {
    totalQuestions: number
    markedAnswers: Record<number, number> // questionId -> selectedOptionIndex
    currentQuestionId?: number
    onQuestionClick?: (id: number) => void
}

export function OMRChecker({
    className,
    totalQuestions,
    markedAnswers,
    currentQuestionId,
    onQuestionClick,
    ...props
}: OMRCheckerProps) {
    return (
        <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 p-5", className)} {...props}>
            <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
                답안 마킹
                <span className="text-xs font-normal text-gray-500">
                    {Object.keys(markedAnswers).length} / {totalQuestions}
                </span>
            </h4>

            <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((id) => {
                    const isMarked = markedAnswers[id] !== undefined
                    const isCurrent = currentQuestionId === id

                    return (
                        <button
                            key={id}
                            onClick={() => onQuestionClick?.(id)}
                            className={cn(
                                "aspect-square rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                                isCurrent && "ring-2 ring-primary ring-offset-2",
                                isMarked
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                        >
                            {id}
                        </button>
                    )
                })}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <div className="flex justify-center gap-4 text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary" /> 마킹완료
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-200" /> 미마킹
                    </div>
                </div>
            </div>
        </div>
    )
}

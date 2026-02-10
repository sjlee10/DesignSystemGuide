import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Badge } from "./badge"
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react"

interface QuestionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    questionId: number
    questionText: string
    points: number
    options: string[]
    selectedOption?: number
    correctOption?: number
    isSubmitted?: boolean
    onSelectOption?: (index: number) => void
    onNext?: () => void
    onPrev?: () => void
}

export function QuestionItem({
    className,
    questionId,
    questionText,
    points,
    options,
    selectedOption,
    correctOption,
    isSubmitted,
    onSelectOption,
    onNext,
    onPrev,
    ...props
}: QuestionItemProps) {
    return (
        <div className={cn("bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8", className)} {...props}>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Badge className="bg-gray-900 text-white hover:bg-gray-800 text-sm px-3 py-1">Q.{questionId}</Badge>
                    <span className="text-sm font-medium text-gray-400">({points}점)</span>
                </div>
            </div>

            {/* Question Text */}
            <h3 className="text-xl font-bold text-gray-900 mb-8 leading-relaxed">
                {questionText}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-8">
                {options.map((option, index) => {
                    const isSelected = selectedOption === index
                    const isCorrect = correctOption === index
                    let stateStyle = "border-gray-200 hover:bg-gray-50"

                    if (isSubmitted) {
                        if (isCorrect) stateStyle = "bg-green-50 border-green-200 text-green-700"
                        else if (isSelected && !isCorrect) stateStyle = "bg-red-50 border-red-200 text-red-700"
                    } else if (isSelected) {
                        stateStyle = "bg-yellow-50 border-primary shadow-[0_0_0_1px_#FFBE00]"
                    }

                    return (
                        <div
                            key={index}
                            onClick={() => !isSubmitted && onSelectOption?.(index)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all",
                                stateStyle,
                                isSubmitted && "cursor-default"
                            )}
                        >
                            <div className={cn(
                                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                                isSelected ? "border-primary bg-primary" : "border-gray-300",
                                isSubmitted && isCorrect && "border-green-500 bg-green-500",
                                isSubmitted && isSelected && !isCorrect && "border-red-500 bg-red-500"
                            )}>
                                {(isSelected || (isSubmitted && isCorrect)) && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <span className={cn(
                                "font-medium",
                                isSelected && !isSubmitted ? "text-gray-900" : "text-gray-600"
                            )}>
                                {option}
                            </span>
                            {isSubmitted && isCorrect && <CheckCircle2 className="ml-auto w-5 h-5 text-green-600" />}
                        </div>
                    )
                })}
            </div>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <Button
                    variant="outline"
                    onClick={onPrev}
                    disabled={questionId === 1}
                    className="gap-2"
                >
                    <ChevronLeft className="w-4 h-4" />
                    이전
                </Button>

                <Button
                    onClick={onNext}
                    className="gap-2"
                >
                    다음
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

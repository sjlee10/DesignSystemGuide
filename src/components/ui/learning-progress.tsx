import * as React from "react"
import { cn } from "@/lib/utils"
import { Progress } from "./progress"
import { Check } from "lucide-react"

interface LearningProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
    type?: "line" | "circle"
    showLabel?: boolean
}

const LearningProgress = React.forwardRef<HTMLDivElement, LearningProgressProps>(
    ({ className, value, max = 100, type = "line", showLabel = true, ...props }, ref) => {
        const percentage = Math.min(100, Math.max(0, (value / max) * 100))
        const isCompleted = percentage === 100

        if (type === "circle") {
            const radius = 30
            const circumference = 2 * Math.PI * radius
            const strokeDashoffset = circumference - (percentage / 100) * circumference

            return (
                <div ref={ref} className={cn("relative flex items-center justify-center", className)} {...props}>
                    <div className="relative h-20 w-20">
                        {/* Background Circle */}
                        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 80 80">
                            <circle
                                className="text-gray-100"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r={radius}
                                cx="40"
                                cy="40"
                            />
                            {/* Progress Circle */}
                            <circle
                                className={cn(
                                    "transition-all duration-500 ease-in-out",
                                    isCompleted ? "text-[#D4AF37]" : "text-primary"
                                )}
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r={radius}
                                cx="40"
                                cy="40"
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            {isCompleted ? (
                                <Check className="h-8 w-8 text-[#D4AF37]" strokeWidth={3} />
                            ) : (
                                <span className="text-sm font-bold text-gray-900">{Math.round(percentage)}%</span>
                            )}
                        </div>
                    </div>
                </div>
            )
        }

        // Line type
        return (
            <div ref={ref} className={cn("w-full space-y-1", className)} {...props}>
                {showLabel && (
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-500 font-medium">진도율</span>
                        <span className={cn(
                            "font-bold",
                            isCompleted ? "text-[#D4AF37]" : "text-primary-foreground"
                        )}>
                            {Math.round(percentage)}%
                        </span>
                    </div>
                )}
                <div className="relative">
                    <Progress
                        value={percentage}
                        className={cn("h-2.5", isCompleted && "[&>div]:bg-[#D4AF37]")}
                    />
                </div>
            </div>
        )
    }
)
LearningProgress.displayName = "LearningProgress"

export { LearningProgress }

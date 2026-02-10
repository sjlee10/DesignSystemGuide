import * as React from "react"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

interface TimeTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    hours: number
    minutes: number
    seconds: number
}

const TimeTracker = React.forwardRef<HTMLDivElement, TimeTrackerProps>(
    ({ className, hours, minutes, seconds, ...props }, ref) => {
        // Helper to pad numbers
        const pad = (num: number) => num.toString().padStart(2, "0")

        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100",
                    className
                )}
                {...props}
            >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium mb-0.5">오늘 나의 학습 시간</p>
                    <div className="flex items-baseline gap-1.5 font-bold text-3xl text-gray-900 tabular-nums tracking-tight">
                        <span>{pad(hours)}</span>
                        <span className="text-gray-300 text-xl">:</span>
                        <span>{pad(minutes)}</span>
                        <span className="text-gray-300 text-xl">:</span>
                        <span className="text-primary">{pad(seconds)}</span>
                    </div>
                </div>
            </div>
        )
    }
)
TimeTracker.displayName = "TimeTracker"

export { TimeTracker }

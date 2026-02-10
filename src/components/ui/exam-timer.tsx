import * as React from "react"
import { cn } from "@/lib/utils"
import { Timer, AlertCircle } from "lucide-react"
import { Button } from "./button"

interface ExamTimerProps extends React.HTMLAttributes<HTMLDivElement> {
    initialSeconds: number // e.g., 60 * 60 for 1 hour
    onTimeUp?: () => void
    onExit?: () => void
}

export function ExamTimer({
    className,
    initialSeconds,
    onTimeUp,
    onExit,
    ...props
}: ExamTimerProps) {
    const [secondsLeft, setSecondsLeft] = React.useState(initialSeconds)

    // Format seconds to HH:MM:SS
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    const isUrgent = secondsLeft <= 300 // 5 minutes warning

    React.useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeUp?.()
            return
        }

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [secondsLeft, onTimeUp])

    return (
        <div
            className={cn(
                "flex items-center justify-between bg-white rounded-lg shadow-sm border px-6 py-3 transition-colors",
                isUrgent ? "border-red-200 bg-red-50" : "border-gray-200",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-3">
                <div className={cn(
                    "flex items-center gap-2 font-mono text-2xl font-bold tabular-nums",
                    isUrgent ? "text-red-500 animate-pulse" : "text-gray-900"
                )}>
                    <Timer className={cn("w-6 h-6", isUrgent && "text-red-500")} />
                    {formatTime(secondsLeft)}
                </div>
                {isUrgent && (
                    <span className="text-xs font-semibold text-red-500 flex items-center gap-1 animate-bounce">
                        <AlertCircle className="w-3 h-3" /> 종료 임박!
                    </span>
                )}
            </div>

            <Button
                variant={isUrgent ? "danger" : "outline"}
                size="sm"
                onClick={onExit}
                className="ml-8"
            >
                시험 종료
            </Button>
        </div>
    )
}

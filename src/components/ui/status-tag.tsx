import * as React from "react"
import { Badge, BadgeProps } from "./badge"
import { cn } from "@/lib/utils"

// Mapping of abstract status to badge variants
type StatusType = "running" | "ended" | "review" | "paid" | "d-day"

interface StatusTagProps extends Omit<BadgeProps, "variant"> {
    status?: StatusType
    customColor?: string
}

const StatusTag = React.forwardRef<HTMLDivElement, StatusTagProps>(
    ({ className, status, children, ...props }, ref) => {
        let variant: BadgeProps["variant"] = "default"
        let content = children

        switch (status) {
            case "running":
                variant = "default" // Yellow
                if (!content) content = "수강중"
                break
            case "ended":
                variant = "gray"
                if (!content) content = "수강종료"
                break
            case "review":
                variant = "warning" // Orange/Reddish
                if (!content) content = "복습필요"
                break
            case "paid":
                variant = "info" // Blue
                if (!content) content = "유료결제"
                break
            case "d-day":
                variant = "destructive"
                break
        }

        return (
            <Badge
                ref={ref}
                variant={variant}
                className={cn("font-medium", className)}
                {...props}
            >
                {content}
            </Badge>
        )
    }
)
StatusTag.displayName = "StatusTag"

export { StatusTag }

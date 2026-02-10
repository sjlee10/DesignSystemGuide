import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "./card"
import { Button } from "./button"
import { StatusTag } from "./status-tag"
import { LearningProgress } from "./learning-progress"
import { PlayCircle } from "lucide-react"

interface CourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    instructor: string
    thumbnail: string
    progress: number
    status: "running" | "ended" | "review" | "paid"
    tags?: string[]
}

const CourseCard = React.forwardRef<HTMLDivElement, CourseCardProps>(
    ({ className, title, instructor, thumbnail, progress, status, tags, ...props }, ref) => {
        return (
            <Card
                ref={ref}
                className={cn(
                    "eduwill-course-card overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer border-gray-200",
                    className
                )}
                {...props}
            >
                {/* Thumbnail Section */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <PlayCircle className="w-12 h-12 text-white drop-shadow-md" />
                    </div>
                    <div className="absolute top-3 left-3 flex gap-1">
                        <StatusTag status={status} className="shadow-sm" />
                    </div>
                </div>

                {/* Content Section */}
                <CardContent className="p-5">
                    {tags && tags.length > 0 && (
                        <div className="flex gap-1 mb-2 flex-wrap">
                            {tags.map((tag, i) => (
                                <span key={i} className="text-[10px] text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <h3 className="font-bold text-lg leading-snug text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1.5 h-[3.25rem]">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">{instructor} 교수</p>
                </CardContent>

                {/* Footer Section */}
                <CardFooter className="p-5 pt-0 flex flex-col gap-4">
                    {/* Progress */}
                    <LearningProgress value={progress} type="line" className="w-full" showLabel />

                    {/* Action */}
                    <Button className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground">
                        {progress > 0 ? "이어학습" : "학습시작"}
                    </Button>
                </CardFooter>
            </Card>
        )
    }
)
CourseCard.displayName = "CourseCard"

export { CourseCard }

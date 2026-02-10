import * as React from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion"
import { CheckCircle2, PlayCircle, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"
import { Button } from "./button"

interface Lecture {
    id: string
    title: string
    duration: string
    isCompleted: boolean
    isCurrent?: boolean
    isLocked?: boolean
}

type WeekCurriculum = {
    weekTitle: string
    lectures: Lecture[]
}

interface CurriculumListProps {
    curriculum: WeekCurriculum[]
    className?: string
}

export function CurriculumList({ curriculum, className }: CurriculumListProps) {
    const [openItems, setOpenItems] = React.useState<string[]>([curriculum[0]?.weekTitle])

    const toggleItem = (value: string) => {
        setOpenItems(prev =>
            prev.includes(value) ? [] : [value]
        )
    }

    return (
        <div className={cn("w-full border rounded-xl bg-white shadow-sm overflow-hidden", className)}>
            <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg">커리큘럼</h3>
                <span className="text-xs text-gray-500">총 {curriculum.map(c => c.lectures.length).reduce((a, b) => a + b, 0)}강</span>
            </div>
            {curriculum.map((week, index) => (
                <Accordion key={index} className="px-4">
                    <AccordionItem>
                        <AccordionTrigger
                            isOpen={openItems.includes(week.weekTitle)}
                            onClick={() => toggleItem(week.weekTitle)}
                            className="text-gray-900 group"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                    {index + 1}주차
                                </span>
                                <span className="group-hover:text-primary transition-colors">{week.weekTitle}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent isOpen={openItems.includes(week.weekTitle)}>
                            <div className="space-y-1">
                                {week.lectures.map((lecture) => (
                                    <div
                                        key={lecture.id}
                                        className={cn(
                                            "flex items-center justify-between p-3 rounded-lg transition-colors group cursor-pointer",
                                            lecture.isCurrent
                                                ? "bg-yellow-50/50 border-l-4 border-primary shadow-sm"
                                                : "hover:bg-gray-50 border-l-4 border-transparent"
                                        )}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            {lecture.isCompleted ? (
                                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                            ) : lecture.isLocked ? (
                                                <Lock className="w-5 h-5 text-gray-300 shrink-0" />
                                            ) : (
                                                <PlayCircle className={cn("w-5 h-5 shrink-0", lecture.isCurrent ? "text-primary" : "text-gray-400")} />
                                            )}

                                            <div className="flex flex-col min-w-0">
                                                <span className={cn(
                                                    "text-sm font-medium truncate",
                                                    lecture.isCurrent ? "text-gray-900" : "text-gray-600",
                                                    lecture.isCompleted && "text-gray-400 line-through decoration-gray-300"
                                                )}>
                                                    {lecture.title}
                                                </span>
                                                <span className="text-xs text-gray-400">{lecture.duration}</span>
                                            </div>
                                        </div>

                                        <div className="pl-4 shrink-0">
                                            {lecture.isCurrent && (
                                                <Button size="sm" className="h-7 text-xs px-3">학습하기</Button>
                                            )}
                                            {!lecture.isCurrent && lecture.isCompleted && (
                                                <Badge variant="secondary" className="text-[10px] font-normal text-gray-400">학습완료</Badge>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            ))}
        </div>
    )
}

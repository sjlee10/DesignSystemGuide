import * as React from "react"
import { cn } from "@/lib/utils"
import { MessageCircle, User, Award, MoreHorizontal, ThumbsUp } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"

interface QnAPostProps {
    id: string
    type: "question" | "answer"
    author: string
    date: string
    content: string
    status?: "waiting" | "answered"
    isAuthor?: boolean // For styling instructor
}

interface QnAThreadProps extends React.HTMLAttributes<HTMLDivElement> {
    posts: QnAPostProps[]
}

export function QnAThread({ className, posts, ...props }: QnAThreadProps) {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            {posts.map((post) => {
                const isQuestion = post.type === "question"

                return (
                    <div
                        key={post.id}
                        className={cn(
                            "flex gap-4 p-6 rounded-2xl transition-all",
                            isQuestion
                                ? "bg-white border border-gray-200 shadow-sm"
                                : "bg-gray-50 border border-gray-100 ml-8 md:ml-12"
                        )}
                    >
                        {/* Avatar */}
                        <div className="shrink-0">
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-white font-bold",
                                isQuestion ? "bg-gray-200 text-gray-500" : "bg-[#FFBE00] ring-4 ring-yellow-50"
                            )}>
                                {isQuestion ? <User className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">{post.author}</span>
                                    {!isQuestion && (
                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                                            공식 답변
                                        </Badge>
                                    )}
                                    <span className="text-xs text-gray-400 font-normal">{post.date}</span>
                                </div>

                                {isQuestion && post.status && (
                                    <Badge variant={post.status === "answered" ? "success" : "secondary"}>
                                        {post.status === "answered" ? "답변완료" : "답변대기"}
                                    </Badge>
                                )}
                            </div>

                            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
                                {post.content}
                            </p>

                            {/* Footer Actions */}
                            <div className="pt-2 flex items-center gap-4">
                                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">
                                    <ThumbsUp className="w-3.5 h-3.5" />
                                    도움이 돼요
                                </button>
                                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    댓글 달기
                                </button>
                                <button className="ml-auto text-gray-400 hover:text-gray-600">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

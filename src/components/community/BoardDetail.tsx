import { useState } from "react"
import { Post } from "@/data/communityData"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, ThumbsUp, X } from "lucide-react"

interface BoardDetailProps {
    post: Post
    onBack: () => void
}

export function BoardDetail({ post, onBack }: BoardDetailProps) {
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)

    // Mask author name (e.g., 김*수) - already mocked in data, but good to have utility
    // const maskedAuthor = post.author.replace(/(?<=.{1})./g, '*') 

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Badge variant={post.type === "notice" ? "default" : "secondary"} className={post.type === "notice" ? "bg-[#FFBE00] text-black hover:bg-[#E5AB00]" : ""}>
                            {post.type === "notice" ? "공지" : post.type === "review" ? "수강후기" : "수험정보"}
                        </Badge>
                        {post.subject && <span className="text-gray-500 font-medium">[{post.subject}]</span>}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700">{post.author}</span>
                            <span className="w-px h-3 bg-gray-300" />
                            <span>{post.date}</span>
                            <span className="w-px h-3 bg-gray-300" />
                            <span>조회 {post.views.toLocaleString()}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-900">
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Content Content */}
                <div className="p-6 pb-0 min-h-[150px]">
                    {/* Text Content */}
                    <div
                        className="prose max-w-none text-gray-800 leading-relaxed mb-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Images with Lightbox Trigger */}
                    {post.images && post.images.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                            {post.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="cursor-pointer rounded-lg overflow-hidden border border-gray-100 hover:opacity-90 transition-opacity"
                                    onClick={() => setLightboxImage(img)}
                                >
                                    <img src={img} alt={`Attached ${idx + 1}`} className="w-full h-40 object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer / Interactions (Inside Card) - Only for Review/Info */}
                {(post.type === "review" || post.type === "info") && (
                    <div className="px-6 py-5 bg-white border-t border-gray-100 flex flex-col items-center gap-5">

                        {/* "Helpful" Button for Reviews */}
                        {post.type === "review" && (
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-sm text-gray-500">이 후기가 도움이 되었나요?</p>
                                <Button
                                    className="bg-white border-2 border-[#FFBE00] text-black hover:bg-[#FFF9E5] hover:text-black gap-2 h-10 px-6 rounded-full shadow-sm"
                                >
                                    <ThumbsUp className="w-4 h-4 text-[#FFBE00]" />
                                    도움이 돼요
                                </Button>
                            </div>
                        )}

                        {/* Recommended Product for Info */}
                        {post.type === "info" && (
                            <div className="w-full max-w-lg bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between shadow-sm cursor-pointer hover:border-[#FFBE00] transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 bg-gray-100 rounded-md flex items-center justify-center text-[10px] text-center p-1 text-gray-400">
                                        교재/강의
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-[#FFBE00] font-bold mb-0.5">RECOMMENDED</p>
                                        <h4 className="font-bold text-gray-900 text-sm">2026 에듀윌 공인중개사 1차 기초서</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">지금 바로 학습을 시작하세요!</p>
                                    </div>
                                </div>
                                <Button size="sm" className="bg-gray-900 text-white hover:bg-black h-8 text-xs px-3">
                                    바로가기
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Lightbox Overlay */}
                {lightboxImage && (
                    <div
                        className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
                        onClick={() => setLightboxImage(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full w-12 h-12"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </Button>
                        <img
                            src={lightboxImage}
                            alt="Full size"
                            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                        />
                    </div>
                )}
            </div>

            {/* Navigation Buttons (Outside Card) */}
            <div className="w-full flex items-center justify-between mt-6">
                <Button variant="outline" className="text-gray-500 hover:text-gray-900 border-gray-300 invisible">
                    이전글
                </Button>
                <Button onClick={onBack} size="lg" className="px-10 bg-gray-900 text-white hover:bg-black font-bold">
                    목록으로
                </Button>
                <Button variant="outline" className="text-gray-500 hover:text-gray-900 border-gray-300 invisible">
                    다음글
                </Button>
            </div>
        </> // Wrap in Fragment since we returning multiple elements now
    )
}

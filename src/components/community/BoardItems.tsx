import { Badge } from "@/components/ui/badge"
import { Post } from "@/data/communityData"
import { Star, Image as ImageIcon, FileText, Download } from "lucide-react"

interface ItemProps {
    post: Post
    onClick: (post: Post) => void
}

// 1. Notice Item
export const NoticeItem = ({ post, onClick }: ItemProps) => {
    return (
        <div
            onClick={() => onClick(post)}
            className={`
                flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors
                ${post.isImportant ? "bg-[#FFF9E5] hover:bg-[#FFF9E5]/80" : "bg-white"}
            `}
        >
            <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                    {post.isImportant && (
                        <Badge className="bg-[#FFBE00] text-black hover:bg-[#E5AB00] border-none">
                            중요
                        </Badge>
                    )}
                    {post.subject && (
                        <span className="text-xs text-gray-500 font-medium">[{post.subject}]</span>
                    )}
                </div>
                <h3 className={`text-base font-medium truncate ${post.isImportant ? "font-bold text-black" : "text-gray-900"}`}>
                    {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>{post.date}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>조회 {post.views.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

// 2. Review Item
export const ReviewItem = ({ post, onClick }: ItemProps) => {
    return (
        <div
            onClick={() => onClick(post)}
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {post.isPasser && (
                        <Badge variant="outline" className="border-[#FFBE00] text-[#FFBE00] bg-[#FFF9E5]">
                            합격생
                        </Badge>
                    )}
                    {post.subject && (
                        <span className="text-xs text-gray-500 font-medium">[{post.subject}]</span>
                    )}
                    <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${i < (post.rating || 0) ? "fill-[#FFBE00] text-[#FFBE00]" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                <h3 className="text-base font-medium text-gray-900 truncate flex items-center gap-2">
                    {post.title}
                    {post.hasPhoto && (
                        <ImageIcon className="w-4 h-4 text-gray-400" />
                    )}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>{post.date}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>조회 {post.views.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

// 3. Info Item
export const InfoItem = ({ post, onClick }: ItemProps) => {
    return (
        <div
            onClick={() => onClick(post)}
            className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
        >
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {post.dDay && (
                        <Badge className="bg-red-500 hover:bg-red-600 text-white border-none animate-pulse">
                            {post.dDay}
                        </Badge>
                    )}
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                        정보
                    </Badge>
                </div>

                <h3 className="text-base font-medium text-gray-900 truncate flex items-center gap-2">
                    {post.title}
                    {post.hasAttachment && (
                        <FileText className="w-4 h-4 text-gray-400" />
                    )}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>{post.date}</span>
                    <span className="w-px h-3 bg-gray-300" />
                    <span>조회 {post.views.toLocaleString()}</span>
                </div>
            </div>

            {/* Desktop Only: Download Icon for visual emphasis */}
            {post.hasAttachment && (
                <div className="hidden md:flex ml-4 text-gray-400">
                    <Download className="w-5 h-5" />
                </div>
            )}
        </div>
    )
}

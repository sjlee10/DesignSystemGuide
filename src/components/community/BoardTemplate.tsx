import { useState, useEffect } from "react"
import { BoardType, Post } from "@/data/communityData"
import { BoardList } from "./BoardList"
import { BoardDetail } from "./BoardDetail"

interface BoardTemplateProps {
    defaultTab?: BoardType
}

export function BoardTemplate({ defaultTab = "notice" }: BoardTemplateProps) {
    const [activeTab, setActiveTab] = useState<BoardType>(defaultTab)
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    // Update activeTab when defaultTab prop changes (e.g. from GNB navigation)
    useEffect(() => {
        setActiveTab(defaultTab)
        setSelectedPost(null) // Reset view to list when tab changes
    }, [defaultTab])

    const handleTabChange = (tab: BoardType) => {
        setActiveTab(tab)
        setSelectedPost(null) // Return to list when tab changes
    }

    const tabs: { id: BoardType; label: string }[] = [
        { id: "notice", label: "공지사항" },
        { id: "review", label: "수강후기" },
        { id: "info", label: "수험정보" },
    ]

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold text-gray-900">커뮤니티</h1>
                <p className="text-gray-500">에듀윌 수강생들과 함께 합격의 기쁨을 나누세요.</p>
            </div>

            {/* View Switching */}
            {selectedPost ? (
                <BoardDetail
                    post={selectedPost}
                    onBack={() => setSelectedPost(null)}
                />
            ) : (
                <>
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`
                                    flex-1 py-4 text-center text-lg font-medium transition-colors border-b-2
                                    ${activeTab === tab.id
                                        ? "border-[#FFBE00] text-black font-bold"
                                        : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* List Content */}
                    <BoardList
                        type={activeTab}
                        onPostClick={setSelectedPost}
                    />
                </>
            )}
        </div>
    )
}

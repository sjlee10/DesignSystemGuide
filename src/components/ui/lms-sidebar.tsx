import * as React from "react"
import { cn } from "@/lib/utils"
import { Layout, MessageCircle, FolderOpen, User, LogOut, GraduationCap, ChevronRight } from "lucide-react"

interface LMSSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    activeMenu?: string
    onMenuClick?: (menu: string) => void
}

export function LMSSidebar({ className, activeMenu = "my-classroom", onMenuClick, ...props }: LMSSidebarProps) {
    const [active, setActive] = React.useState(activeMenu)

    const menuItems = [
        { id: "my-classroom", label: "내 강의실", icon: Layout },
        { id: "grades", label: "성적 확인", icon: GraduationCap },
        { id: "qna", label: "Q&A 게시판", icon: MessageCircle },
        { id: "materials", label: "학습 자료실", icon: FolderOpen },
        { id: "mypage", label: "마이페이지", icon: User },
    ]

    return (
        <div className={cn("w-64 bg-white border-r border-gray-200 flex flex-col h-full min-h-[500px]", className)} {...props}>
            <div className="p-6 border-b border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 mx-auto flex items-center justify-center mb-3">
                    <User className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900">김에듀 수강생</h3>
                <p className="text-xs text-gray-500 mt-1">프론트엔드 마스터 과정</p>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = active === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActive(item.id)
                                onMenuClick?.(item.id)
                            }}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all relative group",
                                isActive
                                    ? "bg-yellow-50 text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400 group-hover:text-gray-600")} />
                            <span>{item.label}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary" />}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                            )}
                        </button>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 px-4 py-2 w-full">
                    <LogOut className="w-4 h-4" />
                    로그아웃
                </button>
            </div>
        </div>
    )
}

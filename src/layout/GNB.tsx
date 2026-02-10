import React, { useState } from "react"
import {
    Menu,
    X,
    Bell,
    ShoppingCart,
    User,
    Search,
    ChevronRight,
    MonitorPlay,
    Ticket,
    ClipboardCheck,
    Database
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GNBProps {
    currentView: string
    onViewChange: (view: string, params?: any) => void
    notifications?: number
    cartItems?: number
}

// Placeholder for 2-depth menu data
const menuItems = [
    {
        id: "dashboard",
        name: "내 강의실",
        icon: MonitorPlay,
        children: []
    },
    {
        id: "course-registration",
        name: "수강신청",
        icon: ShoppingCart,
        children: [
            { id: "package", name: "패키지과정" },
            { id: "single", name: "단과과정" }
        ]
    },
    {
        id: "exam",
        name: "모의고사",
        icon: ClipboardCheck,
        children: []
    },
    {
        id: "event",
        name: "이벤트",
        icon: Ticket,
        children: []
    },
    {
        id: "community",
        name: "커뮤니티",
        icon: User, // Replacing with generic User icon or MessageSquare if available
        children: [
            { id: "notice", name: "공지사항" },
            { id: "review", name: "수강후기" },
            { id: "info", name: "수험정보" }
        ]
    },
    {
        id: "free-lectures",
        name: "무료강의/자료",
        icon: MonitorPlay,
        children: [
            { id: "free", name: "무료강의" },
            { id: "material", name: "학습자료실" }
        ]
    },
    {
        id: "cs-center",
        name: "고객센터",
        icon: Database, // Generic icon
        children: [
            { id: "inquiry", name: "1:1문의" },
            { id: "faq", name: "자주묻는질문" },
            { id: "cs-notice", name: "공지사항" },
            { id: "remote", name: "원격지원" }
        ]
    }
]

export function GNB({ currentView, onViewChange, notifications = 3, cartItems = 0 }: GNBProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null) // State to track hover/click
    const [expandedMobileIds, setExpandedMobileIds] = useState<string[]>([])

    const handleMenuClick = (id: string, hasChildren: boolean) => {
        if (hasChildren) {
            setExpandedMobileIds(prev =>
                prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
            )
        } else {
            onViewChange(id)
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200">
            {/* Top Common Header (Login/Join/etc - Optional, but keeping simple for now) */}

            {/* Main GNB */}
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
                {/* Logo */}
                <div
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => onViewChange("dashboard")}
                >
                    <img
                        src="https://img.eduwill.net/Img2/Common/BI/type2/live/logo.svg"
                        alt="Eduwill"
                        className="h-8 w-auto"
                    />
                </div>

                {/* Desktop Menu - Centered/Left-aligned next to logo */}
                <nav className="hidden lg:flex items-center gap-6 flex-1 ml-4 h-full">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative group h-full flex items-center"
                            onMouseEnter={() => setActiveSubMenu(item.id)}
                            onMouseLeave={() => setActiveSubMenu(null)}
                        >
                            <button
                                onClick={() => handleMenuClick(item.id, item.children.length > 0)}
                                className={cn(
                                    "px-2 py-6 text-[17px] font-bold transition-colors relative flex items-center gap-1",
                                    currentView === item.id || (item.children.length > 0 && activeSubMenu === item.id)
                                        ? "text-[#FFBE00]"
                                        : "text-gray-800 hover:text-[#FFBE00]"
                                )}
                            >
                                {item.name}
                                {/* Active Indicator */}
                                {(currentView === item.id) && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FFBE00]" />
                                )}
                            </button>

                            {/* 2-depth Dropdown */}
                            {item.children.length > 0 && (
                                <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-36 bg-white shadow-lg border border-gray-100 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2 pb-2 z-50 overflow-hidden">
                                    {item.children.map((subItem) => (
                                        <button
                                            key={subItem.id}
                                            onClick={() => {
                                                if (item.id === "course-registration" || item.id === "community") {
                                                    onViewChange(item.id, { tab: subItem.id })
                                                } else {
                                                    onViewChange(item.id)
                                                }
                                                setIsMobileMenuOpen(false) // Close mobile menu if open (though this is desktop view, good practice)
                                            }}
                                            className="block w-full text-left px-4 py-2.5 text-[14px] text-gray-600 hover:bg-[#FFF8E1] hover:text-[#FFBE00] hover:font-bold transition-colors"
                                        >
                                            {subItem.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Right Utils */}
                <div className="hidden lg:flex items-center gap-4">
                    <div className="relative">
                        <Search className="w-6 h-6 text-gray-800" />
                    </div>

                    <div className="relative">
                        <ShoppingCart className="w-6 h-6 text-gray-800" />
                        {cartItems > 0 && (
                            <Badge className="absolute -top-2 -right-2 bg-[#FFBE00] text-black hover:bg-[#E5AB00] h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px]">
                                {cartItems}
                            </Badge>
                        )}
                    </div>

                    <div className="relative">
                        <Bell className="w-6 h-6 text-gray-800" />
                        {notifications > 0 && (
                            <Badge className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 h-5 min-w-[20px] px-1 flex items-center justify-center text-[10px]">
                                {notifications}
                            </Badge>
                        )}
                    </div>

                    <div className="w-px h-4 bg-gray-300 mx-2" />

                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-[#FFBE00] hover:bg-[#E5AB00] text-black font-bold h-10 px-6 rounded-full shadow-sm transition-all hover:shadow-md"
                        >
                            마이페이지
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 -mr-2"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <Menu className="w-7 h-7" />
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            <div className={cn(
                "fixed inset-0 z-[200] bg-black/50 transition-opacity duration-300 lg:hidden",
                isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )} onClick={() => setIsMobileMenuOpen(false)} />

            {/* Mobile Drawer Content */}
            <div className={cn(
                "fixed top-0 right-0 bottom-0 z-[201] w-80 bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="h-full flex flex-col">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <img
                            src="https://img.eduwill.net/Img2/Common/BI/type2/live/logo.svg"
                            alt="Eduwill"
                            className="h-6 w-auto"
                        />
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-6 h-6" />
                        </Button>
                    </div>

                    {/* Mobile User Info */}
                    <div className="p-6 bg-gray-50">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                                <div className="text-lg font-bold">김에듀님</div>
                                <div className="text-sm text-gray-500">오늘도 힘내세요!</div>
                            </div>
                        </div>
                        <Button className="w-full bg-[#FFBE00] hover:bg-[#E5AB00] text-black font-bold">
                            마이페이지
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const isExpanded = expandedMobileIds.includes(item.id)
                                const hasChildren = item.children.length > 0

                                return (
                                    <div key={item.id}>
                                        <button
                                            onClick={() => handleMenuClick(item.id, hasChildren)}
                                            className={cn(
                                                "flex items-center justify-between w-full p-4 rounded-xl text-left transition-colors",
                                                currentView === item.id && !hasChildren
                                                    ? "bg-yellow-50 text-[#FFBE00]"
                                                    : "hover:bg-gray-50 text-gray-700"
                                            )}
                                        >
                                            <span className="font-bold text-[15px]">{item.name}</span>
                                            {hasChildren && (
                                                <ChevronRight className={cn(
                                                    "w-4 h-4 transition-transform duration-200",
                                                    isExpanded ? "rotate-90" : ""
                                                )} />
                                            )}
                                        </button>

                                        {/* Sub-menu */}
                                        {hasChildren && isExpanded && (
                                            <div className="bg-gray-50 rounded-lg mx-2 mb-2 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                                {item.children.map((subItem) => (
                                                    <button
                                                        key={subItem.id}
                                                        className="block w-full text-left pl-8 pr-5 py-3 text-[15px] text-gray-500 hover:text-[#FFBE00]"
                                                        onClick={() => {
                                                            if (item.id === "course-registration" || item.id === "community") {
                                                                onViewChange(item.id, { tab: subItem.id })
                                                            } else {
                                                                onViewChange(item.id)
                                                            }
                                                            setIsMobileMenuOpen(false)
                                                        }}
                                                    >
                                                        {subItem.name}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </nav>

                    {/* Mobile Footer Actions */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 border-gray-200">로그아웃</Button>
                            <Button variant="outline" className="flex-1 border-gray-200">고객센터</Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

import {
    ComponentIcon,
    LayoutDashboard,
    Database,
    Navigation,
    MonitorPlay,
    Palette,
    Home,
    Video,
    ClipboardCheck,
    MessageSquare,
    ShoppingCart,
    CreditCard,
    Ticket
} from "lucide-react"

interface SidebarProps {
    currentView: string
    onViewChange: (view: string) => void
    activeCategory: string
    onSelectCategory: (category: string) => void
}

const guideCategories = [
    { id: "general", name: "General", icon: ComponentIcon },
    { id: "data-entry", name: "Data Entry", icon: Database },
    { id: "data-display", name: "Data Display", icon: LayoutDashboard },
    { id: "pagination", name: "Pagination", icon: Navigation },
    { id: "media-nav", name: "Media & Nav", icon: Video },
    { id: "exam", name: "Exam & Assessment", icon: ClipboardCheck },
    { id: "community", name: "Community", icon: MessageSquare },
]

export function Sidebar({ currentView, onViewChange, activeCategory, onSelectCategory }: SidebarProps) {
    return (
        <aside className="w-64 border-r border-gray-200 bg-white h-screen fixed left-0 top-0 overflow-y-auto hidden md:flex flex-col z-[100]">
            <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => onViewChange("dashboard")}>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 bg-[#FFBE00] rounded-lg flex items-center justify-center text-white">E</span>
                    Eduwill DS
                </h1>
                <p className="text-xs text-gray-500 mt-1">LMS Design System</p>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-6">
                {/* Main Apps */}
                <div>
                    <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Apps
                    </div>
                    <div className="space-y-1">
                        <button
                            onClick={() => onViewChange("dashboard")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "dashboard"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Home className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => onViewChange("player")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "player"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <MonitorPlay className="w-4 h-4 mr-2" />
                            Learning Player
                        </button>
                        <button
                            onClick={() => onViewChange("exam")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "exam"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <ClipboardCheck className="w-4 h-4 mr-2" />
                            Mock Exam
                        </button>
                        <button
                            onClick={() => onViewChange("course-reg")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "course-reg"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Course Store
                        </button>
                        <button
                            onClick={() => onViewChange("course-detail")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "course-detail"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Detail Page (New)
                        </button>
                        <button
                            onClick={() => onViewChange("event")}
                            className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentView === "event"
                                ? "bg-[#FFBE00]/10 text-yellow-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <Ticket className="w-4 h-4 mr-2" />
                            Event Page (New)
                        </button>
                    </div>
                </div>

                {/* Design System Guide */}
                <div>
                    <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Design System
                    </div>
                    <button
                        onClick={() => onViewChange("guide")}
                        className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium mb-2 transition-colors ${currentView === "guide"
                            ? "bg-[#FFBE00]/10 text-yellow-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                    >
                        <Palette className="w-4 h-4 mr-2" />
                        Component Guide
                    </button>

                    {currentView === "guide" && (
                        <div className="ml-4 space-y-1 border-l border-gray-100 pl-2">
                            {guideCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => onSelectCategory(category.id)}
                                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === category.id
                                        ? "text-yellow-600 bg-yellow-50"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    <category.icon className="w-3 h-3 mr-2" />
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    )
}

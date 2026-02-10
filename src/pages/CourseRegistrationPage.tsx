import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import {
    ShoppingCart,
    X,
    Check,
    BookOpen,
    MonitorPlay,
    Clock,
    Star
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Mock Data ---
interface Course {
    id: string
    title: string
    instructor: string
    thumbnail: string
    originalPrice: number
    price: number
    tags: string[]
    bestSeller?: boolean
    rating: number
    reviewCount: number
    type: "package" | "single"
    subject?: "all" | "intro" | "property" | "civil" | "public" | "tax"
    benefits?: string[]
    lectures?: number
    duration?: string
}

const COURSES: Course[] = [
    // Package Courses
    {
        id: "p1",
        type: "package",
        title: "2026 공인중개사 1차+2차 평생패스 [환급형]",
        instructor: "이영방 외 20명",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
        originalPrice: 1200000,
        price: 890000,
        tags: ["평생수강", "수강료환급", "베스트셀러"],
        bestSeller: true,
        rating: 4.9,
        reviewCount: 3240,
        benefits: ["교재 16권 포함", "IT 실무강의 무료", "1:1 밀착관리"]
    },
    {
        id: "p2",
        type: "package",
        title: "2026 주택관리사 1차 단기합격반",
        instructor: "윤난 외 8명",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20230530142433166.png",
        originalPrice: 600000,
        price: 350000,
        tags: ["단기완성", "핵심요약"],
        bestSeller: false,
        rating: 4.8,
        reviewCount: 850,
        benefits: ["핵심요약집 제공", "모의고사 무료"]
    },
    // Single Courses
    {
        id: "s1",
        type: "single",
        subject: "intro",
        title: "부동산학개론 기초이론",
        instructor: "이영방 교수",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
        originalPrice: 150000,
        price: 50000,
        tags: ["입문자용", "기초탄탄"],
        bestSeller: true,
        rating: 5.0,
        reviewCount: 120,
        lectures: 24,
        duration: "20시간"
    },
    {
        id: "s2",
        type: "single",
        subject: "civil",
        title: "민법 및 민사특별법 기본이론",
        instructor: "심정욱 교수",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226175127618.jpg",
        originalPrice: 180000,
        price: 60000,
        tags: ["필수과목", "판례중심"],
        bestSeller: false,
        rating: 4.9,
        reviewCount: 95,
        lectures: 30,
        duration: "25시간"
    },
    {
        id: "s3",
        type: "single",
        subject: "public",
        title: "부동산 공법 심화이론",
        instructor: "김희상 교수",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
        originalPrice: 200000,
        price: 70000,
        tags: ["고득점", "체계도"],
        bestSeller: false,
        rating: 4.8,
        reviewCount: 78,
        lectures: 28,
        duration: "22시간"
    },
    {
        id: "s4",
        type: "single",
        subject: "property",
        title: "부동산공시법 핵심요약",
        instructor: "김민석 교수",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
        originalPrice: 160000,
        price: 55000,
        tags: ["핵심정리", "단기완성"],
        bestSeller: false,
        rating: 4.7,
        reviewCount: 45,
        lectures: 20,
        duration: "18시간"
    },
    {
        id: "s5",
        type: "single",
        subject: "tax",
        title: "부동산세법 문제풀이",
        instructor: "한영규 교수",
        thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
        originalPrice: 170000,
        price: 60000,
        tags: ["문제풀이", "실전대비"],
        bestSeller: false,
        rating: 4.8,
        reviewCount: 60,
        lectures: 25,
        duration: "22시간"
    }
]

const SUBJECTS = [
    { id: "all", label: "전체" },
    { id: "intro", label: "학개론" },
    { id: "civil", label: "민법" },
    { id: "public", label: "공법" },
    { id: "property", label: "공시법" },
    { id: "tax", label: "세법" }
]

interface CourseRegistrationPageProps {
    onViewChange?: (view: string) => void
    defaultTab?: "package" | "single"
}

export function CourseRegistrationPage({ onViewChange, defaultTab = "package" }: CourseRegistrationPageProps) {
    const [activeTab, setActiveTab] = useState<"package" | "single">(defaultTab)
    const [selectedSubject, setSelectedSubject] = useState("all")

    // Sync activeTab when defaultTab changes (e.g. from GNB)
    useEffect(() => {
        setActiveTab(defaultTab)
    }, [defaultTab])

    // Reset subject filter when switching tabs
    useEffect(() => {
        setSelectedSubject("all")
    }, [activeTab])

    const [cart, setCart] = useState<string[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [flyingItem, setFlyingItem] = useState<{ id: string, x: number, y: number } | null>(null)

    // Handlers
    const toggleCart = (id: string, e?: React.MouseEvent) => {
        if (!cart.includes(id)) {
            // Start flying animation logic here
            if (e) {
                setFlyingItem({ id, x: e.clientX, y: e.clientY })
                setTimeout(() => setFlyingItem(null), 800) // End animation
            }
        }
        setCart(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        )
        if (!isCartOpen && !cart.includes(id)) setIsCartOpen(true)
    }

    // Filter Data
    const displayCourses = COURSES.filter(c => {
        const isTabMatch = c.type === activeTab
        const isSubjectMatch = activeTab === "package" || selectedSubject === "all" || c.subject === selectedSubject
        return isTabMatch && isSubjectMatch
    })

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="text-center space-y-3 mb-12">
                <Badge variant="outline" className="text-[#FFBE00] border-[#FFBE00] px-3 py-1">2026 대비 수강신청 Overview</Badge>
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    <span className="text-[#FFBE00]">합격</span>을 위한 가장 완벽한 선택
                </h1>
                <p className="text-gray-500 text-lg">
                    {activeTab === "package"
                        ? "검증된 커리큘럼으로 빠르고 확실하게 합격하세요."
                        : "나에게 필요한 부분만 골라 효율적으로 학습하세요."}
                </p>
            </div>

            {/* Tab System */}
            <div className="flex justify-center mb-10">
                <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 relative">
                    <button
                        onClick={() => setActiveTab("package")}
                        className={cn(
                            "px-8 py-3 rounded-full text-base font-bold transition-all relative z-10 flex items-center gap-2",
                            activeTab === "package" ? "text-gray-900 bg-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        패키지 과정
                        <Badge className="bg-red-500 hover:bg-red-500 border-none text-white text-[10px] px-1.5 py-0.5 rounded-sm">BEST</Badge>
                    </button>
                    <button
                        onClick={() => setActiveTab("single")}
                        className={cn(
                            "px-8 py-3 rounded-full text-base font-bold transition-all relative z-10 flex items-center gap-2",
                            activeTab === "single" ? "text-gray-900 bg-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                        )}
                    >
                        단과 과정
                        <Badge variant="outline" className="text-blue-500 border-blue-500 text-[10px] px-1.5 py-0.5 rounded-sm">과목별</Badge>
                    </button>
                </div>
            </div>

            {/* Promotion Banner (Animated via Key key-change) */}
            <div key={activeTab + "-banner"} className="animate-in fade-in zoom-in-95 duration-300">
                {activeTab === "package" ? (
                    <div className="rounded-2xl bg-gradient-to-r from-gray-900 via-[#1D1D1F] to-gray-800 p-8 md:p-10 text-white shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFBE00] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity" />
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <Badge className="bg-[#FFBE00] text-black mb-3 hover:bg-[#FFBE00]">기간 한정 혜택</Badge>
                                <h2 className="text-3xl font-bold mb-2">2026 합격 시 <span className="text-[#FFBE00]">수강료 0원</span> 전액 환급!</h2>
                                <p className="text-gray-400">지금 패키지를 구매하시면 교재 16권과 IT 실무강의까지 모두 드립니다.</p>
                            </div>
                            <div className="text-right hidden md:block">
                                <div className="text-5xl font-black text-[#FFBE00] animate-pulse">D-3</div>
                                <div className="text-sm text-gray-400 mt-1">마감 임박</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-white p-8 md:p-10 border border-blue-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <Badge variant="outline" className="text-blue-600 border-blue-600 mb-3">스마트 학습</Badge>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">필요한 과목만 <span className="text-blue-600">쏙쏙</span> 골라 듣기</h2>
                            <p className="text-gray-500">부족한 과목을 집중 공략하여 합격 점수를 완성하세요.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Subject Filter (Only for Single Courses) */}
            {activeTab === "single" && (
                <div className="flex flex-wrap gap-2 justify-center animate-in fade-in slide-in-from-top-2 duration-300">
                    {SUBJECTS.map((subject) => (
                        <button
                            key={subject.id}
                            onClick={() => setSelectedSubject(subject.id)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                                selectedSubject === subject.id
                                    ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                            )}
                        >
                            {subject.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Course List */}
            <div
                key={activeTab + "-list"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 duration-500"
            >
                {displayCourses.map((course) => (
                    <div
                        key={course.id}
                        className={cn(
                            "group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
                            activeTab === "package" ? "border-gray-200 hover:border-[#FFBE00]" : "border-blue-50 hover:border-blue-200"
                        )}
                    >
                        {/* Thumbnail & Badges */}
                        <div className="relative aspect-video bg-gray-100 overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            {course.bestSeller && (
                                <Badge className="absolute top-3 left-3 bg-[#FFBE00] text-black border-none shadow-md">BEST</Badge>
                            )}
                            {activeTab === "single" && (
                                <Button
                                    size="sm"
                                    className="absolute bottom-3 right-3 bg-black/70 hover:bg-black text-white text-xs h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                >
                                    <MonitorPlay className="w-3 h-3 mr-1" /> 맛보기
                                </Button>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4 flex flex-col h-full">
                            <div>
                                <div className="flex gap-1 mb-2">
                                    {course.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-xs">{tag}</span>
                                    ))}
                                </div>
                                <h3
                                    className="text-lg font-bold text-gray-900 leading-snug line-clamp-2 cursor-pointer hover:underline h-[3.2rem]"
                                    onClick={() => onViewChange?.("course-detail")}
                                >
                                    {course.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-gray-100" />

                            {/* Features (Based on Type) */}
                            {course.type === "package" ? (
                                <div className="space-y-2 h-[4.5rem]">
                                    {course.benefits?.map((benefit, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="w-4 h-4 text-[#FFBE00]" />
                                            {benefit}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-lg h-[3.2rem]">
                                    <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.lectures}강</div>
                                    <div className="w-px h-3 bg-gray-300" />
                                    <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</div>
                                    <div className="w-px h-3 bg-gray-300" />
                                    <div className="flex items-center gap-1 text-[#FFBE00]"><Star className="w-4 h-4 fill-current" /> {course.rating}</div>
                                </div>
                            )}

                            {/* Price & Action */}
                            <div className="flex items-end justify-between pt-2 mt-auto">
                                <div>
                                    <div className="text-sm text-gray-400 line-through">
                                        {course.originalPrice.toLocaleString()}원
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 font-bold text-lg">
                                            {Math.round((1 - course.price / course.originalPrice) * 100)}%
                                        </span>
                                        <span className="text-xl font-black text-gray-900">
                                            {course.price.toLocaleString()}<span className="text-sm font-normal text-gray-600">원</span>
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    onClick={(e) => toggleCart(course.id, e)}
                                    size="icon"
                                    className={cn(
                                        "rounded-full w-10 h-10 shadow-sm transition-all hover:scale-110",
                                        cart.includes(course.id) ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-900 hover:bg-black text-white"
                                    )}
                                >
                                    {cart.includes(course.id) ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                                </Button>
                            </div>
                        </div>

                        {/* Package Social Proof */}
                        {course.type === "package" && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm animate-pulse">
                                마감임박
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Pagination
                totalItems={50}
                itemsPerPage={10}
                currentPage={1}
                onPageChange={() => { }}
                className="mt-12"
            />

            {/* Cart Drawer Trigger (Fixed) */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden">
                <Button
                    onClick={() => setIsCartOpen(true)}
                    className="rounded-full shadow-2xl bg-[#1D1D1F] text-white px-6 h-12 gap-2 hover:scale-105 transition-transform"
                >
                    <ShoppingCart className="w-5 h-5" />
                    장바구니 담기 ({cart.length})
                </Button>
            </div>

            {/* Flying Animation Element (Simulated via CSS and State) */}
            {flyingItem && (
                <div
                    style={{
                        left: flyingItem.x,
                        top: flyingItem.y,
                    }}
                    className="fixed z-[9999] pointer-events-none w-8 h-8 bg-[#FFBE00] rounded-full flex items-center justify-center shadow-lg animate-out fade-out zoom-out-0 duration-700 slide-out-to-top-[10%] slide-out-to-right-[90%]"
                >
                    <ShoppingCart className="w-4 h-4 text-white" />
                </div>
            )}

            {/* Cart Drawer (Simplified Overlay) */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[1000] flex justify-end">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
                    <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-[#FFBE00]" />
                                장바구니 <span className="text-gray-400 text-sm">{cart.length}</span>
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {/* Same Cart Content as before */}
                            <div className="flex-1 flex items-center justify-center text-gray-400">
                                장바구니 기능이 준비되었습니다.
                            </div>
                        </div>

                        {/* Cart Footer */}
                        {/* ... omitted for brevity ... */}
                    </div>
                </div>
            )}
        </div>
    )
}

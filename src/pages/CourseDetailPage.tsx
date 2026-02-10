import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CurriculumList } from "@/components/ui/curriculum-list"
import {
    Clock,
    Users,
    Star,
    CheckCircle2,
    Play,
    ShoppingCart,
    CreditCard,
    ChevronRight,
    BookOpen,
    ShieldCheck,
    Trophy,
    MessageSquareQuote
} from "lucide-react"
import { cn } from "@/lib/utils"

// --- Mock Data ---
const COURSE_DATA = {
    id: "detail-1",
    title: "2026 공인중개사 1차+2차 평생패스 [환급형]",
    subtitle: "합격할 때까지 무제한 수강 + 합격 시 100% 수강료 환급",
    instructor: "이영방 외 32명",
    rating: 4.9,
    reviewCount: 3240,
    studentCount: 154300,
    basePrice: 1290000,
    discountRate: 30, // %
    thumbnail: "//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg",
    features: [
        "전 교재 16권 포함 (기초서+기본서+문제집)",
        "2026년 정규 강의 + 핵심 요약 특강 제공",
        "온라인 모의고사 8회분 무료 응시권",
        "합격자들의 시크릿 노트(PDF) 제공"
    ],
    curriculum: [
        {
            weekTitle: "PART 1. 부동산학개론",
            lectures: [
                { id: "1-1", title: "부동산학의 기초 이론 (OT)", duration: "45:00", isCompleted: true }, // Free preview logic
                { id: "1-2", title: "부동산의 개념과 분류", duration: "50:00", isCompleted: false },
                { id: "1-3", title: "토지의 특성 (자연적/인문적)", duration: "48:00", isCompleted: false },
            ]
        },
        {
            weekTitle: "PART 2. 민법 및 민사특별법",
            lectures: [
                { id: "2-1", title: "민법 총칙 구조 잡기", duration: "60:00", isCompleted: false },
                { id: "2-2", title: "권리변동의 일반적 효력", duration: "55:00", isCompleted: false },
            ]
        }
    ]
}

const REVIEW_DATA = [
    { user: "김*수", score: 5, txt: "비전공자라 걱정했는데 이영방 교수님 강의 듣고 모의고사 점수 30점 올랐습니다. 진짜 강추!" },
    { user: "이*진", score: 5, txt: "환급반이라 동기부여 확실하네요. 교재 퀄리티도 대박입니다." },
    { user: "박*호", score: 4.5, txt: "퇴근하고 하루 2시간씩 듣는데 지루하지 않아요." },
    { user: "최*영", score: 5, txt: "커리큘럼이 정말 체계적입니다. 기초부터 심화까지 완벽해요." },
    { user: "정*우", score: 4, txt: "교재 배송도 빠르고 강의 화질도 좋네요." },
    { user: "강*희", score: 5, txt: "합격 시 100% 환급이라는 조건이 공부하는데 정말 큰 동기부여가 됩니다." },
    { user: "윤*석", score: 4.5, txt: "모바일로 듣기에도 편하고 앱 사용성도 좋습니다." },
    { user: "임*아", score: 5, txt: "교수님들의 열정이 모니터 너머로도 느껴집니다. 꼭 합격할게요!" },
    { user: "한*민", score: 5, txt: "기출문제 분석이 정말 탁월합니다. 시험에 나올 부분만 콕콕 집어주세요." }
]

const OPTIONS = {
    duration: [
        { id: "forever", label: "평생패스 (합격 시 환급)", priceMod: 0, best: true },
        { id: "year", label: "1년 연간회원반", priceMod: -200000 },
    ],
    textbook: [
        { id: "include", label: "교재 16권 전체 포함", price: 340000 },
        { id: "exclude", label: "교재 미포함 (강의만)", price: 0 },
    ]
}

export function CourseDetailPage() {
    // State
    const [selectedDuration, setSelectedDuration] = useState(OPTIONS.duration[0].id)
    const [selectedTextbook, setSelectedTextbook] = useState(OPTIONS.textbook[0].id)
    const [timeLeft, setTimeLeft] = useState<{ h: number, m: number, s: number }>({ h: 4, m: 59, s: 59 })
    const [isStickyVisible, setIsStickyVisible] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [activeTab, setActiveTab] = useState("features")
    const [visibleReviewCount, setVisibleReviewCount] = useState(3)

    const stickyTriggerRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)
    const curriculumRef = useRef<HTMLDivElement>(null)
    const reviewsRef = useRef<HTMLDivElement>(null)

    // Derived Logic
    const currentDuration = OPTIONS.duration.find(d => d.id === selectedDuration)!
    const currentTextbook = OPTIONS.textbook.find(t => t.id === selectedTextbook)!

    const coursePrice = COURSE_DATA.basePrice + currentDuration.priceMod
    const textbookPrice = currentTextbook.price
    const finalPrice = Math.round((coursePrice * (100 - COURSE_DATA.discountRate) / 100)) + textbookPrice
    const originalTotalPrice = coursePrice + textbookPrice

    // Timer Effect
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.s > 0) return { ...prev, s: prev.s - 1 }
                if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 }
                if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 }
                return prev
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Scroll Observer for Bottom Floating Bar & Scroll Spy for Tabs
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsStickyVisible(!entry.isIntersecting),
            { threshold: 0 }
        )
        if (stickyTriggerRef.current) observer.observe(stickyTriggerRef.current)

        const handleScroll = () => {
            const headerOffset = 180 // Adjust based on sticky header height and tab height
            const scrollPos = window.scrollY + headerOffset

            const featuresPos = featuresRef.current?.offsetTop || 0
            const curriculumPos = curriculumRef.current?.offsetTop || 0
            const reviewsPos = reviewsRef.current?.offsetTop || 0

            if (scrollPos >= reviewsPos) {
                setActiveTab("reviews")
            } else if (scrollPos >= curriculumPos) {
                setActiveTab("curriculum")
            } else if (scrollPos >= featuresPos) {
                setActiveTab("features")
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            observer.disconnect()
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const scrollToSection = (id: string, ref: React.RefObject<HTMLDivElement>) => {
        setActiveTab(id)
        if (ref.current) {
            const offset = 160 // Header height + Tab nav height
            const elementPosition = ref.current.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.scrollY - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 font-sans relative">

            {/* 1. FOMO Sticky Top Bar */}
            <div className="bg-[#111] text-white py-3 px-4 sticky top-0 z-[60] flex items-center justify-center gap-2 md:gap-6 shadow-md text-sm md:text-base">
                <div className="flex items-center gap-2 animate-pulse text-[#FFBE00] font-bold">
                    <Clock className="w-5 h-5" />
                    <span>오늘 마감 혜택</span>
                </div>
                <div className="font-mono text-lg font-bold tracking-widest">
                    {String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}
                </div>
                <span className="text-gray-400 hidden md:inline">남았습니다. 놓치면 가격 인상! 💸</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">

                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-10">

                    {/* Hero Section */}
                    <div ref={stickyTriggerRef} className="space-y-6">
                        {/* Social Proof Badges */}
                        <div className="flex flex-wrap gap-2 items-center">
                            <Badge className="bg-[#FFBE00] text-black hover:bg-[#E5AB00] border-none px-3 py-1 text-sm font-bold flex items-center gap-1">
                                <Trophy className="w-4 h-4" /> 베스트셀러 1위
                            </Badge>
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span>누적 수강생 {COURSE_DATA.studentCount.toLocaleString()}명</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200">
                                <Star className="w-4 h-4 text-[#FFBE00] fill-[#FFBE00]" />
                                <span>{COURSE_DATA.rating} ({COURSE_DATA.reviewCount.toLocaleString()}개 리뷰)</span>
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                            {COURSE_DATA.title}
                        </h1>
                        <p className="text-xl text-gray-500 font-medium">
                            {COURSE_DATA.subtitle}
                        </p>

                        {/* Thumbnail & Preview */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group bg-black">
                            {isVideoPlaying ? (
                                <video
                                    src="https://pmp.eduwill.net/eduwillpmp/eduwill/flv/sample/2025/L/LPL-SJW-SAMPLE.mp4"
                                    className="w-full h-full object-contain"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <>
                                    <img src={COURSE_DATA.thumbnail} alt="thumnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                                        <div className="flex flex-col items-center gap-4 transform group-hover:scale-105 transition-transform">
                                            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                                                <Play className="w-10 h-10 text-white fill-current" />
                                            </div>
                                            <span className="text-white font-bold text-lg drop-shadow-md">무료 맛보기 3강</span>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 pointer-events-none">
                                        <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur border-none">
                                            강의 맛보기
                                        </Badge>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Content Tabs (Features) */}
                    <div className="space-y-8">
                        <div className="sticky top-16 z-30 bg-gray-50 pt-4 pb-2">
                            <div className="flex border-b border-gray-200 bg-white shadow-sm rounded-t-lg">
                                {[
                                    { id: "features", label: "강의 특징", ref: featuresRef },
                                    { id: "curriculum", label: "상세 커리큘럼", ref: curriculumRef },
                                    { id: "reviews", label: "수강후기(NEW)", ref: reviewsRef }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => scrollToSection(tab.id, tab.ref)}
                                        className={cn(
                                            "flex-1 px-4 py-4 font-bold text-lg relative transition-colors",
                                            activeTab === tab.id
                                                ? "text-[#FFBE00] bg-yellow-50/50"
                                                : "text-gray-400 hover:text-gray-700 bg-white"
                                        )}>
                                        {tab.label}
                                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#FFBE00]" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Feature Highlights */}
                        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-mt-40">
                            {COURSE_DATA.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-[#FFBE00]/50 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-6 h-6 text-[#FFBE00]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-1">Benefit {i + 1}</h4>
                                        <p className="text-gray-600 font-medium">{feature}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Curriculum */}
                        <div ref={curriculumRef} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm scroll-mt-40">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-gray-400" />
                                상세 커리큘럼
                            </h3>
                            <CurriculumList curriculum={[
                                {
                                    weekTitle: "PART 1. 부동산학개론 (기초)",
                                    lectures: [
                                        { id: "1", title: "부동산학의 정의와 성격", duration: "45:00", isCompleted: true },
                                        { id: "2", title: "부동산 개념의 3대 측면", duration: "50:00", isCompleted: true },
                                        { id: "3", title: "[무료공개] 토지의 자연적 특성", duration: "55:00", isCompleted: false, isCurrent: true }
                                    ]
                                },
                                {
                                    weekTitle: "PART 2. 부동산 경제론",
                                    lectures: [
                                        { id: "2-1", title: "부동산의 수요와 공급", duration: "50:00", isCompleted: false },
                                        { id: "2-2", title: "부동산 시장의 균형", duration: "48:00", isCompleted: false },
                                        { id: "2-3", title: "수요와 공급의 탄력성", duration: "55:00", isCompleted: false }
                                    ]
                                }
                            ]} />
                        </div>

                        {/* Reviews Preview (Social Proof) */}
                        <div ref={reviewsRef} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden scroll-mt-40">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <MessageSquareQuote className="w-32 h-32 text-[#FFBE00]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">수강생들의 생생한 후기</h3>
                            <div className="space-y-4 relative z-10">
                                {REVIEW_DATA.slice(0, visibleReviewCount).map((review, i) => (
                                    <div key={i} className="flex gap-4 border-b border-gray-100 last:border-0 pb-4">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400">
                                            {review.user[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{review.user}</span>
                                                <div className="flex">
                                                    {Array.from({ length: 5 }).map((_, j) => (
                                                        <Star key={j} className={cn("w-3 h-3", j < Math.floor(review.score) ? "fill-[#FFBE00] text-[#FFBE00]" : "text-gray-200")} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm">{review.txt}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visibleReviewCount < REVIEW_DATA.length && (
                                <div className="mt-6 text-center">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setVisibleReviewCount(prev => prev + 3)}
                                    >
                                        후기 더보기 (+3)
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Banner for Instructors */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">믿고 듣는 에듀윌 1타 교수진</h3>
                                <p className="text-gray-400 text-sm">부동산학개론 이영방 교수님 외 32명의 전문가가 함께합니다.</p>
                            </div>
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(idx => (
                                    <div key={idx} className="w-12 h-12 rounded-full border-2 border-gray-800 bg-gray-600 flex items-center justify-center text-xs">IMG</div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDEBAR (Sticky) */}
                <div className="w-full lg:w-[400px] shrink-0">
                    <div className="sticky top-24 space-y-4">
                        {/* Control Panel */}
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Header price */}
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 font-medium line-through decoration-gray-400">
                                        {originalTotalPrice.toLocaleString()}원
                                    </span>
                                    <Badge variant="destructive" className="bg-red-500 text-white animate-pulse">
                                        오늘만 {COURSE_DATA.discountRate}% 할인
                                    </Badge>
                                </div>
                                <div className="text-3xl font-black text-gray-900 text-right">
                                    {finalPrice.toLocaleString()}<span className="text-base font-normal text-gray-500 ml-1">원</span>
                                </div>
                            </div>

                            {/* Options Select */}
                            <div className="p-6 space-y-6">
                                {/* Duration Option */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                        수강 기간 선택 <ShieldCheck className="w-4 h-4 text-green-500" />
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {OPTIONS.duration.map(opt => (
                                            <div
                                                key={opt.id}
                                                onClick={() => setSelectedDuration(opt.id)}
                                                className={cn(
                                                    "p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between",
                                                    selectedDuration === opt.id
                                                        ? "border-[#FFBE00] bg-yellow-50"
                                                        : "border-gray-100 hover:border-gray-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", selectedDuration === opt.id ? "border-[#FFBE00]" : "border-gray-300")}>
                                                        {selectedDuration === opt.id && <div className="w-2 h-2 rounded-full bg-[#FFBE00]" />}
                                                    </div>
                                                    <span className={cn("font-medium text-sm", selectedDuration === opt.id && "font-bold")}>{opt.label}</span>
                                                </div>
                                                {opt.best && <Badge className="bg-[#FFBE00] text-black text-[10px] px-1 h-5">BEST</Badge>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Textbook Option */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-900 flex items-center gap-1">
                                        교재 옵션
                                    </label>
                                    <select
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white font-medium text-sm focus:outline-none focus:border-[#FFBE00] focus:ring-1 focus:ring-[#FFBE00]"
                                        value={selectedTextbook}
                                        onChange={(e) => setSelectedTextbook(e.target.value)}
                                    >
                                        {OPTIONS.textbook.map(opt => (
                                            <option key={opt.id} value={opt.id}>
                                                {opt.label} (+{opt.price.toLocaleString()}원)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Total Summary */}
                                <div className="pt-4 border-t border-gray-100 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>강좌 금액</span>
                                        <span>{Math.round(coursePrice * (100 - COURSE_DATA.discountRate) / 100).toLocaleString()}원</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>교재 금액</span>
                                        <span>{textbookPrice.toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 pt-0 flex flex-col gap-3">
                                <Button className="w-full h-14 text-lg font-bold bg-[#FFBE00] hover:bg-[#E5AB00] text-black shadow-lg shadow-yellow-500/20">
                                    수강신청 하기
                                </Button>
                                <Button variant="outline" className="w-full h-12 font-bold border-gray-300">
                                    <ShoppingCart className="w-4 h-4 mr-2" /> 장바구니 담기
                                </Button>
                            </div>
                        </div>

                        {/* Mini Banner */}
                        <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3 text-xs text-gray-500">
                            <ShieldCheck className="w-8 h-8 text-gray-400" />
                            <p>에듀윌은 평생 환급반 수강생의<br /><strong>100% 합격을 보장</strong>합니다.</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. Sticky Bottom Action Bar (Floating) */}
            <div className={cn(
                "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-4 px-6 z-40 transition-transform duration-300 lg:hidden",
                isStickyVisible ? "translate-y-0" : "translate-y-full"
            )}>
                <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">총 결제금액</span>
                        <span className="text-xl font-black text-gray-900">{finalPrice.toLocaleString()}원</span>
                    </div>
                    <Button className="flex-1 max-w-sm h-12 bg-[#FFBE00] hover:bg-[#E5AB00] text-black font-bold">
                        구매하기
                    </Button>
                </div>
            </div>

        </div>
    )
}

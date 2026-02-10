import React, { useState } from "react"
import { Ticket, Gift, Sparkles, MessageCircle, Send, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pagination } from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

// --- Mock Data ---
const MOCK_COMMENTS = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    user: `eduw***${Math.floor(Math.random() * 100)}`,
    content: [
        "올해는 꼭 합격해서 부모님께 효도하고 싶어요! 에듀윌과 함께라면 가능할 것 같습니다.",
        "직장인 수험생입니다. 퇴근 후 공부가 힘들지만, 환급반 덕분에 동기부여 제대로 됩니다. 화이팅!",
        "교수님 강의가 너무 재미있어서 시간가는 줄 모르고 듣고 있습니다. 이번 시험 무조건 합격!",
        "재수생입니다. 작년엔 아깝게 떨어졌지만 올해는 에듀윌로 확실하게 끝내겠습니다.",
        "육아맘 도전합니다. 아이에게 자랑스러운 엄마가 되고 싶어요."
    ][i % 5],
    date: `2026.02.${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
}))

export function EventPage() {
    // --- State ---
    const [isCouponIssued, setIsCouponIssued] = useState(false)
    const [isFlying, setIsFlying] = useState(false)
    const [isJiggling, setIsJiggling] = useState(false)
    const [comment, setComment] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    // --- Pagination Logic ---
    const itemsPerPage = 5
    const totalItems = MOCK_COMMENTS.length
    const currentComments = MOCK_COMMENTS.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // --- Handlers ---
    const handleIssueCoupon = () => {
        if (isCouponIssued || isFlying || isJiggling) return

        // Step 1: Jiggle
        setIsJiggling(true)

        setTimeout(() => {
            setIsJiggling(false)
            // Step 2: Fly
            setIsFlying(true)

            setTimeout(() => {
                setIsCouponIssued(true)
                setIsFlying(false)
            }, 1000) // Match animation duration in css
        }, 500)
    }

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!comment.trim()) return
        alert("합격 다짐이 등록되었습니다! (데모)")
        setComment("")
        setCurrentPage(1)
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">

            {/* 1. Hero Banner */}
            <section className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-[#FFBE00] to-orange-500 pt-20 pb-24 px-4 text-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-6 transition-all duration-700 ease-out transform translate-y-0 opacity-100">
                    <Badge className="bg-white/20 text-white border-white/40 backdrop-blur-md px-4 py-1 text-base mb-4">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-200" />
                        신규회원 특별 혜택
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-xl">
                        합격은 <span className="text-yellow-100 relative inline-block">
                            에듀윌
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-white opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-bold whitespace-pre-line">
                        지금 시작하면 3만원 할인 쿠폰 즉시 지급!{"\n"}
                        여러분의 합격을 진심으로 응원합니다.
                    </p>
                </div>

                {/* Decorative floating elements with simple pulse animations */}
                <div className="absolute top-10 left-10 md:left-32 opacity-20 md:opacity-40 animate-bounce" style={{ animationDuration: '3s' }}>
                    <Ticket className="w-24 h-24 text-white" />
                </div>
                <div className="absolute bottom-10 right-10 md:right-32 opacity-20 md:opacity-40 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <Gift className="w-32 h-32 text-white" />
                </div>
            </section>

            {/* 2. Interactive Coupon Section */}
            <div className="max-w-4xl mx-auto -mt-16 px-4 relative z-20">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 text-center border-4 border-white ring-1 ring-gray-100">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">웰컴 쿠폰팩</h2>
                        <p className="text-gray-500">지금 다운로드하고 바로 사용하세요!</p>
                    </div>

                    <div className="relative flex justify-center py-8">
                        {/* Flying Animation Div */}
                        {isFlying && (
                            <div className="absolute z-50 pointer-events-none animate-eduwill-fly">
                                <div className="bg-[#FFBE00] w-64 h-32 rounded-2xl shadow-xl flex items-center justify-center border-2 border-dashed border-white/50">
                                    <span className="text-white font-bold text-xl">30,000원</span>
                                </div>
                            </div>
                        )}

                        {/* Static Coupon Card */}
                        <div
                            className={cn(
                                "relative w-full max-w-md bg-gradient-to-r from-[#FFF9E5] to-white border-2 border-[#FFBE00] border-dashed rounded-2xl p-6 md:p-8 shadow-lg overflow-hidden transition-all duration-300 transform",
                                isJiggling && "animate-eduwill-jiggle",
                                isCouponIssued && "opacity-50 grayscale scale-95",
                                !isCouponIssued && !isJiggling && "hover:scale-105 hover:-rotate-1"
                            )}
                        >
                            {/* Watermark */}
                            <div className="absolute -right-4 -bottom-4 opacity-10 font-black text-6xl text-[#FFBE00] transform -rotate-12 select-none">
                                EDUWILL
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                <div className="bg-[#FFBE00] p-4 rounded-full shadow-inner">
                                    <Gift className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="text-sm text-[#FFBE00] font-bold mb-1">신규회원 전용</div>
                                    <h3 className="text-3xl font-black text-gray-900 mb-1">30,000원</h3>
                                    <p className="text-gray-400 text-xs">전 강의 적용 가능 | 발급일로부터 7일간 유효</p>
                                </div>
                            </div>

                            {/* Stamp */}
                            {isCouponIssued && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-red-500 rounded-lg p-2 text-red-500 font-black text-2xl uppercase opacity-80 rotate-12 animate-eduwill-stamp">
                                    ISSUED
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <Button
                            size="lg"
                            className={cn(
                                "h-14 px-12 text-lg font-bold rounded-full transition-all shadow-lg transform",
                                isCouponIssued
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-[#FFBE00] text-black hover:bg-[#E5AB00] hover:-translate-y-1 hover:shadow-xl"
                            )}
                            onClick={handleIssueCoupon}
                            disabled={isCouponIssued || isFlying || isJiggling}
                        >
                            {isJiggling ? (
                                "준비 중..."
                            ) : isFlying ? (
                                "지급 중..."
                            ) : isCouponIssued ? (
                                <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5" /> 발급 완료</span>
                            ) : (
                                "쿠폰 한 번에 받기"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* 3. Comment Event Section */}
            <section className="max-w-4xl mx-auto mt-20 px-4">
                <div className="text-center mb-10">
                    <span className="text-[#FFBE00] font-bold tracking-widest text-sm uppercase">Community Event</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-2">에듀윌과 함께하는 합격 다짐</h2>
                    <p className="text-gray-500 mt-2">여러분의 다짐을 남겨주세요. 매주 추첨을 통해 선물을 드립니다.</p>
                </div>

                {/* Comment Form */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-10">
                    <form onSubmit={handleCommentSubmit} className="relative">
                        <textarea
                            className="w-full h-32 p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFBE00] resize-none transition-shadow"
                            placeholder="합격을 위한 나의 다짐을 적어주세요! (최대 100자)"
                            maxLength={100}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <div className="flex items-center justify-between mt-3 px-1">
                            <span className="text-xs text-gray-400 font-medium">
                                <span className={cn(comment.length === 100 ? "text-red-500" : "text-gray-900")}>{comment.length}</span>
                                / 100
                            </span>
                            <Button type="submit" variant="primary" className="bg-black hover:bg-gray-800 text-white rounded-lg px-6">
                                등록하기 <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Comment List */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
                        <MessageCircle className="w-5 h-5 text-[#FFBE00]" />
                        <span>전체 댓글 <span className="text-[#FFBE00]">{MOCK_COMMENTS.length}</span>개</span>
                    </div>

                    <div className="space-y-3 min-h-[400px]">
                        <div key={currentPage} className="space-y-3 animate-eduwill-fade-slide">
                            {currentComments.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Users className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <span className="font-bold text-gray-900 text-sm">{item.user}</span>
                                            <Badge variant="outline" className="text-[10px] text-gray-400 border-gray-200 font-normal">수험생</Badge>
                                        </div>
                                        <span className="text-xs text-gray-400">{item.date}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed pl-10">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="pt-8">
                        <Pagination
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={(page) => {
                                window.scrollTo({ top: 800, behavior: 'smooth' })
                                setCurrentPage(page)
                            }}
                        />
                    </div>
                </div>

            </section>
        </div>
    )
}

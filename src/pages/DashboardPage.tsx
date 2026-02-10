import * as React from "react"
import { AnnouncementBanner } from "../components/ui/announcement-banner"
import { TimeTracker } from "../components/ui/time-tracker"
import { LearningProgress } from "../components/ui/learning-progress"
import { CourseCard } from "../components/ui/course-card"
import { StatusTag } from "../components/ui/status-tag"
import { Button } from "../components/ui/button"
import { ChevronRight, Calculator, CalendarDays } from "lucide-react"

interface DashboardPageProps {
    onViewChange?: (view: string) => void
}

export function DashboardPage({ onViewChange }: DashboardPageProps) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-8 space-y-8 animate-eduwill-fade-up">
            {/* Header 섹션 - 페이지 제목 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 border-l-4 border-[#FFBE00] pl-4">나의 수강 레이더</h1>
                    <p className="text-gray-500 mt-1 pl-4">오늘도 합격을 향해 한 걸음 더 나아가세요!</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-full h-9 gap-2">
                        <CalendarDays className="w-4 h-4" /> 학습 리포트
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full h-9 gap-2">
                        <Calculator className="w-4 h-4" /> 성적 분석
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (8 cols) */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Announcement */}
                    <AnnouncementBanner
                        message="[안내] 2026 공인중개사 시험 일정 및 유의사항 안내"
                        onClose={() => { }}
                    />

                    {/* Learning Status Recap */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Goal</span>
                            <div className="flex items-end justify-between mt-2">
                                <span className="text-2xl font-black text-gray-900">4 / 5</span>
                                <span className="text-xs text-[#FFBE00] font-bold">80%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
                                <div className="h-full bg-[#FFBE00] rounded-full" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Study Time</span>
                            <div className="mt-2">
                                <TimeTracker hours={2} minutes={15} seconds={40} />
                            </div>
                        </div>
                        <div className="bg-[#1D1D1F] p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
                            <span className="text-xs font-bold text-gray-200 opacity-60 uppercase tracking-wider">Level Up</span>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-2xl font-black text-white">S+</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-1 h-3 bg-[#FFBE00] rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">상위 5% 학습 진도 달성 중!</p>
                        </div>
                    </div>

                    {/* Course List Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                최근 수강 강의
                                <span className="text-sm font-normal text-gray-400">3개</span>
                            </h2>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#FFBE00] gap-1">
                                전체보기 <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <CourseCard
                                title="2026 공인중개사 1차 부동산학개론"
                                instructor="이영방"
                                thumbnail="//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg"
                                progress={45}
                                status="running"
                                tags={["공인중개사", "1차"]}
                                onClick={() => onViewChange?.("player")}
                            />
                            <CourseCard
                                title="2026 주택관리사 회계원리 (기초입문)"
                                instructor="윤난"
                                thumbnail="//img.eduwill.net/Img2/teacherPage/imgTemp/20230530142433166.png"
                                progress={0}
                                status="paid"
                                tags={["주택관리사", "입문"]}
                                onClick={() => onViewChange?.("player")}
                            />
                            <CourseCard
                                title="2026 에듀윌 합격패스 사회복지사 1급"
                                instructor="손용근"
                                thumbnail="//img.eduwill.net/Img2/teacherPage/imgTemp/20230530142433166.png"
                                progress={12}
                                status="running"
                                tags={["사회복지사", "자격증"]}
                                onClick={() => onViewChange?.("player")}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column (4 cols) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Learning Progress Recap */}
                    <LearningProgress
                        value={35}
                        showLabel={true}
                    />

                    {/* Quick Tools & Badges */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900 border-b pb-4">학습 편의 도구</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 group cursor-pointer transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <Calculator className="w-5 h-5 text-gray-400 group-hover:text-[#FFBE00]" />
                                </div>
                                <span className="text-xs font-bold mt-2 text-gray-600">D-Day</span>
                            </div>
                            <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 hover:bg-yellow-50 group cursor-pointer transition-colors">
                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-5 h-5 text-gray-400 group-hover:text-[#FFBE00]" />
                                </div>
                                <span className="text-xs font-bold mt-2 text-gray-600">학습상담</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-2">최근 획득 배지</h4>
                            <div className="flex gap-2">
                                <StatusTag status="running">7일 연속 출석</StatusTag>
                                <StatusTag status="running">퀴즈 100점</StatusTag>
                            </div>
                        </div>
                    </div>

                    {/* Helpful Tip */}
                    <div className="bg-gradient-to-br from-[#FFBE00] to-[#FFAA00] p-6 rounded-3xl shadow-sm text-black relative overflow-hidden group">
                        <div className="relative z-10">
                            <div className="font-black text-lg">💡 합격 꿀팁!</div>
                            <p className="text-sm mt-1 opacity-90 leading-snug">
                                부동산학개론은 기초 용어 정리가 전체 점수의 70%를 결정합니다. 용어집을 수시로 확인하세요!
                            </p>
                            <Button variant="ghost" size="sm" className="mt-4 bg-black/10 hover:bg-black/20 text-black font-bold h-8 rounded-full border-none px-4">
                                용어집 보기
                            </Button>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import * as React from "react"
import { VideoController } from "../components/ui/video-controller"
import { CurriculumList } from "../components/ui/curriculum-list"
import { QnAThread } from "../components/ui/qna-thread"
import { AnnouncementBanner } from "../components/ui/announcement-banner"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { ChevronLeft, Info, FileText, Download, Star } from "lucide-react"

interface LearningPlayerPageProps {
    onExit?: () => void
}

export function LearningPlayerPage({ onExit }: LearningPlayerPageProps) {
    const [isPlaying, setIsPlaying] = React.useState(false)

    // Mock Data
    const currentLectureTitle = "3강. 토지의 특성 (자연적 특성 vs 인문적 특성)"
    const instructor = "이영방 교수"
    const curriculum = [
        {
            weekTitle: "1주차: 부동산학개론 기초",
            lectures: [
                { id: "1-1", title: "1강. 부동산학의 이해 (OT)", duration: "45:00", isCompleted: true },
                { id: "1-2", title: "2강. 부동산의 개념과 분류", duration: "50:00", isCompleted: true },
                { id: "1-3", title: "3강. 토지의 특성", duration: "48:00", isCompleted: false, isCurrent: true }, // Current
                { id: "1-4", title: "4강. 부동산의 수요와 공급", duration: "45:00", isCompleted: false, isLocked: true },
            ]
        },
        {
            weekTitle: "2주차: 수요와 공급 이론",
            lectures: [
                { id: "2-1", title: "5강. 수요의 결정요인", duration: "50:00", isCompleted: false, isLocked: true },
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
            {/* Dark Header for Player Mode */}
            <header className="h-14 bg-gray-900 text-white flex items-center justify-between px-4 sticky top-0 z-50 shadow-md">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        className="text-gray-300 hover:text-white px-2"
                        onClick={onExit} // Use the onExit prop
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" /> 나가기
                    </Button>
                    <div className="h-4 w-px bg-gray-700 mx-2"></div>
                    <h1 className="text-sm md:text-base font-medium truncate max-w-[200px] md:max-w-md">2026 공인중개사 1차 부동산학개론 (기본이론)</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-yellow-500 text-black border-none hover:bg-yellow-400">진도율 45%</Badge>
                </div>
            </header>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-3.5rem)]">
                {/* Main Content (Left: Video & Details) - Scrollable */}
                <div className="flex-1 overflow-y-auto bg-white">
                    {/* Video Area (Sticky-ish feel in layout) */}
                    <div className="aspect-video bg-black relative w-full group">
                        <video
                            className="w-full h-full object-contain"
                            src="https://pmp.eduwill.net/eduwillpmp/eduwill/flv/sample/2025/L/LPL-SJW-SAMPLE.mp4"
                            controls
                        />

                        {/* Controller Overlay (Design Only) - Hidden when using native controls to prevent confusion, 
                        or we could wire it up later. For now, native controls are better for the actual video sample. */}
                        {/* <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-20 px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <VideoController 
                           isPlaying={isPlaying}
                           onPlayPause={() => setIsPlaying(!isPlaying)}
                           progress={35}
                           currentTime="16:48"
                           duration="48:00"
                           className="text-white pointer-events-auto"
                        />
                    </div> */}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
                        {/* Lecture Info */}
                        <div className="space-y-4 border-b border-gray-100 pb-8">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentLectureTitle}</h2>
                                    <p className="text-gray-500 font-medium">{instructor}</p>
                                </div>
                                <Button variant="outline" className="gap-2">
                                    <Download className="w-4 h-4" /> 자료 다운로드
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600">이론강의</Badge>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600">스튜디오 고화질</Badge>
                            </div>
                        </div>

                        {/* Q&A Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    질의응답 <span className="text-[#FFBE00]">12</span>
                                </h3>
                                <Button size="sm">질문하기</Button>
                            </div>

                            <QnAThread
                                posts={[
                                    {
                                        id: "q1",
                                        type: "question",
                                        author: "합격가자",
                                        date: "2026.02.05",
                                        status: "answered",
                                        content: "부동성 특성 때문에 임장활동이 필요하다는 부분이 잘 이해가 안 갑니다. 조금 더 쉽게 설명 부탁드려요!"
                                    },
                                    {
                                        id: "a1",
                                        type: "answer",
                                        author: "이영방 교수",
                                        date: "2026.02.05",
                                        content: "네, 부동성은 '움직이지 않는 성질'입니다. \n부동산은 우리가 마트에 가서 물건을 고르듯 가져올 수 없기 때문에, 직접 현장(임장)에 가서 눈으로 확인해야 한다는 뜻입니다. 중요한 포인트이니 꼭 기억해두세요!"
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right: Curriculum) - Fixed width, sticky/scrollable independently */}
                <div className="w-full lg:w-96 bg-gray-50 border-l border-gray-200 flex flex-col h-full shrink-0">
                    {/* Sidebar Header */}
                    <div className="p-4 bg-white border-b border-gray-200 font-bold text-gray-900 flex justify-between items-center">
                        강의 목차
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Info className="w-4 h-4" /></Button>
                    </div>

                    {/* Announcement in Sidebar */}
                    <div className="p-4 pb-0">
                        <AnnouncementBanner variant="default" message="교재 정오표가 업데이트 되었습니다." className="mb-0 text-sm py-2 px-3" />
                    </div>

                    {/* Scrollable Curriculum List */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <CurriculumList curriculum={curriculum} />
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <Button variant="secondary" className="w-full justify-between group">
                            <span>다음 강의 바로가기</span>
                            <ChevronLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

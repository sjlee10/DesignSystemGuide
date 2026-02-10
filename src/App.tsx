import { useState, useEffect } from "react"
import { ComponentPreview } from "./components/ComponentPreview"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select } from "./components/ui/select"
import { Badge } from "./components/ui/badge"
import { Progress } from "./components/ui/progress"
import { CourseCard } from "./components/ui/course-card"
import { TimeTracker } from "./components/ui/time-tracker"
import { StatusTag } from "./components/ui/status-tag"
import { LearningProgress } from "./components/ui/learning-progress"
// removed unused imports
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { CurriculumList } from "./components/ui/curriculum-list"
import { VideoController } from "./components/ui/video-controller"
import { LMSSidebar } from "./components/ui/lms-sidebar"
import { QuestionItem } from "./components/ui/question-item"
import { OMRChecker } from "./components/ui/omr-checker"
import { ExamTimer } from "./components/ui/exam-timer"
import { AnnouncementBanner } from "./components/ui/announcement-banner"
import { QnAThread } from "./components/ui/qna-thread"
import { EmptyState } from "./components/ui/empty-state"
import { Search, Bell } from "lucide-react"

// Pages
import { DashboardPage } from "./pages/DashboardPage"
import { LearningPlayerPage } from "./pages/LearningPlayerPage"
import { ExamPage } from "./pages/ExamPage"
import { CourseRegistrationPage } from "./pages/CourseRegistrationPage"
import { CourseDetailPage } from "./pages/CourseDetailPage"
import { EventPage } from "./pages/EventPage"
import { CommunityPage } from "./pages/CommunityPage"
import { Pagination } from "./components/ui/pagination"
import { GNB } from "./layout/GNB"
import { Footer } from "./layout/Footer"
import { Breadcrumbs } from "./components/ui/breadcrumbs"
import { FloatingGuideButton } from "./components/ui/floating-guide-button"

function App() {
    // "guide" | "dashboard" | "player" | "exam" | "course-registration" | "course-detail" | "event"
    const [currentView, setCurrentView] = useState("dashboard")
    const [activeCategory, setActiveCategory] = useState("general")
    const [guidePage, setGuidePage] = useState(1)

    // Sub-view states
    const [courseTab, setCourseTab] = useState<"package" | "single">("package")
    const [communityTab, setCommunityTab] = useState<"notice" | "review" | "info">("notice")

    // Global States for Inter-page connections
    const [notifications, setNotifications] = useState(3)
    const [cartItems, setCartItems] = useState(0)
    const [isPageTransitioning, setIsPageTransitioning] = useState(false)

    // Handle View Change with Loading Bar Effect
    const handleViewChange = (view: string, params?: { tab?: string }) => {
        // Simple type guard or cast for tabs if needed, but for now trusting flow
        if (view === currentView && (!params?.tab)) return // simplified check

        setIsPageTransitioning(true)
        setTimeout(() => {
            setCurrentView(view)
            if (params?.tab) {
                if (view === "course-registration") setCourseTab(params.tab as any)
                if (view === "community") setCommunityTab(params.tab as any)
            }
            setIsPageTransitioning(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }, 500)
    }

    // Dynamic Breadcrumbs
    const getBreadcrumbs = () => {
        const base = [{ label: "내 강의실" }]
        switch (currentView) {
            case "dashboard": return base
            case "player": return [...base, { label: "2026 공인중개사" }, { label: "학습 플레이어" }]
            case "course-registration": return [{ label: "수강신청" }]
            case "course-detail": return [{ label: "수강신청" }, { label: "강의 상세" }]
            case "exam": return [{ label: "모의고사" }]
            case "event": return [{ label: "이벤트" }]
            case "community": return [{ label: "커뮤니티" }]
            case "guide": return [{ label: "시스템 가이드" }, { label: "컴포넌트" }]
            default: return base
        }
    }

    // Scroll to active category section
    useEffect(() => {
        if (currentView === "guide" && activeCategory) {
            const element = document.getElementById(activeCategory)
            if (element) {
                // Offset for sticky header (64px) + some breathing room
                const headerOffset = 80
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.scrollY - headerOffset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                })
            }
        }
    }, [activeCategory, currentView])

    const renderContent = () => {
        if (currentView === "dashboard") {
            return <DashboardPage onViewChange={handleViewChange} />
        }
        if (currentView === "player") {
            return <LearningPlayerPage />
        }
        if (currentView === "exam") {
            return <ExamPage />
        }
        if (currentView === "course-registration") {
            return <CourseRegistrationPage onViewChange={handleViewChange} defaultTab={courseTab} />
        }
        if (currentView === "course-detail") {
            return <CourseDetailPage />
        }
        if (currentView === "event") {
            return <EventPage />
        }
        if (currentView === "community") {
            return <CommunityPage defaultTab={communityTab} />
        }

        // Default: Guide
        return (
            <>
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-10 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4 w-96">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input placeholder="Search components..." className="pl-9 bg-gray-50 border-transparent focus:bg-white focus:border-gray-300" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Bell className="w-5 h-5 text-gray-500" />
                        </Button>
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold cursor-pointer hover:opacity-90">
                            S
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto space-y-12">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Design System</h1>
                                <p className="text-gray-500 text-lg">Eduwill LMS Style Guide & Component Library</p>
                            </div>
                        </div>
                    </div>


                    {/* Simplified for prototype: Rendering all sections as one scrollable page for now, 
                        Sidebar anchors will maintain old 'scroll to' behavior if I impl it, 
                        BUT user changed sidebar to be 'activeCategory'. 
                        Let's just show all for now or filter. 
                        To keep it simple and robust: Show ALL, Sidebar categories just inform user. */}

                    <section id="general" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">General</h2>

                        <ComponentPreview
                            title="Button"
                            description="Primary, secondary, and utility buttons."
                            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>`}
                        >
                            <div className="flex flex-wrap gap-4 items-center">
                                <Button variant="primary">Primary Button</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="danger">Danger</Button>
                                <Button variant="link">Link Button</Button>
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Badges"
                            description="Status indicators for course states."
                            code={`<Badge>New</Badge>
<Badge variant="secondary">Ongoing</Badge>
<Badge variant="destructive">Expired</Badge>
<Badge variant="success">Completed</Badge>`}
                        >
                            <div className="flex gap-2">
                                <Badge>수강신청</Badge>
                                <Badge variant="secondary">수강중</Badge>
                                <Badge variant="outline">대기중</Badge>
                                <Badge variant="destructive">수강종료</Badge>
                                <Badge variant="success">수강완료</Badge>
                            </div>
                        </ComponentPreview>
                    </section>


                    <section id="data-entry" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Data Entry</h2>

                        <ComponentPreview
                            title="Input"
                            description="Standard form inputs."
                            code={`<Input placeholder="Enter your email..." />`}
                        >
                            <div className="w-full max-w-sm space-y-4">
                                <Input placeholder="이름을 입력하세요" />
                                <Input placeholder="이메일 주소" type="email" />
                                <Input disabled placeholder="Disabled input" />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Select"
                            description="Native select with custom styling."
                            code={`<Select><option>Option 1</option></Select>`}
                        >
                            <div className="w-full max-w-sm">
                                <Select>
                                    <option value="">과정을 선택하세요</option>
                                    <option value="1">공인중개사 기초</option>
                                    <option value="2">주택관리사 심화</option>
                                    <option value="3">전산세무회계</option>
                                </Select>
                            </div>
                        </ComponentPreview>
                    </section>

                    <section id="data-display" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Data Visualization (LMS)</h2>

                        <ComponentPreview
                            title="Time Tracker"
                            description="Real-time study timer typography."
                            code={`<TimeTracker hours={2} minutes={15} seconds={40} />`}
                        >
                            <TimeTracker hours={2} minutes={15} seconds={40} />
                        </ComponentPreview>

                        <ComponentPreview
                            title="Status Tags"
                            description="Semantic status indicators for courses."
                            code={`<StatusTag status="running" />
<StatusTag status="review" />
<StatusTag status="ended" />
<StatusTag status="paid" />`}
                        >
                            <div className="flex gap-2">
                                <StatusTag status="running" />
                                <StatusTag status="review" />
                                <StatusTag status="ended" />
                                <StatusTag status="paid" />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Learning Progress"
                            description="Line and Circle variants for progress tracking."
                            code={`<LearningProgress value={60} type="line" />
<LearningProgress value={75} type="circle" />`}
                        >
                            <div className="flex w-full gap-12 items-center justify-around px-8">
                                <div className="w-1/2 space-y-8">
                                    <LearningProgress value={45} type="line" />
                                    <LearningProgress value={100} type="line" />
                                </div>
                                <div className="flex gap-8">
                                    <LearningProgress value={75} type="circle" />
                                    <LearningProgress value={100} type="circle" />
                                </div>
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Course Card"
                            description="Interactive course card with hover effects."
                            code={`<CourseCard
  title="2026 공인중개사 1차 부동산학개론"
  instructor="이영방"
  progress={45}
  status="running"
  ...
/>`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                                <CourseCard
                                    title="2026 공인중개사 1차 부동산학개론"
                                    instructor="이영방"
                                    thumbnail="//img.eduwill.net/Img2/teacherPage/imgTemp/20240226171602087.jpg"
                                    progress={45}
                                    status="running"
                                    tags={["공인중개사", "1차"]}
                                />
                                <CourseCard
                                    title="2026 주택관리사 회계원리 (기초입문)"
                                    instructor="윤난"
                                    thumbnail="//img.eduwill.net/Img2/teacherPage/imgTemp/20230530142433166.png"
                                    progress={0}
                                    status="paid"
                                    tags={["주택관리사", "입문"]}
                                />
                            </div>
                        </ComponentPreview>
                    </section>

                    <section id="pagination" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Pagination</h2>
                        <ComponentPreview
                            title="Pagination"
                            description="Advanced navigation for long lists with active/hover states."
                            code={`<Pagination 
  totalItems={100} 
  itemsPerPage={10} 
  currentPage={page} 
  onPageChange={(p) => setPage(p)} 
/>`}
                        >
                            <div className="w-full flex flex-col items-center gap-4">
                                <Pagination
                                    totalItems={100}
                                    itemsPerPage={10}
                                    currentPage={guidePage}
                                    onPageChange={setGuidePage}
                                />
                                <p className="text-xs text-gray-400">Current active page: <span className="font-bold text-black">{guidePage}</span></p>
                            </div>
                        </ComponentPreview>
                    </section>

                    <section id="media-nav" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Media & Navigation (LMS)</h2>

                        <ComponentPreview
                            title="Video Controller"
                            description="Custom video player controls with speed and seek bar."
                            code={`<VideoController 
  isPlaying={true}
  progress={35}
  currentTime="12:45"
  duration="45:00"
/>`}
                        >
                            <div className="w-full max-w-2xl mx-auto">
                                <VideoController
                                    isPlaying={false}
                                    progress={35}
                                    currentTime="12:45"
                                    duration="45:00"
                                />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Curriculum Accordion"
                            description="Expandable lecture list with progress tracking."
                            code={`<CurriculumList curriculum={[...]} />`}
                        >
                            <div className="w-full max-w-xl mx-auto">
                                <CurriculumList
                                    curriculum={[
                                        {
                                            weekTitle: "1주차: 부동산학개론 기초",
                                            lectures: [
                                                { id: "1-1", title: "1강. 부동산학의 이해 (OT)", duration: "45:00", isCompleted: true },
                                                { id: "1-2", title: "2강. 부동산의 개념과 분류", duration: "50:00", isCompleted: true },
                                                { id: "1-3", title: "3강. 토지의 특성", duration: "48:00", isCompleted: false, isCurrent: true },
                                                { id: "1-4", title: "4강. 부동산의 수요와 공급", duration: "45:00", isCompleted: false, isLocked: true },
                                            ]
                                        },
                                        {
                                            weekTitle: "2주차: 수요와 공급 이론",
                                            lectures: [
                                                { id: "2-1", title: "5강. 수요의 결정요인", duration: "50:00", isCompleted: false, isLocked: true },
                                            ]
                                        }
                                    ]}
                                />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="LMS Sidebar"
                            description="Dedicated navigation for learning dashboard."
                            code={`<LMSSidebar activeMenu="my-classroom" />`}
                        >
                            <div className="h-[600px] border border-gray-100 rounded-xl overflow-hidden flex">
                                <LMSSidebar />
                                <div className="bg-gray-50 flex-1 p-8 flex items-center justify-center text-gray-400">
                                    Content Area Example
                                </div>
                            </div>
                        </ComponentPreview>
                    </section>

                    <section id="exam" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Exam & Assessment</h2>

                        <ComponentPreview
                            title="Exam Timer"
                            description="Countdown timer with alert state (turns red < 5 min)."
                            code={`<ExamTimer initialSeconds={600} />`}
                        >
                            <div className="w-full max-w-md">
                                <ExamTimer initialSeconds={310} />
                                <div className="h-4" />
                                <ExamTimer initialSeconds={20} className="border-red-200 bg-red-50" />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Question & OMR"
                            description="Full exam environment simulation."
                            code={`<div className="flex gap-4">
  <QuestionItem ... />
  <OMRChecker ... />
</div>`}
                        >
                            <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
                                <div className="flex-1 w-full">
                                    <QuestionItem
                                        questionId={14}
                                        points={5}
                                        questionText="다음 중 부동산의 특성에 대한 설명으로 틀린 것은?"
                                        options={[
                                            "부동성은 부동산 시장을 국지화시킨다.",
                                            "부증성은 지가상승의 원인이 된다.",
                                            "영속성은 소유이익과 사용이익을 분리시킨다.",
                                            "개별성은 일물일가의 법칙을 성립시킨다.",
                                            "인접성은 외부효과를 발생시킨다."
                                        ]}
                                        selectedOption={0}
                                    />
                                </div>
                                <div className="w-full lg:w-64 shrink-0">
                                    <OMRChecker
                                        totalQuestions={20}
                                        markedAnswers={{ 1: 0, 2: 3, 3: 1, 4: 4, 14: 0 }}
                                        currentQuestionId={14}
                                    />
                                </div>
                            </div>
                        </ComponentPreview>
                    </section>

                    <section id="community" className="space-y-8">
                        <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Community & Feedback</h2>

                        <ComponentPreview
                            title="Announcement Banner"
                            description="Sticky or inline banners for important notices."
                            code={`<AnnouncementBanner 
  variant="sticky" 
  message="[긴급] 서버 점검 안내 (02:00 ~ 04:00)" 
/>
<AnnouncementBanner 
  message="신규 강의가 업데이트되었습니다." 
  actionLabel="보러가기" 
/>`}
                        >
                            <div className="w-full space-y-4">
                                <AnnouncementBanner
                                    variant="sticky"
                                    message="🚨 [필독] 2026년도 공인중개사 시험 일정 발표 안내"
                                    actionLabel="공지사항 확인"
                                    onClose={() => alert("Close banner")}
                                />
                                <AnnouncementBanner
                                    message="💡 학습 질문을 남기면 담당 교수님이 24시간 내에 답변해 드립니다."
                                />
                            </div>
                        </ComponentPreview>

                        <ComponentPreview
                            title="Q&A Thread"
                            description="Threaded question and answer system."
                            code={`<QnAThread posts={[...]} />`}
                        >
                            <QnAThread
                                posts={[
                                    {
                                        id: "q1",
                                        type: "question",
                                        author: "김에듀",
                                        date: "2026.02.05",
                                        status: "answered",
                                        content: "교수님, 수요의 가격탄력성 부분에서 '완전비탄력적'일 때 그래프가 수직선이 되는 이유가 정확히 무엇인가요? 수식으로 설명해주실 수 있나요?"
                                    },
                                    {
                                        id: "a1",
                                        type: "answer",
                                        author: "이영방 교수",
                                        date: "2026.02.05",
                                        content: "반갑습니다, 김에듀님. \n\n완전비탄력적이라는 것은 탄력성이 0이라는 의미입니다. 즉, 가격(P)이 아무리 변해도 수요량(Q)이 변하지 않고 고정되어 있다는 뜻이죠.\n\n그래프 상에서 가로축이 수량(Q)이므로, 수량이 고정되면 세로축(가격)과 나란한 수직선 형태가 됩니다. 도움 되셨길 바랍니다 :)"
                                    }
                                ]}
                            />
                        </ComponentPreview>

                        <ComponentPreview
                            title="Empty State"
                            description="Placeholder for empty data states."
                            code={`<EmptyState 
  icon="folder" 
  title="수강 중인 강의가 없습니다." 
  description="나에게 맞는 강의를 찾아 학습을 시작해보세요!"
  actionLabel="전체 강의 보기"
/>`}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <EmptyState
                                    icon="folder"
                                    title="수강 중인 강의가 없습니다."
                                    description="나에게 맞는 강의를 찾아 학습을 시작해보세요!"
                                    actionLabel="전체 강의 보기"
                                />
                                <EmptyState
                                    icon="search"
                                    title="검색 결과가 없습니다."
                                    description="철자를 확인하거나 다른 검색어로 시도해보세요."
                                />
                            </div>
                        </ComponentPreview>
                    </section>
                </div>
            </>
        )
    }

    // Special Layout for Learning Player (Full Screen, No Global Nav)
    if (currentView === "player") {
        return <LearningPlayerPage onExit={() => handleViewChange("dashboard")} />
    }

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans relative">
            {/* Top Loading Bar */}
            {isPageTransitioning && (
                <div className="fixed top-0 left-0 h-1 bg-[#FFBE00] z-[999] animate-eduwill-progress shadow-[0_0_10px_rgba(255,190,0,0.5)]" />
            )}

            <GNB
                currentView={currentView}
                onViewChange={handleViewChange}
                notifications={notifications}
                cartItems={cartItems}
            />

            <div className="flex-1 flex flex-col pt-20">
                <Breadcrumbs items={getBreadcrumbs()} />

                <main className="flex-1">
                    {renderContent()}
                </main>
            </div>

            <Footer />
            {currentView !== "guide" && (
                <FloatingGuideButton onClick={() => handleViewChange("guide")} />
            )}
        </div>
    )
}

export default App

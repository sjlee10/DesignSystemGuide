import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ExamTimer } from "@/components/ui/exam-timer"
import { QuestionItem } from "@/components/ui/question-item"
import { OMRChecker } from "@/components/ui/omr-checker"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Data
const MOCK_QUESTIONS = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    text: `${i + 1}번 문제. 다음 중 부동산학의 성격에 해당하지 않는 것은? (임시 데이터)`,
    points: 2.5,
    options: [
        "종합과학",
        "응용과학",
        "사회과학",
        "순수과학", // 정답
        "구체적 경험과학"
    ],
    correctOption: 3
}))

export function ExamPage() {
    const [answers, setAnswers] = useState<Record<number, number>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [currentQuestionInView, setCurrentQuestionInView] = useState(1) // Track roughly which q is visible

    // Refs for scrolling
    const questionRefs = useRef<Record<number, HTMLDivElement | null>>({})
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    // Derived State
    const totalQuestions = MOCK_QUESTIONS.length
    const answeredCount = Object.keys(answers).length
    const progress = (answeredCount / totalQuestions) * 100

    // Handlers
    const handleSelectOption = (questionId: number, optionIndex: number) => {
        if (isSubmitted) return
        setAnswers(prev => ({ ...prev, [questionId]: optionIndex }))
    }

    const scrollToQuestion = (id: number) => {
        const element = questionRefs.current[id]
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" })
            setCurrentQuestionInView(id)
        }
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
        setShowConfirmModal(false)
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    // Determine unanswerd count for modal
    const unansweredCount = totalQuestions - answeredCount

    return (
        <div className="flex flex-col h-screen bg-gray-50 selection:bg-[#FFBE00]/30 font-sans">
            {/* 1. Sticky Header */}
            <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 px-6 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-900 text-lg">
                        <span className="text-[#FFBE00] mr-2">Eduwill</span>
                        제35회 공인중개사 1차 실전모의고사
                    </div>
                </div>

                <div className="flex items-center gap-8 flex-1 max-w-2xl justify-center">
                    <div className="flex items-center gap-3 w-full max-w-md">
                        <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                            진행률 {Math.round(progress)}%
                        </span>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <ExamTimer
                        initialSeconds={3000} // 50 min
                        className="bg-gray-50 border-transparent shadow-none"
                        onExit={() => setShowConfirmModal(true)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-gray-900">김에듀 수험생</div>
                        <div className="text-xs text-gray-500">12345678</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                        K
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* 2. Left: Questions List (Scrollable) */}
                <main
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto p-8 lg:p-12 scroll-smooth"
                >
                    <div className="max-w-3xl mx-auto space-y-16 pb-32">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3 text-blue-800 text-sm mb-8">
                            <AlertTriangle className="w-5 h-5 shrink-0" />
                            <div>
                                <h5 className="font-bold mb-1">시험 응시 안내</h5>
                                <p>
                                    실제 시험과 동일한 환경에서 진행됩니다. 답안을 체크하면 우측 OMR 카드에 실시간으로 반영됩니다.<br />
                                    시험 종료 5분 전부터 타이머가 붉은색으로 변경됩니다.
                                </p>
                            </div>
                        </div>

                        {MOCK_QUESTIONS.map((q) => (
                            <div
                                key={q.id}
                                ref={el => questionRefs.current[q.id] = el}
                                className="scroll-mt-32" // Offset for sticky header
                            >
                                <QuestionItem
                                    questionId={q.id}
                                    questionText={q.text}
                                    points={q.points}
                                    options={q.options}
                                    selectedOption={answers[q.id]}
                                    correctOption={q.correctOption}
                                    isSubmitted={isSubmitted}
                                    onSelectOption={(idx) => handleSelectOption(q.id, idx)}
                                    // Smooth navigation between questions
                                    onNext={() => scrollToQuestion(Math.min(q.id + 1, totalQuestions))}
                                    onPrev={() => scrollToQuestion(Math.max(q.id - 1, 1))}
                                />
                            </div>
                        ))}
                    </div>
                </main>

                {/* 3. Right: OMR Sider (Fixed) */}
                <aside className="w-[340px] border-l border-gray-200 bg-white shadow-xl lg:shadow-none z-40 hidden lg:flex flex-col">
                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        <div className="sticky top-0 bg-white pb-4 z-10">
                            <h3 className="font-bold text-gray-900 text-lg mb-1">답안 표기란</h3>
                            <p className="text-sm text-gray-500">문항 번호를 클릭하면 이동합니다.</p>
                        </div>

                        <OMRChecker
                            totalQuestions={totalQuestions}
                            markedAnswers={answers}
                            currentQuestionId={currentQuestionInView} // Need to implement scroll spy for this to be accurate, simplified for now
                            onQuestionClick={scrollToQuestion}
                            className="border-none shadow-none p-0"
                        />
                    </div>

                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <Button
                            className="w-full h-12 text-lg font-bold shadow-lg"
                            variant={isSubmitted ? "secondary" : "primary"}
                            onClick={() => !isSubmitted && setShowConfirmModal(true)}
                            disabled={isSubmitted}
                        >
                            {isSubmitted ? "제출 완료" : "답안 제출하기"}
                        </Button>
                    </div>
                </aside>
            </div>

            {/* Submission Safety Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl scale-100 transform transition-all">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-8 h-8 text-[#FFBE00]" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900">답안을 제출하시겠습니까?</h2>

                            <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">총 문항</span>
                                    <span className="font-bold text-gray-900">{totalQuestions}문항</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">마킹 문항</span>
                                    <span className="font-bold text-blue-600">{answeredCount}문항</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">미마킹 문항</span>
                                    <span className="font-bold text-red-500">{unansweredCount}문항</span>
                                </div>
                            </div>

                            {unansweredCount > 0 && (
                                <p className="text-red-500 text-sm font-medium">
                                    ※ 마킹하지 않은 문항이 있습니다. 정말 제출하시겠습니까?
                                </p>
                            )}

                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1 h-12"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    계속 풀기
                                </Button>
                                <Button
                                    className="flex-1 h-12 bg-[#FFBE00] hover:bg-[#E5AB00] text-white border-none"
                                    onClick={handleSubmit}
                                >
                                    제출하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

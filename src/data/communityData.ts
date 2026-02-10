export type BoardType = "notice" | "review" | "info"

export interface Post {
    id: number
    type: BoardType
    subject?: string // For filtering (e.g., "민법", "학개론")
    title: string
    content: string
    author: string
    date: string
    views: number
    isImportant?: boolean // For notices
    rating?: number // For reviews
    hasPhoto?: boolean // For reviews
    isPasser?: boolean // For reviews (Certified Passer)
    images?: string[] // For reviews/details
    dDay?: string // For exam info (e.g., "D-30")
    hasAttachment?: boolean // For exam info
}

export const communityData: Post[] = [
    // Notices
    {
        id: 1,
        type: "notice",
        title: "[필독] 2026년 공인중개사 시험 일정 및 접수 안내",
        content: `
            <p>안녕하세요. 에듀윌입니다.</p>
            <p>2026년 제37회 공인중개사 자격시험 일정이 발표되었습니다.</p>
            <br/>
            <p><strong>1. 시험 일정</strong></p>
            <p>- 1차 접수: 2026.08.10 ~ 2026.08.14</p>
            <p>- 시험일: 2026.10.31 (토)</p>
            <br/>
            <p>수험생 여러분의 합격을 응원합니다.</p>
        `,
        author: "에듀윌",
        date: "2026.02.01",
        views: 12500,
        isImportant: true
    },
    {
        id: 2,
        type: "notice",
        title: "[긴급] 서버 점검 안내 (02/10 02:00 ~ 04:00)",
        content: "서버 안정화를 위한 정기 점검이 진행될 예정입니다.",
        author: "운영자",
        date: "2026.02.08",
        views: 3400,
        isImportant: true
    },
    {
        id: 3,
        type: "notice",
        subject: "민법",
        title: "3월 민법 심화강의 교재 정오표 안내",
        content: "35페이지 12번째 줄 오타 수정 사항입니다.",
        author: "민법교수진",
        date: "2026.02.05",
        views: 856
    },
    {
        id: 4,
        type: "notice",
        subject: "학개론",
        title: "부동산학개론 계산문제 특강 자료 업로드",
        content: "첨부파일을 확인해주세요.",
        author: "이영방 교수팀",
        date: "2026.02.03",
        views: 1102
    },

    // Reviews
    {
        id: 11,
        type: "review",
        subject: "전체",
        title: "직장인 6개월 동차 합격 수기 (공부법 공유)",
        content: "퇴근 후 하루 4시간씩 꾸준히 공부했습니다. 에듀윌 커리큘럼만 따라가면 됩니다!",
        author: "박*수",
        date: "2026.01.20",
        views: 5420,
        rating: 5,
        hasPhoto: true,
        isPasser: true,
        images: [
            "https://img.eduwill.net/eduwill/img/2021/L/common/210218/thumb_interview17.png"
        ]
    },
    {
        id: 12,
        type: "review",
        subject: "민법",
        title: "심정욱 교수님 강의 듣고 민법 85점 받았습니다!",
        content: "판례 설명이 너무 명쾌해서 이해하기 쉬웠어요.",
        author: "김*영",
        date: "2026.02.02",
        views: 1200,
        rating: 5,
        isPasser: true
    },
    {
        id: 13,
        type: "review",
        subject: "공법",
        title: "공포의 공법, 체계도로 극복했습니다.",
        content: "체계도 특강이 신의 한 수였습니다.",
        author: "이*민",
        date: "2026.01.28",
        views: 2300,
        rating: 4,
        hasPhoto: true,
        images: ["https://img.eduwill.net/eduwill/img/2021/L/common/210218/thumb_interview19.png"]
    },
    {
        id: 14,
        type: "review",
        subject: "학개론",
        title: "계산문제 포기하지 마세요.",
        content: "공식만 외우면 풀 수 있는 문제가 많습니다.",
        author: "최*진",
        date: "2026.02.06",
        views: 800,
        rating: 5
    },

    // Exam Info
    {
        id: 21,
        type: "info",
        title: "제36회 공인중개사 기출문제 모음집 (PDF)",
        content: "작년 기출문제와 해설집입니다.",
        author: "에듀윌",
        date: "2025.12.01",
        views: 15600,
        hasAttachment: true
    },
    {
        id: 22,
        type: "info",
        title: "2026 시험 대비 필수 암기장 배포",
        content: "핸드북 사이즈로 제작된 암기장입니다.",
        author: "학습지원센터",
        date: "2026.01.15",
        views: 8900,
        dDay: "D-265",
        hasAttachment: true
    },
    {
        id: 23,
        type: "info",
        title: "자격증 발급 절차 및 주의사항 안내",
        content: "합격자 발표 후 자격증 신청 방법입니다.",
        author: "자격증팀",
        date: "2025.11.30",
        views: 3200
    }
]

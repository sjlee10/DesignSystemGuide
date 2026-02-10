import { BoardTemplate } from "@/components/community/BoardTemplate"
import { BoardType } from "@/data/communityData"

interface CommunityPageProps {
    defaultTab?: BoardType
}

export function CommunityPage({ defaultTab }: CommunityPageProps) {
    return (
        <div className="w-full bg-[#F8F9FA] py-10">
            <BoardTemplate defaultTab={defaultTab} />
        </div>
    )
}

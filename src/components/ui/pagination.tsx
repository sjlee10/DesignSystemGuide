import * as React from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
    className?: string
}

export function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    className
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    // Helper to generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages)
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
            }
        }
        return pages
    }

    return (
        <div className={cn("flex items-center justify-center gap-1 md:gap-2", className)}>
            {/* First Page */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className="h-8 w-8 md:h-10 md:w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100"
            >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
            </Button>

            {/* Previous Page */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 md:h-10 md:w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 mr-2"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
            </Button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === "..." ? (
                        <span className="px-2 text-gray-400 select-none">...</span>
                    ) : (
                        <Button
                            variant={currentPage === page ? "primary" : "ghost"}
                            size="icon"
                            onClick={() => typeof page === "number" && onPageChange(page)}
                            className={cn(
                                "h-8 w-8 md:h-10 md:w-10 font-medium transition-all duration-200",
                                currentPage === page
                                    ? "bg-[#FFBE00] text-black hover:bg-[#E5AB00] font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    : "text-gray-600 hover:bg-[#FFF9E5] hover:text-[#FFBE00]"
                            )}
                        >
                            {page}
                        </Button>
                    )}
                </React.Fragment>
            ))}

            {/* Next Page */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 md:h-10 md:w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100 ml-2"
            >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
            </Button>

            {/* Last Page */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 md:h-10 md:w-10 text-gray-400 hover:text-gray-900 hover:bg-gray-100"
            >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
            </Button>
        </div>
    )
}

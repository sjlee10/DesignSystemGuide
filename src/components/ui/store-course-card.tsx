import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { ShoppingCart, Star, Trophy, ArrowRight } from "lucide-react"

interface StoreCourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    instructor: string
    thumbnail: string
    originalPrice: number
    price: number
    tags?: string[]
    isBestSeller?: boolean
    rating?: number
    reviewCount?: number
    isInCart?: boolean
    onToggleCart?: () => void
    onPreview?: () => void
    onClick?: () => void
}

export function StoreCourseCard({
    className,
    title,
    instructor,
    thumbnail,
    originalPrice,
    price,
    tags,
    isBestSeller,
    rating = 5.0,
    reviewCount = 0,
    isInCart,
    onToggleCart,
    onPreview,
    onClick,
    ...props
}: StoreCourseCardProps) {
    const discountRate = Math.round(((originalPrice - price) / originalPrice) * 100)

    return (
        <Card
            className={cn(
                "group overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-200 flex flex-col h-full cursor-pointer",
                className
            )}
            onClick={onClick}
            {...props}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {isBestSeller && (
                        <Badge className="bg-black text-white border-none shadow-md mb-1 flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-[#FFBE00]" />
                            Best Seller
                        </Badge>
                    )}
                </div>

                {/* Hover Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="rounded-full font-bold"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPreview?.();
                            }}
                        >
                            무료 맛보기
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-[#FFBE00] text-gray-900 hover:bg-[#FFAA00] rounded-full font-bold gap-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.();
                            }}
                        >
                            상세보기 <ArrowRight className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-5 flex-1 flex flex-col">
                <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 text-[10px] px-1.5 py-0">
                        {instructor} 교수
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                        <Star className="w-3 h-3 text-[#FFBE00] fill-[#FFBE00]" />
                        {rating} ({reviewCount})
                    </div>
                </div>

                <h3 className="font-bold text-lg leading-snug text-gray-900 group-hover:text-[#FFBE00] transition-colors line-clamp-2 mb-3">
                    {title}
                </h3>

                {tags && (
                    <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </CardContent>

            {/* Footer: Price & Action */}
            <CardFooter className="p-5 pt-0 mt-auto border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <div>
                    <div className="text-xs text-gray-400 line-through">
                        {originalPrice.toLocaleString()}원
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg font-bold text-red-500">{discountRate}%</span>
                        <span className="text-xl font-extrabold text-gray-900">
                            {price.toLocaleString()}
                            <span className="text-sm font-normal text-gray-500 ml-0.5">원</span>
                        </span>
                    </div>
                </div>

                <Button
                    size="icon"
                    className={cn(
                        "rounded-full w-10 h-10 shadow-sm transition-all animate-eduwill-click",
                        isInCart
                            ? "bg-[#FFBE00] text-white border-[#FFBE00] shadow-yellow-200/50 scale-110"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleCart?.();
                    }}
                >
                    <ShoppingCart className={cn("w-4 h-4", isInCart && "fill-current")} />
                </Button>
            </CardFooter>
        </Card>
    )
}

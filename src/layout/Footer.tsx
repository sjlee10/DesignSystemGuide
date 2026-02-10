import React from "react"

export function Footer() {
    return (
        <footer className="bg-[#2a2a2a] text-[#999] text-[13px] leading-[1.6] py-10 border-t border-[#333]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Foot Top: Links */}
                <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 border-b border-[#444] pb-8">
                    <a href="#" className="hover:text-white transition-colors">소개</a>
                    <a href="#" className="hover:text-white transition-colors">이용약관</a>
                    <a href="#" className="font-bold text-white hover:text-[#FFBE00] transition-colors">개인정보처리방침</a>
                    <a href="#" className="hover:text-white transition-colors">환불규정</a>
                    <a href="#" className="hover:text-white transition-colors">찾아오시는 길</a>
                </div>

                {/* Foot Bottom: Company Info */}
                <div className="space-y-4">
                    <div>
                        <span className="text-white font-bold mr-2">(주)에듀윌</span>
                        <span className="mx-2">|</span>
                        <span>대표 : 양형남</span>
                        <br />
                        <span>사업자등록번호 : 119-81-54852</span>
                    </div>

                    <div>
                        <span>주소 : (08390) 서울특별시 구로구 디지털로 26길 61 (구로동) 에듀윌 스퀘어빌딩</span>
                        <span className="mx-2">/</span>
                        <span>개인정보관리책임자 : 황영식</span>
                        <br />
                        <span>전화번호 : 1600-6700</span>
                        <span className="mx-2">|</span>
                        <span>전자우편 : cs@eduwill.net</span>
                    </div>

                    <div className="pt-4 text-[#777]">
                        Copyright (c) (주)에듀윌 All Rights Reserved.
                    </div>


                </div>
            </div>
        </footer>
    )
}

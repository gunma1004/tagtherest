"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isHealingOpen, setIsHealingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 서울, 경기, 인천 수도권 지역 중심 (축약형 적용)
  const regionList = [
    { name: "📍 서울 지역", href: `/seoul/${encodeURIComponent("서울")}` },
    { name: "📍 경기 지역", href: `/gyeonggi/${encodeURIComponent("경기")}` },
    { name: "📍 인천 지역", href: `/incheon/${encodeURIComponent("인천")}` },
  ];

  // 웰니스 테라피 전용 빠른 이동 리스트 (수도권 대상)
  const healingRegionList = [
    { name: "✨ 서울 웰니스 휴식처", href: `/healing/seoul/${encodeURIComponent("서울")}` },
    { name: "✨ 경기 웰니스 휴식처", href: `/healing/gyeonggi/${encodeURIComponent("경기")}` },
    { name: "✨ 인천 웰니스 휴식처", href: `/healing/incheon/${encodeURIComponent("인천")}` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 (태그더레스트) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-black text-sm shadow border border-amber-300">
            태그
          </div>
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            태그더레스트
          </span>
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            서비스
          </Link>
          <Link href="/prices" className="hover:text-amber-400 transition-colors">
            가격안내
          </Link>

          {/* 기본 지역안내 드롭다운 */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300">
              지역안내
              <span className="text-[10px] text-amber-400">▼</span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-full left-0 w-40 bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs z-50">
                {regionList.map((r, idx) => (
                  <Link 
                    key={idx} 
                    href={r.href} 
                    className="block px-4 py-1.5 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                  >
                    {r.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 웰니스 테라피 안내 드롭다운 */}
          <div 
            className="relative cursor-pointer py-2"
            onMouseEnter={() => setIsHealingOpen(true)}
            onMouseLeave={() => setIsHealingOpen(false)}
          >
            <button className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-amber-300">
              웰니스케어
              <span className="text-[10px] text-amber-400">▼</span>
            </button>

            {isHealingOpen && (
              <div className="absolute top-full left-0 w-48 bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs z-50">
                {healingRegionList.map((h, idx) => (
                  <Link 
                    key={idx} 
                    href={h.href} 
                    className="block px-4 py-1.5 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                  >
                    {h.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/reviews" className="text-amber-400 font-extrabold hover:text-yellow-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
            <span>💬</span> 생생후기
          </Link>
        </nav>

        {/* 우측 전화 CTA & 모바일 햄버거 토글 */}
        <div className="flex items-center gap-2">
          <a 
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95"
          >
            📞 빠른 문의
          </a>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors"
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3 text-xs font-bold text-gray-300">
          <div className="grid grid-cols-2 gap-2 pb-1">
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-white/5 text-center">서비스</Link>
            <Link href="/prices" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-white/5 text-center">가격안내</Link>
          </div>

          <div className="pt-1 border-t border-white/5">
            <span className="text-[11px] text-amber-400 font-bold block mb-2 px-1">📍 기본 지역별 바로가기</span>
            <div className="grid grid-cols-3 gap-1.5">
              {regionList.map((r, idx) => (
                <Link key={idx} href={r.href} onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-center text-[11px] rounded-lg bg-black/40 border border-white/5 hover:text-amber-400 truncate">
                  {r.name.replace("📍 ", "")}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-1 border-t border-white/5">
            <span className="text-[11px] text-amber-300 font-bold block mb-2 px-1">✨ 웰니스 힐링 바로가기</span>
            <div className="grid grid-cols-3 gap-1.5">
              {healingRegionList.map((h, idx) => (
                <Link key={idx} href={h.href} onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-center text-[11px] rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 truncate">
                  {h.name.replace("✨ ", "").replace(" 웰니스 휴식처", "")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
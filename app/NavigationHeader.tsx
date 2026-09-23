"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationHeader() {
  const pathname = usePathname();
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isHealingOpen, setIsHealingOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 경로 이동 시 드롭다운 및 모바일 메뉴 자동 닫힘
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsRegionOpen(false);
    setIsHealingOpen(false);
  }, [pathname]);

  // 💆 마사지 시(권역) 전용 빠른 이동 리스트
  const massageRegionList = [
    { name: "📍 서울 마사지 전지역", href: "/massage/seoul" },
    { name: "📍 경기 마사지 전지역", href: "/massage/gyeonggi" },
    { name: "📍 인천 마사지 전지역", href: "/massage/incheon" },
  ];

  // ✨ 웰니스 & 테라피 인기 구 전용 이동 리스트
  const hotDistrictList = [
    { name: "✨ 서울 강남구 마사지", href: `/massage/seoul/${encodeURIComponent("강남구")}` },
    { name: "✨ 경기 분당구 마사지", href: `/massage/gyeonggi/${encodeURIComponent("성남시 분당구")}` },
    { name: "✨ 수원 팔달구 마사지", href: `/massage/gyeonggi/${encodeURIComponent("수원시 팔달구")}` },
    { name: "✨ 인천 연수구(송도)", href: `/massage/incheon/${encodeURIComponent("연수구")}` },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-black text-sm shadow-md border border-amber-300 group-hover:scale-105 transition-transform">
            태그
          </div>
          <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
            태그더레스트
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300">
          <Link href="/services" className="hover:text-amber-400 transition-colors">
            서비스
          </Link>
          <Link href="/prices" className="hover:text-amber-400 transition-colors">
            가격안내
          </Link>

          {/* 🔗 마사지 권역안내 드롭다운 (/massage/[region]) */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsRegionOpen(true)}
            onMouseLeave={() => setIsRegionOpen(false)}
          >
            <button 
              type="button" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300 cursor-pointer"
            >
              마사지 지역안내
              <span className={`text-[10px] text-amber-400 transition-transform ${isRegionOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {isRegionOpen && (
              <div className="absolute top-[80%] left-0 pt-2 w-44 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs">
                  {massageRegionList.map((r, idx) => (
                    <Link 
                      key={idx} 
                      href={r.href} 
                      className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                    >
                      {r.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 🔗 인기 구 마사지 드롭다운 */}
          <div 
            className="relative py-2"
            onMouseEnter={() => setIsHealingOpen(true)}
            onMouseLeave={() => setIsHealingOpen(false)}
          >
            <button 
              type="button" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-amber-300 cursor-pointer"
            >
              인기스팟 바로가기
              <span className={`text-[10px] text-amber-400 transition-transform ${isHealingOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>

            {isHealingOpen && (
              <div className="absolute top-[80%] left-0 pt-2 w-48 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-[#121214] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs">
                  {hotDistrictList.map((h, idx) => (
                    <Link 
                      key={idx} 
                      href={h.href} 
                      className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors truncate"
                    >
                      {h.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/reviews" 
            className="text-amber-400 font-extrabold hover:text-yellow-300 transition-colors flex items-center gap-1 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:border-amber-500/60"
          >
            <span>💬</span> 생생후기
          </Link>
        </nav>

        {/* 우측 CTA & 모바일 토글 */}
        <div className="flex items-center gap-2">
          <a 
            href="tel:0507-1280-3344"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95 flex items-center gap-1"
          >
            <span>📞</span> 빠른 문의
          </a>

          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            className="md:hidden p-2 rounded-xl border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-3 text-xs font-bold text-gray-300 animate-in fade-in duration-150">
          <div className="grid grid-cols-3 gap-2 pb-1">
            <Link href="/services" className="p-2.5 rounded-xl bg-white/5 text-center hover:bg-white/10">서비스</Link>
            <Link href="/prices" className="p-2.5 rounded-xl bg-white/5 text-center hover:bg-white/10">가격안내</Link>
            <Link href="/reviews" className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-center">후기</Link>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[11px] text-amber-400 font-bold block mb-2 px-1">📍 마사지 시(권역) 전체보기</span>
            <div className="grid grid-cols-3 gap-1.5">
              {massageRegionList.map((r, idx) => (
                <Link 
                  key={idx} 
                  href={r.href} 
                  className="p-2.5 text-center text-[11px] rounded-xl bg-black/40 border border-white/10 hover:border-amber-500/40 hover:text-amber-400 transition-colors truncate font-bold"
                >
                  {r.name.replace("📍 ", "").replace(" 마사지 전지역", "")}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[11px] text-amber-300 font-bold block mb-2 px-1">✨ 인기 구별 마사지 핫스팟</span>
            <div className="grid grid-cols-2 gap-1.5">
              {hotDistrictList.map((h, idx) => (
                <Link 
                  key={idx} 
                  href={h.href} 
                  className="p-2.5 text-center text-[11px] rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-colors truncate"
                >
                  {h.name.replace("✨ ", "")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
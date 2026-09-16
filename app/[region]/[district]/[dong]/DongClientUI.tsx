"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ClientTextMixer from "../../../ClientTextMixer";

interface DongClientUIProps {
  region: string;
  district: string;
  dong: string;
  locationTitle: string;
}

// 🌟 요청하신 태그더레스트 고정 제휴 샵 목록 (이름 변경 불가)
const initialDongShops = [
  { id: 1, name: "한국미인테라피", desc: "도심 속 깊은 이완과 감성 테라피를 선사하는 프리미엄 웰니스 쉼터", phone: "0507-1280-3303", price: "100,000원부터~", image: "/shop1.jpg" },
  { id: 2, name: "오늘밤테라피", desc: "지친 하루 끝에 가벼운 활력을 더해주는 프라이빗 바디 케어", phone: "0507-1280-3223", price: "60,000원부터~", image: "/shop2.jpg" },
  { id: 3, name: "주주테라피", desc: "청결한 위생 관리와 쾌적한 환경에서 즐기는 전문 아로마 프로그램", phone: "0507-1280-3193", price: "60,000원부터~", image: "/shop3.jpg" },
  { id: 4, name: "퀸즈홈테라피", desc: "전문 테라피스트들의 섬세한 터치로 완성되는 1:1 맞춤형 리프레시", phone: "0507-1280-3334", price: "60,000원부터~", image: "/shop4.jpg" },
  { id: 5, name: "한국골든테라피", desc: "정직한 정찰제 운영과 포근한 안식을 약속하는 스페셜 힐링 스팟", phone: "0507-1280-3361", price: "110,000원부터~", image: "/shop5.jpg" }
];

export default function DongClientUI({ region, district, dong, locationTitle }: DongClientUIProps) {
  const [displayShops, setDisplayShops] = useState<typeof initialDongShops>([]);

  useEffect(() => {
    // 새로고침 시 5개의 샵 순서를 무작위로 섞어서 출력
    const shuffled = [...initialDongShops].sort(() => Math.random() - 0.5);
    setDisplayShops(shuffled);
  }, []);

  return (
    <div className="bg-[#0b0b0f] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10">
        
        {/* 상단 타이틀 영역 */}
        <section className="text-center space-y-3">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
            📍 {locationTitle} 맞춤 제휴 안내
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-white">
            {locationTitle} 추천 웰니스 마사지 제휴점
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            태그더레스트가 엄선한 신뢰할 수 있는 제휴 샵의 프로그램을 확인해보세요.
          </p>
        </section>

        {/* 다이내믹 텍스트 믹서 배너 */}
        <ClientTextMixer locationText={locationTitle} />

        {/* 샵 리스트 영역 (클릭 시 샵 상세 페이지로 이동) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-extrabold text-amber-300">✨ 실시간 추천 제휴 스팟 (새로고침 시 변경)</h2>
            <span className="text-[11px] text-gray-400">총 5개 엄선</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayShops.map((lShop) => (
              <Link 
                key={lShop.id} 
                href={`/${region}/${encodeURIComponent(district)}/${encodeURIComponent(dong)}/shop/${lShop.id}`}
                className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 rounded-2xl p-4 flex gap-4 items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-amber-500 transition-all cursor-pointer group"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-gray-800 border border-amber-500/30 flex-shrink-0 overflow-hidden">
                  <img src={lShop.image} alt={lShop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                    {lShop.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">{lShop.desc}</p>
                  <div className="mt-2.5 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs font-black text-amber-300">{lShop.price}</span>
                    <a href={`tel:${lShop.phone}`} className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                      전화연결
                    </a>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🌟 샵 아래 추가된 읽을거리 (웰니스 가이드) 영역 */}
        <section className="mt-12 pt-8 border-t border-white/10 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-widest">WELLNESS STORY & GUIDE</span>
            <h2 className="text-xl md:text-2xl font-black text-white">📖 태그더레스트 웰니스 가이드</h2>
            <p className="text-xs text-gray-400">몸과 마음의 피로를 효과적으로 해소하는 힐링 정보</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article className="bg-[#121217] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-colors">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-[10px] font-bold">아로마 테라피</span>
              <h3 className="font-extrabold text-sm text-white">천연 에센셜 오일의 릴렉싱 효과</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                식물의 꽃과 잎에서 추출한 천연 오일을 활용한 아로마 케어는 후각과 피부를 통해 체내 긴장을 완화하고 심신을 안정시키는 데 도움을 줍니다.
              </p>
            </article>

            <article className="bg-[#121217] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-colors">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-[10px] font-bold">스웨디시 마사지</span>
              <h3 className="font-extrabold text-sm text-white">부드러운 압과 혈액순환의 조화</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                부드럽고 리드미컬한 손길을 통해 근육의 결을 따라 자극을 주며, 혈액순환 촉진과 피로 물질 배출에 탁월한 현대인 맞춤형 힐링 코스입니다.
              </p>
            </article>

            <article className="bg-[#121217] border border-white/10 rounded-2xl p-5 space-y-3 hover:border-amber-500/40 transition-colors">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 text-[10px] font-bold">피로 회복 팁</span>
              <h3 className="font-extrabold text-sm text-white">일상 속 가벼운 스트레칭과 휴식</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                장시간 앉아있는 현대인들에게 나타나는 목과 어깨의 긴장. 주기적인 바디케어와 가벼운 스트레칭 병행으로 최상의 컨디션을 유지해 보세요.
              </p>
            </article>
          </div>
        </section>

      </main>
    </div>
  );
}
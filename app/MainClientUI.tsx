"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { regionData } from "@/app/data/regions";

// 추천 제휴 샵 목록 (대표 연결 구: 강남구 기준)
const initialLocalShops = [
  {
    id: 1,
    name: "한국미인테라피",
    desc: "신속한 방문 케어와 정통 소프트스웨디시 감성 힐링 테라피",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    badge: "만족도 1위",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤테라피",
    desc: "지친 하루 끝에 가벼운 활력을 더해주는 프라이빗 바디케어",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    badge: "재방문 최우수",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주테라피",
    desc: "청결한 위생 관리와 쾌적한 환경에서 즐기는 전문 아로마 프로그램",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    badge: "24시 상시케어",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "퀸즈홈테라피",
    desc: "전문 테라피스트들의 섬세한 터치로 완성되는 1:1 맞춤형 리프레시",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    badge: "프리미엄 감성",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "한국골든테라피",
    desc: "정직한 정찰제 운영과 포근한 안식을 약속하는 스페셜 힐링 스팟",
    phone: "0507-1280-3361",
    price: "110,000원부터~",
    badge: "인기도 TOP",
    image: "/shop5.jpg",
  },
];

export default function MainClientUI() {
  const router = useRouter();
  const [selectedRegion, setSelectedRegion] = useState("seoul");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDong, setSelectedDong] = useState("");
  const [shops, setShops] = useState(initialLocalShops);
  const [, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // 마운트 후 랜덤 셔플
    setShops([...initialLocalShops].sort(() => Math.random() - 0.5));
  }, []);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedDistrict("");
    setSelectedDong("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedDong("");
  };

  // 🔗 마사지 시·구·동 신규 라우트로 검색 이동
  const handleSearch = () => {
    if (!selectedDistrict) {
      alert("원하시는 지역(구/시)을 먼저 선택해주세요!");
      return;
    }
    const districtObj = regionData[selectedRegion]?.districts[selectedDistrict];
    const districtName = districtObj ? districtObj.name : selectedDistrict;

    // 1단계: /massage/[region]/[district]
    const baseUrl = `/massage/${selectedRegion}/${encodeURIComponent(districtName)}`;

    // 2단계: 동 선택 시 /massage/[region]/[district]/[dong]
    const targetUrl = selectedDong
      ? `${baseUrl}/${encodeURIComponent(selectedDong)}`
      : baseUrl;

    router.push(targetUrl);
  };

  // 🔗 인기 지역 바로가기 (마사지 구 페이지로 이동)
  const handleQuickSelect = (region: string, districtKey: string) => {
    setSelectedRegion(region);
    setSelectedDistrict(districtKey);
    setSelectedDong("");
    const districtName = regionData[region]?.districts[districtKey]?.name || districtKey;
    router.push(`/massage/${region}/${encodeURIComponent(districtName)}`);
  };

  const currentDistricts = regionData[selectedRegion]?.districts || {};
  const currentDongs =
    selectedDistrict && currentDistricts[selectedDistrict]
      ? currentDistricts[selectedDistrict].dongs
      : [];

  return (
    <div className="bg-[#0b0b0f] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-400 selection:text-black relative overflow-hidden">
      {/* 배경 은은한 앰버 글로우 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-10 relative z-10">
        
        {/* 상단 메인 배너 */}
        <section className="text-center my-2">
          <div className="overflow-hidden rounded-3xl border-2 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] relative h-64 md:h-80 flex items-center justify-center p-6">
            <div className="absolute inset-0 z-0">
              <Image
                src="/banner.jpg"
                alt="태그더레스트 메인 배너"
                fill
                priority
                className="object-cover brightness-[0.45] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-amber-500/10" />
            </div>

            <div className="relative z-10 space-y-3.5 max-w-xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs tracking-widest shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                🌿 태그더레스트 - 수도권 힐링 마사지 가이드
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                수도권 전 지역{" "}
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  출장·홈타이·스웨디시
                </span>
              </h1>
              <p className="text-gray-200 text-xs md:text-sm font-medium drop-shadow">
                지친 일상에서 벗어나 깊은 이완과 리프레시를 선사하는 엄선된 마사지 휴식처 큐레이션.
              </p>
            </div>
          </div>
        </section>

        {/* 🗺️ 마사지 시(권역) 메인 페이지 바로가기 탭 */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-amber-400 font-extrabold tracking-wider">
              🏛️ 수도권 권역별 마사지 모아보기
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { key: "seoul", label: "서울 마사지", sub: "25개 자치구 전체" },
              { key: "gyeonggi", label: "경기 마사지", sub: "31개 시·군 전체" },
              { key: "incheon", label: "인천 마사지", sub: "전체 자치구·군" },
            ].map((reg) => (
              <Link
                key={reg.key}
                href={`/massage/${reg.key}`}
                className="bg-[#141418] hover:bg-amber-500/15 border border-white/10 hover:border-amber-400/50 p-3 rounded-2xl text-center transition-all group flex flex-col items-center justify-center shadow-lg"
              >
                <span className="text-xs md:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {reg.label}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5">
                  {reg.sub} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 인기 지역 퀵 버튼 */}
        <section className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-amber-400/90 font-bold mr-1">🔥 인기 지역:</span>
          {[
            { label: "강남구", r: "seoul", d: "gangnam" },
            { label: "마포구", r: "seoul", d: "mapo" },
            { label: "송파구", r: "seoul", d: "songpa" },
            { label: "분당구", r: "gyeonggi", d: "seongnam_bundang" },
            { label: "수원 팔달", r: "gyeonggi", d: "suwon_paldal" },
            { label: "인천 송도(연수)", r: "incheon", d: "yeonsu" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => handleQuickSelect(item.r, item.d)}
              className="text-xs bg-[#1a1a20] hover:bg-amber-400 hover:text-black text-gray-300 border border-white/10 px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-bold"
            >
              {item.label}
            </button>
          ))}
        </section>

        {/* 📍 지역 선택 및 검색 박스 (마사지 시·구·동 연동) */}
        <section className="pt-2">
          <div className="bg-gradient-to-b from-[#1c1c22] to-[#121217] border-2 border-amber-500/50 p-6 md:p-8 rounded-3xl max-w-xl mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] text-left relative overflow-hidden">
            <div className="mb-5">
              <label className="text-xs text-amber-300 font-black uppercase tracking-wider flex items-center gap-1.5">
                📍 내 주변 마사지 휴식처 맞춤 검색
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">1단계: 권역 선택</span>
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/40 focus:border-amber-300 transition-colors shadow-inner"
                >
                  {Object.keys(regionData).map((key) => (
                    <option key={key} value={key} className="bg-[#1e1e24] text-white">
                      {regionData[key].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">2단계: 지역(구/시) 선택</span>
                <select
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-bold p-3.5 rounded-xl border border-amber-500/40 focus:border-amber-300 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e24] text-gray-400">구 / 시 / 군을 선택해주세요</option>
                  {Object.keys(currentDistricts).map((dKey) => (
                    <option key={dKey} value={dKey} className="bg-[#1e1e24] text-white">
                      {currentDistricts[dKey].name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-gray-300 block mb-1 font-bold">3단계: 상세 동 선택 (선택사항)</span>
                <select
                  value={selectedDong}
                  onChange={(e) => setSelectedDong(e.target.value)}
                  disabled={!selectedDistrict}
                  className="bg-black/90 text-sm text-white w-full outline-none cursor-pointer font-medium p-3.5 rounded-xl border border-amber-500/40 disabled:opacity-30 transition-colors shadow-inner"
                >
                  <option value="" className="bg-[#1e1e24] text-gray-400">구 전체 마사지 모아보기</option>
                  {currentDongs.map((dong, idx) => (
                    <option key={idx} value={dong} className="bg-[#1e1e24] text-white">
                      {dong}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-black font-black py-4 rounded-2xl text-sm transition-all shadow-[0_0_30px_rgba(245,158,11,0.6)] mt-2 cursor-pointer transform active:scale-[0.98]"
              >
                🚀 내 주변 마사지 휴식처 찾기
              </button>
            </div>
          </div>
        </section>

        {/* 🔗 추천 제휴업체 리스트 (구 샵 상세 페이지와 연동) */}
        <section className="space-y-6 pt-4">
          <div className="text-center mb-6">
            <p className="text-xs text-amber-400 font-extrabold tracking-widest uppercase">
              CURATED WELLNESS SPOTS
            </p>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              ✨ 태그더레스트 추천 제휴 마사지 스팟
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shops.map((lShop) => {
              // 메인 페이지 추천 샵 상세 링크 (대표 지역: 서울 강남구 기준 연결)
              const shopDetailUrl = `/massage/seoul/${encodeURIComponent("강남구")}/shop/${lShop.id}`;

              return (
                <div
                  key={lShop.id}
                  className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 rounded-2xl p-4 flex gap-4 items-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-amber-500/50 transition-colors group"
                >
                  <Link href={shopDetailUrl} className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-colors">
                    <Image
                      src={lShop.image}
                      alt={lShop.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 left-1 bg-black/80 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                      {lShop.badge}
                    </span>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link href={shopDetailUrl} className="block">
                      <h3 className="font-extrabold text-sm md:text-base text-white group-hover:text-amber-300 transition-colors truncate">
                        {lShop.name}
                      </h3>
                      <p className="text-[11px] text-gray-300 mt-1 line-clamp-2">
                        {lShop.desc}
                      </p>
                    </Link>

                    <div className="mt-2.5 flex items-center justify-between gap-1.5">
                      <span className="text-xs font-black text-amber-300 shrink-0">
                        {lShop.price}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Link
                          href={shopDetailUrl}
                          className="bg-white/10 hover:bg-white/20 text-gray-200 font-bold text-[11px] px-2.5 py-1.5 rounded-xl border border-white/10 transition-colors"
                        >
                          코스안내
                        </Link>
                        <a
                          href={`tel:${lShop.phone}`}
                          className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-[11px] px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all shrink-0"
                        >
                          전화연결
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
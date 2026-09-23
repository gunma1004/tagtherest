import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionData } from "@/app/data/regions";
import { getRotatedTitle, getRotatedDescription } from "@/app/data/seoTemplates";

// 동 페이지 전용 추천 제휴 샵 데이터
const dongShopList = [
  {
    id: 1,
    name: "한국미인테라피",
    desc: "신속한 방문 케어와 정통 소프트스웨디시 감성 힐링 테라피",
    phone: "0507-1280-3303",
    price: "100,000원부터~",
    tags: ["출장마사지", "소프트스웨디시", "홈타이"],
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤테라피",
    desc: "1:1 프라이빗 룸 또는 원하는 공간에서 즐기는 맞춤형 바디케어",
    phone: "0507-1280-3223",
    price: "60,000원부터~",
    tags: ["건식마사지", "아로마", "24시상담"],
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주테라피",
    desc: "철저한 위생 관리와 림프 순환을 돕는 감성 아로디시 코스",
    phone: "0507-1280-3193",
    price: "60,000원부터~",
    tags: ["아로디시", "림프케어", "정찰제"],
    badge: "24시 상시 힐링",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "퀸즈홈테라피",
    desc: "전문 테라피스트의 섬세한 손길로 완성되는 고품격 안마 쉼표",
    phone: "0507-1280-3334",
    price: "60,000원부터~",
    tags: ["홈타이", "출장스웨디시", "1인맞춤"],
    badge: "프리미엄 감성",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "골든아로마스파",
    desc: "최고급 천연 에센셜 오일과 정통 딥티슈 프로그램 안내",
    phone: "0507-1280-3361",
    price: "110,000원부터~",
    tags: ["호텔식케어", "전신관리", "피로회복"],
    badge: "인기도 TOP 5",
    image: "/shop5.jpg",
  },
];

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

// 1. 사전 정적 생성 (수도권 전 지역 동 사전 빌드)
export async function generateStaticParams() {
  const paths: { region: string; district: string; dong: string }[] = [];

  for (const [regionKey, regionVal] of Object.entries(regionData)) {
    for (const [, districtVal] of Object.entries(regionVal.districts)) {
      for (const dongName of districtVal.dongs) {
        paths.push({
          region: regionKey,
          district: districtVal.name,
          dong: dongName,
        });
      }
    }
  }

  return paths;
}

// 2. 동 페이지 SEO 동적 메타데이터 (60종 타이틀 & 40종 디스크립션 로테이션 배정)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong } = await params;
  const decodedDistrict = decodeURIComponent(district);
  const decodedDong = decodeURIComponent(dong);

  const locationName = `${decodedDistrict} ${decodedDong}`;
  const seoTitle = getRotatedTitle(locationName);
  const seoDescription = getRotatedDescription(locationName);
  const pageUrl = `https://tagtherest.netlify.app/massage/${region}/${district}/${dong}`;

  return {
    metadataBase: new URL("https://tagtherest.netlify.app"),
    title: {
      absolute: seoTitle,
    },
    description: seoDescription,
    alternates: {
      canonical: pageUrl,
    },
    keywords: `${decodedDong} 마사지, ${decodedDong} 출장마사지, ${decodedDong} 홈타이, ${decodedDong} 소프트스웨디시, ${decodedDistrict} 마사지, 태그더레스트`,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
      siteName: "태그더레스트",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function MassageDongPage({ params }: PageProps) {
  const { region, district, dong } = await params;
  const decodedDistrict = decodeURIComponent(district);
  const decodedDong = decodeURIComponent(dong);

  const regionInfo = regionData[region];
  if (!regionInfo) {
    notFound();
  }

  // 구 정보 및 소속 동 목록 검증
  let districtInfo: { name: string; dongs: string[] } | null = null;
  for (const [, val] of Object.entries(regionInfo.districts)) {
    if (val.name === decodedDistrict) {
      districtInfo = val;
      break;
    }
  }

  if (!districtInfo || !districtInfo.dongs.includes(decodedDong)) {
    notFound();
  }

  const siblingDongs = districtInfo.dongs;
  const displayLocation = `${decodedDistrict} ${decodedDong}`;

  return (
    <div className="bg-[#0b0b0f] text-gray-100 min-h-screen py-8 px-4 font-sans selection:bg-amber-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 상단 브레드크럼 (계층 구조 네비게이션) */}
        <nav className="text-xs text-gray-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <Link href={`/massage/${region}`} className="hover:text-amber-400 transition-colors">
            {regionInfo.name}
          </Link>
          <span>&gt;</span>
          <Link href={`/massage/${region}/${encodeURIComponent(decodedDistrict)}`} className="hover:text-amber-400 transition-colors">
            {decodedDistrict}
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{decodedDong}</span>
        </nav>

        {/* 메인 헤더 배너 */}
        <section className="bg-gradient-to-br from-[#1c1c24] via-[#121217] to-[#0c0c10] border-2 border-amber-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_35px_rgba(245,158,11,0.2)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-black text-xs tracking-wider shadow">
              📍 {displayLocation} 웰니스 안식처
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              {decodedDong} <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">출장마사지·홈타이·스웨디시</span>
            </h1>
            <p className="text-gray-300 text-xs md:text-sm max-w-2xl leading-relaxed">
              {displayLocation} 전 지역 신속 방문 가능한 프리미엄 소프트스웨디시, 정통 홈타이, 1인 프라이빗 힐링 스팟을 안내합니다. 샵을 클릭하여 상세 코스 및 요금을 확인해 보세요.
            </p>
          </div>
        </section>

        {/* 주변 인접 동 빠른 이동 탭 (내부 링크 최적화) */}
        <section className="bg-[#121217] border border-white/10 rounded-2xl p-4 md:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs md:text-sm font-black text-amber-400 flex items-center gap-1.5">
              🗺️ {decodedDistrict} 다른 동 바로가기
            </h2>
            <Link
              href={`/massage/${region}/${encodeURIComponent(decodedDistrict)}`}
              className="text-[11px] text-gray-400 hover:text-amber-300 transition-colors"
            >
              {decodedDistrict} 전체보기 →
            </Link>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
            {siblingDongs.map((d) => {
              const isCurrent = d === decodedDong;
              return (
                <Link
                  key={d}
                  href={`/massage/${region}/${encodeURIComponent(decodedDistrict)}/${encodeURIComponent(d)}`}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                    isCurrent
                      ? "bg-amber-400 text-black font-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                      : "bg-black/50 text-gray-300 border-white/10 hover:border-amber-500/40 hover:text-white"
                  }`}
                >
                  {d}
                </Link>
              );
            })}
          </div>
        </section>

        {/* 🔗 샵 상세 페이지(/shop/[shopId])와 100% 연동된 추천 샵 리스트 */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm md:text-base font-extrabold text-white flex items-center gap-2">
              <span>✨</span> {decodedDong} 추천 샵 목록 ({dongShopList.length}곳)
            </h2>
            <span className="text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              신속 방문 & 정찰제
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {dongShopList.map((shop) => {
              // 🔗 구 샵 상세 페이지 연동 URL
              const shopDetailUrl = `/massage/${region}/${encodeURIComponent(decodedDistrict)}/shop/${shop.id}`;

              return (
                <div
                  key={shop.id}
                  className="bg-gradient-to-br from-[#16161b] to-[#101014] border border-amber-500/25 hover:border-amber-500/60 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shadow-lg transition-all group"
                >
                  {/* 카드 본문 링크 (이미지 + 정보 클릭 시 상세 페이지로 이동) */}
                  <Link href={shopDetailUrl} className="flex gap-4 items-center w-full md:w-auto flex-1 cursor-pointer">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl bg-neutral-800 shrink-0 overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-colors">
                      <img
                        src={shop.image}
                        alt={`${displayLocation} ${shop.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/80 text-amber-300 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {shop.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-amber-300 transition-colors truncate">
                          {shop.name}
                        </h3>
                        <span className="text-xs font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                          {shop.price}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 line-clamp-1">{shop.desc}</p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                        {shop.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-gray-400 pt-0.5">
                        📍 {decodedDistrict} {decodedDong} 일대 신속 예약 가능
                      </p>
                    </div>
                  </Link>

                  {/* 우측 연동 액션 버튼: [코스·상세보기] + [전화 예약] */}
                  <div className="w-full md:w-auto flex md:flex-col items-center justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0">
                    <Link
                      href={shopDetailUrl}
                      className="w-1/2 md:w-32 bg-white/10 hover:bg-white/20 text-gray-200 font-bold text-xs py-2.5 rounded-xl text-center border border-white/10 transition-all hover:border-amber-400/40"
                    >
                      코스·상세보기
                    </Link>
                    <a
                      href={`tel:${shop.phone}`}
                      className="w-1/2 md:w-32 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs py-2.5 rounded-xl text-center shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all active:scale-95"
                    >
                      📞 전화 예약
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 동 단위 이용 안내 카드 */}
        <section className="bg-black/40 border border-white/5 rounded-2xl p-5 text-xs text-gray-400 space-y-2 leading-relaxed">
          <p className="font-bold text-gray-300">💡 {decodedDong} 마사지 이용 안내</p>
          <p>
            • 모든 제휴 샵은 <strong>100% 현장 후불제</strong>를 준수하며 사전 예약금이나 선입금을 일절 요구하지 않습니다.
          </p>
          <p>
            • 출장 홈타이 및 소프트스웨디시 방문 케어는 예약 상황에 따라 도착 시간이 달라질 수 있으니 사전에 여유 있게 문의해 주시기 바랍니다.
          </p>
        </section>

      </div>
    </div>
  );
}
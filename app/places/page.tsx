import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "웰니스 플레이스 가이드 | 태그더레스트 - 수도권 힐링 공간 & 휴식처 큐레이션",
  description: "서울·경기·인천 수도권 주요 거점 지역의 엄선된 힐링 카페, 맛집 및 편안한 휴식 공간 정보를 태그더레스트에서 만나보세요.",
  openGraph: {
    title: "웰니스 플레이스 가이드 | 태그더레스트",
    description: "서울 경기 인천 주요 지역 검증된 맛집 및 웰니스 휴식 공간 안내",
    url: "https://tagtherest.netlify.app/places",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function PlacesPage() {
  const categories = [
    {
      title: "☕ 릴렉스 카페 & 웰니스 티",
      desc: "지친 마음을 차분하게 정돈해 주는 감성 테라피 카페 및 찻집",
    },
    {
      title: "🍽️ 로컬 웰빙 맛집",
      desc: "몸에 가벼운 활력을 채워주는 수도권 권역별 건강 식단 추천",
    },
    {
      title: "🏨 프라이빗 스테이 & 쉼터",
      desc: "온전한 몰입과 깊은 숙면을 제공하는 조용한 휴식 공간",
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            WELLNESS SPOTS & CURE STAY
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            엄선된 웰니스 플레이스 & 휴식 가이드
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            태그더레스트가 제안하는 수도권 권역별 맞춤형 힐링 스팟과 편안한 쉼터 이야기
          </p>
        </div>

        {/* 안내 배너 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-6 rounded-3xl text-center space-y-2 shadow-inner">
          <p className="text-sm md:text-base font-bold text-amber-300">
            🌿 일상 속 여유를 더하는 프리미엄 큐레이션
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">
            서울, 경기, 인천 등 수도권 전역에서 가벼운 산책과 깊은 안식을 동시에 누릴 수 있는 공간 정보를 세심하게 안내해 드립니다.
          </p>
        </div>

        {/* 카테고리 카드 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-[#121214] border border-white/5 hover:border-amber-500/40 p-5 rounded-2xl space-y-2 transition-all group"
            >
              <h3 className="font-extrabold text-sm md:text-base text-white group-hover:text-amber-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 홈으로 이동 버튼 */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg hover:from-amber-400 hover:to-yellow-300 transition-all"
          >
            <span>🏠</span> 태그더레스트 홈으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
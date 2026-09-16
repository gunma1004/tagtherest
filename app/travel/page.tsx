import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "웰니스 여행 가이드 | 태그더레스트 - 수도권 힐링 명소 & 드라이브 코스 안내",
  description: "서울, 경기, 인천 수도권 주요 도시의 심신 안식 힐링 명소와 드라이브 코스를 태그더레스트에서 확인하세요.",
  openGraph: {
    title: "웰니스 여행 가이드 | 태그더레스트",
    description: "피로를 비워내고 여유를 되찾는 수도권 주요 권역별 힐링 여행지 가이드",
    url: "https://tagtherest.netlify.app/travel",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function TravelPage() {
  const travelCourses = [
    {
      region: "서울 스팟",
      title: "남산 둘레길 & 한강 야경 드라이브",
      desc: "도심 속 탁 트인 전망과 한강의 아름다운 야경을 감상하며 하루의 지친 피로를 가볍게 비워내는 코스입니다.",
      tag: "야경 & 산책"
    },
    {
      region: "경기 스팟",
      title: "가평 수목원 & 양평 북한강변 드라이브",
      desc: "울창한 숲길과 맑은 강변을 따라 즐기는 산림욕으로 심신을 정화하고 맑은 공기를 마실 수 있는 힐링 코스입니다.",
      tag: "자연 & 산림욕"
    },
    {
      region: "인천 스팟",
      title: "송도 센트럴파크 & 영종도 해변 산책",
      desc: "이국적인 수변 공원과 시원한 서해 바다 낙조를 보며 여유로운 휴식을 즐길 수 있는 코스입니다.",
      tag: "오션뷰 & 힐링"
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            WELLNESS TRAVEL GUIDE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            수도권 힐링 여행지 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            태그더레스트가 추천하는 피로를 씻어내기 좋은 수도권 도시별 휴식 명소
          </p>
        </div>

        {/* 힐링 테마 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-5 rounded-3xl text-center space-y-1.5 shadow-inner">
          <p className="text-sm font-extrabold text-amber-300">
            🌿 여행과 함께하는 나만의 프라이빗 웰니스 라이프
          </p>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xl mx-auto">
            여행이나 외출 중 쌓인 피로를 상쾌하게 비워낼 수 있도록 수도권 권역별 핫플레이스와 연계된 힐링 정보를 제공합니다.
          </p>
        </div>

        {/* 여행 코스 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {travelCourses.map((course, idx) => (
            <div 
              key={idx} 
              className="bg-[#121214] border border-white/10 hover:border-amber-500/40 p-6 rounded-3xl space-y-3 transition-all group shadow-md"
            >
              <div className="flex justify-between items-center">
                <span className="text-amber-400 text-xs font-extrabold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {course.region}
                </span>
                <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                  {course.tag}
                </span>
              </div>
              <h3 className="font-extrabold text-base md:text-lg text-white group-hover:text-amber-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {course.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 하단 홈으로 이동 버튼 */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg hover:from-amber-400 hover:to-yellow-300 transition-all active:scale-95"
          >
            <span>🏠</span> 태그더레스트 홈으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
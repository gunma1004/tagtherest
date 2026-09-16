import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "서비스 안내 | 태그더레스트 - 수도권 프리미엄 웰니스 힐링 프로그램",
  description: "컨디션 베이직 케어, 아로마 릴렉스, 프리미엄 스웨디시 등 태그더레스트의 고품격 피로회복 웰니스 프로그램을 확인하세요.",
  openGraph: {
    title: "서비스 안내 | 태그더레스트",
    description: "태그더레스트가 제공하는 맞춤형 휴식 공간 & 프리미엄 바디케어 프로그램 안내",
    url: "https://tagtherest.netlify.app/services",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ServicesPage() {
  const serviceList = [
    {
      num: "01",
      title: "컨디션 베이직 케어",
      desc: "지친 신체의 뭉친 근육과 긴장된 관절을 부드럽게 정돈해 주는 실속형 전통 프로그램입니다.",
      target: "가벼운 피로 해소와 일상 속 빠른 컨디션 회복을 원하시는 분"
    },
    {
      num: "02",
      title: "아로마 릴렉스 테라피",
      desc: "최고급 천연 에센셜 오일을 활용하여 피부에 순하게 스며들며 혈액순환과 심신 안정을 돕는 릴렉싱 코스입니다.",
      target: "스트레스 완화, 부드러운 전신 이완 및 포근한 안식이 필요하신 분"
    },
    {
      num: "03",
      title: "프리미엄 스웨디시",
      desc: "섬세한 감성 터치와 리드미컬한 압으로 지친 몸과 마음을 최상의 상태로 리프레시해 드리는 시그니처 케어입니다.",
      target: "깊은 휴식, 림프 순환, 품격 있는 프라이빗 힐링을 원하시는 분"
    },
    {
      num: "04",
      title: "스페셜 바디 마스터피스",
      desc: "풍부한 경험의 전문 관리사들이 고객님의 당일 컨디션에 맞춰 1:1 맞춤형 힐링 플랜을 제공하는 최상급 프로그램입니다.",
      target: "체계적인 맞춤 관리와 최상의 웰니스 만족도를 원하시는 VIP 고객"
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            PREMIUM WELLNESS SERVICE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            태그더레스트 코스별 서비스 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            고객님의 컨디션과 취향에 맞춘 수도권 최상의 맞춤형 휴식 프로그램
          </p>
        </div>

        {/* 서비스 특징 안내 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-5 rounded-3xl text-center space-y-1.5 shadow-inner">
          <p className="text-sm font-extrabold text-amber-300">
            ✨ 100% 후불제 & 철저한 위생 관리 시스템
          </p>
          <p className="text-xs text-gray-300 leading-relaxed max-w-xl mx-auto">
            태그더레스트의 모든 제휴 스팟은 최고급 천연 오일과 소독된 케어 용품을 사용하며, 이용 전 선입금을 절대 요구하지 않습니다.
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceList.map((srv, idx) => (
            <div 
              key={idx} 
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/60 p-6 rounded-3xl space-y-4 shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 text-2xl font-black">{srv.num}</span>
                  <span className="text-[10px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full font-semibold">
                    웰니스 추천
                  </span>
                </div>
                <h3 className="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-[11px] text-gray-400 flex items-start gap-1">
                  <span className="text-amber-400 font-bold">추천:</span> {srv.target}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA 버튼 영역 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a
            href="tel:0507-1280-3344"
            className="w-full sm:w-auto text-center bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            📞 맞춤 코스 빠른 상담 (0507-1280-3344)
          </a>
          <Link
            href="/"
            className="w-full sm:w-auto text-center bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white border border-white/10 font-bold text-xs px-6 py-3.5 rounded-xl transition-all"
          >
            🏠 태그더레스트 홈으로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
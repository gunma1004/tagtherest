import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "웰니스 프로그램 및 정찰제 가격 안내 | 태그더레스트 - 투명한 요금 가이드",
  description: "스웨디시, 아로마, 프라이빗 릴렉스 등 태그더레스트 제휴 스팟의 합리적이고 투명한 가격과 프로그램을 확인하세요. 100% 안심 후불제.",
  openGraph: {
    title: "웰니스 프로그램 및 정찰제 가격 안내 | 태그더레스트",
    description: "태그더레스트의 투명하고 정직한 코스별 요금 및 프로그램 안내",
    url: "https://tagtherest.netlify.app/prices",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function PricesPage() {
  const priceList = [
    { 
      title: "컨디션 베이직 케어 (60분)", 
      price: "60,000원부터~", 
      desc: "지친 신체의 긴장을 가볍게 정돈하고 편안한 안식을 선사하는 실속형 코스",
      badge: "가성비 추천"
    },
    { 
      title: "아로마 릴렉스 테라피 (60분)", 
      price: "70,000원부터~", 
      desc: "천연 에센셜 오일의 포근한 향과 부드러운 터치로 전신 순환을 돕는 프로그램",
      badge: "인기 코스"
    },
    { 
      title: "프리미엄 스웨디시 (60분)", 
      price: "90,000원부터~", 
      desc: "깊은 이완과 감성적인 힐링을 동시에 경험할 수 있는 시그니처 VIP 케어",
      badge: "만족도 1위"
    },
    { 
      title: "스페셜 바디 마스터피스 (60분)", 
      price: "140,000원부터~", 
      desc: "개개인의 컨디션에 맞춘 섬세한 테크닉으로 최상의 재충전을 약속하는 코스",
      badge: "프리미엄"
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            TRANSPARENT WELLNESS PRICE GUIDE
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            정직하고 투명한 코스별 가격 안내
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            태그더레스트는 100% 후불제 안심 예약 시스템을 통해 신뢰할 수 있는 휴식을 지향합니다.
          </p>
        </div>

        {/* 안심 보장 안내 박스 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-4 md:p-5 rounded-2xl flex items-center justify-between text-left shadow-inner">
          <div className="space-y-1">
            <span className="text-amber-300 font-extrabold text-xs md:text-sm flex items-center gap-1.5">
              🛡️ 100% 후불 안심 보장제
            </span>
            <p className="text-[11px] md:text-xs text-gray-300">
              태그더레스트의 모든 제휴 스팟은 이용 전 <span className="text-amber-400 font-bold">선입금 및 예약금을 절대 요구하지 않습니다.</span>
            </p>
          </div>
        </div>

        {/* 코스별 가격 카드 리스트 */}
        <div className="space-y-4">
          {priceList.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-5 md:p-6 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all group shadow-md"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    {item.badge}
                  </span>
                  <h3 className="font-extrabold text-white text-base md:text-lg group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
                <span className="text-amber-400 font-black text-lg md:text-xl bg-amber-500/10 px-4 py-1.5 rounded-xl border border-amber-500/20 whitespace-nowrap shadow-inner">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 상담 및 홈 이동 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <a
            href="tel:0507-1280-3344"
            className="w-full sm:w-auto text-center bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            📞 실시간 프로그램 및 요금 문의 (0507-1280-3344)
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
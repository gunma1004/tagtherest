import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "생생 후기 | 태그더레스트 - 100% 실제 방문 고객 웰니스 휴식 리뷰",
  description: "서울·경기·인천 수도권 태그더레스트 제휴 스팟을 직접 이용하신 고객님들의 100% 솔직한 평점과 후기를 확인해 보세요.",
  openGraph: {
    title: "생생 후기 | 태그더레스트",
    description: "태그더레스트 실제 고객님들의 100% 솔직한 웰니스 힐링 이용 후기",
    url: "https://tagtherest.netlify.app/reviews",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function ReviewsPage() {
  const reviews = [
    { 
      name: "서울 강남구 이용자", 
      rate: "★★★★★ 5.0", 
      course: "프리미엄 스웨디시",
      date: "최근 이용",
      text: "도심 속에서 온전한 휴식을 찾고 싶어 예약했는데 기대 이상이었습니다. 피로가 개운하게 풀려 다음 날 컨디션이 최고였어요!" 
    },
    { 
      name: "경기 수원시 이용자", 
      rate: "★★★★★ 5.0", 
      course: "아로마 릴렉스 테라피",
      date: "최근 이용",
      text: "선입금 없는 후불제라 마음 편하게 이용할 수 있었습니다. 관리사분 전문성과 친절함 모두 완벽하게 만족스럽네요." 
    },
    { 
      name: "인천 송도동 이용자", 
      rate: "★★★★★ 5.0", 
      course: "스페셜 바디 마스터피스",
      date: "최근 이용",
      text: "은은한 아로마 향과 함께 긴장된 근육을 세심하게 풀어주셔서 힐링을 제대로 만끽했습니다. 정기적으로 찾게 될 것 같아요." 
    },
    { 
      name: "서울 마포구 이용자", 
      rate: "★★★★★ 5.0", 
      course: "컨디션 베이직 케어",
      date: "최근 이용",
      text: "쾌적하고 프라이빗한 분위기 속에서 편안하게 케어를 받을 수 있는 점이 가장 마음에 듭니다. 위생도 아주 철저해요." 
    },
    { 
      name: "경기 성남시 이용자", 
      rate: "★★★★★ 5.0", 
      course: "시그니처 VIP 코스",
      date: "최근 이용",
      text: "태그더레스트 큐레이션을 보고 믿고 예약했는데 역대급 힐링 스팟을 발견했습니다. 다음에도 꼭 다시 방문할게요!" 
    },
  ];

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* 상단 타이틀 */}
        <div className="text-center space-y-2">
          <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
            REAL CUSTOMER REVIEWS
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white">
            실제 이용 고객 생생 후기
          </h1>
          <p className="text-xs md:text-sm text-gray-400">
            태그더레스트와 함께 일상 속 깊은 안식을 경험하신 고객님들의 100% 솔직한 이야기
          </p>
        </div>

        {/* 평점 요약 배너 */}
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-inner">
          <div>
            <span className="text-amber-300 font-extrabold text-sm md:text-base">
              🏆 태그더레스트 고객 평균 만족도
            </span>
            <p className="text-xs text-gray-300 mt-0.5">
              엄격한 제휴 스팟 검증과 100% 후불제 정직한 운영으로 높은 신뢰를 이어갑니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black text-amber-400">4.99</span>
            <span className="text-amber-400 text-sm">/ 5.0</span>
          </div>
        </div>

        {/* 후기 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              className="bg-[#121214] border border-amber-500/20 hover:border-amber-500/50 p-5 rounded-2xl space-y-2.5 transition-all shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-amber-400 font-black text-xs tracking-wider">
                    {rev.rate}
                  </span>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-md">
                    {rev.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-gray-200 font-bold">{rev.name}</span>
                  <span className="text-amber-300/80 text-[11px]">{rev.course}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  &quot;{rev.text}&quot;
                </p>
              </div>
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
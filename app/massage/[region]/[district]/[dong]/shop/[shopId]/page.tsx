import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionData } from "@/app/data/regions";
import { titleTemplates, descTemplates } from "@/app/data/seoTemplates";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    shopId: string;
  }>;
}

// 🌐 영문 지역 코드를 한글 지역명으로 변환
function getRegionFullName(region: string): string {
  switch (region.toLowerCase()) {
    case "seoul":
      return "서울";
    case "gyeonggi":
      return "경기";
    case "incheon":
      return "인천";
    default:
      return regionData[region]?.name || region;
  }
}

// 🛠️ 이중 URL 인코딩까지 안전하게 풀어주는 디코딩 헬퍼 함수
function safeDecode(str: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

// 📍 구 단위 위치 텍스트 생성 (예: "서울 강남구", "경기 수원시 팔달구")
function parseDistrictLocationText(region: string, district: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  return `${regionName} ${decodedDistrict}`.replace(/\s+/g, " ").trim();
}

// 문자열을 고유 정수로 변환하는 해시 함수 (32비트 정수)
function getHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// 💎 태그더레스트 전용 5개 제휴 샵 데이터
const shopData: Record<
  string,
  {
    name: string;
    phone: string;
    location: string;
    badge: string;
    image: string;
    desc: string;
    courses: { name: string; time: string; price: string; desc: string }[];
    features: string[];
  }
> = {
  "1": {
    name: "한국미인테라피",
    phone: "0507-1280-3303",
    location: "수도권 주요 지역 25분 내 신속 방문",
    badge: "실시간 만족도 1위",
    image: "/shop1.jpg",
    desc: "도심 속 깊은 이완과 감성 테라피를 선사하는 프리미엄 웰니스 쉼터! 지친 일상을 상쾌하게 정돈하는 1:1 맞춤 출장 케어 프로그램으로 편안한 안식을 선사하며 품격 있는 마사지 서비스를 제공합니다.",
    courses: [
      { name: "프리미엄 웰니스 아로마 순환 케어", time: "90분", price: "100,000원", desc: "부드러운 오일링과 힐링 마사지로 전신 순환을 돕는 코스" },
      { name: "프리미엄 웰니스 아로마 롱타임 테라피", time: "120분", price: "130,000원", desc: "여유로운 시간 동안 온전한 휴식을 누리는 120분 프로그램" },
      { name: "VIP 감성 스웨디시 케어 A", time: "60분", price: "110,000원", desc: "감성적인 터치로 굳은 긴장을 부드럽게 녹여주는 스웨디시 바디케어" },
      { name: "VIP 감성 스웨디시 케어 B", time: "90분", price: "130,000원", desc: "깊은 피로 회복과 안정감을 선사하는 추천 VIP 마사지 코스" },
      { name: "VIP 감성 스웨디시 풀케어 테라피", time: "120분", price: "150,000원", desc: "머리부터 발끝까지 여유롭게 이완하는 120분 전신 풀코스" },
      { name: "한국인 전문 관리사 맞춤 케어 A", time: "60분", price: "140,000원", desc: "실력파 테라피스트의 섬세한 1:1 맞춤형 케어 서비스" },
      { name: "한국인 전문 관리사 맞춤 케어 B", time: "90분", price: "180,000원", desc: "최고의 만족감을 선사하는 프리미엄 스페셜 바디 마사지 코스" },
    ],
    features: ["100% 현장 안심 후불제", "24시간 365일 연중무휴", "수도권 주요 거점 신속 방문", "철저한 위생 및 방역 관리"],
  },
  "2": {
    name: "오늘밤테라피",
    phone: "0507-1280-3223",
    location: "수도권 주요 거점 신속 방문",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루 끝에 가벼운 활력을 더해주는 프라이빗 케어! 편안한 공간에서 출장 서비스를 통해 타이 릴렉스 및 아로마 마사지로 굳어있던 바디 밸런스를 되찾아드립니다.",
    courses: [
      { name: "타이 스트레칭 베이직 케어", time: "60분", price: "60,000원", desc: "전신 근육을 시원하게 늘려주어 뻐근함을 풀어주는 기본 프로그램" },
      { name: "타이 릴렉스 스탠다드 테라피", time: "90분", price: "80,000원", desc: "여유로운 전신 스트레칭과 케어로 묵은 긴장을 덜어내는 추천 코스" },
      { name: "타이 딥케어 프리미엄 프로그램", time: "120분", price: "100,000원", desc: "전신 구석구석을 꼼꼼하게 이완시켜 주는 120분 집중 마사지 코스" },
      { name: "아로마 순환 릴렉스 케어", time: "60분", price: "70,000원", desc: "부드러운 에센셜 오일로 전신 순환을 촉진하는 아로마 바디케어" },
      { name: "아로마 힐링 스탠다드 테라피", time: "90분", price: "90,000원", desc: "스트레스 완화와 포근한 휴식을 돕는 인기 아로마 마사지 코스" },
      { name: "아로마 딥릴렉스 풀케어 케어", time: "120분", price: "110,000원", desc: "깊은 이완과 활력을 전하는 120분 프리미엄 아로마 프로그램" },
      { name: "VIP 감성 릴렉스 케어 A", time: "60분", price: "90,000원", desc: "부드러운 터치와 힐링이 결합된 시그니처 마사지 코스" },
      { name: "VIP 감성 릴렉스 케어 B", time: "90분", price: "110,000원", desc: "높은 고객 만족도를 자랑하는 맞춤형 바디케어 프로그램" },
      { name: "VIP 감성 릴렉스 케어 C", time: "120분", price: "130,000원", desc: "오래도록 지속되는 편안함과 마사지 효과를 주는 롱타임 코스" },
      { name: "VIP 스페셜 콤비 케어 A", time: "60분", price: "100,000원", desc: "단시간에 효과적인 컨디션 회복을 누리는 스페셜 프로그램" },
      { name: "VIP 스페셜 콤비 케어 B", time: "90분", price: "120,000원", desc: "체형 맞춤 테크닉이 적용된 고품격 힐링 바디 마사지" },
      { name: "VIP 스페셜 콤비 케어 C", time: "120분", price: "140,000원", desc: "최고의 안락함을 드리는 120분 프리미엄 스페셜 코스" },
      { name: "VIP 올인원 프리미엄 웰니스 케어", time: "150분", price: "160,000원", desc: "타이 스트레칭과 아로마 테라피, 풋케어를 모두 담은 종합 패키지" },
      { name: "한국 관리사 스웨디시 A", time: "60분", price: "140,000원", desc: "한국인 전문 테라피스트의 디테일하고 정갈한 마사지 케어" },
      { name: "한국 관리사 스웨디시 B", time: "90분", price: "180,000원", desc: "궁극의 편안함을 선사하는 최고급 감성 마사지 풀코스" },
    ],
    features: ["선입금 0원 100% 후불제", "친절 마인드 전문 힐러 상주", "24시간 신속 배차 시스템"],
  },
  "3": {
    name: "주주테라피",
    phone: "0507-1280-3193",
    location: "수도권 주요 지역 신속 도착",
    badge: "24시 상시 힐링",
    image: "/shop3.jpg",
    desc: "청결한 위생 관리와 쾌적한 환경에서 출장 서비스를 통해 즐기는 전문 아로마 프로그램! 정직한 정찰제 운영으로 일상의 피로를 말끔히 비워내고 마사지로 활력을 되찾아 드립니다.",
    courses: [
      { name: "타이 베이직 릴렉스 케어", time: "60분", price: "60,000원", desc: "뻐근한 몸을 시원하게 스트레칭해 주는 기본 건식 프로그램" },
      { name: "타이 스탠다드 웰니스 테라피", time: "90분", price: "80,000원", desc: "근육 결을 따라 전신을 편안하게 이완시키는 타이 마사지 추천 코스" },
      { name: "타이 풀타임 딥케어 프로그램", time: "120분", price: "100,000원", desc: "답답했던 피로 부위를 꼼꼼하게 정돈하는 120분 전신 코스" },
      { name: "아로마 소프트 마일드 케어", time: "60분", price: "70,000원", desc: "부드러운 에센셜 오일과 정성스러운 손길의 순환 마사지" },
      { name: "아로마 스탠다드 힐링 테라피", time: "90분", price: "90,000원", desc: "스트레스 해소와 전신 밸런스를 돕는 인기 아로마 프로그램" },
      { name: "아로마 프리미엄 풀케어 케어", time: "120분", price: "110,000원", desc: "깊은 이완과 편안한 숙면을 유도하는 풍성한 아로마 마사지 테라피" },
      { name: "VIP 감성 웰니스 마사지 (60분)", time: "60분", price: "90,000원", desc: "섬세한 감성 터치가 더해져 심신을 녹여주는 케어 코스" },
      { name: "VIP 감성 웰니스 마사지 (90분)", time: "90분", price: "110,000원", desc: "만족도 높은 시그니처 감성 힐링 프로그램" },
      { name: "VIP 감성 웰니스 마사지 (120분)", time: "120분", price: "130,000원", desc: "온전한 휴식과 안정을 채워주는 120분 롱타임 마사지 코스" },
      { name: "VIP 맞춤형 힐링 마사지 (60분)", time: "60분", price: "100,000원", desc: "집중적인 피로 부위를 효율적으로 풀어주는 스페셜 바디케어" },
      { name: "VIP 맞춤형 힐링 마사지 (90분)", time: "90분", price: "120,000원", desc: "체계적인 압 조절과 이완 기법의 고품격 마사지 테라피" },
      { name: "VIP 맞춤형 힐링 마사지 (120분)", time: "120분", price: "140,000원", desc: "차별화된 안락함을 선사하는 최고급 맞춤 케어" },
      { name: "VIP 하이브리드 종합 웰니스 케어", time: "150분", price: "160,000원", desc: "타이 스트레칭과 아로마 마사지, 풋케어를 모두 담은 종합 패키지" },
      { name: "한국인 전문 힐러 마사지 (60분)", time: "60분", price: "140,000원", desc: "실력파 한국인 관리사의 1:1 품격 있는 감성 스웨디시 케어" },
      { name: "한국인 전문 힐러 마사지 (90분)", time: "90분", price: "180,000원", desc: "극상의 만족감을 약속드리는 하이엔드 프리미엄 마사지 코스" },
    ],
    features: ["예약금 없는 100% 현장 후불제", "평균 25분 신속 방문", "개인정보 완벽 보안 운영"],
  },
  "4": {
    name: "퀸즈홈테라피",
    phone: "0507-1280-3334",
    location: "수도권 주요 지역 24시 운영",
    badge: "프리미엄 감성",
    image: "/shop4.jpg",
    desc: "전문 테라피스트들의 섬세한 터치로 완성되는 1:1 맞춤형 리프레시! 출장 환경에서 릴렉스 케어와 전신 아로마 마사지로 여왕처럼 누리는 최고급 웰니스 서비스를 경험하세요.",
    courses: [
      { name: "건식 베이직 케어", time: "60분", price: "60,000원", desc: "목, 어깨, 등의 뭉친 피로를 가볍게 풀어주는 건식 프로그램" },
      { name: "건식 스탠다드 테라피", time: "90분", price: "80,000원", desc: "전신 근육을 차분하게 이완시키는 여유로운 건식 힐링 마사지" },
      { name: "건식 풀케어 프로그램", time: "120분", price: "100,000원", desc: "누적된 피로를 완벽하게 날려주는 120분 집중 건식 코스" },
      { name: "오일 베이직 순환 케어", time: "60분", price: "70,000원", desc: "천연 아로마 오일로 피부 보습과 순환을 돕는 마사지 프로그램" },
      { name: "오일 스탠다드 힐링 테라피", time: "90분", price: "80,000원", desc: "지친 감각을 부드럽게 달래주는 아로마 마사지 힐링 코스" },
      { name: "오일 풀케어 프리미엄 프로그램", time: "120분", price: "100,000원", desc: "전신을 풍성한 에센셜 오일로 채워주는 프리미엄 바디케어" },
      { name: "스웨디시 마일드 릴렉스 케어", time: "60분", price: "80,000원", desc: "부드럽고 감미로운 터치의 소프트 스웨디시 마사지 힐링" },
      { name: "스웨디시 포커스 웰니스 테라피", time: "90분", price: "100,000원", desc: "깊은 안정감과 이완을 선사하는 프리미엄 스웨디시 코스" },
      { name: "스웨디시 스페셜 풀케어 프로그램", time: "120분", price: "120,000원", desc: "여유롭고 섬세하게 진행되는 120분 감성 마사지 힐링" },
      { name: "VIP 맞춤형 스페셜 케어 (60분)", time: "60분", price: "100,000원", desc: "차별화된 만족감을 선사하는 VIP 스페셜 바디케어 프로그램" },
      { name: "VIP 맞춤형 스페셜 케어 (90분)", time: "90분", price: "120,000원", desc: "고객 컨디션에 따른 최상급 테라피스트의 집중 마사지" },
      { name: "VIP 맞춤형 스페셜 케어 (120분)", time: "120분", price: "150,000원", desc: "온전한 휴식과 안정을 누리는 120분 VIP 마사지 마스터피스" },
      { name: "한국인 관리사 전담 케어 (60분)", time: "60분", price: "150,000원", desc: "전문 한국인 관리사의 디테일한 1:1 맞춤 케어 서비스" },
      { name: "한국인 관리사 전담 케어 (90분)", time: "90분", price: "180,000원", desc: "최고의 만족도를 드리는 프리미엄 한국인 전담 마사지 코스" },
    ],
    features: ["세련된 감성 바디케어", "100% 현장 후불 결제", "24시간 실시간 상담 대기"],
  },
  "5": {
    name: "한국골든테라피",
    phone: "0507-1280-3361",
    location: "수도권 실시간 힐링 스팟",
    badge: "인기도 TOP 5",
    image: "/shop5.jpg",
    desc: "정직한 정찰제 운영과 포근한 안식을 약속하는 스페셜 힐링 스팟! 출장 시스템을 통해 스웨디시 마사지와 전신 릴렉스 케어로 지친 일상에 편안한 쉼표를 찍어드립니다.",
    courses: [
      { name: "골든 스웨디시 프리미엄 케어 (60분)", time: "60분", price: "140,000원", desc: "부드럽고 감성적인 터치로 심신을 녹여주는 스웨디시 마사지 코스" },
      { name: "골든 스웨디시 프리미엄 케어 (90분)", time: "90분", price: "190,000원", desc: "깊은 안정감과 활력을 불어넣는 90분 명품 스웨디시 프로그램" },
      { name: "스페셜 릴렉스 힐링 케어 (60분)", time: "60분", price: "110,000원", desc: "굳은 몸을 효율적으로 이완시켜 주는 실속형 바디 마사지" },
      { name: "스페셜 릴렉스 힐링 케어 (90분)", time: "90분", price: "130,000원", desc: "여유로운 템포로 전신 밸런스를 되찾아주는 힐링 프로그램" },
      { name: "스페셜 릴렉스 힐링 케어 (120분)", time: "120분", price: "150,000원", desc: "모든 피로를 개운하게 해소하는 120분 전신 마사지 풀코스" },
    ],
    features: ["100% 후불제 안심 예약", "수도권 전지역 빠른 안내", "전문 힐러진 상시 대기"],
  },
};

// 🌟 이전 조건(60종 타이틀 & 40종 디스크립션 풀) 연동 메타데이터 생성
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, shopId } = resolvedParams;

  const locationPrefix = parseDistrictLocationText(region, district);

  // 고유 해시 시드: 지역 + 구 + shopId 결합 (매장마다 고유하고 일정한 순번 보장)
  const titleSeed = `${locationPrefix}-${shopId}-shop-title`;
  const descSeed = `${locationPrefix}-${shopId}-shop-desc`;

  const titleIndex = getHashCode(titleSeed) % titleTemplates.length; // 60가지 순환
  const descIndex = getHashCode(descSeed) % descTemplates.length;    // 40가지 순환

  // {loc}를 "서울 강남구"와 같은 위치 명칭으로 치환
  const formattedTitle = titleTemplates[titleIndex].replaceAll("{loc}", locationPrefix);
  const formattedDesc = descTemplates[descIndex].replaceAll("{loc}", locationPrefix);

  const canonicalUrl = `https://tagtherest.netlify.app/massage/${region}/${encodeURIComponent(safeDecode(district))}/shop/${shopId}`;

  return {
    metadataBase: new URL("https://tagtherest.netlify.app"),
    title: {
      absolute: formattedTitle,
    },
    description: formattedDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: formattedTitle,
      description: formattedDesc,
      url: canonicalUrl,
      locale: "ko_KR",
      type: "article",
    },
  };
}

export default async function DistrictShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, shopId } = resolvedParams;

  const regionInfo = regionData[region];
  if (!regionInfo) {
    notFound();
  }

  const districtName = safeDecode(district);
  const locationPrefix = parseDistrictLocationText(region, district);
  const shop = shopData[shopId] || shopData["1"];

  const displayShopName = `${locationPrefix} 출장 방문 마사지 - ${shop.name}`;

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-24">
      {/* 상단 헤더 */}
      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center font-black text-black text-xs shadow border border-amber-300">
              태그
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                태그더레스트
              </span>
              <span className="text-[10px] text-gray-400 tracking-tighter">WELLNESS PARTNER</span>
            </div>
          </Link>

          <Link
            href={`/massage/${region}/${encodeURIComponent(districtName)}`}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {districtName} 목록으로
          </Link>
        </div>
      </header>

      {/* 브레드크럼 */}
      <div className="max-w-4xl mx-auto px-4 pt-4 w-full">
        <nav className="text-xs text-gray-400 flex items-center gap-1.5 flex-wrap">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <Link href={`/massage/${region}`} className="hover:text-amber-400 transition-colors">
            {regionInfo.name}
          </Link>
          <span>&gt;</span>
          <Link href={`/massage/${region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400 transition-colors">
            {districtName}
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{shop.name}</span>
        </nav>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1 space-y-8">
        {/* 매장 메인 프로필 카드 */}
        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden">
            <img src={shop.image} alt={shop.name} className="w-full h-full object-cover filter brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30" />
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {shop.location}
            </div>

            <h1 className="text-xl md:text-3xl font-black text-white">{displayShopName}</h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {shop.desc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 상세 코스 및 요금 안내 */}
        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">WELLNESS COURSE & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">💎 대표 웰니스 코스 및 요금 안내</h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 p-5 rounded-2xl flex justify-between items-center hover:border-amber-500/40 transition-colors">
                <div>
                  <span className="text-amber-400 text-[10px] font-black mr-2">{course.time}</span>
                  <h3 className="font-extrabold text-white text-base inline">{course.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{course.desc}</p>
                </div>
                <span className="text-base font-black text-amber-400 shrink-0 ml-4">{course.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 안심 이용 안내 */}
        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> {locationPrefix} 웰니스 휴식처 안심 이용 안내
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>모든 제휴 스팟은 <strong>100% 현장 후불제</strong>로만 운영되며 사전 예약금이나 선입금을 절대 요구하지 않습니다.</li>
            <li>희망하시는 시간 여유 있게 문의 주시면 전문 테라피스트가 신속하게 안내해 드립니다.</li>
          </ul>
        </section>
      </main>

      {/* 하단 고정 전화 / 문자 바 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)] active:scale-95 transition-transform"
          >
            📞 전화로 즉시예약
          </a>
          <a
            href={`sms:${shop.phone}?body=${encodeURIComponent(`[${locationPrefix}]${shop.name} 예약 문의드립니다.`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 active:scale-95 transition-transform"
          >
            💬 간편 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}
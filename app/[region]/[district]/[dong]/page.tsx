import { Metadata } from "next";
import DongClientUI from "./DongClientUI";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

function getRegionKoreanName(region: string): string {
  switch (region.toLowerCase()) {
    case "seoul": return "서울";
    case "incheon": return "인천";
    case "gyeonggi": return "경기";
    default: return "수도권";
  }
}

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

// 🌟 1단: 메인 코스 및 검색 타겟 키워드 풀 (출장 완전 배제)
const primaryServiceTypes = [
  '스웨디시 마사지 추천', '아로마 마사지 추천', '타이 마사지 추천', '힐링 바디케어 추천',
  '감성 테라피 마사지', '프리미엄 전신 마사지', '림프 순환 마사지 추천', '맞춤 릴렉스 마사지',
  '딥티슈 힐링 마사지', '스포츠 바디 마사지', '호텔식 감성 마사지', 'VIP 웰니스 테라피',
  '전문 바디 마사지 추천', '아로마 릴렉싱 마사지', '스웨디시 힐링 테라피', '체형 맞춤 전신 마사지'
];

// 🌟 2단: CTR을 높이는 롱테일 소구 문구 풀 (구분자 뒤에 위치)
const secondarySubTitles = [
  '전국 감성 아로마 케어 총정리', '1:1 프라이빗 힐링 코스 안내', '동네 인기 제휴 샵 코스 및 요금',
  '내 주변 안심 힐링 스팟 가이드', '전신 피로회복 맞춤 프로그램', '정직한 정찰제 안심 케어 안내',
  '숙련된 전문 힐러진 프로그램 정리', '부드러운 오일 릴렉스 케어 안내', '도심 속 프라이빗 휴식처 총정리',
  '당일 예약 맞춤 힐링 스팟 추천', '체계적인 전신 웰니스 코스 안내', '인기 샵 상세 프로그램 및 팁'
];

// 🌟 상세 설명 풀 (30개)
const dongDescriptions = [
  '선입금 없는 안전한 시스템과 투명한 정찰제로 편안한 휴식을 선사합니다.',
  '검증된 전문 샵 정보와 체계적인 프로그램으로 지친 피로를 풀어드립니다.',
  '엄선된 전문 관리사의 섬세한 손길로 최상의 마사지 힐링을 누려보세요.',
  '향기로운 아로마와 부드러운 터치로 나만의 프라이빗한 휴식을 선사합니다.',
  '일상에 지친 몸과 마음에 활력을 불어넣어 주는 맞춤형 테라피 안내.',
  '깊은 근육까지 시원하게 이완시켜 주는 전문 바디케어 서비스를 만나보세요.',
  '철저한 위생 관리와 고객 만족 중심의 고품격 프로그램을 제공합니다.',
  '빠르고 편리한 정보 확인으로 언제 어디서나 편안한 휴식을 누리세요.',
  '부드러운 오일과 정성 어린 터칭으로 깊은 안정감을 드립니다.',
  '피로와 스트레스를 말끔히 해소해 주는 프리미엄 바디 릴렉스 가이드.'
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const dongName = dong && dong !== "all" ? safeDecode(dong) : "";

  const locationTitle = `${regionName} ${districtName} ${dongName}`.trim();

  // 🌟 순차적 인덱스 계산 (출장 배제, 1,000개 이상 문서 고유 조합 보장)
  const seedString = `${locationTitle}-expanded-dong-seo`;
  const charSum = seedString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const priIdx = charSum % primaryServiceTypes.length;
  const secIdx = (charSum * 3) % secondarySubTitles.length;
  const descIdx = (charSum * 7) % dongDescriptions.length;

  // 💡 [지역 구 동] [1단 키워드]｜[2단 소구 문구] 구조로 약 35~40자 구성
  const finalTitle = `${locationTitle} ${primaryServiceTypes[priIdx]}｜${secondarySubTitles[secIdx]}`;
  const finalDescription = `${locationTitle} 마사지 샵 정보. ${secondarySubTitles[secIdx]}. ${dongDescriptions[descIdx]}`;

  return {
    metadataBase: new URL("https://tagtherest.netlify.app"),
    title: {
      absolute: finalTitle
    },
    description: finalDescription,
    alternates: {
      canonical: `https://tagtherest.netlify.app/${region}/${district}/${dong}`,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://tagtherest.netlify.app/${region}/${district}/${dong}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { region, district, dong } = resolvedParams;

  const regionName = getRegionKoreanName(region);
  const districtName = safeDecode(district);
  const dongName = dong && dong !== "all" ? safeDecode(dong) : "";
  const locationTitle = `${regionName} ${districtName} ${dongName}`.trim();

  return (
    <DongClientUI 
      region={region} 
      district={district} 
      dong={dong} 
      locationTitle={locationTitle} 
    />
  );
}
import { Metadata } from "next";
import RegionalClientUI from "./RegionalClientUI";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
  searchParams: Promise<{
    dong?: string;
  }>;
}

// 🌟 축약형 지역명 반환 (서울시 -> 서울, 경기도 -> 경기 등)
function getRegionShortName(region: string): string {
  switch (region.toLowerCase()) {
    case "seoul": return "서울";
    case "incheon": return "인천";
    case "gyeonggi": return "경기";
    default: return "수도권";
  }
}

// 🛠️ 이중 URL 인코딩까지 안전하게 풀어내는 디코더
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

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { region, district } = resolvedParams;
  const regionName = getRegionShortName(region);
  const districtName = safeDecode(district);
  const dongName = resolvedSearchParams.dong ? safeDecode(resolvedSearchParams.dong) : "";

  const locationKeyword = `${regionName} ${districtName} ${dongName}`.trim();
  const simpleLocation = dongName ? `${districtName} ${dongName}` : districtName;

  // 20개의 고유 인덱스를 만들기 위한 문자 코드 합산
  const charSum = (locationKeyword + districtName).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const variantIndex = charSum % 20;

  // 🎯 '마사지' 키워드가 포함된 20개 고유 타이틀 리스트
  const titleVariants = [
    `${locationKeyword} 마사지 24시 제휴 안내 및 추천 스팟 | 태그더레스트`,
    `${simpleLocation} 프리미엄 마사지 프로그램 및 정찰제 요금 정보 · 태그더레스트`,
    `${locationKeyword} 전문 아로마 및 스웨디시 마사지 힐링 가이드 - 태그더레스트`,
    `${simpleLocation} 일상 속 휴식을 선사하는 정통 마사지 공간 | 태그더레스트`,
    `${locationKeyword} 베테랑 힐러와 함께하는 전신 마사지 제휴점 - 태그더레스트`,
    `${simpleLocation} 웰니스 바디케어 및 프리미엄 마사지 코스 안내 · 태그더레스트`,
    `${locationKeyword} 1:1 맞춤형 릴렉스 마사지 프로그램 큐레이션 - 태그더레스트`,
    `${simpleLocation} 신뢰할 수 있는 마사지 제휴업체 정보 및 이용 가이드 | 태그더레스트`,
    `${locationKeyword} 쾌적한 감성 마사지 및 아로마 테라피 정보 - 태그더레스트`,
    `${simpleLocation} 피로회복을 위한 맞춤형 마사지 코스 및 요금 · 태그더레스트`,
    `${locationKeyword} 전문 테라피스트 마사지 제휴 샵 리스트 - 태그더레스트`,
    `${simpleLocation} 편안한 안식을 위한 바디케어 및 마사지 안내 - 태그더레스트`,
    `${locationKeyword} 감성 릴렉싱 및 스웨디시 마사지 프로그램 요약 - 태그더레스트`,
    `${simpleLocation} 도심 속 프라이빗 힐링 마사지 전문 스팟 안내 - 태그더레스트`,
    `${locationKeyword} 맞춤형 바디 테라피 및 마사지 제휴 정보 - 태그더레스트`,
    `${simpleLocation} 쾌적하고 조용한 마사지 샵 이용 가이드 - 태그더레스트`,
    `${locationKeyword} 프리미엄 컨디션 케어 및 마사지 프로그램 안내 - 태그더레스트`,
    `${simpleLocation} 일상 회복을 위한 바디 릴렉싱 마사지 코스 - 태그더레스트`,
    `${locationKeyword} 정통 테라피 및 감성 마사지 제휴 가이드 - 태그더레스트`,
    `${simpleLocation} 안심하고 이용하는 웰니스 마사지 정보 플랫폼 · 태그더레스트`
  ];

  // 🎯 '마사지' 키워드가 포함된 20개 고유 디스크립션 리스트
  const descriptionVariants = [
    `수도권 지역 내 엄선된 마사지 제휴 샵의 프로그램과 정찰제 요금 정보를 제공합니다.`,
    `숙련된 테라피스트와 함께 마사지를 통해 몸과 마음의 피로를 깊게 비워내 보세요.`,
    `엄선된 바디케어 전문 제휴점의 상세 마사지 코스와 편안한 이용 방법을 확인하세요.`,
    `안락한 분위기 속에서 즐기는 품격 있는 스웨디시 및 아로마 마사지 안내.`,
    `바쁜 일상에서 벗어나 마사지로 온전한 휴식을 누릴 수 있는 최적의 힐링 공간 정보.`,
    `투명하고 정직한 제휴 리스트를 통해 나에게 알맞은 마사지 코스를 찾아보세요.`,
    `부드러운 손길의 마사지와 체계적인 프로그램으로 지친 신체 리듬을 리프레시해드립니다.`,
    `청결하고 포근한 환경을 갖춘 지역별 인기 마사지 및 웰니스 케어 가이드.`,
    `다양한 테크닉과 맞춤형 마사지 프로그램 정보를 한눈에 비교해 보세요.`,
    `몸의 긴장을 완화하고 안정감을 선사하는 전문 마사지 힐링 프로그램.`,
    `세심한 마사지 관리를 통해 일상의 스트레스를 말끔히 해소할 수 있는 웰니스 안내.`,
    `엄격하게 선별된 마사지 제휴 스팟들의 위치와 다채로운 코스 상세 내용 정리.`,
    `부담 없이 방문하여 여유를 즐길 수 있는 쾌적한 바디케어 마사지 네트워크.`,
    `정성 어린 마사지 손길로 전신에 활력을 불어넣어 주는 프리미엄 휴식 서비스.`,
    `차분하고 아늑한 분위기에서 진행되는 전문 마사지 테라피 코스 소개.`,
    `개개인의 컨디션에 맞춘 섬세한 마사지 케어로 최상의 릴렉스를 경험하세요.`,
    `믿을 수 있는 마사지 제휴 정보와 투명한 코스 안내를 지금 만나보세요.`,
    `지친 활력을 채워줄 품격 있는 전신 바디케어 및 마사지 힐링 가이드.`,
    `편안한 휴식과 재충전을 위한 필수 마사지 제휴 정보 플랫폼.`,
    `누구나 쉽고 편리하게 찾아볼 수 있는 수도권 맞춤형 마사지 및 테라피 소식.`
  ];

  const finalTitle = titleVariants[variantIndex];
  const finalDescription = descriptionVariants[variantIndex];

  return {
    metadataBase: new URL("https://tagtherest.netlify.app"),
    title: {
      absolute: finalTitle,
    },
    description: finalDescription,
    keywords: [
      `${locationKeyword} 마사지`,
      `${locationKeyword} 타이마사지`,
      `${locationKeyword} 스웨디시`,
      `${simpleLocation} 아로마 마사지`,
      `${simpleLocation} 바디케어`,
      `${simpleLocation} 웰니스 휴식처`,
      "태그더레스트"
    ],
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: `https://tagtherest.netlify.app/${region}/${encodeURIComponent(districtName)}${dongName ? `?dong=${encodeURIComponent(dongName)}` : ""}`,
      siteName: "태그더레스트",
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function RegionalDetailPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const reg = resolvedParams.region;
  const dist = safeDecode(resolvedParams.district);
  const dong = resolvedSearchParams.dong ? safeDecode(resolvedSearchParams.dong) : "";

  return <RegionalClientUI region={reg} district={dist} dongName={dong} />;
}
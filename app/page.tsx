import type { Metadata } from "next";
import MainClientUI from "./MainClientUI";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "태그더레스트 | 수도권 마사지·스웨디시 1인샵 추천 큐레이션",
  description:
    "서울, 경기, 인천 수도권 전 지역 프리미엄 출장마사지, 홈타이, 감성 스웨디시, 1인샵 추천 가이드. 100% 현장 후불제 안심 제휴 샵 코스 및 요금 정보를 실시간으로 확인하세요.",
  keywords: [
    "태그더레스트",
    "수도권 마사지",
    "서울 마사지",
    "경기 마사지",
    "인천 마사지",
    "출장마사지",
    "홈타이",
    "소프트스웨디시",
    "스웨디시 1인샵",
    "아로마 테라피",
    "바디케어",
  ],
  alternates: {
    canonical: "https://tagtherest.netlify.app",
  },
  openGraph: {
    title: "태그더레스트 | 수도권 마사지·홈타이·스웨디시 웰니스 쉼표",
    description:
      "바쁜 일상 속 온전한 안식을 전하는 서울·경기·인천 권역별 맞춤형 힐링 마사지 샵 큐레이션 플랫폼.",
    url: "https://tagtherest.netlify.app",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function Page() {
  return <MainClientUI />;
}
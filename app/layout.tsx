import type { Metadata } from "next";
import "./globals.css";
import NavigationHeader from "./NavigationHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://tagtherest.netlify.app"),
  title: "태그더레스트 | 일상 속 완벽한 쉼표, 수도권 힐링 & 컨디션 케어",
  description: "서울, 경기, 인천 수도권 전역에서 지친 몸과 마음의 피로를 깊게 비워내는 프리미엄 웰니스 휴식처, 태그더레스트에서 온전한 안식을 경험하세요.",
  keywords: "태그더레스트, 수도권 힐링, 컨디션 케어, 바디 릴렉싱, 프라이빗 스파, 일상 휴식, 웰니스 플랫폼, 스페셜 바디케어",
  verification: {
    google: "", // 추후 구글 서치콘솔 인증 코드로 입력하세요
    other: {
      "naver-site-verification": "281eee39eb8d595e393a2eb59ea89ec37ae51feb",
    },
  },
  openGraph: {
    title: "태그더레스트 | 일상 속 완벽한 쉼표, 수도권 힐링 & 컨디션 케어",
    description: "바쁜 일상 속 가벼운 산책과 깊은 이완을 선사하는 수도권 권역별 맞춤형 휴식 공간 큐레이션.",
    url: "https://tagtherest.netlify.app",
    siteName: "태그더레스트",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <NavigationHeader />
        {children}
      </body>
    </html>
  );
}
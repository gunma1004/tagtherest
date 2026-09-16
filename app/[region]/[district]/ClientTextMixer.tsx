"use client";

import { useEffect, useState } from "react";

export default function ClientTextMixer({ locationText }: { locationText: string }) {
  // 초기 렌더링 문구 (서버-클라이언트 일치)
  const [keywordText, setKeywordText] = useState(
    `${locationText} 태그더레스트 추천 프리미엄 웰니스 바디케어`
  );

  useEffect(() => {
    // 접속 시 자연스럽고 깔끔한 키워드 조합으로 회전 (스팸 키워드 배제 및 신뢰도 향상)
    const dynamicKeywords = [
      `${locationText} 태그더레스트 추천 프리미엄 웰니스 바디케어`,
      `${locationText} 맞춤형 힐링 테라피 및 전문 샵 가이드`,
      `${locationText} 편안한 휴식을 선사하는 감성 스웨디시 & 테라피`,
      `${locationText} 베테랑 관리사의 1:1 맞춤형 피로회복 웰니스 케어`,
    ];

    // 랜덤하게 하나의 문구로 자연스럽게 전환
    const randomIndex = Math.floor(Math.random() * dynamicKeywords.length);
    setKeywordText(dynamicKeywords[randomIndex]);
  }, [locationText]);

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-inner">
      <p className="text-xs md:text-sm font-bold text-amber-300 tracking-wide">
        ✨ {keywordText}
      </p>
    </div>
  );
}
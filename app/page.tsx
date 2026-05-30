'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback, useMemo, Suspense } from 'react';
import { getTodayQuote, getQuoteById } from '@/data/quotes';
import { useFavorites } from '@/hooks/useFavorites';
import QuoteDisplay from '@/components/QuoteDisplay';
import Toast from '@/components/Toast';

// useSearchParams는 Suspense 경계 안에서만 사용 가능
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 토스트 메시지 상태
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  // URL 파라미터(quoteId) 또는 오늘 날짜 기반으로 표시할 명언 결정
  const quote = useMemo(() => {
    const quoteIdParam = searchParams.get('quoteId');

    if (quoteIdParam) {
      const id = parseInt(quoteIdParam, 10);
      const found = getQuoteById(id);
      // ID에 해당하는 명언이 있으면 표시, 없으면 오늘의 명언 표시
      return found ?? getTodayQuote();
    }
    return getTodayQuote();
  }, [searchParams]);

  // 클립보드 복사 후 Toast 표시
  const handleShare = useCallback(async () => {
    if (!quote) return;

    const text = `"${quote.text}" — ${quote.author}`;

    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('명언이 클립보드에 복사되었습니다!');
    } catch {
      // clipboard API 미지원 환경 대응
      setToastMessage('복사에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [quote]);

  // Toast 닫기
  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  // quoteId 파라미터 제거 후 홈으로 이동 (뒤로가기 히스토리 정리)
  const handleNavigateToList = () => {
    router.push('/quotes');
  };

  if (!quote) {
    /* 로딩 상태: 전체 화면 스피너 */
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
          <p className="text-sm text-gray-400 dark:text-gray-500">불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    /* 홈 페이지 래퍼: 최소 화면 높이 확보, 배경색 통일 */
    <div className="flex flex-col bg-white dark:bg-gray-950">
      <main className="flex-1">
        <QuoteDisplay
          quote={quote}
          isFavorite={isFavorite(quote.id)}
          onToggleFavorite={toggleFavorite}
          onShare={handleShare}
          onNavigateToList={handleNavigateToList}
        />
      </main>

      {/* 토스트 알림 */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleToastClose} />
      )}
    </div>
  );
}

// Suspense 래퍼: useSearchParams 사용을 위해 필요
export default function Home() {
  return (
    <Suspense
      fallback={
        /* Suspense 폴백: 다크 모드 배경/스피너 색상 적용 */
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { getTodayQuote, getQuoteById } from '@/data/quotes';
import { useFavorites } from '@/hooks/useFavorites';
import QuoteDisplay from '@/components/QuoteDisplay';
import Toast from '@/components/Toast';
import type { Quote } from '@/types/quote';

// useSearchParams는 Suspense 경계 안에서만 사용 가능
function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 표시할 명언 상태
  const [quote, setQuote] = useState<Quote | null>(null);
  // 토스트 메시지 상태
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  // URL 파라미터(quoteId) 또는 오늘 날짜 기반으로 표시할 명언 결정
  useEffect(() => {
    const quoteIdParam = searchParams.get('quoteId');

    if (quoteIdParam) {
      const id = parseInt(quoteIdParam, 10);
      const found = getQuoteById(id);
      // ID에 해당하는 명언이 있으면 표시, 없으면 오늘의 명언 표시
      setQuote(found ?? getTodayQuote());
    } else {
      setQuote(getTodayQuote());
    }
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

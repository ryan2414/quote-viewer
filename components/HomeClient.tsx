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

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();

  // URL 파라미터(quoteId) 또는 오늘 날짜 기반으로 표시할 명언 결정
  const quote = useMemo(() => {
    const quoteIdParam = searchParams.get('quoteId');

    if (quoteIdParam) {
      const id = parseInt(quoteIdParam, 10);
      const found = getQuoteById(id);
      return found ?? getTodayQuote();
    }
    return getTodayQuote();
  }, [searchParams]);

  const handleShare = useCallback(async () => {
    if (!quote) return;

    const text = `"${quote.text}" — ${quote.author}`;

    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('명언이 클립보드에 복사되었습니다!');
    } catch {
      setToastMessage('복사에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [quote]);

  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  const handleNavigateToList = () => {
    router.push('/quotes');
  };

  if (!quote) {
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

      {toastMessage && (
        <Toast message={toastMessage} onClose={handleToastClose} />
      )}
    </div>
  );
}

export default function HomeClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
          <div className="w-8 h-8 border-4 border-gray-300 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}

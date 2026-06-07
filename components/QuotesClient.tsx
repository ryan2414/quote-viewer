'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { quotes, getQuotesByCategory, getQuoteById } from '@/data/quotes';
import { categories } from '@/data/categories';
import type { CategoryId } from '@/data/categories';
import type { Quote } from '@/types/quote';
import { useFavorites } from '@/hooks/useFavorites';
import QuoteCard from '@/components/QuoteCard';
import SkeletonCard from '@/components/SkeletonCard';
import TodayQuoteSection from '@/components/TodayQuoteSection';
import Toast from '@/components/Toast';

type TabType = 'all' | CategoryId | 'favorites';

const tabs = [
  { id: 'all' as TabType, label: '전체' },
  ...categories.map((c) => ({ id: c.id as TabType, label: c.label })),
  { id: 'favorites' as TabType, label: '즐겨찾기' },
];

interface QuotesClientProps {
  todayQuote: Quote;
  initialQuoteId?: number;
}

export default function QuotesClient({ todayQuote, initialQuoteId }: QuotesClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | undefined>(initialQuoteId);

  const { isFavorite, toggleFavorite, favoriteIds, isHydrated } = useFavorites();

  // 히어로 섹션에 표시할 명언: 선택된 명언 또는 오늘의 명언
  const displayedQuote = useMemo(() => {
    if (selectedQuoteId !== undefined) {
      return getQuoteById(selectedQuoteId) ?? todayQuote;
    }
    return todayQuote;
  }, [selectedQuoteId, todayQuote]);

  // 카드 클릭: 히어로 섹션 명언 교체 + URL 업데이트 + 상단 스크롤
  const handleCardClick = useCallback((quoteId: number) => {
    setSelectedQuoteId(quoteId);
    router.push(`/quotes?quoteId=${quoteId}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router]);

  const handleShare = useCallback(async () => {
    const text = `"${displayedQuote.text}" — ${displayedQuote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('명언이 클립보드에 복사되었습니다!');
    } catch {
      setToastMessage('복사에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [displayedQuote]);

  const filteredQuotes = useMemo(() => {
    if (activeTab === 'all') return quotes;
    if (activeTab === 'favorites') return quotes.filter((q) => favoriteIds.includes(q.id));
    return getQuotesByCategory(activeTab as CategoryId);
  }, [activeTab, favoriteIds]);

  const tabCount = useMemo(() => {
    const counts: Record<TabType, number> = { all: quotes.length, favorites: 0 } as Record<TabType, number>;
    categories.forEach((c) => {
      counts[c.id] = getQuotesByCategory(c.id).length;
    });
    counts['favorites'] = favoriteIds.length;
    return counts;
  }, [favoriteIds]);

  const isFavoritesEmpty = activeTab === 'favorites' && isHydrated && filteredQuotes.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* 오늘의 명언 히어로 섹션 */}
      <TodayQuoteSection
        quote={displayedQuote}
        isFavorite={isFavorite(displayedQuote.id)}
        onToggleFavorite={toggleFavorite}
        onShare={handleShare}
      />

      {/* 명언 목록 섹션 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            명언 모음
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            마음에 와닿는 명언을 찾아 저장해 보세요
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8 sm:mb-10">
          <div
            className="flex overflow-x-auto gap-2 pb-2"
            role="tablist"
            aria-label="명언 카테고리 필터"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-none px-4 sm:px-5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 whitespace-nowrap ${
                    isActive
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                      : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm'
                  }`}
                >
                  {tab.label}
                  {/* favorites: hydrated + count > 0일 때만 뱃지 표시, 나머지 탭: 항상 표시 */}
                  {tab.id === 'favorites' ? (
                    isHydrated && tabCount['favorites'] > 0 && (
                      <span
                        className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                            : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                        }`}
                      >
                        {tabCount['favorites']}
                      </span>
                    )
                  ) : (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tabCount[tab.id] ?? 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 카드 그리드 또는 즐겨찾기 빈 상태 */}
        {!isHydrated ? (
          // hydration 전: 스켈레톤 12개로 CLS 방지
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isFavoritesEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 gap-4 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
                즐겨찾기한 명언이 없습니다
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                마음에 드는 명언의 하트 버튼을 눌러 저장하세요.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              전체 명언 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isFavorite={isFavorite(quote.id)}
                onToggleFavorite={toggleFavorite}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

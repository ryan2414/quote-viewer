'use client';

import { useState, useMemo } from 'react';
import { quotes, getQuotesByCategory } from '@/data/quotes';
import { categories } from '@/data/categories';
import type { CategoryId } from '@/data/categories';
import { useFavorites } from '@/hooks/useFavorites';
import QuoteCard from '@/components/QuoteCard';

// 탭 타입: 전체 | 카테고리 5종 | 즐겨찾기
type TabType = 'all' | CategoryId | 'favorites';

// 탭 메타데이터: 순서 = 전체 → 카테고리(5) → 즐겨찾기
const tabs = [
  { id: 'all' as TabType, label: '전체' },
  ...categories.map((c) => ({ id: c.id as TabType, label: c.label })),
  { id: 'favorites' as TabType, label: '즐겨찾기' },
];

export default function QuotesPage() {
  // 현재 활성 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const { isFavorite, toggleFavorite, favoriteIds, isHydrated } = useFavorites();

  // 탭에 따른 명언 목록 필터링 (favoriteIds를 의존성에 포함하여 즐겨찾기 변경 반응)
  const filteredQuotes = useMemo(() => {
    if (activeTab === 'all') return quotes;
    if (activeTab === 'favorites') return quotes.filter((q) => favoriteIds.includes(q.id));
    return getQuotesByCategory(activeTab as CategoryId);
  }, [activeTab, favoriteIds]);

  // 각 탭의 명언 수 계산 (배지 표시용)
  const tabCount = useMemo(() => {
    const counts: Record<TabType, number> = { all: quotes.length, favorites: 0 } as Record<TabType, number>;
    categories.forEach((c) => {
      counts[c.id] = getQuotesByCategory(c.id).length;
    });
    counts['favorites'] = favoriteIds.length;
    return counts;
  }, [favoriteIds]);

  // 즐겨찾기 빈 상태 여부
  const isFavoritesEmpty = activeTab === 'favorites' && isHydrated && filteredQuotes.length === 0;

  return (
    /* 명언 목록 페이지: 배경색 통일, 최소 높이 확보 */
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* 페이지 헤더: 제목 + 부제목 계층 구조 */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            명언 모음
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            마음에 와닿는 명언을 찾아 저장해 보세요
          </p>
        </div>

        {/* 탭 네비게이션: 7개 탭, 가로 스크롤 가능 */}
        <div className="mb-8 sm:mb-10">
          <div
            className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide"
            role="tablist"
            aria-label="명언 카테고리 필터"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              // 즐겨찾기 탭은 hydration 전 카운트 숨김 (SSR 불일치 방지)
              const showCount = tab.id !== 'favorites' || isHydrated;

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
                  {/* 명언 수 배지 */}
                  {showCount && (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                          : tab.id === 'favorites' && tabCount[tab.id] > 0
                            ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
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

        {/* 카드 그리드 또는 빈 상태 */}
        {isFavoritesEmpty ? (
          /* 즐겨찾기 빈 상태 UI: 큰 아이콘 + 안내 문구 */
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
              className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 active:bg-gray-800 dark:active:bg-gray-200 transition-colors shadow-sm"
            >
              전체 명언 보기
            </button>
          </div>
        ) : (
          /* 명언 카드 그리드: 반응형 3단계 */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isFavorite={isFavorite(quote.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

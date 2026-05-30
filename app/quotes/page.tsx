'use client';

import { useState } from 'react';
import { quotes } from '@/data/quotes';
import { useFavorites } from '@/hooks/useFavorites';
import QuoteCard from '@/components/QuoteCard';

// 탭 타입 정의
type TabType = 'all' | 'favorites';

export default function QuotesPage() {
  // 현재 활성 탭 상태
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const { isFavorite, toggleFavorite, favoriteIds, isHydrated } = useFavorites();

  // 즐겨찾기 탭 표시 명언: favoriteIds 기반 필터링
  const favoriteQuotes = quotes.filter((q) => favoriteIds.includes(q.id));

  // 현재 탭에 따라 표시할 명언 배열 결정
  const displayedQuotes = activeTab === 'all' ? quotes : favoriteQuotes;

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

        {/* 탭 네비게이션: 전체 / 즐겨찾기 */}
        <div className="flex justify-center mb-8 sm:mb-10">
          <div
            className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 gap-1 shadow-sm"
            role="tablist"
            aria-label="명언 목록 필터"
          >
            {/* 전체 탭 */}
            <button
              role="tab"
              aria-selected={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
              className={`px-5 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-150 ${
                activeTab === 'all'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              전체
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  activeTab === 'all'
                    ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                }`}
              >
                {quotes.length}
              </span>
            </button>

            {/* 즐겨찾기 탭 */}
            <button
              role="tab"
              aria-selected={activeTab === 'favorites'}
              onClick={() => setActiveTab('favorites')}
              className={`px-5 sm:px-6 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-150 ${
                activeTab === 'favorites'
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              즐겨찾기
              {/* hydration 완료 후 카운트 표시 (SSR 불일치 방지) */}
              {isHydrated && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                    activeTab === 'favorites'
                      ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                      : favoriteIds.length > 0
                        ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {favoriteIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 카드 그리드 또는 빈 상태 */}
        {activeTab === 'favorites' && isHydrated && favoriteQuotes.length === 0 ? (
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
            {displayedQuotes.map((quote) => (
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

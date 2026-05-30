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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* 페이지 제목 */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          명언 모음
        </h1>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              전체
              <span className="ml-2 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                {quotes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              즐겨찾기
              {/* hydration 완료 후 카운트 표시 (SSR 불일치 방지) */}
              {isHydrated && (
                <span className="ml-2 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-0.5 rounded-full">
                  {favoriteIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 카드 그리드 또는 빈 상태 */}
        {activeTab === 'favorites' && isHydrated && favoriteQuotes.length === 0 ? (
          // 즐겨찾기 빈 상태 UI
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              즐겨찾기한 명언이 없습니다
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              마음에 드는 명언의 하트 버튼을 눌러 저장하세요.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 px-5 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
            >
              전체 명언 보기
            </button>
          </div>
        ) : (
          // 명언 카드 그리드
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

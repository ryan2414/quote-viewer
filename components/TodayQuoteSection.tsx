'use client';

import type { Quote } from '@/types/quote';
import { getCategoryMeta } from '@/data/categories';
import FavoriteButton from './FavoriteButton';
import ShareButtons from './ShareButtons';

interface TodayQuoteSectionProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: () => void;
  onShuffle?: () => void;
  dayProgress?: { index: number; total: number };
}

export default function TodayQuoteSection({
  quote,
  isFavorite,
  onToggleFavorite,
  onShare,
  onShuffle,
  dayProgress,
}: TodayQuoteSectionProps) {
  const category = getCategoryMeta(quote.category);
  const bgClass = category
    ? `bg-gradient-to-br ${category.gradientClass}`
    : 'bg-white dark:bg-gray-950';

  return (
    <div className={`${bgClass} border-b border-gray-100 dark:border-gray-800 px-5 py-14 sm:px-8 sm:py-18`}>
      <div className="max-w-3xl mx-auto text-center space-y-7">
        {/* 섹션 레이블 및 진행 표시 */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
            오늘의 명언
          </p>
          {dayProgress && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              전체 {dayProgress.total}개 중 {dayProgress.index + 1}번째
            </p>
          )}
        </div>

        {/* 따옴표 아이콘 */}
        <div className="flex justify-center" aria-hidden="true">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* 명언 본문 */}
        <blockquote>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight animate-quoteReveal font-quote">
            {quote.text}
          </p>
        </blockquote>

        {/* 구분선 */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-12 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* 저자 및 카테고리 */}
        <div className="space-y-2">
          <p className="text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 tracking-wide">
            — {quote.author}
          </p>
          {quote.source && (
            <p className="text-sm text-gray-400 dark:text-gray-500 italic">{quote.source}</p>
          )}
          {category && (
            <div className="flex justify-center pt-1">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${category.badgeClass}`}>
                {category.label}
              </span>
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(quote.id)}
          />
          <div className="relative group">
            <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-700 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
              클립보드에 복사
            </span>
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md focus-ring"
              aria-label="명언 클립보드 복사"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              복사
            </button>
          </div>

          {onShuffle && (
            <button
              onClick={onShuffle}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md focus-ring"
              aria-label="다른 명언 보기"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              다른 명언
            </button>
          )}
        </div>

        {/* 소셜 공유 버튼 */}
        <div className="flex justify-center pt-1">
          <ShareButtons quoteText={quote.text} author={quote.author} quoteId={quote.id} />
        </div>
      </div>
    </div>
  );
}

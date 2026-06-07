'use client';

import type { Quote } from '@/types/quote';
import { getCategoryMeta } from '@/data/categories';
import FavoriteButton from './FavoriteButton';

interface TodayQuoteSectionProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onShare: () => void;
}

export default function TodayQuoteSection({
  quote,
  isFavorite,
  onToggleFavorite,
  onShare,
}: TodayQuoteSectionProps) {
  const category = getCategoryMeta(quote.category);

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-5 py-14 sm:px-8 sm:py-18">
      <div className="max-w-3xl mx-auto text-center space-y-7">
        {/* 섹션 레이블 */}
        <p className="text-xs font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase">
          오늘의 명언
        </p>

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
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight animate-quoteReveal">
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
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md"
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
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { QuoteDisplayProps } from '@/types/quote';
import FavoriteButton from './FavoriteButton';

export default function QuoteDisplay({
  quote,
  isFavorite,
  onToggleFavorite,
  onShare,
}: QuoteDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-12">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* 명언 본문 */}
        <p className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-relaxed">
          &quot;{quote.text}&quot;
        </p>

        {/* 저자 */}
        <div className="space-y-2">
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300">
            — {quote.author}
          </p>
          {quote.source && (
            <p className="text-base text-gray-500 dark:text-gray-400">
              {quote.source}
            </p>
          )}
        </div>

        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          {/* 즐겨찾기 버튼 */}
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(quote.id)}
          />

          {/* 공유 버튼 */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
            aria-label="명언 복사"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

          {/* 목록 보기 링크 */}
          <Link
            href="/quotes"
            className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium transition-colors"
          >
            목록 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Quote } from '@/types/quote';
import { useFavorites } from '@/hooks/useFavorites';
import FavoriteButton from './FavoriteButton';

interface QuoteDetailClientProps {
  quote: Quote;
  prevId: number | null;
  nextId: number | null;
  relatedQuotes: Quote[];
  categoryLabel?: string;
  categoryBadgeClass?: string;
}

export default function QuoteDetailClient({
  quote,
  prevId,
  nextId,
  relatedQuotes,
  categoryLabel,
  categoryBadgeClass,
}: QuoteDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 API 미지원 환경 무시
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-5 py-16 sm:px-8 sm:py-20">
      <div className="max-w-3xl w-full space-y-12">

        {/* 명언 카드 */}
        <div className="text-center space-y-8">
          {/* 따옴표 장식 */}
          <div className="flex justify-center" aria-hidden="true">
            <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* 명언 본문 */}
          <blockquote>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight font-[family-name:var(--font-quote)]">
              {quote.text}
            </p>
          </blockquote>

          {/* 구분선 */}
          <div className="flex justify-center" aria-hidden="true">
            <div className="w-16 h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* 저자 및 카테고리 */}
          <div className="space-y-3">
            <p className="text-lg sm:text-xl font-medium text-gray-500 dark:text-gray-400 tracking-wide">
              — {quote.author}
            </p>
            {categoryLabel && categoryBadgeClass && (
              <div className="flex justify-center">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${categoryBadgeClass}`}>
                  {categoryLabel}
                </span>
              </div>
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <FavoriteButton
              isFavorite={isFavorite(quote.id)}
              onToggle={() => toggleFavorite(quote.id)}
            />

            <div className="relative group">
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-700 text-white rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                {copied ? '복사됨!' : '클립보드에 복사'}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md"
                aria-label="명언 클립보드 복사"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {copied ? '복사됨!' : '복사'}
              </button>
            </div>

            <Link
              href="/quotes"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md"
            >
              목록 보기
            </Link>
          </div>
        </div>

        {/* 이전/다음 네비게이션 */}
        <nav className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800" aria-label="명언 이동">
          {prevId !== null ? (
            <Link
              href={`/quotes/${prevId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전 명언
            </Link>
          ) : (
            <div />
          )}

          <span className="text-xs text-gray-400 dark:text-gray-600">
            #{quote.id}
          </span>

          {nextId !== null ? (
            <Link
              href={`/quotes/${nextId}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              다음 명언
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* 관련 명언 */}
        {relatedQuotes.length > 0 && (
          <section aria-label="관련 명언">
            <h2 className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
              같은 카테고리 명언
            </h2>
            <ul className="space-y-3">
              {relatedQuotes.map((related) => (
                <li key={related.id}>
                  <Link
                    href={`/quotes/${related.id}`}
                    className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                      &ldquo;{related.text}&rdquo;
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">— {related.author}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

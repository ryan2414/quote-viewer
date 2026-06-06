'use client';

import { ScriptureDisplayProps } from '@/types/scripture';
import { getScriptureCategoryMeta } from '@/data/scriptureCategories';
import { formatReference, formatReferenceEn } from '@/data/scriptures';

export default function ScriptureDisplay({ scripture, onShare }: ScriptureDisplayProps) {
  const category = getScriptureCategoryMeta(scripture.category);
  const refKo = formatReference(scripture);
  const refEn = formatReferenceEn(scripture);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl w-full space-y-8 text-center">

        {/* 십자가 장식 아이콘 */}
        <div className="flex justify-center" aria-hidden="true">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </div>

        {/* 한국어 본문 */}
        <blockquote>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight">
            {scripture.text}
          </p>
        </blockquote>

        {/* 영어 본문 */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 italic leading-relaxed">
          {scripture.text_en}
        </p>

        {/* 구분선 */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-16 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* 출처 및 카테고리 */}
        <div className="space-y-3">
          <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 tracking-wide">
            {refKo}
          </p>
          <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 italic">
            {refEn} (NIV)
          </p>
          {category && (
            <div className="flex justify-center pt-1">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${category.badgeClass}`}>
                {category.label}
              </span>
            </div>
          )}
        </div>

        {/* 복사 버튼 */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:active:bg-blue-700 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md dark:shadow-blue-900/30"
            aria-label="구절 클립보드 복사"
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

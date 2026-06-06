'use client';

import { ScriptureCardProps } from '@/types/scripture';
import { getScriptureCategoryMeta } from '@/data/scriptureCategories';
import { formatReference, formatReferenceEn } from '@/data/scriptures';

export default function ScriptureCard({ scripture }: ScriptureCardProps) {
  const category = getScriptureCategoryMeta(scripture.category);
  const refKo = formatReference(scripture);
  const refEn = formatReferenceEn(scripture);

  return (
    <article className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-1 p-6 transition-all duration-200 ease-out h-full flex flex-col">

      {/* 한국어 본문 */}
      <p className="text-gray-800 dark:text-gray-100 font-medium text-sm sm:text-base leading-relaxed mb-4 flex-grow line-clamp-3">
        {scripture.text}
      </p>

      {/* 구분선 */}
      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-4" aria-hidden="true" />

      {/* 영어 본문 */}
      <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm italic leading-relaxed mb-4 line-clamp-2">
        {scripture.text_en}
      </p>

      {/* 출처 */}
      <div className="mt-auto space-y-2">
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold">
          {refKo}
        </p>
        <p className="text-gray-400 dark:text-gray-600 text-xs italic">
          {refEn}
        </p>
        {category && (
          <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${category.badgeClass}`}>
            {category.label}
          </span>
        )}
      </div>
    </article>
  );
}

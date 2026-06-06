'use client';

import { type Rarity } from '@/data/scriptures';
import { ScriptureCardProps } from '@/types/scripture';
import { getScriptureCategoryMeta } from '@/data/scriptureCategories';
import { formatReference, formatReferenceEn } from '@/data/scriptures';

// 희귀도별 테두리 + 그림자 — Tailwind 동적 클래스 금지, 전체 문자열 하드코딩
const rarityStyle: Record<Rarity, string> = {
  common:    'border-gray-100 dark:border-gray-800',
  rare:      'border-blue-400 dark:border-blue-500 shadow-blue-100 dark:shadow-blue-900/20',
  legendary: 'border-yellow-400 dark:border-yellow-500 shadow-yellow-100 dark:shadow-yellow-900/20',
};

interface Props extends ScriptureCardProps {
  rarity?: Rarity;
  blurred?: boolean;
}

export default function ScriptureCard({ scripture, rarity, blurred = false }: Props) {
  const category = getScriptureCategoryMeta(scripture.category);
  const refKo = formatReference(scripture);
  const refEn = formatReferenceEn(scripture);
  const borderClass = rarityStyle[rarity ?? 'common'];

  return (
    <article className={`relative bg-white dark:bg-gray-900 rounded-2xl border shadow-sm p-6 transition-all duration-200 ease-out h-full flex flex-col overflow-hidden ${borderClass} ${blurred ? 'cursor-default' : 'hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-1'}`}>

      {/* 블러 콘텐츠 레이어 */}
      <div className={blurred ? 'blur-sm select-none pointer-events-none flex flex-col flex-grow' : 'flex flex-col flex-grow'}>
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

        {/* 출처 + 희귀도 배지 */}
        <div className="mt-auto space-y-2">
          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-semibold">
            {refKo}
          </p>
          <p className="text-gray-400 dark:text-gray-600 text-xs italic">
            {refEn}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${category.badgeClass}`}>
                {category.label}
              </span>
            )}
            {rarity === 'rare' && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                ⭐⭐ 희귀
              </span>
            )}
            {rarity === 'legendary' && (
              <span className="inline-block text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                ⭐⭐⭐ 전설
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 블러 오버레이 */}
      {blurred && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/40 dark:bg-gray-900/40">
          <svg
            className="w-7 h-7 text-gray-400 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">뽑기로 획득</span>
        </div>
      )}
    </article>
  );
}

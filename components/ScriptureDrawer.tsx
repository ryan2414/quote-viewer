'use client';

import { useState, useCallback } from 'react';
import { getRandomScripture, formatReference, formatReferenceEn } from '@/data/scriptures';
import { getScriptureCategoryMeta } from '@/data/scriptureCategories';
import type { Scripture } from '@/types/scripture';

type Phase = 'idle' | 'drawing' | 'revealed';

export default function ScriptureDrawer() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [scripture, setScripture] = useState<Scripture | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDraw = useCallback(() => {
    const next = getRandomScripture(scripture?.id);
    setScripture(next);
    setPhase('drawing');
    setTimeout(() => setPhase('revealed'), 600);
  }, [scripture]);

  const handleShare = useCallback(async () => {
    if (!scripture) return;
    const refKo = formatReference(scripture);
    const refEn = formatReferenceEn(scripture);
    const text = `"${scripture.text}" — ${refKo} (개역개정)\n"${scripture.text_en}" — ${refEn} (NIV)`;
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('구절이 클립보드에 복사되었습니다!');
    } catch {
      setToastMessage('복사에 실패했습니다. 다시 시도해 주세요.');
    }
    setTimeout(() => setToastMessage(null), 3000);
  }, [scripture]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">

      {/* idle: 뽑기 버튼 */}
      {phase === 'idle' && (
        <div className="flex flex-col items-center justify-center px-5 py-16 sm:py-20 text-center space-y-6">
          <div aria-hidden="true">
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-gray-200 dark:text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              오늘의 말씀을 뽑아보세요
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              버튼을 누르면 무작위로 말씀을 선택해 드립니다
            </p>
          </div>
          <button
            onClick={handleDraw}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 active:from-blue-700 active:to-indigo-700 text-white font-semibold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 focus-ring"
          >
            <span aria-hidden="true" className="text-xl">✦</span>
            말씀 뽑기
          </button>
        </div>
      )}

      {/* drawing: 흔들기 + 빛나기 애니메이션 */}
      {phase === 'drawing' && (
        <div className="flex flex-col items-center justify-center px-5 py-16 sm:py-20 text-center space-y-6">
          <div aria-hidden="true">
            <svg
              className="w-14 h-14 sm:w-16 sm:h-16 text-gray-200 dark:text-gray-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
            </svg>
          </div>
          <div className="space-y-2">
            <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
              말씀을 선택하는 중...
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 opacity-0 select-none">
              placeholder
            </p>
          </div>
          <button
            disabled
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold text-base sm:text-lg shadow-md animate-drawShake animate-drawGlow cursor-not-allowed"
          >
            <span aria-hidden="true" className="text-xl">✦</span>
            말씀 뽑기
          </button>
        </div>
      )}

      {/* revealed: 구절 표시 */}
      {phase === 'revealed' && scripture && (
        <div className="animate-cardReveal">
          <RevealedScripture scripture={scripture} onShare={handleShare} onRedraw={handleDraw} />
        </div>
      )}

      {/* 인라인 토스트 */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium shadow-lg animate-fadeIn"
        >
          <svg className="w-4 h-4 text-green-400 dark:text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

function RevealedScripture({
  scripture,
  onShare,
  onRedraw,
}: {
  scripture: Scripture;
  onShare: () => void;
  onRedraw: () => void;
}) {
  const category = getScriptureCategoryMeta(scripture.category);
  const refKo = formatReference(scripture);
  const refEn = formatReferenceEn(scripture);

  return (
    <div className="flex flex-col items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
      <div className="max-w-3xl w-full space-y-8 text-center">

        <div className="flex justify-center" aria-hidden="true">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M11 2h2v7h7v2h-7v11h-2V11H4V9h7V2z" />
          </svg>
        </div>

        <blockquote>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight">
            {scripture.text}
          </p>
        </blockquote>

        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 italic leading-relaxed">
          {scripture.text_en}
        </p>

        <div className="flex justify-center" aria-hidden="true">
          <div className="w-16 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

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

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button
            onClick={onShare}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md focus-ring"
            aria-label="구절 클립보드 복사"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            복사
          </button>
          <button
            onClick={onRedraw}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white font-medium text-sm sm:text-base transition-all duration-150 focus-ring"
          >
            <span aria-hidden="true">↻</span>
            다시 뽑기
          </button>
        </div>
      </div>
    </div>
  );
}

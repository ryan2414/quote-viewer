'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useFavorites } from '@/hooks/useFavorites';
import { useReadQuotes } from '@/hooks/useReadQuotes';
import { quotes } from '@/data/quotes';
import type { Quote } from '@/types/quote';

export default function RecommendationsSection() {
  const t = useTranslations('recommendations');
  const { favoriteIds, isHydrated } = useFavorites();
  const { readIds } = useReadQuotes();
  const [recommended, setRecommended] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchRecommendations = useCallback(async () => {
    // 즐겨찾기가 2개 미만이면 추천 불가
    if (favoriteIds.length < 2) {
      setFetched(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favoriteIds, readIds }),
      });

      if (res.ok) {
        const { ids } = await res.json() as { ids: number[] };
        const result = ids.map((id) => quotes.find((q) => q.id === id)).filter(Boolean) as Quote[];
        setRecommended(result);
      }
    } catch {
      // 추천 실패 시 조용히 무시
    } finally {
      setIsLoading(false);
      setFetched(true);
    }
  }, [favoriteIds, readIds]);

  useEffect(() => {
    if (isHydrated && !fetched) {
      fetchRecommendations();
    }
  }, [isHydrated, fetched, fetchRecommendations]);

  // 즐겨찾기 2개 미만이면 섹션 표시 안 함
  if (!isHydrated || (fetched && favoriteIds.length < 2)) return null;

  return (
    <section className="py-8 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">{t('title')}</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t('subtitle')}</p>
        </div>
        {fetched && (
          <button
            onClick={() => { setFetched(false); }}
            className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            {t('refresh')}
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      ) : recommended.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 py-4 text-center">{t('empty')}</p>
      ) : (
        <ul className="space-y-2">
          {recommended.map((quote) => (
            <li key={quote.id}>
              <Link
                href={`/quotes/${quote.id}`}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
              >
                <span className="text-xs text-indigo-400 font-mono mt-0.5 shrink-0">#{quote.id}</span>
                <div className="min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">— {quote.author}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

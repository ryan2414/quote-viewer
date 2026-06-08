'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { useFavorites } from '@/hooks/useFavorites';
import { useReadQuotes } from '@/hooks/useReadQuotes';
import { useStreak } from '@/hooks/useStreak';
import { quotes } from '@/data/quotes';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const { favoriteIds, isHydrated } = useFavorites();
  const { readIds } = useReadQuotes();
  const { currentStreak, longestStreak, totalDays } = useStreak();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse mx-auto mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-48 mx-auto" />
      </div>
    );
  }

  const favoriteQuotes = quotes.filter((q) => favoriteIds.includes(q.id));

  const stats = [
    { label: t('favoritesCount'), value: isHydrated ? favoriteIds.length : '-' },
    { label: t('readCount'), value: readIds.length },
    { label: t('streak'), value: `${currentStreak}${t('days')}` },
    { label: t('longestStreak'), value: `${longestStreak}${t('days')}` },
    { label: t('totalDays'), value: `${totalDays}${t('days')}` },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* 계정 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
            {(user.email?.[0] ?? '?').toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">{t('accountSection')}</p>
          </div>
        </div>
        <button
          onClick={signOut}
          className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
        >
          {t('logoutButton')}
        </button>
      </div>

      {/* 활동 통계 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          {t('stats')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 즐겨찾기 명언 */}
      <section>
        <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          {t('myFavorites')}
        </h2>
        {favoriteQuotes.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm py-8 text-center">
            {t('noFavorites')}
          </p>
        ) : (
          <ul className="space-y-3">
            {favoriteQuotes.map((quote) => (
              <li key={quote.id}>
                <Link
                  href={`/quotes/${quote.id}`}
                  className="block p-4 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">— {quote.author}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { quotes, getQuotesByCategory, getQuoteById, getDayIndex } from '@/data/quotes';
import { categories } from '@/data/categories';
import type { CategoryId } from '@/data/categories';
import type { Quote } from '@/types/quote';
import { useFavorites } from '@/hooks/useFavorites';
import { useReadQuotes } from '@/hooks/useReadQuotes';
import { useStreak } from '@/hooks/useStreak';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useSwipe } from '@/hooks/useSwipe';
import QuoteCard from '@/components/QuoteCard';
import SkeletonCard from '@/components/SkeletonCard';
import TodayQuoteSection from '@/components/TodayQuoteSection';
import CollectionProgress from '@/components/CollectionProgress';
import RecommendationsSection from '@/components/RecommendationsSection';
import Toast from '@/components/Toast';
import { useTranslations } from 'next-intl';

type TabType = 'all' | CategoryId | 'favorites' | 'unread';

interface QuotesClientProps {
  todayQuote: Quote;
  initialQuoteId?: number;
}

export default function QuotesClient({ todayQuote, initialQuoteId }: QuotesClientProps) {
  const tQ = useTranslations('quotes');
  const tCat = useTranslations('categories');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const tabs = [
    { id: 'all' as TabType, label: tQ('allTab') },
    ...categories.map((c) => ({ id: c.id as TabType, label: tCat(c.id as Parameters<typeof tCat>[0]) })),
    { id: 'favorites' as TabType, label: tQ('favoritesTab') },
    { id: 'unread' as TabType, label: tQ('unreadTab') },
  ];
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedQuoteId, setSelectedQuoteId] = useState<number | undefined>(initialQuoteId);
  const [searchQuery, setSearchQuery] = useState('');
  // 세션 내 이미 본 명언 IDs (랜덤 셔플 중복 방지)
  const [seenIds, setSeenIds] = useState<number[]>([]);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isFavorite, toggleFavorite, favoriteIds, isHydrated } = useFavorites();
  const { readIds, readCount, isRead } = useReadQuotes();
  const streak = useStreak();
  const { isFirstVisit, completeOnboarding } = useOnboarding();

  // 즐겨찾기 토글 시 온보딩 완료 처리
  const handleToggleFavorite = useCallback((id: number) => {
    toggleFavorite(id);
    completeOnboarding();
  }, [toggleFavorite, completeOnboarding]);

  // 히어로 섹션에 표시할 명언: 선택된 명언 또는 오늘의 명언
  const displayedQuote = useMemo(() => {
    if (selectedQuoteId !== undefined) {
      return getQuoteById(selectedQuoteId) ?? todayQuote;
    }
    return todayQuote;
  }, [selectedQuoteId, todayQuote]);

  // 카드 클릭: 히어로 섹션 명언 교체 + URL 업데이트 + 상단 스크롤
  const handleCardClick = useCallback((quoteId: number) => {
    setSelectedQuoteId(quoteId);
    router.push(`/quotes?quoteId=${quoteId}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router]);

  const handleShuffle = useCallback(() => {
    const currentId = displayedQuote.id;
    const seen = [...seenIds, currentId];
    // 모든 명언을 다 봤으면 초기화
    const pool = quotes.filter((q) => !seen.includes(q.id));
    const candidates = pool.length > 0 ? pool : quotes.filter((q) => q.id !== currentId);
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setSeenIds(pool.length > 0 ? seen : [currentId]);
    handleCardClick(next.id);
  }, [displayedQuote.id, seenIds, handleCardClick]);

  const handleShare = useCallback(async () => {
    const text = `"${displayedQuote.text}" — ${displayedQuote.author}`;
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage('명언이 클립보드에 복사되었습니다!');
    } catch {
      setToastMessage('복사에 실패했습니다. 다시 시도해 주세요.');
    }
  }, [displayedQuote]);

  const filteredQuotes = useMemo(() => {
    let base: typeof quotes;
    if (activeTab === 'all') base = quotes;
    else if (activeTab === 'favorites') base = quotes.filter((q) => favoriteIds.includes(q.id));
    else if (activeTab === 'unread') base = quotes.filter((q) => !readIds.includes(q.id));
    else base = getQuotesByCategory(activeTab as CategoryId);

    if (!searchQuery.trim()) return base;
    const q = searchQuery.trim().toLowerCase();
    return base.filter(
      (quote) =>
        quote.text.toLowerCase().includes(q) ||
        quote.author.toLowerCase().includes(q)
    );
  }, [activeTab, favoriteIds, searchQuery]);

  const tabCount = useMemo(() => {
    const counts: Record<TabType, number> = { all: quotes.length, favorites: 0, unread: 0 } as Record<TabType, number>;
    categories.forEach((c) => {
      counts[c.id] = getQuotesByCategory(c.id).length;
    });
    counts['favorites'] = favoriteIds.length;
    counts['unread'] = quotes.filter((q) => !readIds.includes(q.id)).length;
    return counts;
  }, [favoriteIds, readIds]);

  const handleSearchChange = useCallback((value: string) => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => setSearchQuery(value), 300);
  }, []);

  const isFavoritesEmpty = activeTab === 'favorites' && isHydrated && filteredQuotes.length === 0 && !searchQuery;
  const isUnreadEmpty = activeTab === 'unread' && isHydrated && filteredQuotes.length === 0 && !searchQuery;
  const isSearchEmpty = searchQuery.trim() !== '' && filteredQuotes.length === 0;

  // 스와이프: 현재 표시 명언의 quotes 배열 인덱스
  const currentQuoteIndex = useMemo(
    () => quotes.findIndex((q) => q.id === displayedQuote.id),
    [displayedQuote.id]
  );

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      const nextIndex = (currentQuoteIndex + 1) % quotes.length;
      handleCardClick(quotes[nextIndex].id);
    },
    onSwipeRight: () => {
      const prevIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
      handleCardClick(quotes[prevIndex].id);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* 첫 방문 온보딩 배너 */}
      {isFirstVisit && (
        <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 px-5 py-3 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm animate-pulse">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {tQ('favoriteLabel')}
          </div>
        </div>
      )}

      {/* 오늘의 명언 히어로 섹션: touch-pan-y로 세로 스크롤 보존 */}
      <div {...swipeHandlers} className="touch-pan-y">
        <TodayQuoteSection
          key={displayedQuote.id}
          quote={displayedQuote}
          isFavorite={isFavorite(displayedQuote.id)}
          onToggleFavorite={handleToggleFavorite}
          onShare={handleShare}
          onShuffle={handleShuffle}
          dayProgress={selectedQuoteId === undefined ? { index: getDayIndex(), total: quotes.length } : undefined}
        />
      </div>

      {/* 명언 목록 섹션 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 수집 진행률 */}
        {isHydrated && (
          <CollectionProgress
            collected={readCount}
            total={quotes.length}
            streakDays={streak.isHydrated ? streak.currentStreak : 0}
          />
        )}

        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tQ('title')}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {tQ('subtitle')}
          </p>
        </div>

        {/* 검색 입력창 */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder={tQ('search')}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-sm"
              aria-label={tQ('searchLabel')}
            />
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="mb-8 sm:mb-10">
          <div
            className="flex overflow-x-auto gap-2 pb-2"
            role="tablist"
            aria-label={tQ('categoryFilter')}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-none px-4 sm:px-5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 whitespace-nowrap focus-ring ${
                    isActive
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                      : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm'
                  }`}
                >
                  {tab.label}
                  {/* favorites: hydrated + count > 0일 때만 뱃지 표시, 나머지 탭: 항상 표시 */}
                  {tab.id === 'favorites' ? (
                    isHydrated && tabCount['favorites'] > 0 && (
                      <span
                        className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                            : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
                        }`}
                      >
                        {tabCount['favorites']}
                      </span>
                    )
                  ) : tab.id === 'unread' ? (
                    isHydrated && (
                      <span
                        className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                            : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {tabCount['unread']}
                      </span>
                    )
                  ) : (
                    <span
                      className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {tabCount[tab.id] ?? 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 카드 그리드 또는 즐겨찾기 빈 상태 */}
        {!isHydrated ? (
          // hydration 전: 스켈레톤 12개로 CLS 방지
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isUnreadEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{tQ('emptyUnread')}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">{tQ('emptyUnreadDesc', { count: quotes.length })}</p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              {tQ('viewAllQuotes')}
            </button>
          </div>
        ) : isSearchEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{tQ('noResults')}</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">{tQ('noResultsDesc')}</p>
            </div>
          </div>
        ) : isFavoritesEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-28 gap-4 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-center">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
                {tQ('emptyFavorites')}
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                {tQ('noFavoritesDesc')}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              {tQ('viewAllQuotes')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                isFavorite={isFavorite(quote.id)}
                isRead={isRead(quote.id)}
                onToggleFavorite={toggleFavorite}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* AI 개인화 추천 (즐겨찾기 2개 이상일 때 노출) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <RecommendationsSection />
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}

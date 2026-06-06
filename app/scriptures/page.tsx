'use client';

import { useState, useMemo } from 'react';
import { scriptures, getScripturesByCategory } from '@/data/scriptures';
import { scriptureCategories } from '@/data/scriptureCategories';
import type { ScriptureCategory } from '@/types/scripture';
import ScriptureDrawer from '@/components/ScriptureDrawer';
import ScriptureCard from '@/components/ScriptureCard';
import GuestBanner from '@/components/GuestBanner';
import AuthModal from '@/components/AuthModal';
import { useAuth } from '@/hooks/useAuth';
import { useDrawTimer } from '@/hooks/useDrawTimer';
import { useScriptureCollection } from '@/hooks/useScriptureCollection';
import CollectionProgress from '@/components/CollectionProgress';
import MilestoneToast from '@/components/MilestoneToast';

type TabType = 'all' | ScriptureCategory;

const tabs: { id: TabType; label: string }[] = [
  { id: 'all', label: '전체' },
  ...scriptureCategories.map((c) => ({ id: c.id as TabType, label: c.label })),
];

export default function ScripturesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { user, isLoading: authLoading } = useAuth();
  const { streakDays } = useDrawTimer();
  const { collectedScriptures, collectedIds, collectedItems, isLoading: collectionLoading, lastMilestone, clearMilestone } = useScriptureCollection();

  const filteredScriptures = useMemo(() => {
    if (activeTab === 'all') return scriptures;
    return getScripturesByCategory(activeTab as ScriptureCategory);
  }, [activeTab]);

  const tabCount = useMemo(() => {
    const counts: Record<TabType, number> = { all: scriptures.length } as Record<TabType, number>;
    scriptureCategories.forEach((c) => {
      counts[c.id] = getScripturesByCategory(c.id).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* 페이지 헤더 */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            성경 구절
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            말씀으로 하루를 시작하세요
          </p>
        </div>

        {/* 뽑기 섹션 */}
        <div className="mb-10 sm:mb-14">
          <ScriptureDrawer />
        </div>

        {/* 내 수집함 섹션 */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 shrink-0">내 수집함</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* 로그인 시 진행률 + 스트릭 */}
          {user && !collectionLoading && (
            <CollectionProgress
              collected={collectedScriptures.length}
              total={30}
              streakDays={streakDays}
            />
          )}

          {/* 비로그인 */}
          {!authLoading && !user && (
            <GuestBanner onLoginClick={() => setIsAuthModalOpen(true)} />
          )}

          {/* 로그인 + 로딩 중 */}
          {user && collectionLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          )}

          {/* 로그인 + 수집 없음 */}
          {user && !collectionLoading && collectedScriptures.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg
                className="w-12 h-12 text-gray-200 dark:text-gray-700 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <p className="text-base font-semibold text-gray-400 dark:text-gray-500">
                아직 수집한 말씀이 없어요
              </p>
              <p className="mt-1 text-sm text-gray-300 dark:text-gray-600">
                위의 뽑기 버튼으로 첫 말씀을 수집해 보세요
              </p>
            </div>
          )}

          {/* 로그인 + 수집 있음 */}
          {user && !collectionLoading && collectedScriptures.length > 0 && (
            <>
              <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                총 <span className="font-semibold text-gray-600 dark:text-gray-300">{collectedScriptures.length}</span>개 수집
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {collectedScriptures.map((scripture) => (
                  <ScriptureCard
                    key={scripture.id}
                    scripture={scripture}
                    rarity={collectedItems.find((item) => item.id === scripture.id)?.rarity}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* 구분선 */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 shrink-0">모든 구절</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* 비로그인: 잠금 안내 */}
        {!authLoading && !user && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              className="w-12 h-12 text-gray-200 dark:text-gray-700 mb-4"
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
            <p className="text-base font-semibold text-gray-400 dark:text-gray-500">
              로그인 후 모든 구절을 확인할 수 있어요
            </p>
            <p className="mt-1 text-sm text-gray-300 dark:text-gray-600 mb-6">
              {scriptures.length}개의 성경 구절이 기다리고 있어요
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              로그인하기
            </button>
          </div>
        )}

        {/* 로그인: 탭 네비게이션 + 카드 그리드 */}
        {user && (
          <>
            <div className="mb-8 sm:mb-10">
              <div
                className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide"
                role="tablist"
                aria-label="성경 구절 카테고리 필터"
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
                      className={`flex-none px-4 sm:px-5 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 whitespace-nowrap ${
                        isActive
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                          : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 shadow-sm'
                      }`}
                    >
                      {tab.label}
                      <span
                        className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {tabCount[tab.id] ?? 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {filteredScriptures.map((scripture) => {
                const isCollected = collectedIds.includes(scripture.id);
                const rarity = collectedItems.find((item) => item.id === scripture.id)?.rarity;
                return (
                  <ScriptureCard
                    key={scripture.id}
                    scripture={scripture}
                    rarity={rarity}
                    blurred={!isCollected}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* 로그인 모달 */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* 마일스톤 달성 토스트 */}
      {lastMilestone && (
        <MilestoneToast
          emoji={lastMilestone.emoji}
          message={lastMilestone.message}
          onClose={clearMilestone}
        />
      )}
    </div>
  );
}

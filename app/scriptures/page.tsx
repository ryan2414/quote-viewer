'use client';

import { useState, useMemo } from 'react';
import { scriptures, getScripturesByCategory } from '@/data/scriptures';
import { scriptureCategories } from '@/data/scriptureCategories';
import type { ScriptureCategory } from '@/types/scripture';
import ScriptureDrawer from '@/components/ScriptureDrawer';
import ScriptureCard from '@/components/ScriptureCard';

type TabType = 'all' | ScriptureCategory;

const tabs: { id: TabType; label: string }[] = [
  { id: 'all', label: '전체' },
  ...scriptureCategories.map((c) => ({ id: c.id as TabType, label: c.label })),
];

export default function ScripturesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');

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

        {/* 구분선 */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          <span className="text-sm font-semibold text-gray-400 dark:text-gray-500 shrink-0">모든 구절</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* 탭 네비게이션 */}
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

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredScriptures.map((scripture) => (
            <ScriptureCard key={scripture.id} scripture={scripture} />
          ))}
        </div>
      </div>

    </div>
  );
}

'use client';

import { useCallback } from 'react';
import { useStreak } from '@/hooks/useStreak';
import MilestoneToast from './MilestoneToast';
import { useTranslations } from 'next-intl';

const MILESTONE_EMOJIS: Record<number, string> = {
  3:   '🔥',
  7:   '⚡',
  14:  '🌟',
  30:  '🏆',
  60:  '💎',
  100: '🚀',
};

export default function StreakBadge() {
  const t = useTranslations('streak');
  const streak = useStreak();

  const handleCloseToast = useCallback(() => {
    // 마일스톤 토스트 닫기는 렌더 사이클에서만 제어하므로 별도 상태 불필요
    // 컴포넌트 리렌더링 없이 처리하기 위해 페이지 새로고침 전 상태 유지
  }, []);

  if (!streak.isHydrated || streak.currentStreak < 1) return null;

  const milestoneEmoji = streak.justMilestone ? MILESTONE_EMOJIS[streak.justMilestone] : null;
  const milestoneKey = streak.justMilestone ? (`day${streak.justMilestone}` as Parameters<typeof t>[0]) : null;

  return (
    <>
      {/* 스트릭 배지 */}
      <div
        title={t('badgeLabel', { count: streak.currentStreak, longest: streak.longestStreak })}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 text-xs font-semibold select-none cursor-default"
        aria-label={t('badgeAriaLabel', { count: streak.currentStreak })}
      >
        <span aria-hidden="true">🔥</span>
        <span>{streak.currentStreak}일</span>
      </div>

      {/* 마일스톤 토스트 */}
      {milestoneKey && milestoneEmoji && (
        <MilestoneToast
          emoji={milestoneEmoji}
          message={t(milestoneKey)}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

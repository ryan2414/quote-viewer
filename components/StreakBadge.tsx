'use client';

import { useCallback } from 'react';
import { useStreak } from '@/hooks/useStreak';
import MilestoneToast from './MilestoneToast';

const MILESTONE_MESSAGES: Record<number, { emoji: string; message: string }> = {
  3:   { emoji: '🔥', message: '3일 연속 방문! 좋은 습관이 시작되었어요.' },
  7:   { emoji: '⚡', message: '7일 연속! 일주일을 함께했군요.' },
  14:  { emoji: '🌟', message: '2주 연속 방문! 명언이 일상이 되었네요.' },
  30:  { emoji: '🏆', message: '30일 연속! 대단해요, 진정한 독자입니다.' },
  60:  { emoji: '💎', message: '60일 연속! 믿을 수 없이 대단합니다.' },
  100: { emoji: '🚀', message: '100일 연속! 전설의 기록을 세웠습니다!' },
};

export default function StreakBadge() {
  const streak = useStreak();

  const handleCloseToast = useCallback(() => {
    // 마일스톤 토스트 닫기는 렌더 사이클에서만 제어하므로 별도 상태 불필요
    // 컴포넌트 리렌더링 없이 처리하기 위해 페이지 새로고침 전 상태 유지
  }, []);

  if (!streak.isHydrated || streak.currentStreak < 1) return null;

  const milestone = streak.justMilestone ? MILESTONE_MESSAGES[streak.justMilestone] : null;

  return (
    <>
      {/* 스트릭 배지 */}
      <div
        title={`연속 방문 ${streak.currentStreak}일 | 최장 ${streak.longestStreak}일`}
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 text-xs font-semibold select-none cursor-default"
        aria-label={`연속 방문 ${streak.currentStreak}일`}
      >
        <span aria-hidden="true">🔥</span>
        <span>{streak.currentStreak}일</span>
      </div>

      {/* 마일스톤 토스트 */}
      {milestone && (
        <MilestoneToast
          emoji={milestone.emoji}
          message={milestone.message}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

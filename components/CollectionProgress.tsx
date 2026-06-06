'use client';

interface CollectionProgressProps {
  collected: number;
  total: number;
  streakDays: number;
}

export default function CollectionProgress({ collected, total, streakDays }: CollectionProgressProps) {
  const percent = total > 0 ? Math.round((collected / total) * 100) : 0;

  const streakLabel =
    streakDays >= 30 ? `💎 ${streakDays}일째 연속` :
    streakDays >= 7  ? `🔥 ${streakDays}일째 연속` :
    streakDays > 0   ? `${streakDays}일째 연속` : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        {/* 수집 수 */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-100">{collected}</span>
          {' / '}{total} 수집
          <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">({percent}%)</span>
        </p>

        {/* 스트릭 */}
        {streakLabel && (
          <p className={`text-xs font-semibold ${
            streakDays >= 30 ? 'text-purple-600 dark:text-purple-400' :
            streakDays >= 7  ? 'text-orange-500 dark:text-orange-400' :
                               'text-gray-500 dark:text-gray-400'
          }`}>
            {streakLabel}
          </p>
        )}
      </div>

      {/* 진행률 바 — width는 동적 값이므로 인라인 style 사용 */}
      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

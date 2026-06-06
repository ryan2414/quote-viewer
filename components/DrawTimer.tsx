'use client';

import { Lock } from 'lucide-react';

interface DrawTimerProps {
  remainingMs: number;
}

export default function DrawTimer({ remainingMs }: DrawTimerProps) {
  const hours = Math.floor(remainingMs / 3600000);
  const minutes = Math.floor((remainingMs % 3600000) / 60000);
  const seconds = Math.floor((remainingMs % 60000) / 1000);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-gray-400 dark:text-gray-500">
        다음 뽑기까지
      </p>
      {/* 기존 뽑기 버튼과 동일한 크기로 레이아웃 점프 방지 */}
      <div className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 font-semibold text-base sm:text-lg cursor-not-allowed select-none">
        <Lock className="w-5 h-5 shrink-0" aria-hidden="true" />
        <span className="font-mono tracking-widest">{timeStr}</span>
      </div>
    </div>
  );
}

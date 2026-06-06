'use client';

import { useEffect, useState } from 'react';

interface MilestoneToastProps {
  emoji: string;
  message: string;
  onClose: () => void;
}

export default function MilestoneToast({ emoji, message, onClose }: MilestoneToastProps) {
  const [copied, setCopied] = useState(false);

  // 6초 후 자동으로 닫힘
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 클립보드 복사 실패 시 조용히 무시
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-5 py-4 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40 animate-slideUp max-w-xs sm:max-w-sm"
    >
      {/* 배지 이모지 */}
      <span className="text-3xl leading-none shrink-0 mt-0.5" aria-hidden="true">
        {emoji}
      </span>

      {/* 메시지 + 공유 */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug">
          {message}
        </p>
        <button
          onClick={handleShare}
          className="mt-2 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
        >
          {copied ? '✓ 복사됨' : '공유하기'}
        </button>
      </div>

      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        aria-label="닫기"
        className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}

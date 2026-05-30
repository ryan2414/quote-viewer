'use client';

import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    /* 토스트 알림: 화면 하단 우측 고정, 모바일에서 좌우 여백 축소 */
    <div
      role="status"
      aria-live="polite"
      /*
        토스트 배경: 라이트 모드 - 진한 회색(콘트라스트 높음)
        다크 모드 - 약간 밝은 회색(dark:bg-gray-800)으로 배경과 구분되게 처리
        텍스트: 라이트 모드 - 흰색 / 다크 모드 - 밝은 회색으로 가독성 확보
      */
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-100 border border-transparent dark:border-gray-700 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl shadow-xl shadow-black/20 dark:shadow-black/40 animate-fadeIn text-sm sm:text-base font-medium max-w-[calc(100vw-2rem)] sm:max-w-sm"
    >
      {/* 성공 아이콘: 다크 모드에서도 초록색 계열로 성공 상태 표현 */}
      <span className="shrink-0" aria-hidden="true">
        <svg className="w-4 h-4 text-green-400 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="truncate">{message}</span>
    </div>
  );
}

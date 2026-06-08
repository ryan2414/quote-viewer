'use client';

import { useLike } from '@/hooks/useLike';

interface LikeButtonProps {
  quoteId: number;
}

export default function LikeButton({ quoteId }: LikeButtonProps) {
  const { count, liked, isLoading, toggle } = useLike(quoteId);

  return (
    <button
      onClick={toggle}
      disabled={isLoading}
      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 shadow-sm hover:shadow-md disabled:opacity-60 ${
        liked
          ? 'bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
      }`}
      aria-label={liked ? '좋아요 취소' : '좋아요'}
      aria-pressed={liked}
    >
      <svg
        className="w-4 h-4 shrink-0 transition-transform duration-150 active:scale-125"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isLoading ? '...' : count > 0 ? count : liked ? '1' : '좋아요'}</span>
    </button>
  );
}

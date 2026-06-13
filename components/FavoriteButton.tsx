'use client';

import { useTranslations } from 'next-intl';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  const t = useTranslations('quotes');

  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md focus-ring ${
        isFavorite
          ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-700 dark:text-gray-200'
      }`}
      aria-label={isFavorite ? t('unfavoriteLabel') : t('favoriteLabel')}
      aria-pressed={isFavorite}
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
        fill={isFavorite ? 'currentColor' : 'none'}
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
      {isFavorite ? t('unfavorite') : t('favorite')}
    </button>
  );
}

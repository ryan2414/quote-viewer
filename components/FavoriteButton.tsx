'use client';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    /* 즐겨찾기 버튼: 상태에 따라 배경색·텍스트 색상 전환, 인라인 스타일 제거 */
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md ${
        isFavorite
          ? 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
          : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-700 dark:text-gray-200'
      }`}
      aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      aria-pressed={isFavorite}
    >
      {/* 하트 아이콘: 즐겨찾기 상태면 채움, 아니면 외곽선 */}
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
      {isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
    </button>
  );
}

'use client';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

export default function FavoriteButton({ isFavorite, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
      style={{
        backgroundColor: isFavorite ? '#ef4444' : '#e5e7eb',
        color: isFavorite ? 'white' : '#111827',
      }}
      onMouseEnter={(e) => {
        if (isFavorite) {
          e.currentTarget.style.backgroundColor = '#dc2626';
        } else {
          e.currentTarget.style.backgroundColor = '#d1d5db';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isFavorite ? '#ef4444' : '#e5e7eb';
      }}
      aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
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

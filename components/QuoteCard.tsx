'use client';

import { useRouter } from 'next/navigation';
import { QuoteCardProps } from '@/types/quote';
import FavoriteButton from './FavoriteButton';

export default function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
}: QuoteCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/?quoteId=${quote.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    // 즐겨찾기 버튼 클릭이 카드 클릭 이벤트로 전파되지 않도록 방지
    e.stopPropagation();
    onToggleFavorite(quote.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 cursor-pointer transition-shadow h-full flex flex-col"
    >
      {/* 명언 텍스트 */}
      <p className="text-gray-900 dark:text-white font-semibold mb-4 flex-grow line-clamp-4">
        &quot;{quote.text}&quot;
      </p>

      {/* 저자 */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
        — {quote.author}
      </p>

      {/* 즐겨찾기 버튼 */}
      <div onClick={handleFavoriteClick}>
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => onToggleFavorite(quote.id)}
        />
      </div>
    </div>
  );
}

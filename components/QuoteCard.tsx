'use client';

import { useRouter } from 'next/navigation';
import { QuoteCardProps } from '@/types/quote';
import { getCategoryMeta } from '@/data/categories';
import FavoriteButton from './FavoriteButton';

export default function QuoteCard({
  quote,
  isFavorite,
  onToggleFavorite,
  onCardClick,
}: QuoteCardProps) {
  const router = useRouter();
  // 카테고리 메타데이터 조회 (없으면 undefined)
  const category = getCategoryMeta(quote.category);

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(quote.id);
    } else {
      router.push(`/quotes?quoteId=${quote.id}`);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    /* 즐겨찾기 버튼 클릭이 카드 클릭 이벤트로 전파되지 않도록 방지 */
    e.stopPropagation();
    onToggleFavorite(quote.id);
  };

  return (
    /* 카드 컨테이너: hover 시 위로 들리는 효과 + 섀도우 강화로 입체감 표현 */
    <article
      onClick={handleCardClick}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-gray-900/60 hover:-translate-y-1 p-6 cursor-pointer transition-all duration-200 ease-out h-full flex flex-col"
      role="button"
      tabIndex={0}
      aria-label={`"${quote.text}" — ${quote.author} 명언 보기`}
      onKeyDown={(e) => {
        /* TODO: 키보드 접근성 Enter/Space 처리 구현 */
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* 장식용 인용 마크: hover 시 색상 강조 */}
      <div className="mb-3" aria-hidden="true">
        <svg
          className="w-6 h-6 text-gray-200 dark:text-gray-700 group-hover:text-blue-300 dark:group-hover:text-blue-700 transition-colors duration-200"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* 명언 텍스트: 4줄 클램프, hover 시 색상 미세 강조 */}
      <p className="text-gray-800 dark:text-gray-100 font-medium text-sm sm:text-base leading-relaxed mb-4 flex-grow line-clamp-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
        {quote.text}
      </p>

      {/* 구분선 */}
      <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mb-4" aria-hidden="true" />

      {/* 저자: 연회색, 작은 크기 */}
      <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm font-medium tracking-wide">
        — {quote.author}
      </p>

      {/* 카테고리 배지: 카테고리가 있을 때만 렌더링 */}
      {category && (
        <span
          className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium mb-3 ${category.badgeClass}`}
        >
          {category.label}
        </span>
      )}
      {/* 카테고리가 없을 경우 즐겨찾기 버튼 위 여백 유지 */}
      {!category && <div className="mb-4" aria-hidden="true" />}

      {/* 즐겨찾기 버튼: 카드 클릭 이벤트 전파 차단 */}
      <div onClick={handleFavoriteClick} className="mt-auto">
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={() => {}}
        />
      </div>
    </article>
  );
}

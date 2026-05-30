'use client';

import Link from 'next/link';
import { QuoteDisplayProps } from '@/types/quote';
import { getCategoryMeta } from '@/data/categories';
import FavoriteButton from './FavoriteButton';

export default function QuoteDisplay({
  quote,
  isFavorite,
  onToggleFavorite,
  onShare,
  onNavigateToList,
}: QuoteDisplayProps) {
  // 카테고리 메타데이터 조회
  const category = getCategoryMeta(quote.category);

  return (
    /* 홈 명언 표시 영역: 수직/수평 중앙 정렬, 충분한 상하 여백 확보 */
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-5 py-16 sm:px-8 sm:py-20">
      <div className="max-w-3xl w-full space-y-10 text-center">

        {/* 장식용 따옴표 아이콘: 대형 명언 전 시각적 악센트 */}
        <div className="flex justify-center" aria-hidden="true">
          <svg
            className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        {/* 명언 본문: 모바일 lg → 태블릿 2xl → 데스크톱 3xl 단계별 크기 증가 */}
        <blockquote>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-relaxed tracking-tight">
            {quote.text}
          </p>
        </blockquote>

        {/* 구분선: 명언과 저자 사이 시각적 분리 */}
        <div className="flex justify-center" aria-hidden="true">
          <div className="w-16 h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* 저자 및 출처 정보 */}
        <div className="space-y-2">
          {/* 저자명: 중간 크기, 연회색 처리 */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-400 tracking-wide">
            — {quote.author}
          </p>
          {/* 출처: 작은 크기, 더 연한 색상 */}
          {quote.source && (
            <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 italic">
              {quote.source}
            </p>
          )}
          {/* 카테고리 배지: 카테고리가 있을 때만 렌더링 */}
          {category && (
            <div className="flex justify-center pt-1">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${category.badgeClass}`}
              >
                {category.label}
              </span>
            </div>
          )}
        </div>

        {/* 버튼 그룹: 모바일 세로 → sm 이상 가로 배치 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {/* 즐겨찾기 버튼 */}
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(quote.id)}
          />

          {/* 클립보드 복사 버튼: 라이트/다크 모드 모두 파란색 계열 유지 */}
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 dark:active:bg-blue-700 text-white font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md dark:shadow-blue-900/30"
            aria-label="명언 클립보드 복사"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            복사
          </button>

          {/* 목록 보기: onNavigateToList 제공 시 버튼, 아니면 Link */}
          {onNavigateToList ? (
            <button
              onClick={onNavigateToList}
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md"
            >
              목록 보기
            </button>
          ) : (
            <Link
              href="/quotes"
              className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium text-sm sm:text-base transition-all duration-150 shadow-sm hover:shadow-md"
            >
              목록 보기
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

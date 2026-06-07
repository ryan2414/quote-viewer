// 카테고리 ID 타입 — quotes.ts의 category 필드와 동일한 값 집합
export type CategoryId = 'wisdom' | 'motivation' | 'life' | 'courage' | 'love';

// 카테고리 메타데이터 인터페이스
export interface CategoryMeta {
  id: CategoryId;
  label: string;          // 한국어 레이블
  badgeClass: string;     // Tailwind 색상 클래스 (전체 문자열 하드코딩 — purge 방지)
  gradientClass: string;  // Tailwind 배경 그라데이션 클래스 (전체 문자열 하드코딩 — purge 방지)
}

// 카테고리 목록: 순서는 탭 렌더링 순서와 동일
export const categories: CategoryMeta[] = [
  {
    id: 'wisdom',
    label: '지혜',
    badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    gradientClass: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
  },
  {
    id: 'motivation',
    label: '동기부여',
    badgeClass: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    gradientClass: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
  },
  {
    id: 'life',
    label: '인생',
    badgeClass: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    gradientClass: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30',
  },
  {
    id: 'courage',
    label: '용기',
    badgeClass: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    gradientClass: 'from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30',
  },
  {
    id: 'love',
    label: '사랑',
    badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
    gradientClass: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
  },
];

// 카테고리 ID로 메타데이터 조회 (없으면 undefined 반환)
export function getCategoryMeta(id?: string): CategoryMeta | undefined {
  if (!id) return undefined;
  return categories.find((c) => c.id === id);
}

'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'quote-viewer-favorites';

function loadFavoritesFromStorage(): number[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('즐겨찾기 로드 실패:', error);
    return [];
  }
}

export function useFavorites() {
  // SSR/CSR hydration 불일치 방지: 초기값은 항상 빈 배열로 시작
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // hydration 완료 후 localStorage에서 데이터 로드
  useEffect(() => {
    setFavoriteIds(loadFavoritesFromStorage());
    setIsHydrated(true);
  }, []);

  // 즐겨찾기 토글
  const toggleFavorite = (id: number) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('즐겨찾기 저장 실패:', error);
      }
      return updated;
    });
  };

  // 특정 명언이 즐겨찾기에 포함되는지 확인
  const isFavorite = (id: number) => favoriteIds.includes(id);

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    isHydrated,
  };
}

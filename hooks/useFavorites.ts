/* eslint-disable react-hooks/set-state-in-effect */
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
  // SSR/CSR hydration 불일치 방지: 초기값은 항상 빈 배열로 시작, hydration 후 로드
  const [state, setState] = useState(() => ({
    ids: [] as number[],
    isHydrated: false,
  }));

  // hydration 완료 후 localStorage에서 데이터 로드
  useEffect(() => {
    setState({
      ids: loadFavoritesFromStorage(),
      isHydrated: true,
    });
  }, []);

  // 즐겨찾기 토글
  const toggleFavorite = (id: number) => {
    setState((prev) => {
      const updated = prev.ids.includes(id) ? prev.ids.filter((fid) => fid !== id) : [...prev.ids, id];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('즐겨찾기 저장 실패:', error);
      }
      return { ...prev, ids: updated };
    });
  };

  // 특정 명언이 즐겨찾기에 포함되는지 확인
  const isFavorite = (id: number) => state.ids.includes(id);

  return {
    favoriteIds: state.ids,
    toggleFavorite,
    isFavorite,
    isHydrated: state.isHydrated,
  };
}

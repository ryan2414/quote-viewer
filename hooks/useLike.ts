'use client';

import { useState, useEffect, useCallback } from 'react';

interface LikeState {
  count: number;
  liked: boolean;
  isLoading: boolean;
}

export function useLike(quoteId: number) {
  const [state, setState] = useState<LikeState>({ count: 0, liked: false, isLoading: true });

  useEffect(() => {
    fetch(`/api/likes/${quoteId}`)
      .then((res) => res.json())
      .then((data: { count: number; liked: boolean }) => {
        setState({ count: data.count, liked: data.liked, isLoading: false });
      })
      .catch(() => setState((prev) => ({ ...prev, isLoading: false })));
  }, [quoteId]);

  const toggle = useCallback(async () => {
    // 낙관적 업데이트
    setState((prev) => ({
      count: prev.liked ? prev.count - 1 : prev.count + 1,
      liked: !prev.liked,
      isLoading: false,
    }));

    try {
      const res = await fetch(`/api/likes/${quoteId}`, { method: 'POST' });
      const data = await res.json() as { count: number; liked: boolean };
      setState({ count: data.count, liked: data.liked, isLoading: false });
    } catch {
      // 실패 시 원상복구
      setState((prev) => ({
        count: prev.liked ? prev.count - 1 : prev.count + 1,
        liked: !prev.liked,
        isLoading: false,
      }));
    }
  }, [quoteId]);

  return { ...state, toggle };
}

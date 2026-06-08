/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

const FAVORITES_KEY = 'quote-viewer-favorites';

function loadLocalFavorites(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLocalFavorites(ids: number[]) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // 저장 실패 무시
  }
}

export function useFavorites() {
  const { user } = useAuth();
  const [state, setState] = useState({ ids: [] as number[], isHydrated: false });

  useEffect(() => {
    if (user) {
      const supabase = createBrowserClient();

      const syncFavorites = async () => {
        const { data } = await supabase
          .from('user_favorites')
          .select('quote_id')
          .eq('user_id', user.id);

        const serverIds = data ? data.map((r: { quote_id: number }) => r.quote_id) : [];

        // localStorage에 미동기화 항목이 있으면 Supabase로 병합
        const localIds = loadLocalFavorites();
        const toMigrate = localIds.filter((id) => !serverIds.includes(id));

        if (toMigrate.length > 0) {
          await supabase.from('user_favorites').upsert(
            toMigrate.map((id) => ({ user_id: user.id, quote_id: id })),
            { onConflict: 'user_id,quote_id' }
          );
          localStorage.removeItem(FAVORITES_KEY);
        }

        setState({ ids: [...new Set([...serverIds, ...toMigrate])], isHydrated: true });
      };

      syncFavorites();
    } else {
      setState({ ids: loadLocalFavorites(), isHydrated: true });
    }
  }, [user]);

  const toggleFavorite = useCallback(
    async (id: number) => {
      const isCurrentlyFav = state.ids.includes(id);
      const newIds = isCurrentlyFav
        ? state.ids.filter((fid) => fid !== id)
        : [...state.ids, id];

      setState((prev) => ({ ...prev, ids: newIds }));

      if (user) {
        const supabase = createBrowserClient();
        if (isCurrentlyFav) {
          await supabase.from('user_favorites').delete().eq('user_id', user.id).eq('quote_id', id);
        } else {
          await supabase.from('user_favorites').insert({ user_id: user.id, quote_id: id });
        }
      } else {
        saveLocalFavorites(newIds);
      }
    },
    [user, state.ids]
  );

  return {
    favoriteIds: state.ids,
    toggleFavorite,
    isFavorite: (id: number) => state.ids.includes(id),
    isHydrated: state.isHydrated,
  };
}

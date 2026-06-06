'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createBrowserClient } from '@/lib/supabase';
import { scriptures, type Rarity } from '@/data/scriptures';

interface CollectionRow {
  scripture_id: number;
  rarity: string;
}

export interface CollectedItem {
  id: number;
  rarity: Rarity;
}

interface Milestone {
  emoji: string;
  message: string;
}

const MILESTONES: (Milestone & { count: number })[] = [
  { count: 1,  emoji: '🌱', message: '말씀 도감을 시작했어요!' },
  { count: 3,  emoji: '🌿', message: '말씀 10%를 수집했어요!' },
  { count: 8,  emoji: '🌸', message: '말씀 1/4을 채웠어요!' },
  { count: 15, emoji: '🌳', message: '말씀의 절반을 담았어요!' },
  { count: 23, emoji: '✨', message: '말씀의 3/4 완성!' },
  { count: 30, emoji: '👑', message: '모든 말씀을 수집했어요!' },
];

export function useScriptureCollection() {
  const { user } = useAuth();
  const [collectedItems, setCollectedItems] = useState<CollectedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastMilestone, setLastMilestone] = useState<Milestone | null>(null);

  // 로그인 상태 변경 시 수집 목록 로드
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    async function loadCollection() {
      if (user) {
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from('scripture_collections')
          .select('scripture_id, rarity')
          .eq('user_id', user.id);

        if (cancelled) return;
        const rows = (data ?? []) as CollectionRow[];
        setCollectedItems(
          rows.map((r) => ({
            id: r.scripture_id,
            rarity: (r.rarity as Rarity) ?? 'common',
          }))
        );
      } else {
        if (cancelled) return;
        // 비로그인: 수집 목록 초기화
        setCollectedItems([]);
      }
      setIsLoading(false);
    }

    loadCollection();
    return () => { cancelled = true; };
  }, [user]);

  const collectedIds = useMemo(
    () => collectedItems.map((item) => item.id),
    [collectedItems]
  );

  const collectedScriptures = useMemo(
    () => scriptures.filter((s) => collectedIds.includes(s.id)),
    [collectedIds]
  );

  const addToCollection = useCallback(async (scriptureId: number, rarity: Rarity) => {
    // 이미 수집된 구절이면 무시
    if (collectedIds.includes(scriptureId)) return;

    // 낙관적 업데이트: Supabase 응답 전에 즉시 UI 반영
    setCollectedItems((prev) => {
      const updated = [...prev, { id: scriptureId, rarity }];
      // 마일스톤 감지: 새 수집 개수 기준
      const milestone = MILESTONES.find((m) => m.count === updated.length);
      if (milestone) setLastMilestone({ emoji: milestone.emoji, message: milestone.message });
      return updated;
    });

    if (!user) return;

    const supabase = createBrowserClient();
    await supabase.from('scripture_collections').upsert(
      {
        user_id: user.id,
        scripture_id: scriptureId,
        rarity,
        collected_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,scripture_id', ignoreDuplicates: true }
    );
  }, [user, collectedIds]);

  const clearMilestone = useCallback(() => setLastMilestone(null), []);

  return { collectedScriptures, collectedIds, collectedItems, isLoading, addToCollection, lastMilestone, clearMilestone };
}

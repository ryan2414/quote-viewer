'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createBrowserClient } from '@/lib/supabase';

const COOLDOWN_MS = 10800000; // 3시간
const LS_KEY = 'scripture-draw-timer';

interface DrawTimerRow {
  last_draw_time: string | null;
  total_draws: number;
  streak_days: number;
  last_streak_date: string | null;
}

export function useDrawTimer() {
  const { user } = useAuth();
  const [lastDrawTime, setLastDrawTime] = useState<number | null>(null);
  const [canDraw, setCanDraw] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [streakDays, setStreakDays] = useState(0);

  // 로그인 상태 변경 시 타이머 + 스트릭 로드
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    async function loadTimer() {
      let last: number | null = null;

      if (user) {
        const supabase = createBrowserClient();
        const { data } = await supabase
          .from('draw_timers')
          .select('last_draw_time, total_draws, streak_days, last_streak_date')
          .eq('user_id', user.id)
          .single();
        const row = data as DrawTimerRow | null;
        if (row?.last_draw_time) {
          last = new Date(row.last_draw_time).getTime();
        }
        if (cancelled) return;
        setStreakDays(row?.streak_days ?? 0);
      } else {
        const stored = localStorage.getItem(LS_KEY);
        if (stored) last = parseInt(stored, 10);
        if (cancelled) return;
        setStreakDays(0);
      }

      if (cancelled) return;

      const elapsed = last ? Date.now() - last : COOLDOWN_MS;
      const can = elapsed >= COOLDOWN_MS;

      setLastDrawTime(last);
      setCanDraw(can);
      setRemainingMs(can ? 0 : COOLDOWN_MS - elapsed);
      setIsLoading(false);
    }

    loadTimer();
    return () => { cancelled = true; };
  }, [user]);

  // 쿨다운 중 1초마다 remainingMs 갱신
  useEffect(() => {
    if (canDraw || isLoading || lastDrawTime === null) return;

    const interval = setInterval(() => {
      const remaining = (lastDrawTime + COOLDOWN_MS) - Date.now();
      if (remaining <= 0) {
        setCanDraw(true);
        setRemainingMs(0);
        clearInterval(interval);
      } else {
        setRemainingMs(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [canDraw, isLoading, lastDrawTime]);

  const recordDraw = useCallback(async () => {
    const now = Date.now();
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (user) {
      const supabase = createBrowserClient();
      const { data: existingRaw } = await supabase
        .from('draw_timers')
        .select('total_draws, streak_days, last_streak_date')
        .eq('user_id', user.id)
        .single();
      const existing = existingRaw as { total_draws: number; streak_days: number; last_streak_date: string | null } | null;

      const lastDate = existing?.last_streak_date ?? null;
      let newStreak: number;
      if (lastDate === today) {
        // 오늘 이미 뽑음 — 스트릭 유지
        newStreak = existing?.streak_days ?? 1;
      } else if (lastDate === yesterday) {
        // 어제 뽑음 — 스트릭 증가
        newStreak = (existing?.streak_days ?? 0) + 1;
      } else {
        // 첫 뽑기 또는 스트릭 끊김
        newStreak = 1;
      }

      await supabase.from('draw_timers').upsert({
        user_id: user.id,
        last_draw_time: new Date(now).toISOString(),
        total_draws: (existing?.total_draws ?? 0) + 1,
        streak_days: newStreak,
        last_streak_date: today,
      }, { onConflict: 'user_id' });

      setStreakDays(newStreak);
    } else {
      localStorage.setItem(LS_KEY, now.toString());
    }

    setLastDrawTime(now);
    setCanDraw(false);
    setRemainingMs(COOLDOWN_MS);
  }, [user]);

  return { canDraw, remainingMs, isLoading, streakDays, recordDraw };
}

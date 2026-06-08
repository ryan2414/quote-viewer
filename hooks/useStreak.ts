'use client';

import { useState, useEffect } from 'react';

const STREAK_KEY = 'quote-viewer-streak';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastVisitDate: string;   // 'YYYY-MM-DD'
  totalDays: number;
}

interface StreakState extends StreakData {
  isHydrated: boolean;
  justMilestone: number | null;  // 이번 방문에 달성한 마일스톤 (없으면 null)
}

const MILESTONES = [3, 7, 14, 30, 60, 100];

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
}

function loadStreak(): StreakData | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STREAK_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as StreakData;
    if (typeof parsed.currentStreak !== 'number') return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveStreak(data: StreakData) {
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {
    // 저장 실패 조용히 무시
  }
}

export function useStreak(): StreakState {
  const [state, setState] = useState<StreakState>({
    currentStreak: 0,
    longestStreak: 0,
    lastVisitDate: '',
    totalDays: 0,
    isHydrated: false,
    justMilestone: null,
  });

  useEffect(() => {
    const today = todayStr();
    const saved = loadStreak();

    let newData: StreakData;
    let milestone: number | null = null;

    if (!saved) {
      // 첫 방문
      newData = { currentStreak: 1, longestStreak: 1, lastVisitDate: today, totalDays: 1 };
    } else if (saved.lastVisitDate === today) {
      // 오늘 이미 방문
      newData = saved;
    } else {
      const diff = daysBetween(saved.lastVisitDate, today);
      if (diff === 1) {
        // 연속 방문
        const next = saved.currentStreak + 1;
        const longest = Math.max(next, saved.longestStreak);
        newData = { currentStreak: next, longestStreak: longest, lastVisitDate: today, totalDays: saved.totalDays + 1 };
        // 마일스톤 달성 여부 확인
        if (MILESTONES.includes(next)) milestone = next;
      } else {
        // 하루 이상 끊김, 스트릭 리셋
        newData = { currentStreak: 1, longestStreak: saved.longestStreak, lastVisitDate: today, totalDays: saved.totalDays + 1 };
      }
    }

    saveStreak(newData);
    setState({ ...newData, isHydrated: true, justMilestone: milestone });
  }, []);

  return state;
}

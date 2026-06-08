'use client';

import { useState, useEffect } from 'react';

const HISTORY_KEY = 'quote-viewer-history';
const MAX_DAYS = 7;

export interface QuoteHistoryEntry {
  date: string;   // 'YYYY-MM-DD'
  quoteId: number;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadHistory(): QuoteHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(parsed)) return [];
    return (parsed as QuoteHistoryEntry[]).filter(
      (e) => typeof e.date === 'string' && typeof e.quoteId === 'number'
    );
  } catch {
    return [];
  }
}

function saveHistory(history: QuoteHistoryEntry[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // 저장 실패 조용히 무시
  }
}

export function useQuoteHistory(todayQuoteId: number) {
  const [history, setHistory] = useState<QuoteHistoryEntry[]>([]);

  useEffect(() => {
    const today = todayStr();
    const existing = loadHistory();

    // 이미 오늘 날짜 항목이 있으면 업데이트 없이 로드
    const hasTodayEntry = existing.some((e) => e.date === today);
    let updated: QuoteHistoryEntry[];

    if (!hasTodayEntry) {
      // 오늘 명언 추가 후 MAX_DAYS 개만 유지 (최신순)
      updated = [{ date: today, quoteId: todayQuoteId }, ...existing].slice(0, MAX_DAYS);
      saveHistory(updated);
    } else {
      updated = existing;
    }

    setHistory(updated);
  }, [todayQuoteId]);

  return { history };
}

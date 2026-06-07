'use client';

import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'qv-onboarding-v1';

export function useOnboarding() {
  const [state, setState] = useState({ isFirstVisit: false, isHydrated: false });

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    setState({ isFirstVisit: !completed, isHydrated: true });
  }, []);

  const completeOnboarding = () => {
    try {
      localStorage.setItem(ONBOARDING_KEY, 'true');
    } catch {
      // localStorage 접근 불가 환경 무시
    }
    setState((prev) => ({ ...prev, isFirstVisit: false }));
  };

  return {
    isFirstVisit: state.isHydrated && state.isFirstVisit,
    completeOnboarding,
  };
}

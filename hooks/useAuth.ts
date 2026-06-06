'use client';

import { useState, useEffect } from 'react';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';
import { createBrowserClient } from '@/lib/supabase';

export function useAuth() {
  const [state, setState] = useState<{ user: User | null; isLoading: boolean }>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const supabase = createBrowserClient();

    // 초기 세션 로드
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setState({ user: session?.user ?? null, isLoading: false });
    });

    // 로그인/로그아웃 이벤트 실시간 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setState({ user: session?.user ?? null, isLoading: false });
      }
    );

    // 메모리 누수 방지를 위해 구독 해제
    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    });
  };

  const signOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
  };

  return {
    user: state.user,
    isLoading: state.isLoading,
    signInWithGoogle,
    signOut,
  };
}

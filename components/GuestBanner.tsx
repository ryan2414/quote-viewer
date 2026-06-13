'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';

interface GuestBannerProps {
  onLoginClick: () => void;
}

export default function GuestBanner({ onLoginClick }: GuestBannerProps) {
  const t = useTranslations('auth');
  const tNav = useTranslations('nav');
  const { user, isLoading } = useAuth();

  if (isLoading || user) return null;

  return (
    <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
      <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0" />
      <p className="text-sm text-blue-700 dark:text-blue-300 flex-1">
        {t('guestBannerText')}
      </p>
      <button
        onClick={onLoginClick}
        className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors"
      >
        {tNav('login')}
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'duplicate';

export default function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { message?: string; error?: string };

      if (res.status === 409) {
        setStatus('duplicate');
        setMessage(data.error ?? t('alreadySubscribed'));
      } else if (!res.ok) {
        setStatus('error');
        setMessage(data.error ?? t('networkError'));
      } else {
        setStatus('success');
        setMessage(data.message ?? t('subscribeSuccess'));
        setEmail('');
      }
    } catch {
      setStatus('error');
      setMessage(t('networkError'));
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('emailPlaceholder')}
        required
        className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
        aria-label={t('emailPlaceholder')}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors disabled:opacity-60 whitespace-nowrap"
      >
        {status === 'loading' ? t('subscribing') : t('subscribe')}
      </button>
      {(status === 'error' || status === 'duplicate') && (
        <p className="text-xs text-red-500 dark:text-red-400 sm:col-span-2">{message}</p>
      )}
    </form>
  );
}

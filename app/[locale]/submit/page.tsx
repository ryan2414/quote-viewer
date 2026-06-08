'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { categories } from '@/data/categories';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SubmitPage() {
  const t = useTranslations('submit');
  const { user } = useAuth();
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ text: '', author: '', category: '', source: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.text.trim() || !form.author.trim()) {
      setErrorMsg(t('errorRequired'));
      return;
    }
    if (form.text.trim().length < 10) {
      setErrorMsg(t('errorMinLength'));
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/quotes/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: form.text.trim(),
          author: form.author.trim(),
          category: form.category || null,
          source: form.source.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? t('errorRequired'));
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('errorRequired'));
    }
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">🔒</div>
        <p className="text-gray-500 dark:text-gray-400">{t('loginRequired')}</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="text-4xl" aria-hidden="true">✅</div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('successTitle')}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t('successDesc')}</p>
        <button
          onClick={() => { setStatus('idle'); setForm({ text: '', author: '', category: '', source: '' }); }}
          className="mt-4 px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm"
        >
          {t('submitAnother')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">{t('subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('textLabel')} <span className="text-rose-500">*</span>
          </label>
          <textarea
            value={form.text}
            onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
            placeholder={t('textPlaceholder')}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('authorLabel')} <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
            placeholder={t('authorPlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('categoryLabel')}
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="">선택 안 함</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            {t('sourceLabel')}
          </label>
          <input
            type="text"
            value={form.source}
            onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
            placeholder={t('sourcePlaceholder')}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {errorMsg && (
          <p className="text-sm text-rose-500">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? '제출 중...' : t('submitButton')}
        </button>
      </form>
    </div>
  );
}

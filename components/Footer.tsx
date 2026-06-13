'use client';

import NewsletterForm from './NewsletterForm';
import PushNotificationButton from './PushNotificationButton';
import { trackEvent } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

const BMC_URL = process.env.NEXT_PUBLIC_BMC_URL;

function BmcButton() {
  if (!BMC_URL) return null;
  return (
    <a
      href={BMC_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('bmc_click')}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold text-sm transition-colors shadow-sm"
      aria-label="Buy Me a Coffee — 후원하기"
    >
      ☕ Buy Me a Coffee
    </a>
  );
}

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="border-t border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-950">
      {/* 뉴스레터 + 푸시 알림 섹션 */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{t('newsletter')}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{t('newsletterDesc')}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <NewsletterForm />
            <PushNotificationButton />
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* 저작권 + 제작자 */}
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 text-center sm:text-left">
          {t('copyright')}
          <span className="mx-1.5" aria-hidden="true">·</span>
          {t('madeBy')}{' '}
          <a
            href="https://github.com/ryan2414"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150 underline underline-offset-2"
          >
            CapyCode
          </a>
        </p>

        {/* 우측: 후원 + 이메일 + GitHub */}
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
          <BmcButton />

          <a
            href="mailto:js6270@naver.com"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150"
            aria-label="이메일 보내기"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            js6270@naver.com
          </a>

          <a
            href="https://github.com/ryan2414/quote-viewer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-150"
            aria-label="GitHub 저장소 보기"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { useQuoteHistory } from '@/hooks/useQuoteHistory';
import { getQuoteById, getTodayQuote } from '@/data/quotes';

const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(dateStr: string): { display: string; dayKo: string } {
  const d = new Date(`${dateStr}T00:00:00`);
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const dayKo = DAYS_KO[d.getDay()];
  const mmdd = `${d.getMonth() + 1}/${d.getDate()}`;

  if (dateStr === today) return { display: '오늘', dayKo };
  if (dateStr === yesterday) return { display: '어제', dayKo };
  return { display: mmdd, dayKo };
}

export default function QuoteHistoryClient() {
  const todayQuote = getTodayQuote();
  const { history } = useQuoteHistory(todayQuote.id);

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <svg className="w-14 h-14 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-gray-500 dark:text-gray-400">히스토리를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          최근 7일 명언 기록
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          매일 하루 한 명언씩 저장됩니다
        </p>
      </div>

      <ol className="relative border-l border-gray-200 dark:border-gray-800 space-y-8 ml-4">
        {history.map((entry, idx) => {
          const quote = getQuoteById(entry.quoteId);
          const { display, dayKo } = formatDate(entry.date);

          return (
            <li key={entry.date} className="ml-6">
              {/* 타임라인 점 */}
              <span className={`absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white dark:ring-gray-950 ${idx === 0 ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
                <svg className={`w-2.5 h-2.5 ${idx === 0 ? 'text-white dark:text-gray-900' : 'text-gray-600 dark:text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </span>

              {/* 날짜 레이블 */}
              <time className="mb-2 flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <span className={idx === 0 ? 'text-gray-900 dark:text-white' : ''}>{display}</span>
                <span>({dayKo})</span>
                <span className="font-normal normal-case tracking-normal">{entry.date}</span>
              </time>

              {quote ? (
                <Link
                  href={`/quotes/${quote.id}`}
                  className="block p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-150"
                >
                  <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-100 leading-relaxed line-clamp-3">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">— {quote.author}</p>
                </Link>
              ) : (
                <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
                  <p className="text-sm text-gray-400 dark:text-gray-500">명언을 찾을 수 없습니다</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-12 text-center">
        <Link
          href="/quotes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors shadow-sm"
        >
          오늘의 명언 보기
        </Link>
      </div>
    </div>
  );
}

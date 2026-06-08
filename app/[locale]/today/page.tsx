import type { Metadata } from 'next';
import QuoteHistoryClient from '@/components/QuoteHistoryClient';

export const metadata: Metadata = {
  title: '최근 7일 명언 기록',
  description: '매일 하루 한 명언씩 기록된 최근 7일간의 명언 히스토리를 확인하세요.',
  alternates: { canonical: '/today' },
};

export default function TodayPage() {
  return <QuoteHistoryClient />;
}

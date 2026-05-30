import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '명언 모음',
  description: '위인들의 지혜로운 명언 32개를 한눈에 모아보세요. 즐겨찾기로 마음에 드는 명언을 저장하세요.',
  openGraph: {
    title: '명언 모음 | Quote Viewer',
    description: '위인들의 지혜로운 명언을 모아보세요.',
    url: '/quotes',
  },
  alternates: { canonical: '/quotes' },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

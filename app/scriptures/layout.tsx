import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '성경 구절',
  description: '개역개정과 NIV 성경 구절을 한눈에. 믿음, 소망, 사랑, 위로의 말씀을 매일 만나보세요.',
  openGraph: {
    title: '성경 구절 | Quote Viewer',
    description: '개역개정과 NIV 성경 구절을 카테고리별로 모아보세요.',
    url: '/scriptures',
  },
  alternates: { canonical: '/scriptures' },
};

export default function ScripturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

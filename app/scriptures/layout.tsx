import type { Metadata } from 'next';
import { scriptures } from '@/data/scriptures';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const metadata: Metadata = {
  title: '성경 구절',
  description: `개역개정과 NIV 성경 구절 ${scriptures.length}개를 한눈에. 믿음, 소망, 사랑, 위로의 말씀을 매일 만나보세요.`,
  keywords: ['성경 구절', '개역개정', 'NIV', '말씀', '믿음', '소망', '사랑', '위로', '성경 말씀', 'Bible verse'],
  openGraph: {
    title: '성경 구절 | Quote Viewer',
    description: '개역개정과 NIV 성경 구절을 카테고리별로 모아보세요.',
    url: '/scriptures',
  },
  alternates: { canonical: '/scriptures' },
};

const scripturesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '성경 구절',
  description: `개역개정과 NIV 성경 구절 ${scriptures.length}개 모음`,
  url: `${SITE_URL}/scriptures`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: scriptures.length,
    itemListElement: scriptures.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Quotation',
        text: s.text,
        description: s.text_en,
        citation: `${s.book} ${s.chapter}:${s.verse}`,
      },
    })),
  },
};

export default function ScripturesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(scripturesJsonLd) }}
      />
      {children}
    </>
  );
}

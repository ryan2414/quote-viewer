import type { Metadata } from 'next';
import { quotes } from '@/data/quotes';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const metadata: Metadata = {
  title: '명언',
  description: `오늘의 명언과 위인들의 지혜로운 명언 ${quotes.length}개를 한눈에 모아보세요. 즐겨찾기로 마음에 드는 명언을 저장하세요.`,
  keywords: ['오늘의 명언', '명언 모음', '위인 명언', '동기부여 명언', '인생 명언', '짧은 명언', 'inspirational quotes'],
  openGraph: {
    title: '명언 | Quote Viewer',
    description: '오늘의 명언과 위인들의 지혜로운 명언을 모아보세요.',
    url: '/quotes',
  },
  alternates: { canonical: '/quotes' },
};

const quotesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '명언 모음',
  description: `위인들의 지혜로운 명언 ${quotes.length}개 모음`,
  url: `${SITE_URL}/quotes`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: quotes.length,
    itemListElement: quotes.map((q, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Quotation',
        text: q.text,
        spokenByCharacter: { '@type': 'Person', name: q.author },
      },
    })),
  },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(quotesJsonLd) }}
      />
      {children}
    </>
  );
}

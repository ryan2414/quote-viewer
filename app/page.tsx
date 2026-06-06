import type { Metadata } from 'next';
import { getTodayQuote } from '@/data/quotes';
import HomeClient from '@/components/HomeClient';

// JSON-LD 삽입 시 </script> 인젝션 방지: <, >, & 를 유니코드 이스케이프로 치환
function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

// 오늘의 명언이 변경되는 주기(매일)에 맞춰 하루 단위로 재생성
export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const quote = getTodayQuote();
  const shortText = quote.text.length > 60 ? quote.text.slice(0, 60) + '…' : quote.text;

  return {
    title: `오늘의 명언: "${shortText}" — ${quote.author}`,
    description: `오늘의 명언: "${quote.text}" — ${quote.author}. Quote Viewer에서 매일 새로운 명언으로 하루를 시작하세요.`,
    openGraph: {
      title: `오늘의 명언: "${shortText}" — ${quote.author}`,
      description: `"${quote.text}" — ${quote.author}`,
    },
    twitter: {
      title: `오늘의 명언: "${shortText}" — ${quote.author}`,
      description: `"${quote.text}" — ${quote.author}`,
    },
  };
}

export default function Home() {
  const todayQuote = getTodayQuote();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `오늘의 명언: ${todayQuote.text}`,
    description: `"${todayQuote.text}" — ${todayQuote.author}`,
    author: { '@type': 'Person', name: todayQuote.author },
    publisher: {
      '@type': 'Organization',
      name: 'Quote Viewer',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app',
    },
    inLanguage: 'ko',
    datePublished: new Date().toISOString().split('T')[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}

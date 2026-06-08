import type { Metadata } from 'next';
import { getTodayQuote, getQuoteById, quotes } from '@/data/quotes';
import QuotesClient from '@/components/QuotesClient';

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export const revalidate = 86400;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ quoteId?: string }>;
}): Promise<Metadata> {
  const { quoteId } = await searchParams;
  const id = quoteId ? parseInt(quoteId, 10) : undefined;
  const featured = id ? (getQuoteById(id) ?? getTodayQuote()) : getTodayQuote();
  const shortText = featured.text.length > 60 ? featured.text.slice(0, 60) + '…' : featured.text;

  return {
    title: `명언: "${shortText}" — ${featured.author}`,
    description: `위인들의 명언 ${quotes.length}개 모음. 오늘의 명언: "${featured.text}" — ${featured.author}`,
    openGraph: {
      title: `명언: "${shortText}" — ${featured.author}`,
      description: `"${featured.text}" — ${featured.author}`,
    },
    twitter: {
      title: `명언: "${shortText}" — ${featured.author}`,
      description: `"${featured.text}" — ${featured.author}`,
    },
    alternates: { canonical: '/quotes' },
  };
}

export default async function QuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ quoteId?: string }>;
}) {
  const { quoteId } = await searchParams;
  const initialQuoteId = quoteId ? parseInt(quoteId, 10) : undefined;
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
      <QuotesClient todayQuote={todayQuote} initialQuoteId={initialQuoteId} />
    </>
  );
}

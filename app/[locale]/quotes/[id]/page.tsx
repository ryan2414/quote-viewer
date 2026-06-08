import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { quotes, getQuoteById } from '@/data/quotes';
import { getCategoryMeta } from '@/data/categories';
import QuoteDetailClient from '@/components/QuoteDetailClient';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function generateStaticParams() {
  return quotes.map((q) => ({ id: String(q.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const quote = getQuoteById(Number(id));
  if (!quote) return {};

  const shortText = quote.text.length > 60 ? quote.text.slice(0, 60) + '…' : quote.text;
  const title = `"${shortText}" — ${quote.author}`;
  const description = `${quote.author}의 명언: "${quote.text}"`;
  const canonicalUrl = `${SITE_URL}/quotes/${quote.id}`;

  return {
    title,
    description,
    keywords: [quote.author, '명언', '좋은 글귀', ...(quote.category ? [quote.category] : [])],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: `/quotes/${quote.id}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/quotes/${quote.id}/opengraph-image`],
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quoteId = Number(id);
  const quote = getQuoteById(quoteId);

  if (!quote) notFound();

  const sortedIds = quotes.map((q) => q.id).sort((a, b) => a - b);
  const currentIndex = sortedIds.indexOf(quoteId);
  const prevId = currentIndex > 0 ? sortedIds[currentIndex - 1] : null;
  const nextId = currentIndex < sortedIds.length - 1 ? sortedIds[currentIndex + 1] : null;

  const relatedQuotes = quote.category
    ? quotes.filter((q) => q.category === quote.category && q.id !== quote.id).slice(0, 3)
    : [];

  const categoryMeta = getCategoryMeta(quote.category);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: quote.text,
    spokenByCharacter: { '@type': 'Person', name: quote.author },
    ...(quote.source ? { isPartOf: { '@type': 'Book', name: quote.source } } : {}),
    inLanguage: /[가-힣]/.test(quote.text) ? 'ko' : 'en',
    url: `${SITE_URL}/quotes/${quote.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <QuoteDetailClient
        quote={quote}
        prevId={prevId}
        nextId={nextId}
        relatedQuotes={relatedQuotes}
        categoryLabel={categoryMeta?.label}
        categoryBadgeClass={categoryMeta?.badgeClass}
      />
    </>
  );
}

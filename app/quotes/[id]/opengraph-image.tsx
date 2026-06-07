import { ImageResponse } from 'next/og';
import { getQuoteById } from '@/data/quotes';
import { getCategoryMeta } from '@/data/categories';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = getQuoteById(Number(id));

  if (!quote) {
    return new ImageResponse(
      <div style={{ background: '#111827', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#9ca3af', fontSize: 32 }}>명언을 찾을 수 없습니다</span>
      </div>
    );
  }

  const category = getCategoryMeta(quote.category);

  const categoryColors: Record<string, { bg: string; text: string }> = {
    wisdom: { bg: '#1e3a5f', text: '#93c5fd' },
    motivation: { bg: '#14532d', text: '#86efac' },
    life: { bg: '#2e1065', text: '#c4b5fd' },
    courage: { bg: '#431407', text: '#fdba74' },
    love: { bg: '#4c0519', text: '#fda4af' },
  };

  const colors = quote.category ? (categoryColors[quote.category] ?? { bg: '#1f2937', text: '#9ca3af' }) : { bg: '#1f2937', text: '#9ca3af' };

  const isLong = quote.text.length > 80;
  const fontSize = isLong ? 42 : 56;

  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
        position: 'relative',
      }}
    >
      {/* 카테고리 배지 */}
      {category && (
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '80px',
            background: colors.bg,
            color: colors.text,
            fontSize: 22,
            fontWeight: 600,
            padding: '8px 20px',
            borderRadius: '999px',
            display: 'flex',
          }}
        >
          {category.label}
        </div>
      )}

      {/* 따옴표 장식 */}
      <div style={{ color: '#374151', fontSize: 120, lineHeight: 1, marginBottom: 24, display: 'flex' }}>
        &ldquo;
      </div>

      {/* 명언 본문 */}
      <div
        style={{
          color: '#f1f5f9',
          fontSize,
          fontWeight: 700,
          textAlign: 'center',
          lineHeight: 1.4,
          maxWidth: '960px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {quote.text}
      </div>

      {/* 구분선 */}
      <div
        style={{
          width: '60px',
          height: '2px',
          background: '#4b5563',
          margin: '36px 0',
          display: 'flex',
        }}
      />

      {/* 저자 */}
      <div
        style={{
          color: '#94a3b8',
          fontSize: 32,
          fontWeight: 500,
          display: 'flex',
        }}
      >
        — {quote.author}
      </div>

      {/* 브랜드 워터마크 */}
      <div
        style={{
          position: 'absolute',
          bottom: '48px',
          right: '80px',
          color: '#374151',
          fontSize: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        Quote Viewer
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Quote Viewer - 오늘의 명언';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          color: '#f9fafb',
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        Quote Viewer
      </div>
      <div
        style={{
          color: '#9ca3af',
          fontSize: 32,
          marginTop: 24,
          textAlign: 'center',
        }}
      >
        오늘의 명언으로 영감을 받으세요
      </div>
    </div>
  );
}

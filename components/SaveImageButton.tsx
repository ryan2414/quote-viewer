'use client';

import { useRef, useState } from 'react';
import type { Quote } from '@/types/quote';
import { trackEvent } from '@/lib/analytics';

interface SaveImageButtonProps {
  quote: Quote;
}

export default function SaveImageButton({ quote }: SaveImageButtonProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    setIsCapturing(true);
    try {
      const html2canvas = (await import('html2canvas')).default;

      // 캡처용 임시 카드 요소 생성
      const captureEl = document.createElement('div');
      captureEl.style.cssText = `
        position: fixed;
        left: -9999px;
        top: 0;
        width: 600px;
        padding: 60px;
        background: #ffffff;
        font-family: 'Noto Serif KR', Georgia, serif;
        box-sizing: border-box;
      `;

      // 안전한 DOM 조작으로 카드 구성 (XSS 방지: textContent 사용)
      const card = document.createElement('div');
      Object.assign(card.style, {
        textAlign: 'center',
        padding: '40px',
        background: '#f9fafb',
        borderRadius: '20px',
        border: '1px solid #e5e7eb',
      });

      const quoteIcon = document.createElement('div');
      Object.assign(quoteIcon.style, { color: '#d1d5db', fontSize: '32px', marginBottom: '20px' });
      quoteIcon.textContent = '"';
      card.appendChild(quoteIcon);

      const textEl = document.createElement('p');
      Object.assign(textEl.style, { fontSize: '22px', fontWeight: '700', color: '#111827', lineHeight: '1.7', margin: '0 0 24px' });
      textEl.textContent = quote.text;
      card.appendChild(textEl);

      const divider = document.createElement('div');
      Object.assign(divider.style, { width: '40px', height: '1px', background: '#d1d5db', margin: '0 auto 20px' });
      card.appendChild(divider);

      const authorEl = document.createElement('p');
      Object.assign(authorEl.style, { fontSize: '14px', color: '#6b7280', margin: '0 0 8px' });
      authorEl.textContent = `— ${quote.author}`;
      card.appendChild(authorEl);

      if (quote.source) {
        const sourceEl = document.createElement('p');
        Object.assign(sourceEl.style, { fontSize: '12px', color: '#9ca3af', fontStyle: 'italic', margin: '0 0 16px' });
        sourceEl.textContent = quote.source;
        card.appendChild(sourceEl);
      }

      const watermark = document.createElement('p');
      Object.assign(watermark.style, { fontSize: '11px', color: '#d1d5db', margin: '0', letterSpacing: '0.05em' });
      watermark.textContent = 'quote-viewer-pi.vercel.app';
      card.appendChild(watermark);

      captureEl.appendChild(card);

      document.body.appendChild(captureEl);

      const canvas = await html2canvas(captureEl, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 600,
        height: captureEl.offsetHeight,
      });

      document.body.removeChild(captureEl);

      const link = document.createElement('a');
      link.download = `quote-${quote.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      trackEvent('save_image', { quote_id: quote.id });
    } catch {
      // 캡처 실패 시 조용히 무시
    } finally {
      setIsCapturing(false);
    }
  };

  return (
    <>
      {/* 숨겨진 참조 요소 (미사용, 직접 DOM 생성 방식 사용) */}
      <div ref={cardRef} className="hidden" aria-hidden="true" />
      <button
        onClick={handleSaveImage}
        disabled={isCapturing}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 active:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white font-medium text-sm transition-all duration-150 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label="명언 이미지로 저장"
      >
        {isCapturing ? (
          <svg className="w-4 h-4 shrink-0 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        {isCapturing ? '저장 중...' : '이미지 저장'}
      </button>
    </>
  );
}

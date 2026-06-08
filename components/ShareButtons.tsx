'use client';

import { trackEvent } from '@/lib/analytics';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer-pi.vercel.app').replace(/\/$/, '');
const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

interface ShareButtonsProps {
  quoteText: string;
  author: string;
  quoteId?: number;
}

export default function ShareButtons({ quoteText, author, quoteId }: ShareButtonsProps) {
  const shareUrl = quoteId ? `${SITE_URL}/quotes/${quoteId}` : SITE_URL;
  const shareText = `"${quoteText}" — ${author}`;

  const handleKakaoShare = () => {
    if (!KAKAO_APP_KEY || typeof window === 'undefined') return;
    const kakao = window.Kakao;
    if (!kakao) return;
    if (!kakao.isInitialized()) kakao.init(KAKAO_APP_KEY);

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `"${quoteText.slice(0, 50)}${quoteText.length > 50 ? '…' : ''}"`,
        description: `— ${author}`,
        imageUrl: quoteId
          ? `${SITE_URL}/quotes/${quoteId}/opengraph-image`
          : `${SITE_URL}/opengraph-image`,
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      },
    });
    trackEvent('share', { method: 'kakao', quote_id: quoteId });
  };

  const handleXShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    trackEvent('share', { method: 'x_twitter', quote_id: quoteId });
  };

  return (
    <div className="flex items-center gap-2">
      {/* 카카오톡 공유: 앱 키가 설정된 경우에만 표시 */}
      {KAKAO_APP_KEY && (
        <button
          onClick={handleKakaoShare}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FEE500] hover:bg-[#F5DC00] active:bg-[#ECD300] text-[#3C1E1E] font-medium text-sm transition-all duration-150 shadow-sm hover:shadow-md"
          aria-label="카카오톡으로 공유"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3C6.48 3 2 6.48 2 10.8c0 2.72 1.45 5.14 3.68 6.65L4.8 21l4.26-2.27c.93.26 1.9.4 2.94.4 5.52 0 10-3.48 10-7.8S17.52 3 12 3z" />
          </svg>
          카카오
        </button>
      )}

      {/* X(트위터) 공유 */}
      <button
        onClick={handleXShare}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-800 active:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 text-white font-medium text-sm transition-all duration-150 shadow-sm hover:shadow-md"
        aria-label="X(트위터)로 공유"
      >
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        X
      </button>
    </div>
  );
}

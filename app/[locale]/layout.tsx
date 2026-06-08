import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PwaRegister from "@/components/PwaRegister";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { routing } from "@/i18n/routing";
import "../globals.css";

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Quote Viewer',
  url: SITE_URL,
  description: '매일 새로운 명언으로 영감을 받으세요. 위인들의 지혜로운 말을 한국어와 영어로 만나보세요.',
  inLanguage: 'ko',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/quotes` },
    'query-input': 'required name=search_term_string',
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app'),
  title: { default: 'Quote Viewer - 오늘의 명언', template: '%s | Quote Viewer' },
  description: '매일 새로운 명언으로 영감을 받으세요. 위인들의 지혜로운 말을 한국어와 영어로 만나보세요.',
  keywords: [
    '명언', '오늘의 명언', '영감', '동기부여', '위인 명언', '좋은 글귀',
    '짧은 명언', '인생 명언', '성공 명언', '용기 명언', '사랑 명언',
    '성경 구절', '말씀', '개역개정', '믿음', '소망',
    'quote', 'daily quote', 'inspirational quotes', 'motivational quotes',
    'Quote Viewer',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'Quote Viewer',
    title: 'Quote Viewer - 오늘의 명언',
    description: '매일 새로운 명언으로 영감을 받으세요.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Quote Viewer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quote Viewer - 오늘의 명언',
    description: '매일 새로운 명언으로 영감을 받으세요.',
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKR.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        {/* hreflang: 언어별 URL 동등성 선언 */}
        <link rel="alternate" hrefLang="ko" href={SITE_URL} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
        <GoogleAnalytics />
        <PwaRegister />
        {KAKAO_APP_KEY && (
          <Script
            src="https://t1.kakaocdn.net/kakaojs/2.7.4/kakao.min.js"
            crossOrigin="anonymous"
            strategy="lazyOnload"
            onLoad={() => {
              if (window.Kakao && !window.Kakao.isInitialized() && KAKAO_APP_KEY) {
                window.Kakao.init(KAKAO_APP_KEY);
              }
            }}
          />
        )}
      </body>
    </html>
  );
}

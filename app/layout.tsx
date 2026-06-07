import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

// JSON-LD 삽입 시 </script> 인젝션 방지
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app'),
  title: {
    default: 'Quote Viewer - 오늘의 명언',
    template: '%s | Quote Viewer',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKR.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        suppressHydrationWarning: 시스템 다크 모드 감지 시
        서버/클라이언트 HTML 불일치(hydration mismatch)를 방지합니다.
        body에 배경색을 명시하여 다크 모드 전환 시 배경 깜빡임(FOUC)을 방지합니다.
      */}
      <head>
        {/* FOUC 방지: hydration 전에 저장된 테마를 <html>에 적용 */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
      </head>
      {/* suppressHydrationWarning: 브라우저 확장 프로그램이 body에 속성을 주입할 때 발생하는 hydration mismatch 억제 */}
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
        {/* 헤더: 모든 페이지 상단에 공통 마운트 */}
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

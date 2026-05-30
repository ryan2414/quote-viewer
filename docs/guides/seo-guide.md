# SEO 구현 가이드 — 구글 검색 최적화

## 개요

Vercel에 배포된 quote-viewer 앱이 구글 검색에 노출되도록 SEO를 구현하는 가이드입니다.

**현재 문제:** 기본 title/description만 있고, robots.txt/sitemap.xml/OG 태그/구조화 데이터가 모두 없는 상태.

**핵심 제약사항:** `app/page.tsx`와 `app/quotes/page.tsx`가 `'use client'`이므로 직접 `metadata`를 export 불가 → 각 세그먼트에 `layout.tsx`를 추가하는 패턴으로 해결.

---

## 구현 순서

### 1단계: 환경변수 설정

`.env.local` 파일 생성 (git에서 자동 제외됨):

```bash
NEXT_PUBLIC_SITE_URL=https://[실제-vercel-url].vercel.app
```

Vercel 대시보드 > Settings > Environment Variables에도 동일하게 추가.

---

### 2단계: `app/layout.tsx` 강화

OG 태그, Twitter Card, canonical URL을 추가한다. `metadataBase` 설정이 핵심으로, 하위 페이지의 상대 경로 URL을 절대 URL로 자동 변환한다.

```typescript
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app'),
  title: {
    default: 'Quote Viewer - 오늘의 명언',
    template: '%s | Quote Viewer',
  },
  description: '매일 새로운 명언으로 영감을 받으세요. 위인들의 지혜로운 말을 한국어와 영어로 만나보세요.',
  keywords: ['명언', '오늘의 명언', '영감', '동기부여', '위인 명언', 'quote'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: '/',
    siteName: 'Quote Viewer',
    title: 'Quote Viewer - 오늘의 명언',
    description: '매일 새로운 명언으로 영감을 받으세요.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Quote Viewer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quote Viewer - 오늘의 명언',
    description: '매일 새로운 명언으로 영감을 받으세요.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};
```

---

### 3단계: `app/robots.ts` 생성

빌드 시 `/robots.txt`로 자동 생성된다.

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

### 4단계: `app/sitemap.ts` 생성

빌드 시 `/sitemap.xml`로 자동 생성된다. 홈 페이지는 매일 명언이 바뀌므로 `daily`, 명언 목록은 정적이므로 `monthly`.

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quotes`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

---

### 5단계: `app/quotes/layout.tsx` 생성

`app/quotes/page.tsx`가 `'use client'`이므로 metadata는 이 layout에서 처리한다. Next.js는 layout과 page의 metadata를 자동으로 병합한다.

```typescript
// app/quotes/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '명언 모음',
  description: '위인들의 지혜로운 명언 32개를 한눈에 모아보세요. 즐겨찾기로 마음에 드는 명언을 저장하세요.',
  openGraph: {
    title: '명언 모음 | Quote Viewer',
    description: '위인들의 지혜로운 명언을 모아보세요.',
    url: '/quotes',
  },
  alternates: { canonical: '/quotes' },
};

export default function QuotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

---

### 6단계: OG 이미지 생성

Next.js ImageResponse API를 사용해 동적으로 OG 이미지를 생성한다. 정적 PNG 파일 없이도 소셜 미리보기 이미지가 자동으로 제공된다.

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Quote Viewer - 오늘의 명언';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#111827',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      <div style={{ color: 'white', fontSize: 72, fontWeight: 700 }}>
        Quote Viewer
      </div>
      <div style={{ color: '#9ca3af', fontSize: 32, marginTop: 24 }}>
        오늘의 명언으로 영감을 받으세요
      </div>
    </div>
  );
}
```

---

### 7단계: Google Search Console 등록 (배포 후 수동 작업)

1. [Google Search Console](https://search.google.com/search-console) 접속 후 속성 추가
2. 소유권 인증 방법 — `app/layout.tsx` metadata에 인증 코드 추가:

```typescript
// app/layout.tsx의 metadata에 추가
verification: {
  google: 'YOUR_VERIFICATION_CODE', // Search Console에서 발급받은 코드
},
```

3. 인증 완료 후 Sitemaps 메뉴에서 `sitemap.xml` 제출

---

## 수정/생성 파일 요약

| 파일 | 작업 | 효과 |
|------|------|------|
| `app/layout.tsx` | 수정 | OG 태그, Twitter Card, canonical URL 추가 |
| `app/robots.ts` | 신규 | `/robots.txt` 자동 생성 |
| `app/sitemap.ts` | 신규 | `/sitemap.xml` 자동 생성 |
| `app/quotes/layout.tsx` | 신규 | `/quotes` 페이지 독립 메타데이터 |
| `app/opengraph-image.tsx` | 신규 | 소셜 공유 미리보기 이미지 |
| `.env.local` | 신규 | 배포 URL 환경변수 (git 제외) |

---

## 검증 방법

```bash
# 빌드 후 로컬에서 확인
npm run build && npm start

# 아래 URL에서 자동 생성 파일 확인
# http://localhost:3000/robots.txt
# http://localhost:3000/sitemap.xml
# http://localhost:3000/opengraph-image
```

- 브라우저 개발자도구 > Elements > `<head>` 에서 OG meta 태그 확인
- Vercel 재배포 후 Google Search Console에 sitemap 제출

---

## 참고: `'use client'` 페이지에서 metadata를 처리하는 패턴

Next.js App Router에서 `'use client'` 파일은 `metadata`를 export할 수 없다. 해결책은 두 가지:

1. **세그먼트 layout 추가 (권장)** — 해당 라우트 폴더에 `layout.tsx`를 Server Component로 추가하고 거기서 `metadata`를 export. 이 가이드에서 사용한 방법.
2. **상위 layout 활용** — 루트 `app/layout.tsx`에서 공통 metadata를 정의하고 하위 페이지는 상속.

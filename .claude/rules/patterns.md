# 핵심 코드 패턴

## Supabase 클라이언트

`lib/supabase.ts`에서 두 종류를 분리 관리:

```ts
// Client Component용 싱글톤 — 매 렌더마다 새 인스턴스 생성 방지
createBrowserClient()   // useAuth, useFavorites 등 훅에서 사용

// Server Component / Route Handler / Middleware용
createServerClient(cookieStore)  // cookies() 주입 필요
```

**규칙:** API Route Handler에서는 반드시 `createServerClient`를 직접 생성 (공유 인스턴스 사용 금지)

## i18n 라우팅 (next-intl)

```
locales: ['ko', 'en']
defaultLocale: 'ko'
localePrefix: 'as-needed'
→ 한국어: /quotes, /profile
→ 영어:   /en/quotes, /en/profile
```

- 새 페이지 추가 시: `app/[locale]/새페이지/page.tsx`
- 번역 문자열: `messages/ko.json` + `messages/en.json` 동시 추가
- Server Component에서 번역: `const t = await getTranslations('네임스페이스')`
- Client Component에서 번역: `const t = useTranslations('네임스페이스')`

## 인증 흐름 (Google OAuth)

```
1. AuthModal → supabase.auth.signInWithOAuth({ provider: 'google' })
2. Google 인증 완료 → /auth/callback?code=...
3. app/auth/callback/route.ts → exchangeCodeForSession → 홈으로 redirect
```

- 인증 상태 클라이언트: `hooks/useAuth.ts`
- 서버에서 세션 확인: `createServerClient(cookieStore).auth.getUser()`

## API Route 보안

모든 API Route Handler에서 인증이 필요한 경우:
```ts
const { data: { user } } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

## next.config.ts

- `createNextIntlPlugin` 래핑 필수
- 보안 헤더 전체 경로에 적용 (X-Frame-Options, CSP 등)
- 변경 시 빌드 테스트 필수

## PWA / 웹 푸시

- `app/manifest.ts` — PWA 매니페스트
- `components/PushNotificationButton.tsx` — VAPID 구독 UI
- `app/api/push/route.ts` — 서버에서 web-push 발송
- Service Worker: `public/sw.js`

## 이미지 저장 (html2canvas)

`components/SaveImageButton.tsx`에서 명언 카드를 캔버스로 변환 후 다운로드.
CORS 제약으로 외부 이미지 포함 시 `useCORS: true` 옵션 필요.

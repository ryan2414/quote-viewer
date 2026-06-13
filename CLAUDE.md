# CLAUDE.md

## 기술 스택
- **Next.js 16.2.6** (App Router + `[locale]` i18n 라우팅)
- **Supabase** (`@supabase/ssr`) — Google OAuth 인증 + DB
- **next-intl 4** — 한국어(기본)/영어, `localePrefix: 'as-needed'`
- **Anthropic AI SDK** — AI 명언 추천
- **Resend** — 뉴스레터, **Web Push** (VAPID) — 푸시 알림
- **Tailwind CSS 4** / **TypeScript** / **ESLint 9**

## 개발 명령어
```bash
npm run dev    # 개발 서버 (포트 3000)
npm run build  # 프로덕션 빌드
npm run lint   # 코드 품질 확인
```

## 프로젝트 구조
```
app/
  [locale]/     # 모든 페이지 (ko: prefix 없음, en: /en/...)
  api/          # API 라우트 (likes, push, newsletter, recommendations)
  auth/callback # OAuth 콜백
components/     # 공유 UI 컴포넌트
hooks/          # useAuth, useFavorites 등 커스텀 훅
lib/            # supabase.ts, analytics.ts
data/           # 정적 데이터 (quotes.ts, scripture.ts)
types/          # 공유 TypeScript 타입
i18n/           # next-intl 설정
messages/       # ko.json, en.json
```

## 주의사항
- 새 페이지는 반드시 `app/[locale]/` 아래에 추가
- Supabase 클라이언트: Client Component → `createBrowserClient`, Server → `createServerClient`
- 환경 변수: `.env.local` (상세 목록 → `.claude/rules/environment.md`)
- 상세 패턴 → `.claude/rules/`

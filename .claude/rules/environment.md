# 환경 변수

## .env.local 전체 목록

```bash
# 사이트
NEXT_PUBLIC_SITE_URL=https://example.com

# Supabase (https://supabase.com/dashboard)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Google Analytics
NEXT_PUBLIC_GA_ID=

# Web Push VAPID 키 (npx web-push generate-vapid-keys 로 생성)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=

# Resend 이메일 (https://resend.com)
RESEND_API_KEY=

# Anthropic AI (https://console.anthropic.com)
ANTHROPIC_API_KEY=
```

## Supabase 설정 (docs/supabase-setup.sql)

DB 스키마 초기화 SQL이 `docs/supabase-setup.sql`에 있음.
새 환경 구성 시 Supabase SQL Editor에서 실행 필요.

인증 설정:
- Authentication → Providers → Google OAuth 활성화
- Authentication → URL Configuration → Redirect URLs에 `{SITE_URL}/auth/callback` 추가

## 로컬 개발 순서

```bash
# 1. 의존성 설치
npm install

# 2. 환경 변수 복사 후 값 입력
cp .env.example .env.local  # (없으면 위 목록 참고해서 직접 생성)

# 3. 개발 서버 실행
npm run dev
```

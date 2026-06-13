# 프로젝트 아키텍처

## 전체 디렉토리

```
quote-viewer/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx           # 홈 (오늘의 명언)
│   │   ├── quotes/[id]/       # 명언 목록·상세
│   │   ├── scriptures/        # 성경 구절
│   │   ├── profile/           # 사용자 프로필
│   │   ├── submit/            # 명언 제출 폼
│   │   ├── today/             # 오늘의 명언
│   │   └── auth/callback/     # Google OAuth 콜백
│   ├── api/
│   │   ├── quotes/submit/     # 명언 제출 처리
│   │   ├── likes/[id]/        # 좋아요 토글
│   │   ├── newsletter/        # 이메일 구독
│   │   ├── push/              # 웹 푸시 알림
│   │   └── recommendations/   # Anthropic AI 추천
│   ├── auth/callback/         # Supabase OAuth 코드 교환
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── opengraph-image.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/                # 30+ 공유 UI 컴포넌트
├── hooks/                     # 커스텀 훅
├── lib/                       # 외부 서비스 클라이언트
├── data/                      # 정적 JSON/TS 데이터
├── types/                     # 공유 TypeScript 타입
├── i18n/                      # next-intl 라우팅·설정
├── messages/                  # 번역 파일
├── public/                    # 정적 에셋
└── docs/                      # 기획/설계 문서
```

## 주요 컴포넌트 목록 (components/)

| 파일 | 역할 |
|------|------|
| QuoteCard.tsx | 명언 카드 UI |
| QuoteDisplay.tsx | 명언 표시 |
| ScriptureCard.tsx | 성경 구절 카드 |
| AuthModal.tsx | 로그인 모달 |
| FavoriteButton.tsx | 즐겨찾기 버튼 |
| LikeButton.tsx | 좋아요 버튼 |
| StreakBadge.tsx | 연속 방문 배지 |
| DrawTimer.tsx | 다음 명언 카운트다운 |
| PushNotificationButton.tsx | 푸시 알림 구독 버튼 |
| NewsletterForm.tsx | 뉴스레터 구독 폼 |
| ShareButtons.tsx | SNS 공유 버튼 |
| SaveImageButton.tsx | 명언 이미지 저장 (html2canvas) |
| Header.tsx / Footer.tsx | 레이아웃 |
| Toast.tsx / MilestoneToast.tsx | 알림 토스트 |
| GoogleAnalytics.tsx | GA4 스크립트 |
| GuestBanner.tsx | 비로그인 사용자 안내 |

## 커스텀 훅 목록 (hooks/)

| 훅 | 역할 |
|----|------|
| useAuth | 인증 상태 관리 |
| useFavorites | 즐겨찾기 CRUD |
| useLike | 좋아요 토글 |
| useStreak | 연속 방문 계산 |
| useQuoteHistory | 명언 열람 이력 |
| useReadQuotes | 읽은 명언 추적 |
| useScriptureCollection | 성경 구절 컬렉션 |
| useDrawTimer | 다음 명언 뽑기 타이머 |
| useSwipe | 스와이프 제스처 |
| useTheme | 다크모드 토글 |
| useOnboarding | 온보딩 상태 |

# 랜딩 페이지 로드맵

## 배경 및 목적

현재 `/` 경로는 "오늘의 명언"을 바로 표시하는 기능 페이지입니다.
서비스를 처음 접하는 신규 방문자에게 Quote Viewer의 가치를 설명하고,
기능을 소개하며, 로그인/참여를 유도하는 **마케팅 랜딩 페이지**가 없는 상태입니다.

**목표**: 새 방문자가 서비스 가치를 즉시 이해하고 행동(시작하기/로그인)을 취하도록 유도.

---

## 라우팅 변경사항

| 경로 | 변경 전 | 변경 후 |
|------|---------|---------|
| `/` | 오늘의 명언 (HomeClient) | 랜딩 페이지 (신규) |
| `/today` | (없음) | 오늘의 명언 (기존 `/` 기능 이동) |
| `/quotes` | 명언 목록 | 명언 목록 (유지) |
| `/scriptures` | 성경 구절 | 성경 구절 (유지) |

헤더 네비게이션에서 "오늘의 명언" 링크: `/` → `/today`

---

## 페이지 구조 (섹션별 설계)

### 1. Hero Section
- 서비스 슬로건: "하루를 바꾸는 한 마디"
- 부제목: 서비스 핵심 가치 한 줄 요약
- CTA 버튼 2개: "오늘의 명언 보기" (→`/today`), "명언 모아보기" (→`/quotes`)
- 장식용 명언 카드 프리뷰
- 배경: 인디고 그라디언트 디퓨즈 효과

### 2. Features Section
- 섹션 제목: "왜 Quote Viewer인가요?"
- 3열 카드 그리드 (모바일: 1열)
  - 📖 **매일 새로운 명언**: 날짜 기반 자동 로테이션, 53개 명언
  - 📚 **성경 구절 수집**: 3시간마다 뽑기, 레어리티 시스템
  - ⭐ **즐겨찾기 & 컬렉션**: 저장하고 31개 수집 완성

### 3. How It Works Section
- 섹션 제목: "어떻게 사용하나요?"
- 3단계 스텝 (모바일: 세로, 데스크톱: 가로)
  - **01 매일 방문하기**: 오늘의 명언 확인
  - **02 저장하고 공유하기**: 즐겨찾기 & 클립보드 복사
  - **03 성경 구절 수집하기**: 뽑기로 컬렉션 완성

### 4. CTA Section
- 어두운 배경 (gray-900)
- 제목: "수집 기능을 잠금 해제하세요"
- 부제목: 로그인 혜택 설명
- 로그인 상태 분기:
  - 비로그인: "구글로 시작하기" 버튼 (AuthModal 연동)
  - 로그인: "성경 구절 수집하러 가기 →" 버튼 (→`/scriptures`)

---

## 컴포넌트 계획

### 신규 생성

```
components/landing/
├── HeroSection.tsx        # Hero 섹션 (Server Component)
├── FeaturesSection.tsx    # 기능 소개 그리드 (Server Component)
├── HowItWorksSection.tsx  # 사용법 단계 (Server Component)
└── CtaSection.tsx         # CTA + 로그인 버튼 (Client Component)
```

### 신규 라우트

```
app/today/
└── page.tsx               # 오늘의 명언 (기존 app/page.tsx 이동)
```

### 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `app/page.tsx` | 랜딩 페이지로 전면 교체 |
| `components/Header.tsx` | 첫 번째 nav 링크 `/` → `/today` |
| `app/sitemap.ts` | `/today` 항목 추가 |

### 재활용 기존 컴포넌트

| 컴포넌트 | 사용처 |
|---------|--------|
| `components/AuthModal.tsx` | CtaSection의 로그인 모달 |
| `hooks/useAuth.ts` | CtaSection의 로그인 상태 체크 |

---

## 디자인 가이드라인

- **디자인 시스템**: 기존 CSS 변수(`--text-primary`, `--card-bg` 등) 및 `dark:` 클래스 완전 준수
- **애니메이션**: 기존 `animate-slideUp`, `animate-fadeIn`, `animate-quoteReveal` 활용
- **반응형**: 모바일 우선 (`sm:`, `md:`, `lg:` 브레이크포인트)
- **색상 포인트**: indigo-600 (라이트) / indigo-400 (다크) — 기존 앱과 일관성 유지
- **Hero 타이포그래피**: 그라디언트 텍스트 (`from-indigo-600 to-violet-600`)
- **Features 카드**: 기존 QuoteCard 스타일 (`rounded-2xl border border-gray-100`)

---

## 구현 체크리스트

- [x] `docs/ROADMAP_LANDING.md` 생성
- [x] `app/today/page.tsx` 생성 (기존 홈 기능 이동)
- [x] `components/Header.tsx` 네비 링크 `/today` 업데이트
- [x] `components/landing/HeroSection.tsx` 구현
- [x] `components/landing/FeaturesSection.tsx` 구현
- [x] `components/landing/HowItWorksSection.tsx` 구현
- [x] `components/landing/CtaSection.tsx` 구현
- [x] `app/page.tsx` 랜딩 페이지로 교체
- [x] `app/sitemap.ts` `/today` 추가

---

## 완료 기준

1. `http://localhost:3000` → 랜딩 페이지 4개 섹션 정상 표시
2. `http://localhost:3000/today` → 오늘의 명언 정상 동작
3. 헤더 "오늘의 명언" 클릭 → `/today` 이동
4. 랜딩 CTA "오늘의 명언 보기" → `/today` 이동
5. 비로그인 시 "구글로 시작하기" → AuthModal 표시
6. 다크 모드 전환 시 모든 섹션 정상 스타일
7. 모바일 반응형 정상 (375px ~ 1440px)
8. `npm run build` 빌드 에러 없음

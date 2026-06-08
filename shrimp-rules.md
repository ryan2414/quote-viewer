# Development Guidelines — quote-viewer

## 프로젝트 개요

- **목적**: 날짜 기반 오늘의 명언 표시 + 카테고리 필터 목록 제공
- **스택**: Next.js App Router · React · TypeScript · Tailwind CSS 4
- **배포**: Vercel (Analytics 포함)

---

## 프로젝트 아키텍처

```
app/
  layout.tsx          # 루트 레이아웃 (Header, Analytics 마운트)
  page.tsx            # 홈 — 오늘의 명언
  globals.css
  quotes/
    layout.tsx        # /quotes 레이아웃
    page.tsx          # 명언 목록 + 카테고리 탭
  opengraph-image.tsx
  robots.ts
  sitemap.ts
components/
  Header.tsx          # 공통 헤더 (다크모드 토글 포함)
  QuoteDisplay.tsx    # 홈 명언 표시 (즐겨찾기·복사·목록 버튼)
  QuoteCard.tsx       # 목록 카드
  FavoriteButton.tsx  # 하트 버튼 (재사용)
  Toast.tsx           # 클립보드 복사 알림
data/
  quotes.ts           # 명언 데이터 배열 + 조회 함수
  categories.ts       # CategoryId 타입 + 카테고리 메타 배열
hooks/
  useFavorites.ts     # localStorage 즐겨찾기 상태 훅
types/
  quote.ts            # Quote · QuoteDisplayProps 타입 정의
```

---

## 코드 규칙

### 명명
- 컴포넌트 파일명: PascalCase (`QuoteCard.tsx`)
- 훅 파일명: camelCase (`useFavorites.ts`)
- 변수·함수: camelCase

### 포맷
- 들여쓰기 2칸
- TypeScript strict 모드 — `any` 사용 금지
- 모든 컴포넌트 props에 타입 명시

### 주석
- **한국어**로 작성
- WHY가 명확할 때만 작성, 코드를 설명하는 주석 금지

---

## 기능 구현 규칙

### 명언 추가
- **수정 파일**: `data/quotes.ts` 만 수정
- `id`는 기존 최댓값 + 1 (중복 금지)
- 필수 필드: `id` · `text` · `author` · `category`
- `category` 값은 반드시 `CategoryId` 타입 중 하나 (`'wisdom' | 'motivation' | 'life' | 'courage' | 'love'`)
- `source` 필드는 선택

```ts
// 올바른 예
{ id: 51, text: '...', author: 'Name', category: 'wisdom' }

// 금지: CategoryId에 없는 값
{ id: 51, text: '...', author: 'Name', category: 'health' } // ❌
```

### 카테고리 추가
- **동시 수정 필수**: `data/categories.ts` 의 `CategoryId` 타입 + `categories` 배열 모두 수정
- `badgeClass`는 Tailwind 클래스 전체 문자열을 하드코딩 (동적 생성 금지 — purge 방지)

```ts
// 올바른 예
badgeClass: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'

// 금지: 동적 클래스 조합
badgeClass: `bg-${color}-100 text-${color}-700` // ❌
```

### 새 페이지 추가
- `app/<route>/page.tsx` 구조로 생성
- SEO 필요 시 해당 `page.tsx` 또는 `layout.tsx`에 `generateMetadata` 추가
- `sitemap.ts` 에 새 URL 경로 추가

### 컴포넌트 분리
- 인터랙티브 요소(`useState`, `useEffect`, 이벤트 핸들러) → 파일 상단에 `'use client'` 필수
- Server Component 기본값 — `'use client'` 없이는 브라우저 API 사용 불가

### 즐겨찾기 상태
- **반드시** `hooks/useFavorites.ts`의 `useFavorites()` 훅 사용
- `localStorage` 직접 조작 금지
- 훅이 반환하는 `toggleFavorite`, `isFavorite`, `favoriteIds`, `isHydrated` 사용

### 타입 변경
- `types/quote.ts` 수정 후 `QuoteDisplay`, `QuoteCard`, `page.tsx` 사용처 전체 검토

---

## Tailwind CSS 규칙

- 다크모드: `dark:` 프리픽스 사용
- 반응형: `sm:` `md:` `lg:` 순서 준수
- **동적 클래스 생성 금지** — 전체 클래스 문자열을 소스에 하드코딩
- Tailwind 4 CSS 변수 기반 구조 사용 (`globals.css` 참고)

---

## 파일 동시 수정 규칙

| 작업 | 수정 필수 파일 |
|---|---|
| 카테고리 추가/삭제 | `data/categories.ts` (타입 + 배열) |
| Quote 타입 필드 추가 | `types/quote.ts` → `data/quotes.ts` → 관련 컴포넌트 |
| 새 페이지 추가 | `app/<route>/page.tsx` + `sitemap.ts` |
| SEO 메타 변경 | `app/layout.tsx` (전역) 또는 해당 `page.tsx` |

---

## AI 결정 트리

```
명언 데이터 변경?
  └─ data/quotes.ts 만 수정

카테고리 변경?
  └─ data/categories.ts CategoryId 타입 + categories 배열 동시 수정
     └─ 기존 quotes의 category 값 일관성 확인

인터랙티브 UI?
  └─ 'use client' 선언 필수
     └─ useState/useEffect 있음? → Client Component
     └─ 정적 렌더링만? → Server Component (기본값 유지)

즐겨찾기 관련?
  └─ useFavorites() 훅만 사용 (localStorage 직접 접근 금지)

새 페이지 추가?
  └─ app/<route>/page.tsx 생성
  └─ sitemap.ts 업데이트
  └─ 보호된 라우트? → middleware.ts 추가 (현재 없음)
```

---

## 금지 사항

- `data/quotes.ts` 외부에 명언 데이터 분산 저장
- `localStorage` 직접 조작 (`useFavorites` 훅 우회)
- `CategoryId` 타입에 없는 카테고리 문자열 사용
- Tailwind 동적 클래스 생성 (런타임 문자열 조합)
- `any` 타입 사용
- Server Component에서 브라우저 API (`window`, `document`, `localStorage`) 직접 사용
- `useSearchParams` 를 Suspense 경계 없이 사용 (`app/page.tsx` 패턴 참고)
- 새 명언 ID를 임의로 지정하거나 기존 ID 재사용

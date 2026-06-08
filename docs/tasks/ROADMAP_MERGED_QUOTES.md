# ROADMAP: /today + /quotes 통합 페이지

## 목표

"오늘의 명언"(`/today`)과 "명언 목록"(`/quotes`)을 단일 URL(`/quotes`)로 통합합니다.
사용자가 두 페이지를 오가는 불편을 해소하고, `QuoteCard` 클릭 시 랜딩 페이지로 이동하는 버그도 함께 수정합니다.

---

## 라우팅 변경

| 경로 | 변경 전 | 변경 후 |
|------|---------|---------|
| `/` | 랜딩 페이지 | 랜딩 페이지 (유지) |
| `/today` | 오늘의 명언 | redirect → `/quotes` |
| `/quotes` | 명언 목록만 | **오늘의 명언 히어로 + 명언 목록** |
| `/scriptures` | 성경 구절 | 유지 |

---

## 통합 페이지 레이아웃 (`/quotes`)

```
┌─────────────────────────────────┐
│  "오늘의 명언" 레이블            │
│  명언 텍스트 (컴팩트 히어로)     │  ← TodayQuoteSection
│  [즐겨찾기] [복사]               │     카드 클릭 시 이 섹션 명언 교체
├─────────────────────────────────┤
│  [전체][지혜][동기부여]...       │  ← 탭 필터
├─────────────────────────────────┤
│  Card  Card  Card               │
│  Card  Card  Card               │  ← 그리드
└─────────────────────────────────┘
```

---

## 파일 변경 요약

| 파일 | 작업 |
|------|------|
| `components/TodayQuoteSection.tsx` | **신규** — 컴팩트 명언 히어로 |
| `components/QuotesClient.tsx` | **신규** — 통합 Client Component |
| `app/quotes/page.tsx` | 수정 — Server Component 전환 + `generateMetadata` |
| `app/today/page.tsx` | 수정 — redirect로 교체 |
| `components/QuoteCard.tsx` | 수정 — `onCardClick` prop 추가 |
| `types/quote.ts` | 수정 — `QuoteCardProps`에 `onCardClick?` 추가 |
| `components/Header.tsx` | 수정 — `/today` 항목 제거, "명언 목록" → "명언" |
| `components/landing/HeroSection.tsx` | 수정 — `/today` 링크 → `/quotes` |
| `app/sitemap.ts` | 수정 — `/today` 항목 제거 |
| `components/HomeClient.tsx` | **삭제** — `QuotesClient`로 대체 |

---

## 아키텍처

```
/quotes (Server Component — app/quotes/page.tsx)
  ├── generateMetadata() — 오늘/선택 명언 기반 동적 메타데이터
  ├── <script> Article JSON-LD
  ├── layout.tsx — CollectionPage JSON-LD (변경 없음)
  └── <QuotesClient initialQuoteId?> (Client Component)
        ├── selectedQuoteId state (초기값 = initialQuoteId)
        ├── <TodayQuoteSection quote={displayedQuote}> — 컴팩트 히어로
        └── 탭 네비게이션 + <QuoteCard onCardClick> 그리드
```

### 카드 클릭 흐름

```
QuoteCard 클릭
  → QuotesClient.handleCardClick(quoteId)
    → setSelectedQuoteId(quoteId)          // 히어로 섹션 명언 즉시 교체
    → router.push('/quotes?quoteId=N')     // URL 업데이트 (히스토리)
    → window.scrollTo(0, 0, smooth)        // 히어로 섹션으로 스크롤
```

---

## 구현 체크리스트

- [x] `docs/ROADMAP_MERGED_QUOTES.md` 생성
- [x] `types/quote.ts` — `onCardClick?` 추가
- [x] `components/TodayQuoteSection.tsx` 생성
- [x] `components/QuoteCard.tsx` — `onCardClick` prop 처리
- [x] `components/QuotesClient.tsx` 생성
- [x] `app/quotes/page.tsx` — Server Component 전환
- [x] `app/today/page.tsx` — redirect 교체
- [x] `components/Header.tsx` — navLinks 수정
- [x] `components/landing/HeroSection.tsx` — 링크 수정
- [x] `app/sitemap.ts` — `/today` 제거
- [x] `components/HomeClient.tsx` — 삭제

---

## 완료 기준

1. `/today` → `/quotes` redirect 정상 동작
2. `/today?quoteId=5` → `/quotes?quoteId=5` redirect + 히어로에 해당 명언 표시
3. 카드 클릭 → 히어로 명언 교체 + URL 업데이트 + 스크롤 상단
4. 즐겨찾기 토글 → 히어로 + 카드 동기화
5. 탭 필터링 정상 동작
6. 헤더 "명언" 클릭 → `/quotes` 이동
7. `npm run build` 에러 없음

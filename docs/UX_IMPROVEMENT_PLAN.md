# Quote Viewer UX 개선 계획서

**작성일**: 2026-05-31  
**기준 상태**: Phase 5 진행 예정  
**목적**: 사용자 마찰을 줄이고 핵심 가치(영감, 습관 형성)를 강화하는 UX 개선 로드맵

---

## Executive Summary

- 현재 UX의 최대 강점은 "즉각적 진입" — 로그인 없이 첫 화면에서 바로 오늘의 명언을 제공한다.
- 최대 개선 기회는 "재방문 트리거 부재" — 사용자가 다시 올 이유가 오늘의 명언 하나뿐이다.
- 빠른 승리(Quick Wins) 5가지를 먼저 적용하여 사용자 만족도를 즉시 높이고, 그 이후 중장기 개선을 진행한다.

---

## 1. 현재 UX 강점

| 강점 | 설명 | 비고 |
|------|------|------|
| 즉각적 가치 전달 | 접속 즉시 오늘의 명언 표시, 로그인 불필요 | 이탈율 최소화 |
| 미니멀 레이아웃 | 과도한 요소 없이 명언에 집중 | 읽기 경험 좋음 |
| 다크 모드 지원 | 시스템 설정 자동 반영 | 눈 편안함 |
| 반응형 디자인 | 모바일/데스크탑 대응 | 전체 기기 지원 |
| 즐겨찾기 영속성 | 새로고침 후에도 유지 (localStorage) | 재방문 동기 |
| 빠른 로딩 | 정적 데이터 + Vercel 최적화 | Core Web Vitals 유리 |
| 카테고리 탭 필터 | (Phase 5 완료 후) 원하는 주제 탐색 | 탐색 UX |

---

## 2. 개선 기회 — 사용자 경험 마찰 지점

### 2.1 높은 우선순위 마찰

| # | 마찰 지점 | 영향 | 사용자 불만 시나리오 |
|---|----------|------|-------------------|
| 1 | 명언 탐색 수단 부재 | 높음 | "특정 명언을 찾고 싶은데 방법이 없다" |
| 2 | 공유 옵션이 텍스트 복사뿐 | 높음 | "인스타에 올리고 싶은데 이미지가 없다" |
| 3 | 재방문 트리거 약함 | 높음 | "오늘 봤으니 내일 다시 올 이유가 없다" |
| 4 | 명언 클릭 시 홈으로 이동 | 중간 | "목록에서 명언 클릭하면 페이지 이동 — 뒤로가기 번거롭다" |
| 5 | 즐겨찾기 개수 제한 없음/관리 어려움 | 중간 | "즐겨찾기가 많아지면 스크롤하기 힘들다" |

### 2.2 낮은 우선순위 마찰

| # | 마찰 지점 | 영향 |
|---|----------|------|
| 6 | 신규 사용자 온보딩 없음 | 낮음 (서비스가 단순해서) |
| 7 | 명언 인쇄/저장 기능 없음 | 낮음 |
| 8 | 탭 수가 많을 때 모바일 스크롤 | 중간 (Phase 5 해결 예정) |

---

## 3. 구체적인 개선안

### 3.1 홈 화면 개선

#### 3.1-A. 명언 배경 이미지/그라데이션 추가

**현재**: 단색 배경 (다크/라이트 모드)  
**개선**: 카테고리별 그라데이션 배경 또는 선택적 배경 이미지

**구현 방법**
```typescript
// categories.ts에 배경 그라데이션 추가
const categoryGradients = {
  wisdom: 'from-blue-900 to-indigo-900',
  motivation: 'from-emerald-900 to-teal-900',
  life: 'from-violet-900 to-purple-900',
  courage: 'from-orange-900 to-red-900',
  love: 'from-rose-900 to-pink-900',
}
```

**기대 효과**: 카테고리 감성 강화, 이미지 저장 시 더 아름다운 카드

---

#### 3.1-B. 입장 애니메이션

**현재**: 정적 렌더링  
**개선**: 명언 텍스트 페이드인 + 슬라이드업 애니메이션

**구현 방법**
```css
/* Tailwind CSS 애니메이션 클래스 활용 */
/* animate-fade-in (커스텀), animate-slide-up */
```

- Tailwind `transition`, `opacity`, `translate` 클래스 조합
- `useEffect`로 마운트 시 애니메이션 트리거
- 랜덤/날짜 변경 시에도 동일 애니메이션 재생

**기대 효과**: 명언 읽기 집중도 향상, 감성적 경험 강화

---

#### 3.1-C. 폰트 커스터마이징

**현재**: 시스템 기본 폰트  
**개선**: 명언 텍스트에 가독성/감성 최적화 폰트 적용

**구현 방법**
```typescript
// app/layout.tsx에 Google Fonts 추가 (Next.js Font Optimization)
import { Noto_Serif_KR, Playfair_Display } from 'next/font/google'

const notoSerifKR = Noto_Serif_KR({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
})
```

- 한국어 명언: `Noto Serif KR` (신뢰감, 고전적)
- 영어 명언: `Playfair Display` (우아함)
- Next.js Font Optimization으로 성능 영향 최소화

**기대 효과**: 명언 읽기 경험 고급화, 이미지 저장 시 퀄리티 향상

---

#### 3.1-D. 명언 진행 표시기 (오늘이 몇 번째 명언인지)

**현재**: 날짜만 표시  
**개선**: "52개 중 23번째 명언 | 내일은 24번째" 표시

**구현 방법**
```typescript
const quoteIndex = getDayIndex() // 기존 로직 재사용
const totalQuotes = quotes.length
const nextIndex = (quoteIndex + 1) % totalQuotes
```

**기대 효과**: 서비스 콘텐츠 규모 인지, 다음 명언 기대감 형성

---

### 3.2 온보딩 경험

#### 첫 방문 사용자 가이드

**현재**: 별도 온보딩 없음  
**개선**: 최초 방문 시 간단한 툴팁/하이라이트 표시

**전략**: 서비스가 단순하므로 복잡한 온보딩은 불필요. 2가지만 안내.

| 순서 | 안내 포인트 | 방식 |
|------|-----------|------|
| 1 | 즐겨찾기 버튼 | 하트 버튼 주변 펄스 애니메이션 + "저장하기" 툴팁 |
| 2 | 명언 목록 | "52개 명언 더 보기" 텍스트 강조 |

**구현 방법**
```typescript
// localStorage에 onboarding_completed 플래그
const isFirstVisit = !localStorage.getItem('onboarding_completed')
// 온보딩 완료 시 플래그 저장
```

**기대 효과**: 즐겨찾기 전환율 향상, 목록 탐색 유도

---

### 3.3 접근성 개선 (a11y)

| 항목 | 현재 상태 | 개선 방법 | 우선순위 |
|------|----------|---------|---------|
| 키보드 내비게이션 | 미확인 | 탭 인덱스, 포커스 스타일 명시 | High |
| 스크린 리더 | 미확인 | `aria-label`, `role` 속성 추가 | High |
| 색상 대비 | Tailwind 기본 | WCAG AA 기준 대비율 4.5:1 확인 | Medium |
| 이미지 대체 텍스트 | 해당 없음 (텍스트 중심) | 아이콘에 `aria-label` 추가 | Medium |
| 포커스 관리 | 미확인 | 탭 전환 시 포커스 이동 처리 | Low |
| 폰트 크기 | 고정 | `rem` 단위 사용, 사용자 브라우저 설정 반영 | Low |

**구체적 구현 예시**
```tsx
// FavoriteButton.tsx 개선
<button
  aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
  aria-pressed={isFavorite}
  className="focus-visible:ring-2 focus-visible:ring-offset-2"
>
  <Heart />
</button>
```

---

### 3.4 퍼포먼스 최적화

| 최적화 항목 | 현재 예상 상태 | 개선 방법 | 예상 개선 효과 |
|------------|--------------|---------|--------------|
| 폰트 로딩 | FOUT 발생 가능 | `next/font` 최적화 | CLS 감소 |
| 이미지 최적화 | 이미지 미사용 중 | 배경 이미지 추가 시 `next/image` 사용 | LCP 유지 |
| 번들 크기 | 소규모 (문제 없음) | Tree-shaking 확인 | - |
| 정적 생성 | App Router 기본 | 명언 개별 페이지 `generateStaticParams` | TTFB 개선 |

**측정 방법**
- Vercel Analytics (현재 적용 중) — LCP, FID, CLS 모니터링
- Chrome DevTools Lighthouse 점수 90점 이상 유지 목표

---

### 3.5 모바일 UX 강화

| 개선 항목 | 현재 상태 | 개선 방법 |
|----------|----------|---------|
| 탭 가로 스크롤 | Phase 5 해결 예정 | `overflow-x-auto scrollbar-hide` |
| 스와이프 제스처 | 미지원 | 좌우 스와이프로 랜덤 명언 이동 |
| 하단 네비게이션 | 헤더에만 있음 | 모바일용 하단 탭바 고려 |
| 터치 타겟 크기 | Tailwind 기본 | 버튼 최소 44x44px 보장 (iOS HIG) |
| 당겨서 새로고침 | 없음 | 랜덤 명언 불러오기로 활용 |

**스와이프 구현 예시**
```typescript
// useSwipe 훅
const useSwipe = (onLeft: () => void, onRight: () => void) => {
  let startX = 0
  const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
  const onTouchEnd = (e: TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX
    if (diff > 50) onLeft()   // 왼쪽 스와이프 → 다음 명언
    if (diff < -50) onRight() // 오른쪽 스와이프 → 이전 명언
  }
  return { onTouchStart, onTouchEnd }
}
```

---

## 4. 빠른 승리 (Quick Wins) — 1~2일 내 구현 가능

### QW-01. 즐겨찾기 개수 표시

**작업 시간**: 30분  
**위치**: 헤더 또는 탭 레이블  
**구현**: `favoriteIds.length` 숫자 뱃지 표시  
**효과**: 즐겨찾기 컬렉션 성취감, 탐색 유도

---

### QW-02. 명언 복사 시 저자명 포함

**작업 시간**: 30분  
**현재**: 명언 본문만 복사  
**개선**: `"${quote.text}" — ${quote.author}` 형식으로 복사  
**효과**: SNS 공유 시 인용 형식 완성도 향상

---

### QW-03. 아이콘 버튼에 툴팁 추가

**작업 시간**: 1~2시간  
**대상**: 하트(즐겨찾기), 복사(공유) 버튼  
**구현**: CSS `title` 속성 또는 Tailwind `group-hover` 툴팁  
**효과**: 신규 사용자 기능 이해도 향상, a11y 개선

---

### QW-04. 명언 카드 호버 효과 강화

**작업 시간**: 30분~1시간  
**현재**: 기본 카드 호버  
**개선**: 카드 호버 시 배경 그라데이션 미리보기, 그림자 강화  
**구현**: `hover:shadow-lg hover:scale-[1.02] transition-all duration-200`  
**효과**: 탐색 재미 향상, 클릭률 증가

---

### QW-05. 로딩 스켈레톤 UI

**작업 시간**: 1~2시간  
**현재**: 데이터 로딩 중 빈 화면 또는 레이아웃 쉬프트 가능  
**개선**: 명언 카드 형태의 스켈레톤 플레이스홀더  
**구현**: Tailwind `animate-pulse` 클래스로 스켈레톤 컴포넌트  
**효과**: 체감 로딩 시간 감소, CLS 방지

```tsx
// SkeletonCard.tsx
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl p-6 bg-gray-100 dark:bg-gray-800">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
    </div>
  )
}
```

---

## 5. UX 개선 실행 로드맵

### 즉시 (이번 주)
- [ ] QW-01: 즐겨찾기 개수 표시
- [ ] QW-02: 복사 텍스트에 저자명 포함
- [ ] QW-03: 아이콘 툴팁 추가
- [ ] QW-04: 카드 호버 효과 강화
- [ ] QW-05: 스켈레톤 UI

### 단기 (1~2주)
- [ ] 3.1-B: 입장 애니메이션 (페이드인)
- [ ] 3.1-C: 폰트 개선 (Noto Serif KR)
- [ ] 3.2: 첫 방문 온보딩 툴팁
- [ ] 3.3: a11y `aria-label` 전체 적용
- [ ] 3.5: 스와이프 제스처 (모바일)

### 중기 (1개월)
- [ ] 3.1-A: 카테고리별 배경 그라데이션
- [ ] 3.1-D: 명언 진행 표시기
- [ ] 3.4: Lighthouse 점수 95점 이상 달성

---

## 6. UX 성공 지표

| 지표 | 현재 (추정) | 목표 |
|------|-----------|------|
| 즐겨찾기 전환율 | 미측정 | 방문자 15% 이상 |
| 목록 페이지 탐색률 | 미측정 | 방문자 40% 이상 |
| 평균 세션 시간 | 미측정 | 60초 이상 |
| 페이지당 조회 명언 수 | 미측정 | 2.5개 이상 |
| Lighthouse 접근성 점수 | 미측정 | 90점 이상 |
| LCP | 미측정 | 2.5초 이하 |

---

**담당**: 솔로 개발자 (이승재)  
**다음 검토**: Quick Wins 적용 후 GA4 데이터 1주 수집 시점

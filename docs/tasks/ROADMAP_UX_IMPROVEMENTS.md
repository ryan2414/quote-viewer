# UX 개선 로드맵

**작성일**: 2026-06-07  
**기준 문서**: `docs/UX_IMPROVEMENT_PLAN.md`  
**목적**: 사용자 마찰 감소 및 핵심 가치(영감, 습관 형성) 강화

---

## 배경 및 목적

현재 서비스의 최대 강점은 **즉각적 진입** (로그인 없이 첫 화면에서 오늘의 명언 제공)이며,  
최대 개선 기회는 **재방문 트리거 부재** (오늘의 명언 외 다시 올 이유가 없음)입니다.

Quick Wins 5가지를 먼저 적용하여 즉각적 만족도를 높이고, 이후 중장기 개선을 순차 진행합니다.

---

## Phase 1 — Quick Wins (즉시 적용, ~1일) ✅ 완료

> 구현 난이도 낮음 / 사용자 체감 효과 즉시 발생

### QW-01. 즐겨찾기 개수 뱃지 표시 ✅

| 항목 | 내용 |
|------|------|
| 위치 | 탭 레이블 |
| 구현 | `favoriteIds.length` 숫자 뱃지, hydration 전 및 0개 시 숨김 |
| 기대 효과 | 컬렉션 성취감 강화, 탐색 유도 |

---

### QW-02. 복사 텍스트에 저자명 포함 ✅

| 항목 | 내용 |
|------|------|
| 현재 | 명언 본문만 복사 |
| 개선 | `"${quote.text}" — ${quote.author}` 형식 |
| 기대 효과 | SNS 공유 시 인용 형식 완성도 향상 |

---

### QW-03. 아이콘 버튼 툴팁 추가 ✅

| 항목 | 내용 |
|------|------|
| 대상 | 복사(공유) 버튼 |
| 구현 | Tailwind `group-hover` 툴팁 (외부 라이브러리 없음) |
| 기대 효과 | 신규 사용자 기능 이해도 향상 |

---

### QW-04. 명언 카드 호버 효과 강화 ✅

| 항목 | 내용 |
|------|------|
| 구현 | `hover:shadow-lg hover:scale-[1.02] transition-all duration-200` |
| 기대 효과 | 탐색 재미 향상, 클릭률 증가 |

---

### QW-05. 로딩 스켈레톤 UI ✅

| 항목 | 내용 |
|------|------|
| 구현 | `SkeletonCard` 컴포넌트 신규 생성, `animate-pulse`, 12개 그리드 |
| 기대 효과 | 체감 로딩 시간 감소, CLS 방지 |

---

## Phase 2 — 단기 개선 (1~2주) ✅ 완료

> 사용자 감성 경험 및 접근성 강화

### 2-A + 2-B. 명언 등장 애니메이션 + Noto Serif KR 폰트 ✅

| 항목 | 내용 |
|------|------|
| 구현 | `animate-quoteReveal` 커스텀 keyframe, `next/font/google`로 Noto Serif KR 등록 |
| 비고 | `key={displayedQuote.id}`로 명언 변경 시 애니메이션 재트리거 |
| 기대 효과 | 명언 읽기 집중도 향상, 감성적 경험 강화 |

---

### 2-C. 첫 방문 온보딩 툴팁 ✅

| 항목 | 내용 |
|------|------|
| 구현 | `useOnboarding` 훅 (`localStorage` 'qv-onboarding-v1'), 펄스 배너 |
| 비고 | 첫 즐겨찾기 추가 시 자동 완료 처리 |
| 기대 효과 | 즐겨찾기 전환율 향상 |

---

### 2-D. 접근성 전체 적용 (a11y) ✅

| 대상 | 개선 방법 |
|------|---------|
| 즐겨찾기 버튼 | `focus-ring` 유틸리티 클래스 |
| 복사 버튼 | `aria-label`, `focus-ring` |
| 탭 네비게이션 | `focus-ring`, `role="tablist"`, `aria-selected` |
| 목록 버튼/링크 | `focus-ring` |

---

### 2-E. 스와이프 제스처 지원 (모바일) ✅

| 항목 | 내용 |
|------|------|
| 구현 | `useSwipe` 커스텀 훅 (TouchEvent 기반, threshold 50px) |
| 비고 | `touch-pan-y` 래퍼로 세로 스크롤 충돌 방지 |
| 기대 효과 | 모바일 탐색 편의성 향상 |

---

## Phase 3 — 중기 개선 (1개월) ✅ 완료

> 시각적 완성도 및 성능 최적화

### 3-A. 카테고리별 배경 그라데이션 ✅

| 항목 | 내용 |
|------|------|
| 구현 | `CategoryMeta`에 `gradientClass` 필드 추가, `TodayQuoteSection` 배경 조건부 적용 |
| 예시 | `wisdom: from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30` |
| 비고 | 카테고리 없으면 `bg-white dark:bg-gray-950` 폴백 |
| 기대 효과 | 카테고리 감성 강화 |

---

### 3-B. 명언 진행 표시기 ✅

| 항목 | 내용 |
|------|------|
| 구현 | `dayProgress` prop (`{ index, total }`), "전체 N개 중 M번째" 표시 |
| 비고 | 카드 선택 시 숨김, 오늘의 명언 표시 시에만 노출 |
| 기대 효과 | 서비스 콘텐츠 규모 인지, 다음 명언 기대감 형성 |

---

### 3-C. 보안 헤더 추가 (Lighthouse Best Practices) ✅

| 헤더 | 값 |
|------|---|
| X-Content-Type-Options | nosniff |
| X-Frame-Options | SAMEORIGIN |
| X-XSS-Protection | 1; mode=block |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

---

## 전체 일정 요약

| Phase | 범위 | 예상 기간 | 상태 |
|-------|------|---------|------|
| Phase 1 — Quick Wins | QW-01 ~ QW-05 | ~1일 | ✅ 완료 |
| Phase 2 — 단기 개선 | 애니메이션, 폰트, 온보딩, a11y, 스와이프 | 1~2주 | ✅ 완료 |
| Phase 3 — 중기 개선 | 그라데이션, 진행 표시기, 보안 헤더 | 1개월 | ✅ 완료 |

---

## 성공 지표

| 지표 | 현재 | 목표 |
|------|------|------|
| 즐겨찾기 전환율 | 미측정 | 방문자 15% 이상 |
| 목록 페이지 탐색률 | 미측정 | 방문자 40% 이상 |
| 평균 세션 시간 | 미측정 | 60초 이상 |
| 페이지당 조회 명언 수 | 미측정 | 2.5개 이상 |
| Lighthouse 접근성 점수 | 미측정 | 90점 이상 |
| LCP | 미측정 | 2.5초 이하 |

---

**담당**: 이승재  
**다음 검토**: Quick Wins 적용 후 1주 경과 시점

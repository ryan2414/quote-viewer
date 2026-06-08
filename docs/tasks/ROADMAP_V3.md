# ROADMAP V3 — 말씀 도감 (Scripture Dex)

> 매 3시간마다 성경 구절 하나를 뽑아 포켓몬 도감처럼 수집하는 게임적 경험

---

## 개요

### 컨셉

사용자가 하루에 여러 번 앱을 방문할 이유를 만드는 **수집형 리텐션 루프**를 구성합니다.
3시간마다 한 번씩 성경 구절을 뽑을 수 있고, 수집한 구절들은 도감에 기록됩니다.
미수집 구절은 흐릿하게 가려져 있어 호기심을 자극하고, 진행률이 쌓이는 재미를 줍니다.

### 목표

- 하루 최대 8회 방문 동선 유도 (3시간 × 8 = 24시간)
- 장기 리텐션: 전체 구절 수집까지 완주 동기 부여
- 공유를 통한 자연 확산 (수집 마일스톤 공유)

---

## 기능 명세

### 1. 타이머 기반 뽑기 시스템

#### 동작 흐름

```
앱 접속
  → localStorage에서 lastDrawTime 조회
  → 현재 시각 - lastDrawTime >= 3시간?
      ✅ 예: "뽑기 가능!" 상태 표시
      ❌ 아니오: 남은 시간 카운트다운 표시
```

#### UI 상태

| 상태 | 표시 내용 |
|------|-----------|
| 대기 가능 | 빛나는 "지금 뽑기" 버튼 + 반짝 애니메이션 |
| 쿨다운 중 | 자물쇠 아이콘 + `다음 뽑기까지 02:14:33` |
| 뽑는 중 | 기존 `drawShake` + `drawGlow` 애니메이션 |
| 결과 공개 | 구절 카드 `cardReveal` 애니메이션 |

#### 데이터 저장

```typescript
// localStorage key: 'scripture-draw-timer'
interface DrawTimerStore {
  lastDrawTime: number | null  // Date.now() 값
}
```

---

### 2. 도감 시스템

#### 페이지: `/scriptures/collection`

전체 성경 구절을 그리드로 나열합니다.

#### 카드 상태

```
미수집 카드:
  - 텍스트 blur(4px) 처리
  - 자물쇠 아이콘 (중앙)
  - 카테고리 배지 (우상단, 색상만 표시)
  - 희귀도 등급 테두리

수집 완료 카드:
  - 전체 구절 내용 표시 (한글 + 영문)
  - 참고문헌 (책명, 장, 절)
  - 수집일 표시
  - 희귀도에 따른 반짝임 효과
```

#### 진행률 헤더

```
┌──────────────────────────────────────────┐
│  말씀 도감          15 / 52 수집 (28%)   │
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  연속 수집: 🔥 5일째                      │
└──────────────────────────────────────────┘
```

#### 필터

- 전체 / 카테고리별 탭 (기존 scriptures 페이지와 동일한 UI)
- 수집 완료 / 미수집 토글 필터

---

### 3. 희귀도 시스템

#### 등급 정의

| 등급 | 카테고리 | 뽑기 확률 | 카드 테두리 | 아이콘 |
|------|----------|-----------|------------|--------|
| Common (일반) | 믿음, 소망, 감사 | 60% | 회색 (`gray-300`) | ⭐ |
| Rare (희귀) | 사랑, 위로 | 30% | 파랑 (`blue-400`) + 글로우 | ⭐⭐ |
| Legendary (전설) | 지혜 | 10% | 금색 (`yellow-400`) + 강한 글로우 | ⭐⭐⭐ |

#### 뽑기 로직

```typescript
function drawScripture(collection: ScriptureCollection): Scripture {
  const roll = Math.random()
  let rarity: Rarity

  if (roll < 0.10) rarity = 'legendary'
  else if (roll < 0.40) rarity = 'rare'
  else rarity = 'common'

  // 해당 등급 구절 중 미수집 우선 선택
  // 모두 수집 시 이미 수집한 것도 포함
  return pickFromRarity(rarity, collection.collectedIds)
}
```

#### 뽑기 결과 연출

- Legendary: 금빛 파티클 + 특별 사운드 (옵션)
- Rare: 파란빛 글로우 애니메이션
- Common: 기존 `cardReveal` 애니메이션

---

### 4. 마일스톤 & 스트릭

#### 수집 마일스톤

| 달성 조건 | 배지 | 공유 문구 |
|-----------|------|-----------|
| 첫 수집 | 🌱 시작 | "말씀 도감을 시작했어요!" |
| 전체의 10% | 🌿 새싹 | "말씀 10%를 수집했어요!" |
| 전체의 25% | 🌸 꽃봉오리 | "말씀 1/4을 채웠어요!" |
| 전체의 50% | 🌳 나무 | "말씀의 절반을 담았어요!" |
| 전체의 75% | ✨ 빛남 | "말씀의 3/4 완성!" |
| 전체의 100% | 👑 완성 | "모든 말씀을 수집했어요!" |

#### 연속 수집 스트릭

- 하루에 최소 1회 뽑기 시 스트릭 유지
- 자정 기준 날짜 변경
- 7일 연속 달성 시 🔥 배지
- 30일 연속 달성 시 💎 배지

---

## 데이터 모델

### 타입 정의 (`types/collection.ts`)

```typescript
export type Rarity = 'common' | 'rare' | 'legendary'

export interface CollectedScripture {
  id: number
  collectedAt: number  // Date.now()
  rarity: Rarity
}

export interface ScriptureCollection {
  items: CollectedScripture[]
  lastDrawTime: number | null
  totalDraws: number
  streakDays: number
  lastStreakDate: string | null  // 'YYYY-MM-DD'
}

export interface MilestoneAchievement {
  id: string
  label: string
  emoji: string
  threshold: number  // 0.0 ~ 1.0
  achievedAt: number | null
}
```

---

## 파일 구조 (신규 생성)

```
quote-viewer/
├── proxy.ts                       # ✅ 세션 쿠키 자동 갱신 (Next.js 16 규칙)
│
├── lib/
│   └── supabase.ts                # ✅ Supabase 클라이언트 초기화
│
├── hooks/
│   ├── useAuth.ts                 # ✅ Supabase 인증 상태 관리
│   ├── useDrawTimer.ts            # ✅ 3시간 쿨다운 타이머 + streak 계산
│   └── useScriptureCollection.ts  # ✅ 수집 목록 관리 + 마일스톤 감지
│
├── components/
│   ├── AuthModal.tsx              # ✅ 로그인 모달 (Google OAuth)
│   ├── GuestBanner.tsx            # ✅ 비로그인 안내 배너
│   ├── DrawTimer.tsx              # ✅ HH:MM:SS 카운트다운 UI
│   ├── CollectionProgress.tsx     # ✅ 진행률 바 + 스트릭 카운터
│   └── MilestoneToast.tsx         # ✅ 마일스톤 달성 특별 토스트
│
├── app/
│   └── auth/
│       └── callback/
│           └── route.ts           # ✅ OAuth 콜백 처리 → 홈 리디렉션
│
└── docs/
    └── supabase-setup.sql         # ✅ 테이블 생성 + RLS + 인덱스 SQL
```

## 파일 구조 (기존 수정)

```
components/
  Header.tsx              # ✅ 로그인 버튼 / 아바타 / 로그아웃 UI 추가
  ScriptureDrawer.tsx     # ✅ 타이머 연동 + 수집 저장 + drawScripture + 희귀도 연출
  ScriptureCard.tsx       # ✅ rarity prop + 등급별 테두리/배지

data/
  scriptures.ts           # ✅ Rarity 타입 + getRarityForCategory + drawScripture 추가

app/
  globals.css             # ✅ rareGlow / legendaryGlow 애니메이션 추가
  scriptures/
    page.tsx              # ✅ 수집함 섹션 + rarity prop 전달
```

---

## 구현 단계 (Phase)

### Phase 0 — Supabase 인증 설정 ✅ 완료 (2026-06-06)

**목표**: 로그인/로그아웃 + 기기 간 데이터 동기화 기반 마련

- ✅ `@supabase/supabase-js` + `@supabase/ssr` 패키지 설치
- ✅ `lib/supabase.ts` — 브라우저 싱글톤 클라이언트 / 서버 클라이언트 분리
- ✅ `proxy.ts` — 세션 쿠키 자동 갱신 (Next.js 16: middleware → proxy 파일명 변경)
- ✅ `app/auth/callback/route.ts` — Google OAuth 코드 → 세션 교환 후 홈 리디렉션
- ✅ `docs/supabase-setup.sql` — 테이블 생성 + RLS 정책 + 인덱스 SQL 스크립트
- ✅ `hooks/useAuth.ts` — 세션 구독, Google 로그인, 로그아웃
- ✅ `components/AuthModal.tsx` — Google OAuth 모달 (ESC/오버레이 닫기)
- ✅ `components/GuestBanner.tsx` — 비로그인 안내 배너
- ✅ `components/Header.tsx` — 로그인 버튼 / 이니셜 아바타 / 로그아웃 통합

**완료 기준 달성**: Google 로그인 후 Supabase `auth.users`에 사용자 등록 확인됨

---

### Phase 1 — 타이머 기반 뽑기 ✅ 완료 (2026-06-06)

**목표**: 3시간 쿨다운 기능을 기존 ScriptureDrawer에 통합

- ✅ `hooks/useDrawTimer.ts` — `canDraw`, `remainingMs`, `recordDraw()` 반환
  - 로그인 시: Supabase `draw_timers` 테이블 upsert
  - 비로그인 시: localStorage `'scripture-draw-timer'` fallback
- ✅ `components/DrawTimer.tsx` — Lock 아이콘 + HH:MM:SS 카운트다운
- ✅ `components/ScriptureDrawer.tsx` — 타이머 연동, 쿨다운 중 버튼 비활성화, 다시 뽑기도 비활성화

**완료 기준 달성**: 뽑기 후 3시간 동안 버튼이 잠기고, 로그인 시 다른 기기에서도 타이머 유지됨

---

### Phase 2 — 수집함 섹션 ✅ 완료 (2026-06-06)

**목표**: `/scriptures` 페이지 하단에 수집한 구절만 표시하는 섹션 추가

- ✅ `hooks/useScriptureCollection.ts` — Supabase `scripture_collections` 조회, 낙관적 업데이트, `addToCollection()`
- ✅ `components/ScriptureDrawer.tsx` — 뽑기 성공 시 `addToCollection()` 자동 호출
- ✅ `app/scriptures/page.tsx` — 뽑기 섹션 아래 "내 수집함" 섹션 추가
  - 비로그인: `GuestBanner` + `AuthModal` 로그인 유도
  - 로그인 + 수집 없음: 빈 상태 안내 ("위의 뽑기 버튼으로 첫 말씀을 수집해 보세요")
  - 로그인 + 수집 있음: 수집 개수 + `ScriptureCard` 그리드

**완료 기준 달성**: 뽑기 후 수집함에 즉시 구절 카드가 표시됨, 비로그인 시 로그인 유도 배너 표시

---

### Phase 3 — 희귀도 시스템 ✅ 완료 (2026-06-06)

**목표**: 뽑기에 확률 기반 희귀도를 추가해 긴장감 부여

- ✅ `data/scriptures.ts` — `Rarity` 타입, `getRarityForCategory()`, `drawScripture()` 추가
  - Legendary(10%): 지혜 / Rare(30%): 사랑·위로 / Common(60%): 믿음·소망·감사
  - 미수집 우선 선택 로직 적용
- ✅ `hooks/useScriptureCollection.ts` — `addToCollection(id, rarity)` 시그니처 변경, `collectedItems` 반환
- ✅ `components/ScriptureDrawer.tsx` — `drawScripture(collectedIds)`로 교체, 뽑기 결과 `rarity` 저장, `animate-rareGlow`/`animate-legendaryGlow` 연출
- ✅ `components/ScriptureCard.tsx` — `rarity?` prop 추가, 등급별 테두리(gray/blue/yellow) + 희귀도 배지
- ✅ `app/globals.css` — `rareGlow`(파란 글로우 3회), `legendaryGlow`(금빛 글로우 3회) 애니메이션 추가
- ✅ `app/scriptures/page.tsx` — 수집함 카드에 `rarity` prop 전달

**완료 기준 달성**: 뽑기 시 지혜 구절 → 금빛 글로우 + ⭐⭐⭐ 전설 배지, 사랑/위로 → 파란 글로우 + ⭐⭐ 희귀 배지

---

### Phase 4 — 마일스톤 & 스트릭 ✅ 완료 (2026-06-06)

**목표**: 장기 사용 동기 부여

- ✅ `hooks/useDrawTimer.ts` — `recordDraw()`에 streak 계산 추가 (today/yesterday/reset), `streakDays` 상태 반환
- ✅ `hooks/useScriptureCollection.ts` — MILESTONES 배열(1·3·8·15·23·30개) + 낙관적 업데이트 직후 마일스톤 감지, `lastMilestone`/`clearMilestone` 반환
- ✅ `components/MilestoneToast.tsx` — 배지 이모지 + 메시지 + 공유(클립보드) + 6초 자동 닫힘
- ✅ `components/CollectionProgress.tsx` — 진행률 바(인라인 style) + 수집수/전체/퍼센트 + 스트릭(🔥 7일/💎 30일)
- ✅ `app/scriptures/page.tsx` — 수집함 섹션 상단에 CollectionProgress 통합, MilestoneToast 조건부 렌더링

**완료 기준 달성**: 첫 수집 시 🌱 마일스톤 토스트 표시, 공유 버튼 동작, 진행률 바 실시간 갱신

---

## 기술 고려사항

### 데이터 저장 전략: Supabase + localStorage 이중화

어느 기기에서든 도감을 이어서 볼 수 있도록 **Supabase를 주 저장소**로 사용합니다.
로그인 전에는 localStorage에 임시 저장하고, 로그인 시 자동으로 마이그레이션합니다.

```
비로그인 (게스트):
  → localStorage에 임시 저장 (최대 10개)
  → "로그인하면 기록이 저장돼요" 배너 표시

로그인:
  → Supabase DB에 영구 저장
  → 기기 간 자동 동기화
  → 게스트 기록 있으면 자동 마이그레이션
```

### Supabase 테이블 설계

```sql
-- 수집한 구절 기록
CREATE TABLE scripture_collections (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid REFERENCES auth.users NOT NULL,
  scripture_id integer NOT NULL,
  collected_at timestamptz DEFAULT now(),
  rarity       text CHECK (rarity IN ('common', 'rare', 'legendary')) NOT NULL,
  UNIQUE(user_id, scripture_id)  -- 중복 수집 방지
);

-- 뽑기 타이머 + 스트릭 상태
CREATE TABLE draw_timers (
  user_id         uuid REFERENCES auth.users PRIMARY KEY,
  last_draw_time  timestamptz,
  total_draws     integer DEFAULT 0,
  streak_days     integer DEFAULT 0,
  last_streak_date date
);

-- RLS: 본인 데이터만 접근 가능
ALTER TABLE scripture_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_timers ENABLE ROW LEVEL SECURITY;
```

### 인증 흐름

```
앱 첫 방문
  → Supabase 세션 확인
  → 세션 없음: 게스트 모드 (localStorage)
  → 세션 있음: Supabase 데이터 로드

로그인 버튼 클릭 (AuthModal)
  → Google OAuth / 이메일 로그인 선택
  → 성공 시: localStorage 게스트 데이터 → Supabase 마이그레이션
  → 도감 페이지 자동 새로고침
```

### 시간대 처리

- `Date.now()` 기준 밀리초 사용 (타임존 무관)
- 스트릭 날짜는 `new Date().toLocaleDateString('ko-KR')` 사용

### 기존 코드 재사용

- `useFavorites()` 패턴을 참고해 `useScriptureCollection()` 구현
- 기존 `Toast.tsx` 컴포넌트를 `MilestoneToast`에서 확장
- `ScriptureCard.tsx`의 카드 레이아웃을 `CollectionCard`에서 재사용
- 기존 `getRandomScripture()` 대신 가중치 뽑기 함수로 교체

---

## 성공 지표

| 지표 | 목표 |
|------|------|
| 일평균 방문 횟수 | 1.5회 → 3회 이상 |
| 도감 페이지 체류 시간 | 30초 이상 |
| 마일스톤 달성 공유율 | 달성자의 20% 이상 |
| 7일 스트릭 달성자 비율 | 활성 사용자의 10% |

---

*최초 작성: 2026-06-06*
*버전: V3.5 (Phase 0~4 전체 완료)*

---

## 진행 현황

| Phase | 내용 | 상태 |
|-------|------|------|
| Phase 0 | Supabase 인증 설정 | ✅ 완료 |
| Phase 1 | 타이머 기반 뽑기 | ✅ 완료 |
| Phase 2 | 수집함 섹션 | ✅ 완료 |
| Phase 3 | 희귀도 시스템 | ✅ 완료 |
| Phase 4 | 마일스톤 & 스트릭 | ✅ 완료 |

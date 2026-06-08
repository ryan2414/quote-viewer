-- =====================================================
-- 말씀 도감 (Scripture Dex) — Supabase 초기 설정 SQL
-- Supabase 대시보드 > SQL Editor에서 실행
-- =====================================================

-- 1. 수집한 성경 구절 기록
CREATE TABLE IF NOT EXISTS scripture_collections (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scripture_id integer NOT NULL,
  collected_at timestamptz DEFAULT now() NOT NULL,
  rarity       text CHECK (rarity IN ('common', 'rare', 'legendary')) NOT NULL,
  UNIQUE(user_id, scripture_id)
);

-- 2. 뽑기 타이머 및 스트릭 상태
CREATE TABLE IF NOT EXISTS draw_timers (
  user_id          uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  last_draw_time   timestamptz,
  total_draws      integer DEFAULT 0 NOT NULL,
  streak_days      integer DEFAULT 0 NOT NULL,
  last_streak_date date
);

-- =====================================================
-- RLS (Row Level Security) 설정
-- 각 사용자는 자신의 데이터만 읽고 쓸 수 있다.
-- =====================================================

ALTER TABLE scripture_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_timers ENABLE ROW LEVEL SECURITY;

-- scripture_collections 정책
CREATE POLICY "본인 데이터 조회" ON scripture_collections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "본인 데이터 삽입" ON scripture_collections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 데이터 삭제" ON scripture_collections
  FOR DELETE USING (auth.uid() = user_id);

-- draw_timers 정책
CREATE POLICY "본인 타이머 조회" ON draw_timers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "본인 타이머 삽입" ON draw_timers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 타이머 수정" ON draw_timers
  FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- 인덱스 — user_id 기반 조회 성능 최적화
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_scripture_collections_user_id
  ON scripture_collections(user_id);

CREATE INDEX IF NOT EXISTS idx_scripture_collections_user_scripture
  ON scripture_collections(user_id, scripture_id);

-- =====================================================
-- Phase 3: 좋아요 카운트 (익명 디바이스 기반)
-- =====================================================

CREATE TABLE IF NOT EXISTS quote_likes (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id    integer NOT NULL,
  device_id   text NOT NULL,
  created_at  timestamptz DEFAULT now() NOT NULL,
  UNIQUE(quote_id, device_id)
);

ALTER TABLE quote_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "좋아요 공개 조회" ON quote_likes
  FOR SELECT USING (true);

CREATE POLICY "좋아요 추가" ON quote_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "좋아요 취소" ON quote_likes
  FOR DELETE USING (true);

CREATE INDEX IF NOT EXISTS idx_quote_likes_quote_id ON quote_likes(quote_id);

-- =====================================================
-- Phase 3: 이메일 뉴스레터 구독자
-- =====================================================

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email              text UNIQUE NOT NULL,
  subscribed_at      timestamptz DEFAULT now() NOT NULL,
  active             boolean DEFAULT true NOT NULL,
  unsubscribe_token  text
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "뉴스레터 삽입" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "뉴스레터 업데이트" ON newsletter_subscribers
  FOR UPDATE USING (true);

-- =====================================================
-- Phase 3: 브라우저 푸시 구독 정보
-- =====================================================

CREATE TABLE IF NOT EXISTS push_subscriptions (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint     text UNIQUE NOT NULL,
  subscription jsonb NOT NULL,
  auth_token   text NOT NULL,
  created_at   timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "푸시 구독 삽입" ON push_subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "푸시 구독 삭제" ON push_subscriptions
  FOR DELETE USING (true);

-- =====================================================
-- 보안 강화 마이그레이션 (기존 테이블이 있는 경우 실행)
-- =====================================================

-- newsletter_subscribers에 unsubscribe_token 컬럼 추가
ALTER TABLE newsletter_subscribers ADD COLUMN IF NOT EXISTS unsubscribe_token text;

-- push_subscriptions에 auth_token 컬럼 추가
ALTER TABLE push_subscriptions ADD COLUMN IF NOT EXISTS auth_token text;

-- =====================================================
-- Phase 4: 사용자 즐겨찾기 동기화 (로그인 사용자)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_favorites (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quote_id   integer NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, quote_id)
);

ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "본인 즐겨찾기 조회" ON user_favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "본인 즐겨찾기 추가" ON user_favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 즐겨찾기 삭제" ON user_favorites
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);

-- =====================================================
-- Phase 4: 사용자 명언 제출
-- =====================================================

CREATE TABLE IF NOT EXISTS quote_submissions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  text        text NOT NULL,
  author      text NOT NULL,
  category    text,
  source      text,
  status      text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')) NOT NULL,
  reviewed_at timestamptz,
  created_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "본인 제출 조회" ON quote_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "로그인 사용자 제출" ON quote_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_quote_submissions_user_id ON quote_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_quote_submissions_status ON quote_submissions(status);

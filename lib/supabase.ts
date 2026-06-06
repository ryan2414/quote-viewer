import { createBrowserClient as _createBrowserClient, createServerClient as _createServerClient } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// 브라우저 클라이언트 싱글톤 — Client Component에서 매 렌더마다 새 인스턴스 생성 방지
let browserClient: ReturnType<typeof _createBrowserClient> | null = null

export function createBrowserClient() {
  if (!browserClient) {
    browserClient = _createBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

// 서버 클라이언트 — Server Component / Route Handler / Middleware에서 사용
// 쿠키 스토어를 주입받아 세션을 읽고 갱신
export function createServerClient(cookieStore: CookieMethodsServer) {
  return _createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: cookieStore,
  })
}

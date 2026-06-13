import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const handleI18n = createIntlMiddleware(routing)

// Supabase 세션 쿠키를 응답에 복사하는 헬퍼
function withSupabaseSession(request: NextRequest, response: NextResponse): NextResponse {
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = new URL(request.url)

  // API·인증 라우트 — i18n 처리 건너뜀, Supabase 세션만 갱신
  if (pathname.startsWith('/api/') || pathname.startsWith('/auth/')) {
    return withSupabaseSession(request, NextResponse.next({ request }))
  }

  // 페이지 라우트 — i18n(로케일 감지·리다이렉션) 처리 후 세션 갱신
  const response = handleI18n(request)
  return withSupabaseSession(request, response)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}

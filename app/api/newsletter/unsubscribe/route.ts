import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer-pi.vercel.app').replace(/\/$/, '');

// GET: 이메일 내 링크 클릭으로 구독 취소 (email + token 검증)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email || !token) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribed=invalid`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('unsubscribe_token')
    .eq('email', email)
    .single();

  if (error || !data || data.unsubscribe_token !== token) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribed=invalid`);
  }

  await supabase.from('newsletter_subscribers').update({ active: false }).eq('email', email);
  return NextResponse.redirect(`${SITE_URL}?unsubscribed=1`);
}

// POST: 클라이언트에서 직접 호출 시 (email + token 모두 필요)
export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json() as { email?: string; token?: string };

    if (!email || !token) {
      return NextResponse.json({ error: '이메일과 토큰이 필요합니다.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('unsubscribe_token')
      .eq('email', email)
      .single();

    if (error || !data || data.unsubscribe_token !== token) {
      return NextResponse.json({ error: '유효하지 않은 구독 취소 요청입니다.' }, { status: 403 });
    }

    await supabase.from('newsletter_subscribers').update({ active: false }).eq('email', email);
    return NextResponse.json({ ok: true, message: '구독이 해제되었습니다.' });
  } catch {
    return NextResponse.json({ error: '구독 해제 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

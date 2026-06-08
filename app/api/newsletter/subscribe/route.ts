import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json() as { email?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: '유효하지 않은 이메일 주소입니다.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);
    const unsubscribeToken = randomUUID();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        { email, subscribed_at: new Date().toISOString(), active: true, unsubscribe_token: unsubscribeToken },
        { onConflict: 'email' }
      );

    if (error) throw error;

    // 중복 여부를 노출하지 않음 (계정 열거 방지)
    return NextResponse.json({ ok: true, message: '구독이 완료되었습니다!' });
  } catch {
    return NextResponse.json({ error: '구독 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

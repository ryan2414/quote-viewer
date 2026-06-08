import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json() as { email?: string };

    if (!email) {
      return NextResponse.json({ error: '이메일이 필요합니다.' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ active: false })
      .eq('email', email);

    if (error) throw error;
    return NextResponse.json({ ok: true, message: '구독이 해제되었습니다.' });
  } catch {
    return NextResponse.json({ error: '구독 해제 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

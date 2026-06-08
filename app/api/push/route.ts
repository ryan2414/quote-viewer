import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

// POST: 푸시 구독 등록 → auth_token 발급하여 반환
export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json() as PushSubscriptionJSON;
    if (!subscription.endpoint) {
      return NextResponse.json({ error: '유효하지 않은 구독 정보' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);
    const authToken = randomUUID();

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert(
        { endpoint: subscription.endpoint, subscription, auth_token: authToken },
        { onConflict: 'endpoint' }
      );

    if (error) throw error;
    return NextResponse.json({ ok: true, authToken });
  } catch {
    return NextResponse.json({ error: '구독 저장 실패' }, { status: 500 });
  }
}

// DELETE: auth_token 검증 후 구독 해제
export async function DELETE(request: NextRequest) {
  try {
    const { endpoint, authToken } = await request.json() as { endpoint: string; authToken?: string };
    if (!endpoint || !authToken) {
      return NextResponse.json({ error: 'endpoint 또는 authToken 누락' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { data, error: fetchError } = await supabase
      .from('push_subscriptions')
      .select('auth_token')
      .eq('endpoint', endpoint)
      .single();

    if (fetchError || !data || data.auth_token !== authToken) {
      return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
    }

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', endpoint);

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: '구독 해제 실패' }, { status: 500 });
  }
}

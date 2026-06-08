import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

// POST: 푸시 구독 등록
export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json() as PushSubscriptionJSON;
    if (!subscription.endpoint) {
      return NextResponse.json({ error: '유효하지 않은 구독 정보' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({ endpoint: subscription.endpoint, subscription: subscription }, { onConflict: 'endpoint' });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: '구독 저장 실패' }, { status: 500 });
  }
}

// DELETE: 푸시 구독 해제
export async function DELETE(request: NextRequest) {
  try {
    const { endpoint } = await request.json() as { endpoint: string };
    if (!endpoint) {
      return NextResponse.json({ error: 'endpoint 누락' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

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

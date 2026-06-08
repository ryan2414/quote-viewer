import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

// 브라우저 지문 기반 익명 식별 (쿠키)
function getDeviceId(request: NextRequest): string {
  return request.cookies.get('qv-did')?.value ?? '';
}

// GET: 좋아요 수 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quoteId = Number(id);
  if (!Number.isFinite(quoteId)) {
    return NextResponse.json({ error: '잘못된 ID' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);
  const deviceId = getDeviceId(request);

  const [countRes, likedRes] = await Promise.all([
    supabase.from('quote_likes').select('id', { count: 'exact', head: true }).eq('quote_id', quoteId),
    deviceId
      ? supabase.from('quote_likes').select('id').eq('quote_id', quoteId).eq('device_id', deviceId).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return NextResponse.json({
    count: countRes.count ?? 0,
    liked: !!likedRes.data,
  });
}

// POST: 좋아요 토글
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const quoteId = Number(id);
  if (!Number.isFinite(quoteId)) {
    return NextResponse.json({ error: '잘못된 ID' }, { status: 400 });
  }

  let deviceId = getDeviceId(request);
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  // 디바이스 ID 신규 발급
  if (!deviceId) {
    deviceId = crypto.randomUUID();
  }

  // 이미 좋아요 했으면 취소, 아니면 추가
  const { data: existing } = await supabase
    .from('quote_likes')
    .select('id')
    .eq('quote_id', quoteId)
    .eq('device_id', deviceId)
    .maybeSingle();

  let liked: boolean;
  if (existing) {
    await supabase.from('quote_likes').delete().eq('id', existing.id);
    liked = false;
  } else {
    await supabase.from('quote_likes').insert({ quote_id: quoteId, device_id: deviceId });
    liked = true;
  }

  const { count } = await supabase
    .from('quote_likes')
    .select('id', { count: 'exact', head: true })
    .eq('quote_id', quoteId);

  const response = NextResponse.json({ count: count ?? 0, liked });
  // 디바이스 ID 쿠키 설정 (1년)
  response.cookies.set('qv-did', deviceId, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    path: '/',
  });
  return response;
}

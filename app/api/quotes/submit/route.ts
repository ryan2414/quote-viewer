import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
    }

    const body = await request.json() as {
      text?: string;
      author?: string;
      category?: string | null;
      source?: string | null;
    };

    const { text, author, category, source } = body;

    if (!text?.trim() || !author?.trim()) {
      return NextResponse.json({ error: '명언과 저자를 입력해 주세요.' }, { status: 400 });
    }
    if (text.trim().length < 10) {
      return NextResponse.json({ error: '명언은 최소 10자 이상이어야 합니다.' }, { status: 400 });
    }
    if (text.trim().length > 1000) {
      return NextResponse.json({ error: '명언은 1000자를 초과할 수 없습니다.' }, { status: 400 });
    }
    if (author.trim().length > 100) {
      return NextResponse.json({ error: '저자명은 100자를 초과할 수 없습니다.' }, { status: 400 });
    }

    const { error } = await supabase.from('quote_submissions').insert({
      user_id: user.id,
      text: text.trim(),
      author: author.trim(),
      category: category ?? null,
      source: source?.trim() || null,
      status: 'pending',
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: '제출 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';
import { getTodayQuote } from '@/data/quotes';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer-pi.vercel.app').replace(/\/$/, '');

// Vercel Cron 또는 수동 트리거용
export async function POST(request: NextRequest) {
  // Cron 보안: Authorization 헤더 검증
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: '인증 실패' }, { status: 401 });
  }

  if (!RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY 미설정' }, { status: 503 });
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(cookieStore);

    const { data: subscribers, error } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('active', true);

    if (error) throw error;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const quote = getTodayQuote();
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const html = `
      <div style="max-width:600px;margin:0 auto;font-family:Georgia,serif;padding:40px 20px;">
        <h2 style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;margin:0 0 32px;">오늘의 명언</h2>
        <blockquote style="margin:0 0 24px;padding:0;font-size:22px;font-weight:700;color:#111827;line-height:1.7;">
          &ldquo;${quote.text}&rdquo;
        </blockquote>
        <p style="font-size:15px;color:#6b7280;margin:0 0 40px;">— ${quote.author}</p>
        <a href="${SITE_URL}/quotes/${quote.id}" style="display:inline-block;padding:12px 24px;background:#111827;color:#fff;text-decoration:none;border-radius:12px;font-size:14px;font-weight:600;">
          명언 보러 가기
        </a>
        <hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;"/>
        <p style="font-size:12px;color:#d1d5db;">
          수신 거부: <a href="${SITE_URL}/unsubscribe" style="color:#9ca3af;">구독 해제</a>
        </p>
      </div>
    `;

    const emails = subscribers.map((s) => s.email as string);

    await resend.emails.send({
      from: `Quote Viewer <newsletter@${new URL(SITE_URL).hostname}>`,
      to: emails,
      subject: `오늘의 명언: "${quote.text.slice(0, 30)}…"`,
      html,
    });

    return NextResponse.json({ ok: true, sent: emails.length });
  } catch {
    return NextResponse.json({ error: '발송 실패' }, { status: 500 });
  }
}

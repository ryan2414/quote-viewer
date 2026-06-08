import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@/lib/supabase';
import { getTodayQuote } from '@/data/quotes';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer-pi.vercel.app').replace(/\/$/, '');

function verifySecret(authHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || !authHeader) return false;
  const expected = `Bearer ${secret}`;
  if (authHeader.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected));
}

// Vercel Cron 또는 수동 트리거용
export async function POST(request: NextRequest) {
  if (!verifySecret(request.headers.get('authorization'))) {
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
      .select('email, unsubscribe_token')
      .eq('active', true);

    if (error) throw error;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ ok: true, sent: 0 });
    }

    const quote = getTodayQuote();
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);
    const hostname = new URL(SITE_URL).hostname;

    const buildHtml = (unsubscribeToken: string | null, email: string) => {
      const unsubscribeUrl = unsubscribeToken
        ? `${SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`
        : `${SITE_URL}/unsubscribe`;
      return `
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
            수신 거부: <a href="${unsubscribeUrl}" style="color:#9ca3af;">구독 해제</a>
          </p>
        </div>
      `;
    };

    // 개인화된 구독 취소 링크를 위해 개별 발송
    await resend.batch.send(
      subscribers.map((s) => ({
        from: `Quote Viewer <newsletter@${hostname}>`,
        to: [s.email as string],
        subject: `오늘의 명언: "${quote.text.slice(0, 30)}…"`,
        html: buildHtml(s.unsubscribe_token as string | null, s.email as string),
      }))
    );

    return NextResponse.json({ ok: true, sent: subscribers.length });
  } catch {
    return NextResponse.json({ error: '발송 실패' }, { status: 500 });
  }
}

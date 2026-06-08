import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { quotes } from '@/data/quotes';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY 미설정' }, { status: 503 });
  }

  try {
    const { favoriteIds = [], readIds = [] } = await request.json() as {
      favoriteIds?: number[];
      readIds?: number[];
    };

    // 읽지 않은 명언 중 추천 후보 선택
    const candidates = quotes.filter((q) => !readIds.includes(q.id));
    if (candidates.length === 0) {
      return NextResponse.json({ ids: [] });
    }

    // 즐겨찾기 카테고리 분포 계산
    const favoriteQuotes = quotes.filter((q) => favoriteIds.includes(q.id));
    const categoryCounts: Record<string, number> = {};
    favoriteQuotes.forEach((q) => {
      if (q.category) categoryCounts[q.category] = (categoryCounts[q.category] ?? 0) + 1;
    });
    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);

    // 후보 명언 목록 (최대 20개) — Claude에게 전달
    const candidateSummary = candidates
      .slice(0, 20)
      .map((q) => `id:${q.id} category:${q.category ?? 'none'} author:"${q.author}"`)
      .join('\n');

    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `사용자의 즐겨찾기 카테고리: ${topCategories.length > 0 ? topCategories.join(', ') : '없음'}

아래 후보 명언 중 이 사용자에게 어울리는 명언 5개의 id를 골라 JSON 배열로만 응답하세요.
예시: [3, 12, 7, 25, 18]

후보:
${candidateSummary}`,
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const match = text.match(/\[[\d,\s]+\]/);
    const recommendedIds = match
      ? (JSON.parse(match[0]) as number[]).filter((id) =>
          candidates.some((q) => q.id === id)
        )
      : candidates.slice(0, 5).map((q) => q.id);

    return NextResponse.json({ ids: recommendedIds.slice(0, 5) });
  } catch {
    return NextResponse.json({ error: '추천 생성 실패' }, { status: 500 });
  }
}

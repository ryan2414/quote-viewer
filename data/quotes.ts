import type { Quote } from '@/types/quote';

export const quotes: Quote[] = [
  {
    id: 1,
    text: '성공은 준비와 기회가 만날 때 일어난다.',
    author: '바비 언저',
    category: 'wisdom',
  },
  {
    id: 2,
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    category: 'motivation',
  },
  {
    id: 3,
    text: '어떤 위대한 일도 하루아침에 이루어지지 않는다.',
    author: 'Vincent van Gogh',
    category: 'life',
  },
  {
    id: 4,
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    category: 'wisdom',
  },
  {
    id: 5,
    text: '당신의 시간은 제한되어 있다. 다른 사람의 삶을 사는 데 낭비하지 말라.',
    author: 'Steve Jobs',
    category: 'life',
  },
  {
    id: 6,
    text: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    category: 'motivation',
  },
  {
    id: 7,
    text: '실패는 성공의 어머니다.',
    author: '토마스 에디슨',
    category: 'courage',
  },
  {
    id: 8,
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    category: 'motivation',
  },
  {
    id: 9,
    text: '크기가 아니라 노력으로 성공이 결정된다.',
    author: 'Zig Ziglar',
    category: 'wisdom',
  },
  {
    id: 10,
    text: "Don't let yesterday take up too much of today.",
    author: 'Will Rogers',
    category: 'life',
  },
  {
    id: 11,
    text: '매일 할 수 있는 작은 것들이 세상을 바꾼다.',
    author: 'Mahatma Gandhi',
    category: 'motivation',
  },
  {
    id: 12,
    text: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    category: 'courage',
  },
  {
    id: 13,
    text: '꿈을 갖는 것은 무료이지만, 실행하는 것에는 용기가 필요하다.',
    author: '알려지지 않음',
    category: 'courage',
  },
  {
    id: 14,
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    category: 'wisdom',
  },
  {
    id: 15,
    text: '내일은 결코 오지 않는다. 오늘이 전부다.',
    author: '제임스 쿡',
    category: 'life',
  },
  {
    id: 16,
    text: 'You miss 100% of the shots you do not take.',
    author: 'Wayne Gretzky',
    category: 'motivation',
  },
  {
    id: 17,
    text: '행동 없는 꿈은 바뀌지 않는 현실이다.',
    author: 'Denzel Washington',
    category: 'courage',
  },
  {
    id: 18,
    text: 'The only person you are destined to become is the person you decide to be.',
    author: 'Ralph Waldo Emerson',
    category: 'life',
  },
  {
    id: 19,
    text: '사랑은 가장 큰 선물이다.',
    author: '알려지지 않음',
    category: 'love',
  },
  {
    id: 20,
    text: 'Life is what happens when you are busy making other plans.',
    author: 'John Lennon',
    category: 'life',
  },
  {
    id: 21,
    text: '나 자신에게 충실해야 나도, 다른 사람도 행복하다.',
    author: 'William Shakespeare',
    category: 'wisdom',
  },
  {
    id: 22,
    text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
    category: 'motivation',
  },
  {
    id: 23,
    text: '모든 위대한 성공은 먼저 불가능해 보인다.',
    author: 'Jim Abbott',
    category: 'courage',
  },
  {
    id: 24,
    text: 'Your limitation—it is only your imagination.',
    author: 'Unknown',
    category: 'motivation',
  },
  {
    id: 25,
    text: '변화는 불편하지만 현상 유지는 더 불편하다.',
    author: 'Daniel Cohen',
    category: 'wisdom',
  },
  {
    id: 26,
    text: 'The only limit to our realization of tomorrow is our doubts of today.',
    author: 'Franklin D. Roosevelt',
    category: 'motivation',
  },
  {
    id: 27,
    text: '사랑과 일, 두 가지를 잘하는 사람이 가장 행복하다.',
    author: 'Sigmund Freud',
    category: 'love',
  },
  {
    id: 28,
    text: 'Keep your face always toward the sunshine and shadows will fall behind you.',
    author: 'Walt Whitman',
    category: 'life',
  },
  {
    id: 29,
    text: '오늘의 노력이 내일의 성공이다.',
    author: '알려지지 않음',
    category: 'motivation',
  },
  {
    id: 30,
    text: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
    category: 'wisdom',
  },
  {
    id: 31,
    text: '두려움은 진보의 적이다.',
    author: '벤자민 프랭클린',
    category: 'courage',
  },
  {
    id: 32,
    text: 'The journey of a thousand miles begins with a single step.',
    author: 'Lao Tzu',
    category: 'motivation',
  },
];

export function getTodayQuote(date: Date = new Date()): Quote {
  const index =
    (date.getFullYear() + (date.getMonth() + 1) + date.getDate()) %
    quotes.length;
  return quotes[index];
}

export function getQuoteById(id: number): Quote | undefined {
  return quotes.find((quote) => quote.id === id);
}

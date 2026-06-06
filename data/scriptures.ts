import type { Scripture, ScriptureCategory } from '@/types/scripture';

export const scriptures: Scripture[] = [
  // 믿음 (faith)
  {
    id: 1,
    text: '내가 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라',
    text_en: 'I can do all this through him who gives me strength.',
    book: '빌립보서', book_en: 'Philippians', chapter: 4, verse: 13,
    category: 'faith',
  },
  {
    id: 2,
    text: '믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니',
    text_en: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
    book: '히브리서', book_en: 'Hebrews', chapter: 11, verse: 1,
    category: 'faith',
  },
  {
    id: 3,
    text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
    text_en: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    book: '요한복음', book_en: 'John', chapter: 3, verse: 16,
    category: 'faith',
  },
  {
    id: 4,
    text: '그러므로 믿음은 들음에서 나며 들음은 그리스도의 말씀으로 말미암았느니라',
    text_en: 'Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.',
    book: '로마서', book_en: 'Romans', chapter: 10, verse: 17,
    category: 'faith',
  },
  {
    id: 5,
    text: '예수께서 이르시되 할 수 있거든이 무슨 말이냐 믿는 자에게는 능히 하지 못할 일이 없느니라 하시니',
    text_en: '"\'If you can\'?" said Jesus. "Everything is possible for one who believes."',
    book: '마가복음', book_en: 'Mark', chapter: 9, verse: 23,
    category: 'faith',
  },
  // 소망 (hope)
  {
    id: 6,
    text: '오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요 달음박질하여도 곤비하지 아니하겠고 걸어가도 피곤하지 아니하리로다',
    text_en: 'But those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
    book: '이사야', book_en: 'Isaiah', chapter: 40, verse: 31,
    category: 'hope',
  },
  {
    id: 7,
    text: '여호와의 말씀이니라 너희를 향한 나의 생각을 내가 아나니 평안이요 재앙이 아니니라 너희에게 미래와 희망을 주는 것이니라',
    text_en: '"For I know the plans I have for you," declares the LORD, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    book: '예레미야', book_en: 'Jeremiah', chapter: 29, verse: 11,
    category: 'hope',
  },
  {
    id: 8,
    text: '소망의 하나님이 모든 기쁨과 평강을 믿음 안에서 너희에게 충만하게 하사 성령의 능력으로 소망이 넘치게 하시기를 원하노라',
    text_en: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.',
    book: '로마서', book_en: 'Romans', chapter: 15, verse: 13,
    category: 'hope',
  },
  {
    id: 9,
    text: '나의 영혼아 잠잠히 하나님만 바라라 무릇 나의 소망이 그로부터 나오는도다',
    text_en: 'Yes, my soul, find rest in God; my hope comes from him.',
    book: '시편', book_en: 'Psalms', chapter: 62, verse: 5,
    category: 'hope',
  },
  {
    id: 10,
    text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
    text_en: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
    book: '로마서', book_en: 'Romans', chapter: 8, verse: 28,
    category: 'hope',
  },
  // 사랑 (love)
  {
    id: 11,
    text: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며',
    text_en: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
    book: '고린도전서', book_en: '1 Corinthians', chapter: 13, verse: 4,
    category: 'love',
  },
  {
    id: 12,
    text: '사랑하지 아니하는 자는 하나님을 알지 못하나니 이는 하나님은 사랑이심이라',
    text_en: 'Whoever does not love does not know God, because God is love.',
    book: '요한1서', book_en: '1 John', chapter: 4, verse: 8,
    category: 'love',
  },
  {
    id: 13,
    text: '새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라',
    text_en: 'A new command I give you: Love one another. As I have loved you, so you must love one another.',
    book: '요한복음', book_en: 'John', chapter: 13, verse: 34,
    category: 'love',
  },
  {
    id: 14,
    text: '우리가 사랑함은 그가 먼저 우리를 사랑하셨음이라',
    text_en: 'We love because he first loved us.',
    book: '요한1서', book_en: '1 John', chapter: 4, verse: 19,
    category: 'love',
  },
  {
    id: 15,
    text: '내가 확신하노니 사망이나 생명이나 천사들이나 권세자들이나 현재 일이나 장래 일이나 능력이나 높음이나 깊음이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라',
    text_en: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.',
    book: '로마서', book_en: 'Romans', chapter: 8, verse: 38, verseEnd: 39,
    category: 'love',
  },
  // 위로 (comfort)
  {
    id: 16,
    text: '여호와는 나의 목자시니 내게 부족함이 없으리로다',
    text_en: 'The LORD is my shepherd, I lack nothing.',
    book: '시편', book_en: 'Psalms', chapter: 23, verse: 1,
    category: 'comfort',
  },
  {
    id: 17,
    text: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
    text_en: 'Come to me, all you who are weary and burdened, and I will give you rest.',
    book: '마태복음', book_en: 'Matthew', chapter: 11, verse: 28,
    category: 'comfort',
  },
  {
    id: 18,
    text: '아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라',
    text_en: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
    book: '빌립보서', book_en: 'Philippians', chapter: 4, verse: 6, verseEnd: 7,
    category: 'comfort',
  },
  {
    id: 19,
    text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라',
    text_en: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    book: '이사야', book_en: 'Isaiah', chapter: 41, verse: 10,
    category: 'comfort',
  },
  {
    id: 20,
    text: '하나님은 우리의 피난처시요 힘이시니 환난 중에 만날 큰 도움이시라',
    text_en: 'God is our refuge and strength, an ever-present help in trouble.',
    book: '시편', book_en: 'Psalms', chapter: 46, verse: 1,
    category: 'comfort',
  },
  // 지혜 (wisdom)
  {
    id: 21,
    text: '여호와를 경외하는 것이 지혜의 근본이요 거룩하신 자를 아는 것이 명철이니라',
    text_en: 'The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.',
    book: '잠언', book_en: 'Proverbs', chapter: 9, verse: 10,
    category: 'wisdom',
  },
  {
    id: 22,
    text: '너희 중에 누구든지 지혜가 부족하거든 모든 사람에게 후히 주시고 꾸짖지 아니하시는 하나님께 구하라 그리하면 주시리라',
    text_en: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
    book: '야고보서', book_en: 'James', chapter: 1, verse: 5,
    category: 'wisdom',
  },
  {
    id: 23,
    text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라',
    text_en: 'Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    book: '잠언', book_en: 'Proverbs', chapter: 3, verse: 5, verseEnd: 6,
    category: 'wisdom',
  },
  {
    id: 24,
    text: '너의 행사를 여호와께 맡기라 그리하면 네가 경영하는 것이 이루어지리라',
    text_en: 'Commit to the LORD whatever you do, and he will establish your plans.',
    book: '잠언', book_en: 'Proverbs', chapter: 16, verse: 3,
    category: 'wisdom',
  },
  {
    id: 25,
    text: '지혜를 얻는 것이 금을 얻는 것보다 얼마나 나은고 명철을 얻는 것이 은을 얻는 것보다 더욱 나으니라',
    text_en: 'How much better to get wisdom than gold, to get insight rather than silver!',
    book: '잠언', book_en: 'Proverbs', chapter: 16, verse: 16,
    category: 'wisdom',
  },
  // 감사 (thanksgiving)
  {
    id: 26,
    text: '범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
    text_en: 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.',
    book: '데살로니가전서', book_en: '1 Thessalonians', chapter: 5, verse: 18,
    category: 'thanksgiving',
  },
  {
    id: 27,
    text: '여호와께 감사하라 그는 선하시며 그 인자하심이 영원함이로다',
    text_en: 'Give thanks to the LORD, for he is good; his love endures forever.',
    book: '시편', book_en: 'Psalms', chapter: 107, verse: 1,
    category: 'thanksgiving',
  },
  {
    id: 28,
    text: '또 무엇을 하든지 말에나 일에나 다 주 예수의 이름으로 하고 그를 힘입어 하나님 아버지께 감사하라',
    text_en: 'And whatever you do, whether in word or deed, do it all in the name of the Lord Jesus, giving thanks to God the Father through him.',
    book: '골로새서', book_en: 'Colossians', chapter: 3, verse: 17,
    category: 'thanksgiving',
  },
  {
    id: 29,
    text: '감사함으로 그의 문에 들어가며 찬송함으로 그의 궁정에 들어가서 그에게 감사하며 그의 이름을 송축할지어다',
    text_en: 'Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.',
    book: '시편', book_en: 'Psalms', chapter: 100, verse: 4,
    category: 'thanksgiving',
  },
  {
    id: 30,
    text: '범사에 우리 주 예수 그리스도의 이름으로 항상 아버지 하나님께 감사하며',
    text_en: 'Always giving thanks to God the Father for everything, in the name of our Lord Jesus Christ.',
    book: '에베소서', book_en: 'Ephesians', chapter: 5, verse: 20,
    category: 'thanksgiving',
  },
];

export function getTodayScripture(date: Date = new Date()): Scripture {
  const index =
    (date.getFullYear() + (date.getMonth() + 1) + date.getDate()) %
    scriptures.length;
  return scriptures[index];
}

export function getRandomScripture(excludeId?: number): Scripture {
  const pool = excludeId !== undefined
    ? scriptures.filter((s) => s.id !== excludeId)
    : scriptures;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getScriptureById(id: number): Scripture | undefined {
  return scriptures.find((s) => s.id === id);
}

export function getScripturesByCategory(category: ScriptureCategory): Scripture[] {
  return scriptures.filter((s) => s.category === category);
}

export function formatReference(s: Scripture): string {
  const verseRange = s.verseEnd ? `${s.verse}-${s.verseEnd}` : `${s.verse}`;
  return `${s.book} ${s.chapter}:${verseRange}`;
}

export function formatReferenceEn(s: Scripture): string {
  const verseRange = s.verseEnd ? `${s.verse}-${s.verseEnd}` : `${s.verse}`;
  return `${s.book_en} ${s.chapter}:${verseRange}`;
}

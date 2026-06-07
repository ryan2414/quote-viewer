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
  // 믿음 — 추가 구절
  {
    id: 31,
    text: '믿음의 주요 또 온전하게 하시는 이인 예수를 바라보자 그는 그 앞에 있는 기쁨을 위하여 십자가를 참으사 부끄러움을 개의치 아니하시더니 하나님 보좌 우편에 앉으셨느니라',
    text_en: 'fixing our eyes on Jesus, the pioneer and perfecter of faith. For the joy set before him he endured the cross, scorning its shame, and sat down at the right hand of the throne of God.',
    book: '히브리서', book_en: 'Hebrews', chapter: 12, verse: 2,
    category: 'faith',
  },
  {
    id: 32,
    text: '이는 우리가 믿음으로 행하고 보는 것으로 행하지 아니함이로라',
    text_en: 'For we live by faith, not by sight.',
    book: '고린도후서', book_en: '2 Corinthians', chapter: 5, verse: 7,
    category: 'faith',
  },
  {
    id: 33,
    text: '만일 너희에게 믿음이 겨자씨 한 알 만큼만 있어도 이 산을 명하여 여기서 저기로 옮겨지라 하면 옮겨질 것이요 또 너희가 못할 것이 없으리라',
    text_en: 'Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, "Move from here to there," and it will move. Nothing will be impossible for you.',
    book: '마태복음', book_en: 'Matthew', chapter: 17, verse: 20,
    category: 'faith',
  },
  {
    id: 34,
    text: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라 이제 내가 육체 가운데 사는 것은 나를 사랑하사 나를 위하여 자기 자신을 버리신 하나님의 아들을 믿는 믿음 안에서 사는 것이라',
    text_en: 'I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.',
    book: '갈라디아서', book_en: 'Galatians', chapter: 2, verse: 20,
    category: 'faith',
  },
  {
    id: 35,
    text: '너희 염려를 다 주께 맡기라 이는 그가 너희를 돌보심이라',
    text_en: 'Cast all your anxiety on him because he cares for you.',
    book: '베드로전서', book_en: '1 Peter', chapter: 5, verse: 7,
    category: 'faith',
  },
  // 소망 — 추가 구절
  {
    id: 36,
    text: '여호와의 인자와 긍휼이 무궁하시므로 우리가 진멸되지 아니함이니이다 이것들이 아침마다 새로우니 주의 성실하심이 크시도소이다',
    text_en: 'Because of the LORD\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
    book: '예레미야애가', book_en: 'Lamentations', chapter: 3, verse: 22, verseEnd: 23,
    category: 'hope',
  },
  {
    id: 37,
    text: '내가 산을 향하여 눈을 들리라 나의 도움이 어디서 올까 나의 도움은 천지를 지으신 여호와에게서로다',
    text_en: 'I lift up my eyes to the mountains— where does my help come from? My help comes from the LORD, the Maker of heaven and earth.',
    book: '시편', book_en: 'Psalms', chapter: 121, verse: 1, verseEnd: 2,
    category: 'hope',
  },
  {
    id: 38,
    text: '다만 이뿐 아니라 우리가 환난 중에도 즐거워하나니 이는 환난은 인내를, 인내는 연단을, 연단은 소망을 이루는 줄 앎이로다',
    text_en: 'Not only so, but we also glory in our sufferings, because we know that suffering produces perseverance; perseverance, character; and character, hope.',
    book: '로마서', book_en: 'Romans', chapter: 5, verse: 3, verseEnd: 4,
    category: 'hope',
  },
  {
    id: 39,
    text: '여호와를 바라는 너희들아 강하고 담대하라',
    text_en: 'Be strong and take heart, all you who hope in the LORD.',
    book: '시편', book_en: 'Psalms', chapter: 31, verse: 24,
    category: 'hope',
  },
  {
    id: 40,
    text: '이 비밀은 너희 안에 계신 그리스도시니 곧 영광의 소망이니라',
    text_en: 'which is Christ in you, the hope of glory.',
    book: '골로새서', book_en: 'Colossians', chapter: 1, verse: 27,
    category: 'hope',
  },
  // 사랑 — 추가 구절
  {
    id: 41,
    text: '우리가 아직 죄인 되었을 때에 그리스도께서 우리를 위하여 죽으심으로 하나님께서 우리에 대한 자기의 사랑을 확증하셨느니라',
    text_en: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.',
    book: '로마서', book_en: 'Romans', chapter: 5, verse: 8,
    category: 'love',
  },
  {
    id: 42,
    text: '사람이 친구를 위하여 자기 목숨을 버리면 이보다 더 큰 사랑이 없나니',
    text_en: 'Greater love has no one than this: to lay down one\'s life for one\'s friends.',
    book: '요한복음', book_en: 'John', chapter: 15, verse: 13,
    category: 'love',
  },
  {
    id: 43,
    text: '그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라',
    text_en: 'And now these three remain: faith, hope and love. But the greatest of these is love.',
    book: '고린도전서', book_en: '1 Corinthians', chapter: 13, verse: 13,
    category: 'love',
  },
  {
    id: 44,
    text: '내 계명은 곧 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 하는 이것이니라',
    text_en: 'My command is this: Love each other as I have loved you.',
    book: '요한복음', book_en: 'John', chapter: 15, verse: 12,
    category: 'love',
  },
  {
    id: 45,
    text: '사랑 안에 두려움이 없고 온전한 사랑이 두려움을 내쫓나니 두려움에는 형벌이 있음이라 두려워하는 자는 사랑 안에서 온전히 이루지 못하였느니라',
    text_en: 'There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.',
    book: '요한1서', book_en: '1 John', chapter: 4, verse: 18,
    category: 'love',
  },
  // 위로 — 추가 구절
  {
    id: 46,
    text: '여호와는 마음이 상한 자를 가까이 하시고 충심으로 통회하는 자를 구원하시는도다',
    text_en: 'The LORD is close to the brokenhearted and saves those who are crushed in spirit.',
    book: '시편', book_en: 'Psalms', chapter: 34, verse: 18,
    category: 'comfort',
  },
  {
    id: 47,
    text: '강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라',
    text_en: 'Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
    book: '여호수아', book_en: 'Joshua', chapter: 1, verse: 9,
    category: 'comfort',
  },
  {
    id: 48,
    text: '애통하는 자는 복이 있나니 그들이 위로를 받을 것임이요',
    text_en: 'Blessed are those who mourn, for they will be comforted.',
    book: '마태복음', book_en: 'Matthew', chapter: 5, verse: 4,
    category: 'comfort',
  },
  {
    id: 49,
    text: '찬송하리로다 그는 우리 주 예수 그리스도의 하나님이시요 자비의 아버지시요 모든 위로의 하나님이시며 우리의 모든 환난 중에서 우리를 위로하사 우리로 하여금 하나님께 받는 위로로써 모든 환난 중에 있는 자들을 능히 위로하게 하시는 이시로다',
    text_en: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.',
    book: '고린도후서', book_en: '2 Corinthians', chapter: 1, verse: 3, verseEnd: 4,
    category: 'comfort',
  },
  {
    id: 50,
    text: '내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다',
    text_en: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
    book: '시편', book_en: 'Psalms', chapter: 23, verse: 4,
    category: 'comfort',
  },
  // 지혜 — 추가 구절
  {
    id: 51,
    text: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다',
    text_en: 'Your word is a lamp for my feet, a light on my path.',
    book: '시편', book_en: 'Psalms', chapter: 119, verse: 105,
    category: 'wisdom',
  },
  {
    id: 52,
    text: '여호와를 경외하는 것이 지식의 근본이거늘 미련한 자는 지혜와 훈계를 멸시하느니라',
    text_en: 'The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.',
    book: '잠언', book_en: 'Proverbs', chapter: 1, verse: 7,
    category: 'wisdom',
  },
  {
    id: 53,
    text: '지혜가 제일이니 지혜를 얻으라 네가 얻은 모든 것을 가지고 명철을 얻을지니라',
    text_en: 'The beginning of wisdom is this: Get wisdom, and whatever you get, get insight.',
    book: '잠언', book_en: 'Proverbs', chapter: 4, verse: 7,
    category: 'wisdom',
  },
  {
    id: 54,
    text: '오직 위로부터 난 지혜는 첫째 성결하고 다음에 화평하고 관용하고 양순하며 긍휼과 선한 열매가 가득하고 편견과 거짓이 없나니',
    text_en: 'But the wisdom that comes from heaven is first of all pure; then peace-loving, considerate, submissive, full of mercy and good fruit, impartial and sincere.',
    book: '야고보서', book_en: 'James', chapter: 3, verse: 17,
    category: 'wisdom',
  },
  {
    id: 55,
    text: '대저 여호와는 지혜를 주시며 지식과 명철은 그의 입에서 나오며',
    text_en: 'For the LORD gives wisdom; from his mouth come knowledge and understanding.',
    book: '잠언', book_en: 'Proverbs', chapter: 2, verse: 6,
    category: 'wisdom',
  },
  // 감사 — 추가 구절
  {
    id: 56,
    text: '우리가 감사함으로 그 앞에 나아가며 시를 지어 즐거이 그를 노래하자',
    text_en: 'Let us come before him with thanksgiving and extol him with music and song.',
    book: '시편', book_en: 'Psalms', chapter: 95, verse: 2,
    category: 'thanksgiving',
  },
  {
    id: 57,
    text: '지존하신 여호와여 주께 감사함이 좋고 주의 이름을 찬양함이 좋으니이다',
    text_en: 'It is good to praise the LORD and make music to your name, O Most High.',
    book: '시편', book_en: 'Psalms', chapter: 92, verse: 1,
    category: 'thanksgiving',
  },
  {
    id: 58,
    text: '주 안에서 항상 기뻐하라 내가 다시 말하노니 기뻐하라',
    text_en: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    book: '빌립보서', book_en: 'Philippians', chapter: 4, verse: 4,
    category: 'thanksgiving',
  },
  {
    id: 59,
    text: '그리스도의 평강이 너희 마음을 주장하게 하라 너희는 평강을 위하여 한 몸으로 부르심을 받았나니 너희는 또한 감사하는 자가 되라',
    text_en: 'Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.',
    book: '골로새서', book_en: 'Colossians', chapter: 3, verse: 15,
    category: 'thanksgiving',
  },
  {
    id: 60,
    text: '그 안에 뿌리를 박으며 세움을 받아 교훈을 받은 대로 믿음에 굳게 서서 감사함을 넘치게 하라',
    text_en: 'rooted and built up in him, strengthened in the faith as you were taught, and overflowing with thankfulness.',
    book: '골로새서', book_en: 'Colossians', chapter: 2, verse: 7,
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

// ─── 희귀도 시스템 ───────────────────────────────────────────────

export type Rarity = 'common' | 'rare' | 'legendary';

const RARITY_MAP: Record<ScriptureCategory, Rarity> = {
  faith: 'common',
  hope: 'common',
  thanksgiving: 'common',
  love: 'rare',
  comfort: 'rare',
  wisdom: 'legendary',
};

export function getRarityForCategory(category: ScriptureCategory): Rarity {
  return RARITY_MAP[category];
}

// 가중치 랜덤 뽑기 — 미수집 구절 우선 선택
export function drawScripture(collectedIds: number[]): Scripture {
  const roll = Math.random();
  const targetRarity: Rarity =
    roll < 0.10 ? 'legendary' : roll < 0.40 ? 'rare' : 'common';

  const rarityPool = scriptures.filter(
    (s) => getRarityForCategory(s.category) === targetRarity
  );
  const uncollected = rarityPool.filter((s) => !collectedIds.includes(s.id));
  const pool = uncollected.length > 0 ? uncollected : rarityPool;
  return pool[Math.floor(Math.random() * pool.length)];
}


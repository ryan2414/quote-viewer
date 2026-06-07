import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950 pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* 배경 그라디언트 장식 */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-indigo-50/70 to-transparent dark:from-indigo-950/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* 뱃지 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 animate-fadeIn">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
          매일 새로운 명언
        </div>

        {/* 헤드라인 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6 animate-quoteReveal">
          하루를 바꾸는{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
            한 마디
          </span>
        </h1>

        {/* 부제목 */}
        <p
          className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-slideUp"
          style={{ animationDelay: '0.1s' }}
        >
          위인들의 지혜로운 명언과 성경 구절로 매일 하루를 시작하세요.
          즐겨찾기하고, 수집하고, 영감을 나눠보세요.
        </p>

        {/* CTA 버튼 */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slideUp"
          style={{ animationDelay: '0.2s' }}
        >
          <Link
            href="/today"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-base hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors duration-150"
          >
            오늘의 명언 보기
          </Link>
          <Link
            href="/quotes"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-base hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            명언 모아보기
          </Link>
        </div>

        {/* 장식용 명언 카드 */}
        <div
          className="mt-16 max-w-sm mx-auto animate-slideUp"
          style={{ animationDelay: '0.35s' }}
          aria-hidden="true"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-lg text-left">
            <svg
              className="w-8 h-8 text-indigo-200 dark:text-indigo-800 mb-3"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-3 text-sm sm:text-base">
              &ldquo;인생에서 가장 위대한 영광은 결코 넘어지지 않는 것이 아니라,
              넘어질 때마다 일어서는 것이다.&rdquo;
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">— 넬슨 만델라</p>
          </div>
        </div>
      </div>
    </section>
  );
}

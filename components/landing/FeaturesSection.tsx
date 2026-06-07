const features = [
  {
    icon: '📖',
    title: '매일 새로운 명언',
    description:
      '날짜 기반으로 매일 자동으로 바뀌는 명언을 받아보세요. 53개의 엄선된 위인 명언이 기다립니다.',
  },
  {
    icon: '📚',
    title: '성경 구절 수집',
    description:
      '3시간마다 성경 구절을 뽑아 수집하세요. 일반/레어/레전더리 등급으로 수집의 재미를 더했습니다.',
  },
  {
    icon: '⭐',
    title: '즐겨찾기 & 컬렉션',
    description:
      '마음에 드는 명언을 즐겨찾기하고, 성경 구절 31개를 모두 수집해 컬렉션을 완성하세요.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            왜 Quote Viewer인가요?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            단순한 명언 앱이 아닙니다. 영감과 게임화 요소를 결합한 새로운 경험입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-7 animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

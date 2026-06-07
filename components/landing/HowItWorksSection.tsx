const steps = [
  {
    number: '01',
    title: '매일 방문하기',
    description:
      '하루를 시작할 때 Quote Viewer를 열어보세요. 오늘의 명언이 새롭게 기다리고 있습니다.',
  },
  {
    number: '02',
    title: '저장하고 공유하기',
    description:
      '마음에 드는 명언은 즐겨찾기로 저장하거나 클립보드에 복사해 친구에게 공유하세요.',
  },
  {
    number: '03',
    title: '성경 구절 수집하기',
    description:
      '3시간마다 성경 구절을 뽑고, 31개를 모두 수집하면 컬렉션을 완성할 수 있습니다.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            어떻게 사용하나요?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">단 3단계로 시작하세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-slideUp"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* 데스크톱 연결선 */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] -right-4 h-px bg-gray-200 dark:bg-gray-800"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 font-bold text-xl mb-5 shrink-0">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { getTranslations } from 'next-intl/server';

export default async function HowItWorksSection() {
  const t = await getTranslations('landing');

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('howTitle')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">{t('howDesc')}</p>
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

import { getTranslations } from 'next-intl/server';

export default async function FeaturesSection() {
  const t = await getTranslations('landing');

  const features = [
    {
      icon: t('feature1Icon'),
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      icon: t('feature2Icon'),
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      icon: t('feature3Icon'),
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
  ];

  return (
    <section className="py-20 sm:py-24 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('featuresSectionTitle')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
            {t('featuresSectionDesc')}
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

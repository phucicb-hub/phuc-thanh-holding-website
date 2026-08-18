import { useTranslation } from 'react-i18next';
import { trainingPillars } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function TrainingPillarsSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-primary-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.pillarsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('training.pillarsDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {trainingPillars[lang].map((pillar) => (
            <article
              key={pillar.id}
              className="group bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-3 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                <i className={`${pillar.icon} w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {pillar.description}
              </p>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
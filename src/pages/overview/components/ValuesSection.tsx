import { useTranslation } from 'react-i18next';
import { coreValues, methodology } from '@/mocks/overview';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function ValuesSection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-14 md:py-20 bg-background-50">
      <div className="container-main">
        {/* Core values */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-heart-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('overview.valuesBadge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('overview.valuesTitle')}
          </h2>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14 md:mb-20">
          {coreValues[lang].map((value) => (
            <div
              key={value.id}
              className="group bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 text-center hover:border-primary-300 transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-accent-100 text-primary-700 mx-auto mb-4 group-hover:bg-accent-500 group-hover:text-primary-950 transition-colors">
                <i className={`${value.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xl`} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </RevealStagger>

        {/* Methodology */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-road-map-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('overview.methodBadge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('overview.methodTitle')}
          </h2>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {methodology[lang].map((step) => (
            <div
              key={step.id}
              className="relative bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-bold text-primary-200">{step.step}</span>
                <span className="h-px flex-1 bg-background-200" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import { softwareValues } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function SoftwareValuesSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-star-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.valuesTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.valuesDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {softwareValues[lang].map((value) => (
            <div
              key={value.id}
              className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-3 shrink-0">
                <i className={`${value.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {value.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import { softwareTriggers } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function SoftwareWhenSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="lg:col-span-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-lightbulb-flash-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('software.badge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('software.whenTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-5">
              {t('software.whenDesc')}
            </p>
            <div className="bg-background-50 border border-background-200/70 rounded-lg p-4 md:p-5">
              <div className="flex items-start gap-2.5">
                <i className="ri-information-line w-5 h-5 flex items-center justify-center text-accent-600 shrink-0 mt-0.5" />
                <p className="text-xs md:text-sm text-foreground-700 leading-relaxed">
                  {t('software.whenNote')}
                </p>
              </div>
            </div>
          </div>

          <RevealStagger className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {softwareTriggers[lang].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-background-50 border border-background-200/70 rounded-lg p-3.5 md:p-4 hover:border-primary-300 transition-colors"
              >
                <div className="w-7 h-7 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center" />
                </div>
                <span className="text-xs md:text-sm text-foreground-800 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
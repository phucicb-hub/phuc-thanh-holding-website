import { useTranslation } from 'react-i18next';
import { softwareAiCan, softwareAiCannot } from '@/mocks/software';
import useLang from '@/hooks/useLang';

export default function SoftwareAiSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-robot-2-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.aiTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.aiDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <i className="ri-sparkling-2-line w-5 h-5 flex items-center justify-center" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground-900">
                {t('software.aiCanTitle')}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {softwareAiCan[lang].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground-800 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-100 text-accent-700">
                <i className="ri-alert-line w-5 h-5 flex items-center justify-center" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground-900">
                {t('software.aiCannotTitle')}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {softwareAiCannot[lang].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <i className="ri-close-circle-line w-4 h-4 flex items-center justify-center text-accent-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground-800 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
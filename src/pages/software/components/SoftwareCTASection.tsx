import { useTranslation } from 'react-i18next';
import { softwareStartSteps } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function SoftwareCTASection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-14 md:py-20 bg-primary-900">
      <div className="container-main">
        <div className="relative rounded-xl overflow-hidden">
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16">
            <div className="text-center mb-10">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                {t('software.ctaTitle')}
              </h2>
              <p className="text-sm md:text-base text-background-200 leading-relaxed max-w-2xl mx-auto">
                {t('software.ctaDesc')}
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-10">
              <p className="text-sm md:text-base font-semibold text-accent-400 text-center mb-5">
                {t('software.ctaStepsTitle')}
              </p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {softwareStartSteps[lang].map((step, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 bg-background-50/5 border border-background-50/10 rounded-lg px-4 py-3"
                  >
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-500 text-primary-950 text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-xs md:text-sm text-background-100 leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 flex-wrap">
              <a
                href={getLocalizedPath('contact', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
              >
                {t('software.ctaButton')}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
              <a
                href={getLocalizedPath('contact', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
              >
                {t('software.ctaConsult')}
              </a>
              <a
                href={getLocalizedPath('contact', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
              >
                {t('software.ctaPropose')}
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-background-200 flex-wrap">
              <div className="flex items-center gap-2">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <span>0343 089 666</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <a
                  href="mailto:phuclv@phucthanhholding.com"
                  className="hover:text-accent-400 transition-colors"
                >
                  phuclv@phucthanhholding.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <span>{t('common.workingHours')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import { companyFacts } from '@/mocks/overview';
import useLang from '@/hooks/useLang';

export default function FactsStrip() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="relative z-20 -mt-10 md:-mt-14">
      <div className="container-main">
        <div className="bg-background-50 border border-background-200/70 rounded-xl px-6 md:px-10 py-6 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Left intro block */}
            <div className="lg:col-span-2 lg:border-r lg:border-background-200/70 lg:pr-8">
              <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-2">
                {t('overview.factsTitle')}
              </h2>
              <p className="text-sm text-foreground-600 mb-3 leading-relaxed">
                {t('overview.factsDesc')}
              </p>
              <a
                href="#ve-chung-toi"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
              >
                {t('overview.viewProfile')}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
            </div>

            {/* Facts grid */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {companyFacts[lang].map((fact) => (
                <div key={fact.id} className="flex flex-col">
                  <div className="w-9 h-9 flex items-center justify-center rounded-md bg-primary-50 text-primary-600 mb-2">
                    <i className={`${fact.icon} w-4 h-4 flex items-center justify-center text-lg`} />
                  </div>
                  <span className="text-base md:text-lg font-bold text-foreground-900">
                    {fact.value}
                  </span>
                  <span className="text-xs text-foreground-600 mt-0.5 leading-snug">
                    {fact.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
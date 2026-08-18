import { useTranslation } from 'react-i18next';
import { reviewProcess } from '@/mocks/contact';
import useLang from '@/hooks/useLang';

export default function ProcessSection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-flow-chart w-3.5 h-3.5 flex items-center justify-center" />
            {t('contact.processBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
            {t('contact.processTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 mt-3 leading-relaxed">
            {t('contact.processDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {reviewProcess[lang].map((step) => (
            <div
              key={step.id}
              className="relative bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-500 text-background-50 font-bold text-sm shrink-0">
                  {step.id}
                </span>
                <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary-100 text-secondary-700 shrink-0">
                  <i className={`${step.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </span>
              </div>
              <h3 className="text-sm font-bold text-foreground-900 mb-2">{step.title}</h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
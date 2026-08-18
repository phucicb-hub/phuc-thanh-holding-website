import { useTranslation } from 'react-i18next';
import { investmentServices } from '@/mocks/investment';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function InvestmentServicesSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('investment.servicesTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('investment.servicesDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {investmentServices[lang].map((service) => (
            <article
              key={service.id}
              className="group bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors shrink-0 mb-3">
                <i className={`${service.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {service.description}
              </p>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
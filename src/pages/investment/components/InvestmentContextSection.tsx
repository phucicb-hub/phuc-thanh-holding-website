import { useTranslation } from 'react-i18next';
import RevealStagger from '@/components/base/RevealStagger';

const drivers = [
  { icon: 'ri-speed-up-line', labelKey: 'investment.driver1' },
  { icon: 'ri-route-line', labelKey: 'investment.driver2' },
  { icon: 'ri-stack-line', labelKey: 'investment.driver3' },
  { icon: 'ri-tools-line', labelKey: 'investment.driver4' },
  { icon: 'ri-bar-chart-box-line', labelKey: 'investment.driver5' },
  { icon: 'ri-seedling-line', labelKey: 'investment.driver6' },
];

export default function InvestmentContextSection() {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-lightbulb-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('investment.contextBadge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('investment.contextTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-4">
              {t('investment.contextP1')}
            </p>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('investment.contextP2')}
            </p>
          </div>

          <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {drivers.map((driver) => (
              <div
                key={driver.labelKey}
                className="flex flex-col items-center text-center p-4 md:p-5 bg-background-100 border border-background-200/70 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-2 md:mb-3">
                  <i className={`${driver.icon} w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-lg`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground-800">
                  {t(driver.labelKey)}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
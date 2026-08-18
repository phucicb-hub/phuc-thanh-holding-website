import { useTranslation } from 'react-i18next';
import { digitalPrinciples } from '@/mocks/digital';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function DigitalPrinciplesSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('digital.principlesTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('digital.principlesDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {digitalPrinciples[lang].map((principle) => (
            <div
              key={principle.id}
              className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                <i className={`${principle.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <div>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-1.5">
                  {principle.title}
                </h3>
                <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
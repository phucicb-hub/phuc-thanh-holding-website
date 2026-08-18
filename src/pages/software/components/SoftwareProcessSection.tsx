import { useTranslation } from 'react-i18next';
import { softwareStages } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function SoftwareProcessSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section id="quy-trinh" className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-flow-chart w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.processTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.processDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {softwareStages[lang].map((stage) => (
            <div
              key={stage.id}
              className="relative bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                  <span className="text-sm font-bold">{stage.id}</span>
                </div>
                <span className="text-xs font-bold text-foreground-400 tracking-wider">
                  {t('software.processStage', { stage: stage.id })}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {stage.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed mb-3">
                {stage.description}
              </p>
              <ul className="space-y-1 mt-auto">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-xs text-foreground-700">
                    <i className="ri-check-line w-3.5 h-3.5 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
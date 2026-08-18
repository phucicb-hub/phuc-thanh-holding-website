import { useTranslation } from 'react-i18next';
import { digitalRoadmap } from '@/mocks/digital';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function DigitalRoadmapSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section id="lo-trinh" className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('digital.roadmapTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('digital.roadmapDesc')}
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-background-200" />
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {digitalRoadmap[lang].map((step) => (
              <div key={step.id} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 border-4 border-background-100 mb-4">
                  <i className={`${step.icon} w-6 h-6 flex items-center justify-center text-xl`} />
                </div>
                <span className="text-[10px] font-bold text-foreground-400 mb-1.5">
                  {t('common.step', { step: step.id })}
                </span>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-foreground-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
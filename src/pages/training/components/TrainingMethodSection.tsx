import { useTranslation } from 'react-i18next';
import { trainingSteps } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function TrainingMethodSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.methodTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('training.methodDesc')}
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[28px] left-[8%] right-[8%] h-0.5 bg-primary-200" />

            <RevealStagger className="grid grid-cols-6 gap-4">
              {trainingSteps[lang].map((step) => (
                <div key={step.id} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-primary-600 text-white text-sm font-bold border-4 border-background-50 mb-4">
                    {String(step.id).padStart(2, '0')}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-xs text-foreground-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>

        {/* Mobile/Tablet vertical */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-primary-200" />
            <RevealStagger className="space-y-6">
              {trainingSteps[lang].map((step) => (
                <div key={step.id} className="relative flex gap-4">
                  <div className="absolute left-[-8px] top-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold border-2 border-background-50 shrink-0">
                    {step.id}
                  </div>
                  <div className="pl-6">
                    <h3 className="text-sm font-semibold text-foreground-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-foreground-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>

        <p className="text-center text-xs text-foreground-500 mt-8 md:mt-10">
          {t('training.methodNote')}
        </p>
      </div>
    </section>
  );
}
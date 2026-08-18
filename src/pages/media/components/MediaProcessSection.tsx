import { useTranslation } from 'react-i18next';
import { mediaProcess } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function MediaProcessSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section id="quy-trinh" className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.processTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.processDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {mediaProcess[lang].map((step) => (
            <div
              key={step.id}
              className="relative bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                  <i className={`${step.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>
                <span className="text-xs font-bold text-foreground-400">
                  {t('common.step', { step: step.id })}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
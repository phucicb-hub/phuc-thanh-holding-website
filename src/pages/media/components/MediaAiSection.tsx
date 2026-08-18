import { useTranslation } from 'react-i18next';
import { mediaAiCan, mediaAiMust } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function MediaAiSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-robot-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('media.aiBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.aiTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.aiDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5 mb-6">
          <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-cpu-line w-5 h-5 flex items-center justify-center text-accent-600" />
              <h3 className="text-sm md:text-base font-semibold text-foreground-900">
                {t('media.aiCanTitle')}
              </h3>
            </div>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mediaAiCan[lang].map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 text-xs md:text-sm text-foreground-700 leading-relaxed"
                >
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-500 shrink-0 mt-0.5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </RevealStagger>
          </div>

          <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <i className="ri-user-star-line w-5 h-5 flex items-center justify-center text-primary-600" />
              <h3 className="text-sm md:text-base font-semibold text-foreground-900">
                {t('media.aiMustTitle')}
              </h3>
            </div>
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {mediaAiMust[lang].map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 text-xs md:text-sm text-foreground-700 leading-relaxed"
                >
                  <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-primary-500 shrink-0 mt-0.5" />
                  <span>{item.label}</span>
                </div>
              ))}
            </RevealStagger>
          </div>
        </div>

        <div className="bg-accent-50 border border-accent-100 rounded-lg p-5 md:p-6">
          <div className="flex items-start gap-3">
            <i className="ri-shield-keyhole-line w-5 h-5 flex items-center justify-center text-accent-700 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-foreground-800 leading-relaxed">
              {t('media.aiNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
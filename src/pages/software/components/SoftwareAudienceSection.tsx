import { useTranslation } from 'react-i18next';
import { softwareAudience } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function SoftwareAudienceSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-group-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.audienceTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.audienceDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {softwareAudience[lang].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3.5 bg-background-50 border border-background-200/70 rounded-lg p-4 md:p-5 hover:border-primary-300 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-lg" />
              </div>
              <span className="text-sm md:text-base text-foreground-900 font-medium leading-snug">
                {item}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
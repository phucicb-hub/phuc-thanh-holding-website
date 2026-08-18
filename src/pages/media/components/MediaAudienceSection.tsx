import { useTranslation } from 'react-i18next';
import { mediaAudience } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function MediaAudienceSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.audienceTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.audienceDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {mediaAudience[lang].map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-4 md:p-5 bg-background-50 border border-background-200/70 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                <i className={`${item.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <span className="text-sm text-foreground-700 leading-relaxed">
                {item.label}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
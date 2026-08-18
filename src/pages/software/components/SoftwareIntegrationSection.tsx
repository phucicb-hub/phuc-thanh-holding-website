import { useTranslation } from 'react-i18next';
import { softwareIntegrations } from '@/mocks/software';
import useLang from '@/hooks/useLang';

export default function SoftwareIntegrationSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="max-w-3xl mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-link w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.integrationTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.integrationDesc')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 md:gap-3 mb-6">
          {softwareIntegrations[lang].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm bg-background-50 border border-background-200/70 rounded-full text-foreground-800 hover:border-primary-300 transition-colors whitespace-nowrap"
            >
              <i className="ri-plug-line w-3.5 h-3.5 flex items-center justify-center text-primary-600" />
              {item}
            </span>
          ))}
        </div>

        <p className="flex items-start gap-2 text-xs md:text-sm text-foreground-600 leading-relaxed max-w-3xl">
          <i className="ri-information-line w-4 h-4 flex items-center justify-center text-accent-600 shrink-0 mt-0.5" />
          {t('software.integrationNote')}
        </p>
      </div>
    </section>
  );
}
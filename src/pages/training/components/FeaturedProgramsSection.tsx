import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function FeaturedProgramsSection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-12 md:py-16 bg-primary-50">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.featuredTitle')}
          </h2>
          <div className="flex flex-col items-center gap-4 py-8 md:py-10">
            <i className="ri-calendar-event-line w-10 h-10 flex items-center justify-center text-2xl text-foreground-400" />
            <p className="text-base md:text-lg font-medium text-foreground-700">
              {t('training.featuredUpdating')}
            </p>
            <p className="text-sm text-foreground-600 max-w-lg leading-relaxed">
              {t('training.featuredNote')}
            </p>
            <a
              href={getLocalizedPath('contact', lang)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-600 text-background-50 rounded-md hover:bg-primary-700 transition-colors whitespace-nowrap mt-2"
            >
              {t('common.contactConsult')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
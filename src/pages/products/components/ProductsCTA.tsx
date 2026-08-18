import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function ProductsCTA() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="tu-van" className="scroll-mt-24 py-10 md:py-14 bg-background-50">
      <div className="container-main">
        <div className="bg-primary-700 rounded-xl px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              {t('products.ctaTitle')}
            </h2>
            <p className="text-sm md:text-base text-background-200">
              {t('products.ctaDesc')}
            </p>
          </div>
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-foreground-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('nav.contactCta')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
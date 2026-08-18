import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import Reveal from '@/components/base/Reveal';

export default function OverviewCTA() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="lien-he" className="py-14 md:py-20 bg-background-100 scroll-mt-24">
      <div className="container-main">
        <Reveal>
        <div className="relative bg-primary-800 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                {t('overview.ctaTitle')}
              </h2>
              <p className="text-sm md:text-base text-background-200 leading-relaxed mb-4">
                {t('overview.ctaDesc')}
              </p>
              <div className="inline-flex items-start gap-2 text-sm text-background-200">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mt-0.5 text-accent-400" />
                <span>
                  {t('overview.ctaAddress')}
                </span>
              </div>
            </div>
            <a
              href={getLocalizedPath('contact', lang)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.contactCta')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
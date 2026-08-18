import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function MediaCTASection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-14 md:py-20 bg-primary-900">
      <div className="container-main">
        <div className="relative rounded-xl overflow-hidden">
          <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 text-center">
            <h2 className="text-xl md:text-3xl font-bold text-white mb-4">
              {t('media.ctaTitle')}
            </h2>
            <p className="text-sm md:text-base text-background-200 leading-relaxed max-w-3xl mx-auto mb-3">
              {t('media.ctaDesc')}
            </p>
            <p className="text-sm md:text-base text-background-200 leading-relaxed max-w-3xl mx-auto mb-8">
              {t('media.ctaP2')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 flex-wrap">
              <a
                href={getLocalizedPath('contact', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
              >
                {t('media.requestConsult')}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
              <a
                href={getLocalizedPath('contact', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
              >
                {t('media.sendProposal')}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
              <a
                href={getLocalizedPath('projects', lang)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
              >
                {t('media.viewProfile')}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-background-200 flex-wrap">
              <div className="flex items-center gap-2">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <span>0343 089 666</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <a
                  href="mailto:phucthanhholding@gmail.com"
                  className="hover:text-accent-400 transition-colors"
                >
                  phucthanhholding@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <span>{t('common.workingHours')}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-accent-400" />
                <span>{t('media.address')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
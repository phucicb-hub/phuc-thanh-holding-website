import { useTranslation } from 'react-i18next';
import { corporateTrainingForms } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function CorporateTrainingSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-building-4-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('training.corporateBadge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('training.corporateTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-5">
              {t('training.corporateDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {corporateTrainingForms[lang].map((form) => (
                <div
                  key={form}
                  className="flex items-center gap-2 text-sm text-foreground-700 bg-background-100 border border-background-200/60 rounded-md px-3 py-2"
                >
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 shrink-0" />
                  {form}
                </div>
              ))}
            </div>

            <a
              href={getLocalizedPath('contact', lang)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
            >
              {t('training.proposeCorporateProgram')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative w-full h-[240px] md:h-[360px] rounded-xl overflow-hidden bg-primary-100">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20corporate%20training%20workshop%20in%20a%20bright%20modern%20office%20meeting%20room%2C%20diverse%20business%20team%20engaged%20in%20collaborative%20learning%20session%20with%20laptops%20and%20materials%20on%20table%2C%20warm%20natural%20daylight%2C%20subtle%20emerald%20green%20and%20gold%20color%20tones%2C%20authentic%20corporate%20photography%2C%20soft%20depth%20of%20field%2C%20clean%20modern%20interior&width=900&height=600&seq=training-corporate-1&orientation=landscape"
                alt={t('training.corporateImageAlt')}
                title={t('training.corporateImageTitle')}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function ProductsHero() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="relative w-full overflow-hidden bg-primary-900">
      {/* Background image */}
      <img
        src="https://readdy.ai/api/search-image?query=Abstract%20dark%20emerald%20green%20technology%20background%20with%20glowing%20network%20nodes%20and%20connection%20lines%2C%20data%20grid%20pattern%2C%20floating%20geometric%20shapes%2C%20digital%20particles%2C%20futuristic%20enterprise%20digital%20solutions%20concept%2C%20deep%20green%20tones%20with%20subtle%20yellow%20light%20accents%2C%20clean%20minimalist%20corporate%20style%2C%20high%20detail&width=1600&height=420&seq=products-hero-1&orientation=landscape"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      {/* Dark green overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/85 to-primary-800/70" />

      <div className="relative z-10 container-main py-10 md:py-16 flex flex-col justify-center min-h-[260px] md:min-h-[340px]">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs md:text-sm mb-4" aria-label="Breadcrumb">
          <a
            href={getLocalizedPath('home', lang)}
            className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            {t('common.home')}
          </a>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-accent-400 font-medium whitespace-nowrap">{t('products.breadcrumb')}</span>
        </nav>

        <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          {t('products.heroTitle')}
        </h1>

        <p className="text-sm md:text-base text-background-200 max-w-2xl mb-6 leading-relaxed">
          {t('products.heroDesc')}
        </p>

        <div>
          <a
            href="#tu-van"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-accent-500 text-foreground-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('products.consultCta')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
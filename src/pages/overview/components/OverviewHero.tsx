import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function OverviewHero() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="relative w-full overflow-hidden bg-primary-950">
      <img
        src="https://readdy.ai/api/search-image?query=Abstract%20modern%20technology%20background%20with%20glowing%20network%20connection%20nodes%20and%20flowing%20data%20lines%20forming%20elegant%20geometric%20patterns%2C%20deep%20emerald%20green%20gradient%20with%20subtle%20warm%20golden%20light%20accents%2C%20floating%20digital%20particles%2C%20symbolizes%20enterprise%20connectivity%20and%20sustainable%20growth%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=640&seq=overview-hero-1&orientation=landscape"
        alt="Phúc Thành Holding - Tổng quan và Hồ sơ Năng lực Doanh nghiệp"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/85 to-primary-800/70" />

      <div className="relative z-10 container-main py-16 md:py-24 flex flex-col justify-center min-h-[400px] md:min-h-[560px]">
        <nav className="flex items-center gap-1.5 text-xs md:text-sm mb-5" aria-label="Breadcrumb">
          <a
            href={getLocalizedPath('home', lang)}
            className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            {t('common.home')}
          </a>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-background-200 whitespace-nowrap">{t('overview.breadcrumbAbout')}</span>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-accent-400 font-medium whitespace-nowrap">{t('overview.breadcrumbOverview')}</span>
        </nav>

        <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
          <i className="ri-flag-line w-3.5 h-3.5 flex items-center justify-center" />
          {t('overview.badge')}
        </span>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight max-w-3xl">
          {t('overview.heroTitle')}
        </h1>

        <p className="text-sm md:text-lg text-background-200 max-w-2xl mb-8 leading-relaxed">
          {t('overview.heroDesc')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="#linh-vuc"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('overview.exploreFields')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
          <a
            href="#lien-he"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold border-2 border-background-50/40 text-white rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
          >
            {t('nav.contactCta')}
          </a>
        </div>
      </div>
    </section>
  );
}
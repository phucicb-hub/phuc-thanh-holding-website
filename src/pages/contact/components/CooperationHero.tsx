import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function CooperationHero() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="relative w-full overflow-hidden bg-primary-900">
      <img
        src="https://readdy.ai/api/search-image?query=Professional%20corporate%20team%20of%20business%20colleagues%20collaborating%20around%20a%20modern%20conference%20table%20in%20a%20bright%20contemporary%20office%2C%20reviewing%20project%20documents%20and%20a%20digital%20screen%2C%20warm%20natural%20window%20light%2C%20subtle%20emerald%20green%20and%20warm%20gold%20color%20tones%2C%20editorial%20corporate%20photography%2C%20authentic%20candid%20working%20atmosphere%2C%20sharp%20focus%2C%20high%20detail&width=1600&height=600&seq=contact-hero-1&orientation=landscape&nocache=true"
        alt="Phuc Thanh Holding - Hợp tác và đầu tư chiến lược"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/85 to-primary-800/70" />

      {/* Decorative geometric accents */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent-500/10 blur-2xl" />
      <div className="absolute right-16 bottom-10 w-40 h-40 rounded-full border border-accent-500/20" />
      <div className="absolute right-40 top-16 w-2 h-2 rounded-full bg-accent-400" />
      <div className="absolute left-1/3 bottom-24 w-1.5 h-1.5 rounded-full bg-accent-400/70" />

      <div className="relative z-10 container-main py-12 md:py-16 flex flex-col justify-center min-h-[400px] md:min-h-[500px]">
        <nav
          className="flex items-center gap-1.5 text-xs md:text-sm mb-5 flex-wrap"
          aria-label="Breadcrumb"
        >
          <a
            href={getLocalizedPath('home', lang)}
            className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            {t('common.home')}
          </a>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-accent-400 font-medium whitespace-nowrap">{t('contact.breadcrumb')}</span>
        </nav>

        <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
          <i className="ri-community-line w-3.5 h-3.5 flex items-center justify-center" />
          {t('contact.badge')}
        </span>

        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight max-w-3xl">
          {t('contact.heroTitle')}
        </h1>

        <p className="text-sm md:text-base text-background-200 max-w-2xl mb-8 leading-relaxed">
          {t('contact.heroDesc')}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="#gui-de-xuat"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('contact.sendProposal')}
            <i className="ri-arrow-down-line w-4 h-4 flex items-center justify-center" />
          </a>
          <a
            href="#linh-vuc-hop-tac"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
          >
            {t('contact.viewFields')}
            <i className="ri-arrow-down-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function InvestmentHero() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="relative w-full overflow-hidden bg-primary-900">
      <img
        src="https://readdy.ai/api/search-image?query=Dark%20emerald%20green%20corporate%20background%20with%20abstract%20investment%20and%20technology%20concept%2C%20an%20ascending%20golden%20financial%20growth%20chart%20merging%20into%20a%20glowing%20digital%20network%20of%20connected%20nodes%20and%20circuit%20patterns%2C%20subtle%20rising%20arrows%20and%20coin-like%20dots%20representing%20long-term%20value%2C%20deep%20green%20and%20gold%20color%20palette%2C%20cinematic%20soft%20lighting%2C%20professional%20editorial%20aesthetic%2C%20high%20detail%2C%20harmonious%20composition&width=1600&height=600&seq=investment-hero-1&orientation=landscape"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/85 to-primary-800/70" />

      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent-500/10 blur-2xl" />
      <div className="absolute right-24 bottom-12 w-40 h-40 rounded-full border border-accent-500/20" />
      <div className="absolute right-48 top-20 w-2 h-2 rounded-full bg-accent-400" />
      <div className="absolute left-1/3 bottom-28 w-1.5 h-1.5 rounded-full bg-accent-400/70" />

      <div className="relative z-10 container-main py-12 md:py-16 flex flex-col justify-center min-h-[430px] md:min-h-[520px]">
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
          <a
            href={getLocalizedPath('fields', lang)}
            className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            {t('fields.title')}
          </a>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-accent-400 font-medium whitespace-nowrap">
            {t('investment.title')}
          </span>
        </nav>

        <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
          <i className="ri-lightbulb-flash-line w-3.5 h-3.5 flex items-center justify-center" />
          {t('investment.badge')}
        </span>

        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight max-w-3xl">
          {t('investment.title')}
        </h1>

        <p className="text-lg md:text-xl font-semibold text-accent-400 mb-4 max-w-3xl">
          {t('investment.subtitle')}
        </p>

        <p className="text-sm md:text-base text-background-200 max-w-2xl mb-8 leading-relaxed">
          {t('investment.desc')}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="#quy-trinh"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('investment.viewDirection')}
            <i className="ri-arrow-down-line w-4 h-4 flex items-center justify-center" />
          </a>
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
          >
            {t('investment.discuss')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
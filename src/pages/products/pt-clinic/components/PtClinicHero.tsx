import { useTranslation } from 'react-i18next';
import { ptClinicHero, ptClinicHeroImage } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function PtClinicHero() {
  const { t } = useTranslation();
  const lang = useLang();
  const hero = ptClinicHero[lang];

  return (
    <section className="relative w-full overflow-hidden bg-primary-900">
      <img
        src={ptClinicHeroImage}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-900/85 to-primary-800/70" />

      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent-500/10 blur-2xl" />
      <div className="absolute right-24 bottom-12 w-40 h-40 rounded-full border border-accent-500/20" />
      <div className="absolute right-48 top-20 w-2 h-2 rounded-full bg-accent-400" />
      <div className="absolute left-1/3 bottom-28 w-1.5 h-1.5 rounded-full bg-accent-400/70" />

      <div className="relative z-10 container-main py-12 md:py-16 flex flex-col justify-center min-h-[430px] md:min-h-[540px]">
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
            href={getLocalizedPath('products', lang)}
            className="text-background-200 hover:text-accent-400 transition-colors whitespace-nowrap"
          >
            {t('products.breadcrumb')}
          </a>
          <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-background-300" />
          <span className="text-accent-400 font-medium whitespace-nowrap">
            {hero.title}
          </span>
        </nav>

        <span className="inline-flex items-center gap-2 self-start px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
          <i className="ri-stethoscope-line w-3.5 h-3.5 flex items-center justify-center" />
          {hero.badge}
        </span>

        <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight max-w-3xl">
          {hero.title}
        </h1>

        <p className="text-lg md:text-xl font-semibold text-accent-400 mb-4 max-w-3xl">
          {hero.subtitle}
        </p>

        <p className="text-sm md:text-base text-background-200 max-w-2xl mb-8 leading-relaxed">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {hero.primaryCta}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
          >
            {hero.secondaryCta}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
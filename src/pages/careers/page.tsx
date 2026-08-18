import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useTranslation } from 'react-i18next';
import { jobOpenings, benefits } from '@/mocks/careers';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function Careers() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('careers.badge')}
          badgeIcon="ri-briefcase-line"
          title={t('careers.title')}
          description={t('careers.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('careers.title') }]}
          image="https://readdy.ai/api/search-image?query=Modern%20diverse%20professional%20team%20collaboration%20in%20bright%20office%20environment%2C%20abstract%20representation%20with%20connected%20people%20and%20technology%2C%20emerald%20green%20and%20warm%20golden%20tones%2C%20corporate%20culture%20concept%2C%20clean%20editorial%20style&width=1600&height=600&seq=careers-hero-1&orientation=landscape"
        />

        {/* Benefits */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
                <i className="ri-heart-line w-3.5 h-3.5 flex items-center justify-center" />
                {t('careers.whyBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
                {t('careers.whyTitle')}
              </h2>
              <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                {t('careers.whyDesc')}
              </p>
            </div>

            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {benefits[lang].map((benefit) => (
                <div
                  key={benefit.id}
                  className="group bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                    <i className={`${benefit.icon} w-6 h-6 flex items-center justify-center text-xl`} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </RevealStagger>
          </div>
        </section>

        {/* Job openings */}
        <section className="py-12 md:py-16 bg-background-100">
          <div className="container-main">
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
                <i className="ri-user-search-line w-3.5 h-3.5 flex items-center justify-center" />
                {t('careers.openingsBadge')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
                {t('careers.openingsTitle')}
              </h2>
              <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                {t('careers.openingsDesc')}
              </p>
            </div>

            <RevealStagger className="space-y-4 max-w-4xl mx-auto">
              {jobOpenings[lang].map((job) => (
                <article
                  key={job.id}
                  className="group bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <h3 className="text-base md:text-lg font-semibold text-foreground-900 group-hover:text-primary-700 transition-colors">
                      {job.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 self-start px-3 py-1 text-xs font-medium bg-accent-100 text-primary-800 rounded-full whitespace-nowrap">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-foreground-500">
                    <span className="inline-flex items-center gap-1">
                      <i className="ri-building-2-line w-4 h-4 flex items-center justify-center text-primary-600" />
                      {job.department}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-primary-600" />
                      {job.location}
                    </span>
                  </div>
                </article>
              ))}
            </RevealStagger>

            <p className="text-center text-xs text-foreground-500 mt-8">
              {t('careers.noMatchNote')}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 md:py-20 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('careers.ctaTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('careers.ctaDesc')}
                  </p>
                </div>
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap shrink-0"
                >
                  {t('careers.applyNow')}
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
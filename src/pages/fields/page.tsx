import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useTranslation } from 'react-i18next';
import { businessFieldDetails } from '@/mocks/fields';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, localizeLegacyHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function Fields() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('fields.badge')}
          badgeIcon="ri-layout-grid-line"
          title={t('fields.title')}
          description={t('fields.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('fields.title') }]}
          image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20technology%20background%20with%20interconnected%20geometric%20shapes%20and%20flowing%20data%20lines%20representing%20multiple%20business%20sectors%2C%20subtle%20golden%20light%20accents%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=fields-hero-1&orientation=landscape"
        />

        {/* Intro */}
        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main text-center max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4">
              {t('fields.introTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('fields.introDesc')}
            </p>
          </div>
        </section>

        {/* Fields */}
        <section className="py-12 md:py-16 bg-background-100">
          <div className="container-main">
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {businessFieldDetails[lang].map((field) => {
                const cardContent = (
                  <>
                    <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                      <i className={`${field.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xl`} />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                      {field.title}
                    </h3>
                    <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                      {field.description}
                    </p>
                    <ul className="space-y-1.5">
                      {field.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-start gap-2 text-sm text-foreground-700"
                        >
                          <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                    {field.href && (
                      <span className="mt-4 pt-3 border-t border-background-200 flex items-center justify-between gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                        {t('common.viewDetail')}
                        <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </>
                );

                const cardClass =
                  'group bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors';

                return field.href ? (
                  <a key={field.id} href={localizeLegacyHref(field.href as string, lang)} className={`${cardClass} block`}>
                    {cardContent}
                  </a>
                ) : (
                  <article key={field.id} className={cardClass}>
                    {cardContent}
                  </article>
                );
              })}
            </RevealStagger>

            <p className="text-center text-xs text-foreground-500 mt-8">
              {t('fields.note')}
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
                    {t('fields.ctaTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('fields.ctaDesc')}
                  </p>
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
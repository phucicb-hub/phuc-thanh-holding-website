import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useTranslation } from 'react-i18next';
import { serviceDetails } from '@/mocks/services';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, localizeLegacyHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function Services() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('services.badge')}
          badgeIcon="ri-service-line"
          title={t('services.title')}
          description={t('services.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('services.title') }]}
          image="https://readdy.ai/api/search-image?query=Abstract%20emerald%20green%20technology%20background%20with%20interconnected%20service%20icons%20and%20flowing%20data%20lines%20representing%20professional%20business%20services%2C%20subtle%20golden%20light%20accents%20and%20floating%20particles%2C%20clean%20minimalist%20corporate%20style%2C%20elegant%20professional%20composition&width=1600&height=600&seq=services-hero-1&orientation=landscape"
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main text-center max-w-3xl">
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4">
              {t('services.introTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('services.introDesc')}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-100">
          <div className="container-main">
            <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {serviceDetails[lang].map((service) => (
                <a
                  key={service.id}
                  href={localizeLegacyHref(service.href, lang)}
                  className="group bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors block"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                    <i className={`${service.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xl`} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-foreground-700">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-4 pt-3 border-t border-background-200 flex items-center justify-between gap-2 text-sm font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                    {t('common.viewDetail')}
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              ))}
            </RevealStagger>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            <div className="relative bg-primary-800 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 to-primary-900/40" />
              <div className="relative z-10 px-6 md:px-12 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="text-center lg:text-left max-w-2xl">
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                    {t('services.productsTitle')}
                  </h2>
                  <p className="text-sm md:text-base text-background-200 leading-relaxed">
                    {t('services.productsDesc')}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <a
                    href={getLocalizedPath('products', lang)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
                  >
                    {t('services.viewProducts')}
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                  </a>
                  <a
                    href={getLocalizedPath('contact', lang)}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
                  >
                    {t('nav.contactCta')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
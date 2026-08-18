import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function NotFound() {
  const location = useLocation();
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-background-50">
        <div className="container-main py-14 md:py-20">
          <div className="relative flex flex-col items-center justify-center text-center px-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] font-black text-background-200/60 select-none pointer-events-none z-0 leading-none"
            >
              404
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-6">
                <i className="ri-compass-3-line w-8 h-8 md:w-10 md:h-10 flex items-center justify-center" />
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-foreground-950">
                {t('notFound.title')}
              </h1>

              <p className="mt-3 text-sm md:text-base text-foreground-600 max-w-xl">
                {t('notFound.desc')}
              </p>

              {location.pathname && (
                <p className="mt-4 px-4 py-1.5 text-xs md:text-sm text-foreground-500 font-mono bg-background-100 border border-background-200 rounded-md">
                  {location.pathname}
                </p>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={getLocalizedPath('home', lang)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
                >
                  <i className="ri-home-4-line w-4 h-4 flex items-center justify-center" />
                  {t('notFound.backHome')}
                </a>
                <a
                  href={getLocalizedPath('sitemap', lang)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border border-background-300 text-foreground-700 rounded-md hover:bg-background-100 transition-colors whitespace-nowrap"
                >
                  <i className="ri-map-2-line w-4 h-4 flex items-center justify-center" />
                  {t('notFound.viewSitemap')}
                </a>
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
                >
                  <i className="ri-customer-service-2-line w-4 h-4 flex items-center justify-center" />
                  {t('notFound.contactSupport')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
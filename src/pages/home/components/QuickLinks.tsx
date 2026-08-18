import { useTranslation } from 'react-i18next';
import { quickLinks } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function QuickLinks() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <section className="py-8 md:py-10 bg-background-50">
      <div className="container-main">
        <RevealStagger className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {quickLinks[lang].map((item) => {
            if (item.highlight) {
              return (
                <a
                  key={item.id}
                  href={localizeLegacyHref(item.href, lang)}
                  className="relative group overflow-hidden rounded-lg col-span-2 lg:col-span-1 aspect-[16/7] lg:aspect-[16/10] block bg-accent-500 hover:bg-accent-400 transition-colors"
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-950/10 text-primary-950">
                      <i className="ri-team-line w-5 h-5 flex items-center justify-center text-xl" />
                    </span>
                    <div>
                      <div className="text-sm md:text-base font-bold text-primary-950 tracking-wide">
                        {item.title}
                      </div>
                      <div className="text-xs text-primary-950/70 mt-1">
                        {t('quicklinks.connect')}
                      </div>
                    </div>
                  </div>
                  <span className="absolute top-3 right-3 md:top-4 md:right-4 w-7 h-7 flex items-center justify-center rounded-full bg-primary-950/10 text-primary-950 group-hover:translate-x-0.5 transition-transform">
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-sm" />
                  </span>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={item.href}
                className="relative group overflow-hidden rounded-lg aspect-[16/10] block"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <h4 className="text-sm md:text-base font-semibold text-white tracking-wide">
                    {item.title}
                  </h4>
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-white text-sm" />
                </div>
              </a>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
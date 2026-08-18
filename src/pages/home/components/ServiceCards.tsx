import { useTranslation } from 'react-i18next';
import { services } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import { localizeLegacyHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function ServiceCards() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <section id="tong-quan" className="py-10 md:py-14 bg-background-100 scroll-mt-24">
      <div className="container-main">
        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {/* First 2 cards span full width on mobile, half on md */}
          {services[lang].slice(0, 2).map((service) => (
            <div
              key={service.id}
              className="md:col-span-1 bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 group hover:border-primary-300 transition-colors"
            >
              <a href={localizeLegacyHref(service.href, lang)} className="block">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 shrink-0">
                    <i className={`${service.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-primary-600 text-xl`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-3 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {service.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={localizeLegacyHref(link.href, lang)}
                            className="text-sm text-foreground-600 hover:text-primary-600 transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </a>
            </div>
          ))}

          {/* Last 3 cards */}
          {services[lang].slice(2).map((service) => (
            <div
              key={service.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 group hover:border-primary-300 transition-colors"
            >
              <a href={localizeLegacyHref(service.href, lang)} className="block">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 mb-3">
                    <i className={`${service.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-primary-600 text-xl`} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {service.title}
                  </h3>
                  <ul className="space-y-1.5 w-full">
                    {service.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-foreground-600 hover:text-primary-600 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
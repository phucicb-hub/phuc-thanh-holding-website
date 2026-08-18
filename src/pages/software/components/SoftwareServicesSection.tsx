import { useTranslation } from 'react-i18next';
import { softwareSolutions } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function SoftwareServicesSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section id="giai-phap" className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-apps-2-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.solutionsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.solutionsDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {softwareSolutions[lang].map((solution) => (
            <article
              key={solution.id}
              className="group bg-background-100 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors shrink-0 mb-3">
                  <i className={`${solution.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>

                <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-xs md:text-sm text-foreground-600 leading-relaxed mb-3">
                  {solution.description}
                </p>

                <ul className="space-y-1 mt-auto">
                  {solution.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-xs text-foreground-700"
                    >
                      <i className="ri-check-line w-3.5 h-3.5 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </RevealStagger>

        <div className="text-center mt-8 md:mt-10">
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('software.solutionsCta')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
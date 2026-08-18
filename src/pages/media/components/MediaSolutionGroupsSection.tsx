import { useTranslation } from 'react-i18next';
import { mediaSolutionGroups } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function MediaSolutionGroupsSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.servicesTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.servicesDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {mediaSolutionGroups[lang].map((group) => (
            <article
              key={group.id}
              className="group bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors shrink-0">
                  <i className={`${group.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 group-hover:text-primary-700 transition-colors">
                  {group.title}
                </h3>
              </div>

              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-foreground-600 leading-relaxed"
                  >
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
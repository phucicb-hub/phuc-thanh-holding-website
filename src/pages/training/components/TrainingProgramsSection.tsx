import { useTranslation } from 'react-i18next';
import { trainingPrograms } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function TrainingProgramsSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section id="chuong-trinh" className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.programsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('training.programsDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {trainingPrograms[lang].map((program) => (
            <article
              key={program.id}
              className="group bg-background-100 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors shrink-0">
                    <i className={`${program.icon} w-5 h-5 md:w-5 md:h-5 flex items-center justify-center text-lg`} />
                  </div>
                </div>

                <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {program.title}
                </h3>
                <p className="text-xs md:text-sm text-foreground-600 leading-relaxed mb-3">
                  {program.description}
                </p>

                <ul className="space-y-1 mb-4 flex-1">
                  {program.items.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-1.5 text-xs text-foreground-700"
                    >
                      <i className="ri-check-line w-3.5 h-3.5 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                  {program.items.length > 5 && (
                    <li className="text-xs text-foreground-500 italic pl-5">
                      {t('training.moreItems', { count: program.items.length - 5 })}
                    </li>
                  )}
                </ul>

                <button
                  type="button"
                  className="mt-auto inline-flex items-center justify-center gap-1.5 w-full px-4 py-2.5 text-xs md:text-sm font-semibold bg-primary-600 text-background-50 rounded-md hover:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  {t('training.viewProgramDirection')}
                  <i className="ri-arrow-right-line w-3.5 h-3.5 flex items-center justify-center" />
                </button>
              </div>
            </article>
          ))}
        </RevealStagger>

        <div className="text-center mt-8 md:mt-10">
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('training.requestConsult')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
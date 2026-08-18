import { useTranslation } from 'react-i18next';
import { mediaProblems } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function MediaProblemsSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-error-warning-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('media.problemsBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.problemsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.problemsDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
          {mediaProblems[lang].map((problem) => (
            <div
              key={problem.id}
              className="flex items-start gap-3 p-4 md:p-5 bg-background-100 border border-background-200/70 rounded-lg hover:border-primary-300 transition-colors"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                <i className="ri-alert-line w-4 h-4 flex items-center justify-center text-base" />
              </div>
              <span className="text-sm text-foreground-700 leading-relaxed">
                {problem.label}
              </span>
            </div>
          ))}
        </RevealStagger>

        <div className="bg-primary-50 border border-primary-100 rounded-lg p-5 md:p-6">
          <div className="flex items-start gap-3">
            <i className="ri-lightbulb-line w-5 h-5 flex items-center justify-center text-primary-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-foreground-800 leading-relaxed">
              {t('media.problemsNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
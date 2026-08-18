import { useTranslation } from 'react-i18next';
import { softwareAcceptanceCriteria, softwareAcceptanceDone } from '@/mocks/software';
import useLang from '@/hooks/useLang';

export default function SoftwareAcceptanceSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-task-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.acceptanceTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.acceptanceDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-7">
            <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-4 flex items-center gap-2">
              <i className="ri-question-line w-5 h-5 flex items-center justify-center text-primary-600" />
              {t('software.acceptanceCriteriaTitle')}
            </h3>
            <ul className="space-y-2.5">
              {softwareAcceptanceCriteria[lang].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <i className="ri-arrow-right-circle-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground-800 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-900 rounded-lg p-5 md:p-7">
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="ri-verified-badge-line w-5 h-5 flex items-center justify-center text-accent-400" />
              {t('software.acceptanceDoneTitle')}
            </h3>
            <ul className="space-y-2.5">
              {softwareAcceptanceDone[lang].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <i className="ri-checkbox-circle-fill w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-background-100 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
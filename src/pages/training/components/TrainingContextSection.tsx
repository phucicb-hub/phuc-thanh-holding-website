import { useTranslation } from 'react-i18next';
import RevealStagger from '@/components/base/RevealStagger';

const competencyGroups = [
  { icon: 'ri-briefcase-line', labelKey: 'training.group1' },
  { icon: 'ri-cpu-line', labelKey: 'training.group2' },
  { icon: 'ri-brain-line', labelKey: 'training.group3' },
  { icon: 'ri-lightbulb-line', labelKey: 'training.group4' },
  { icon: 'ri-team-line', labelKey: 'training.group5' },
  { icon: 'ri-refresh-line', labelKey: 'training.group6' },
];

export default function TrainingContextSection() {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-global-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('training.contextBadge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {t('training.contextTitle')}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-4">
              {t('training.contextP1')}
            </p>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {t('training.contextP2')}
            </p>
          </div>

          <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {competencyGroups.map((group) => (
              <div
                key={group.labelKey}
                className="flex flex-col items-center text-center p-4 md:p-5 bg-background-100 border border-background-200/70 rounded-lg hover:border-primary-300 transition-colors"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-2 md:mb-3">
                  <i className={`${group.icon} w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-lg`} />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground-800">
                  {t(group.labelKey)}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
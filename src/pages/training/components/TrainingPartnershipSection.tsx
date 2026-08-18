import { useTranslation } from 'react-i18next';
import { partnershipTypes } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

export default function TrainingPartnershipSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-14 md:py-20 bg-primary-900">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
            {t('training.partnershipTitle')}
          </h2>
          <p className="text-sm md:text-base text-background-200 leading-relaxed">
            {t('training.partnershipDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {partnershipTypes[lang].map((type) => (
            <div
              key={type}
              className="flex items-center gap-2.5 px-4 py-3 bg-primary-800/60 border border-primary-700/50 rounded-lg text-sm text-background-100"
            >
              <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0" />
              {type}
            </div>
          ))}
        </RevealStagger>

        <div className="text-center">
          <a
            href={getLocalizedPath('contact', lang)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
          >
            {t('training.sendTrainingProposal')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>
      </div>
    </section>
  );
}
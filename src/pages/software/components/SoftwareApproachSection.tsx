import { useTranslation } from 'react-i18next';
import { softwareApproaches } from '@/mocks/software';
import useLang from '@/hooks/useLang';
import Reveal from '@/components/base/Reveal';

export default function SoftwareApproachSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="max-w-3xl mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-compass-3-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('software.approachBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('software.approachTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('software.approachDesc')}
          </p>
        </div>

        <div className="space-y-4 md:space-y-5">
          {softwareApproaches[lang].map((approach, index) => (
            <Reveal key={approach.id}>
              <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-7 hover:border-primary-300 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center justify-center w-11 h-11 rounded-full bg-primary-500 text-background-50 shrink-0">
                    <span className="text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <i className={`${approach.icon} w-5 h-5 flex items-center justify-center text-primary-600`} />
                      <h3 className="text-base md:text-lg font-semibold text-foreground-900">
                        {approach.title}
                      </h3>
                    </div>
                    <p className="text-sm text-foreground-600 leading-relaxed">
                      {approach.description}
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-4 sm:pl-[60px]">
                  {approach.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-xs md:text-sm text-foreground-700">
                      <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-accent-600 mt-0.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
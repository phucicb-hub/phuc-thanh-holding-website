import { useTranslation } from 'react-i18next';
import { mediaPillars } from '@/mocks/media';
import useLang from '@/hooks/useLang';
import Reveal from '@/components/base/Reveal';

export default function MediaPillarsSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-layout-column-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('media.pillarsBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('media.pillarsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('media.pillarsDesc')}
          </p>
        </div>

        <div className="space-y-6">
          {mediaPillars[lang].map((pillar) => (
            <Reveal key={pillar.id}>
              <article className="bg-background-50 border border-background-200/70 rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                    <i className={`${pillar.icon} w-6 h-6 flex items-center justify-center text-xl`} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground-900 mb-1 tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
                      {pillar.lead}
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {pillar.groups.map((group) => (
                    <div key={group.label}>
                      <h4 className="text-sm font-semibold text-foreground-900 mb-3">
                        {group.label}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {group.items.map((item, index) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-foreground-700 leading-relaxed"
                          >
                            {group.numbered ? (
                              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 text-xs font-bold shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                            ) : (
                              <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-500 shrink-0 mt-0.5" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {pillar.note && (
                  <div className="mt-6 pt-5 border-t border-background-200">
                    <div className="flex items-start gap-3">
                      <i className="ri-information-line w-5 h-5 flex items-center justify-center text-accent-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground-600 leading-relaxed">
                        {pillar.note}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import { competencyLayers } from '@/mocks/training';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function CompetencyFrameworkSection() {
  const lang = useLang();
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-primary-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.competencyTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('training.competencyDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {competencyLayers[lang].map((layer, idx) => (
            <div
              key={layer.title}
              className={`relative rounded-xl border p-5 md:p-6 ${layer.colorClass}`}
            >
              <div className="absolute -top-3 left-5 md:left-6 px-3 py-1 text-xs font-bold bg-background-50 border border-background-200 rounded-full">
                {t('training.layer', { layer: idx + 1 })}
              </div>
              <h3 className="text-sm md:text-base font-bold mt-3 mb-4">{layer.title}</h3>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealStagger>

        <div className="mt-8 md:mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-background-50 border border-background-200/70 rounded-lg">
            <i className="ri-lightbulb-flash-line w-5 h-5 flex items-center justify-center text-accent-600" />
            <p className="text-sm text-foreground-700">
              <strong className="text-foreground-900">
                {t('training.competencyNote')}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
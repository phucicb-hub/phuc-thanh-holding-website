import {
  ptDatalakeAudienceTitle,
  ptDatalakeAudience,
  ptDatalakeValuesTitle,
  ptDatalakeValues,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeAudience() {
  const lang = useLang();
  const audienceTitle = ptDatalakeAudienceTitle[lang];
  const audience = ptDatalakeAudience[lang];
  const valuesTitle = ptDatalakeValuesTitle[lang];
  const values = ptDatalakeValues[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {audienceTitle.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {audienceTitle.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12 md:mb-16">
          {audience.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 bg-background-50 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
            >
              <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {valuesTitle.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {valuesTitle.description}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {values.map((value) => (
            <article
              key={value.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 mb-4">
                <i className={`${value.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {value.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {value.description}
              </p>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
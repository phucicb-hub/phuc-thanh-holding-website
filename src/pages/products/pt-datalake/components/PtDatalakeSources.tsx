import {
  ptDatalakeSourcesTitle,
  ptDatalakeSourceGroups,
  ptDatalakeIngestionTitle,
  ptDatalakeIngestion,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeSources() {
  const lang = useLang();
  const text = ptDatalakeSourcesTitle[lang];
  const groups = ptDatalakeSourceGroups[lang];
  const ingestionTitle = ptDatalakeIngestionTitle[lang];
  const ingestion = ptDatalakeIngestion[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {text.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {text.description}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16">
          {groups.map((group) => (
            <article
              key={group.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                  <i className={`${group.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 leading-snug">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-background-100 border border-background-200 text-foreground-700 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </RevealStagger>

        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {ingestionTitle.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {ingestionTitle.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {ingestion.map((method) => (
            <article
              key={method.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700 shrink-0">
                  <i className={`${method.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900">
                  {method.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {method.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground-700">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-secondary-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
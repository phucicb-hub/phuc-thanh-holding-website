import {
  ptDatalakeCatalogTitle,
  ptDatalakeCatalogItems,
  ptDatalakeLineageTitle,
  ptDatalakeLineageQuestions,
  ptDatalakeMasterTitle,
  ptDatalakeMasterItems,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeCatalog() {
  const lang = useLang();
  const catalog = ptDatalakeCatalogTitle[lang];
  const catalogItems = ptDatalakeCatalogItems[lang];
  const lineage = ptDatalakeLineageTitle[lang];
  const lineageQuestions = ptDatalakeLineageQuestions[lang];
  const master = ptDatalakeMasterTitle[lang];
  const masterItems = ptDatalakeMasterItems[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {catalog.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {catalog.description}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
          {catalogItems.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 bg-background-50 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
            >
              <i className="ri-information-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </RevealStagger>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4">
              {lineage.title}
            </h3>
            <p className="text-xs md:text-sm text-foreground-600 mb-4 leading-relaxed">
              {lineage.description}
            </p>
            <ul className="space-y-2.5">
              {lineageQuestions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-700">
                  <i className="ri-question-line w-4 h-4 flex items-center justify-center text-secondary-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4">
              {master.title}
            </h3>
            <p className="text-xs md:text-sm text-foreground-600 mb-4 leading-relaxed">
              {master.description}
            </p>
            <ul className="space-y-2.5">
              {masterItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-700">
                  <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
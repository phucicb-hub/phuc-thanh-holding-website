import {
  ptDatalakeIslandsTitle,
  ptDatalakeSourceSystems,
  ptDatalakeFlow,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';

export default function PtDatalakeIslands() {
  const lang = useLang();
  const text = ptDatalakeIslandsTitle[lang];
  const sources = ptDatalakeSourceSystems[lang];
  const flow = ptDatalakeFlow[lang];

  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {text.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {text.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
          {sources.map((source) => (
            <span
              key={source}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-background-100 border border-background-200 text-foreground-700 rounded-full whitespace-nowrap"
            >
              <i className="ri-git-repository-line w-3.5 h-3.5 flex items-center justify-center text-secondary-600" />
              {source}
            </span>
          ))}
        </div>

        <div className="bg-primary-900 rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {flow.map((step, idx) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-medium bg-primary-800 text-background-100 rounded-full whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-primary-950 text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </span>
                {idx < flow.length - 1 && (
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center text-accent-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
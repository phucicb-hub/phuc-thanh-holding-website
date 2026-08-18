import { ptLmsRoadmapTitle, ptLmsRoadmap } from '@/mocks/ptlms';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtLmsRoadmap() {
  const lang = useLang();
  const text = ptLmsRoadmapTitle[lang];
  const roadmap = ptLmsRoadmap[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {roadmap.map((phase) => (
            <article
              key={phase.id}
              className="relative bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent-500 text-primary-950 text-sm font-bold shrink-0">
                  {phase.id}
                </span>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900">
                  {phase.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground-700">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
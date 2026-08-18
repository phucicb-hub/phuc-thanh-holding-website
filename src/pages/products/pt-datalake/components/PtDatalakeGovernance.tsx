import { ptDatalakeGovernanceTitle, ptDatalakePrinciples } from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeGovernance() {
  const lang = useLang();
  const text = ptDatalakeGovernanceTitle[lang];
  const principles = ptDatalakePrinciples[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {principles.map((item, idx) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-background-50 border border-background-200/70 rounded-lg p-4 md:p-5"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent-100 text-accent-700 text-sm font-bold shrink-0">
                {idx + 1}
              </span>
              <p className="text-sm md:text-base text-foreground-800 leading-relaxed">{item}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
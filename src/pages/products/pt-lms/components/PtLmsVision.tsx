import { ptLmsVision, ptLmsQuestions, ptLmsCycle } from '@/mocks/ptlms';
import useLang from '@/hooks/useLang';

export default function PtLmsVision() {
  const lang = useLang();
  const text = ptLmsVision[lang];
  const questions = ptLmsQuestions[lang];
  const cycle = ptLmsCycle[lang];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
          {questions.map((q) => (
            <div
              key={q.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-700 text-sm font-bold mb-3">
                {q.id}
              </span>
              <p className="text-sm font-medium text-foreground-900 leading-relaxed">
                {q.question}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary-900 rounded-xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {cycle.map((step, idx) => (
              <div key={step} className="flex items-center gap-2 md:gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-medium bg-primary-800 text-background-100 rounded-full whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent-500 text-primary-950 text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </span>
                {idx < cycle.length - 1 && (
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
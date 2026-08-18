import { ptDatalakeUseCasesTitle, ptDatalakeUseCases } from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeUseCases() {
  const lang = useLang();
  const text = ptDatalakeUseCasesTitle[lang];
  const useCases = ptDatalakeUseCases[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {useCases.map((useCase) => (
            <article
              key={useCase.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 mb-4">
                <i className={`${useCase.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {useCase.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {useCase.description}
              </p>
            </article>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
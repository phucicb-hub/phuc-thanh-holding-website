import { ptClinicOperationsTitle, ptClinicOperations } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtClinicOperations() {
  const lang = useLang();
  const text = ptClinicOperationsTitle[lang];
  const operations = ptClinicOperations[lang];

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

        <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {operations.map((operation) => (
            <article
              key={operation.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <i className={`${operation.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {operation.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed mb-4">
                {operation.description}
              </p>
              <ul className="mt-auto space-y-2">
                {operation.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground-700">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
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
import { ptClinicPhilosophyTitle, ptClinicPhilosophy } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtClinicPhilosophy() {
  const lang = useLang();
  const text = ptClinicPhilosophyTitle[lang];
  const philosophy = ptClinicPhilosophy[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {philosophy.map((item) => (
            <div
              key={item.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-6 text-center hover:border-primary-300 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mx-auto mb-4">
                <i className={`${item.icon} w-5 h-5 flex items-center justify-center text-xl`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
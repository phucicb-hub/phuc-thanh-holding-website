import { ptClinicAi, ptClinicAiCapabilities, ptClinicAiLimits } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';

export default function PtClinicAi() {
  const lang = useLang();
  const text = ptClinicAi[lang];
  const capabilities = ptClinicAiCapabilities[lang];
  const limits = ptClinicAiLimits[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-brain-line w-3.5 h-3.5 flex items-center justify-center" />
              AI
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {text.title}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-6">
              {text.description}
            </p>

            <h3 className="text-sm font-semibold text-foreground-900 mb-3">
              {lang === 'vi' ? 'AI không được tự động' : 'AI must not automatically'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {limits.map((limit) => (
                <span
                  key={limit}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm bg-secondary-100 text-secondary-900 rounded-full whitespace-nowrap"
                >
                  <i className="ri-close-circle-line w-3.5 h-3.5 flex items-center justify-center" />
                  {limit}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {capabilities.map((capability) => (
              <div
                key={capability}
                className="flex items-start gap-2.5 bg-background-50 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
              >
                <i className="ri-sparkling-line w-4 h-4 flex items-center justify-center text-accent-600 mt-0.5 shrink-0" />
                {capability}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
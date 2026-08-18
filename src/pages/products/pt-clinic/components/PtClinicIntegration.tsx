import { ptClinicIntegration, ptClinicIntegrations } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';

export default function PtClinicIntegration() {
  const lang = useLang();
  const text = ptClinicIntegration[lang];
  const integrations = ptClinicIntegrations[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {text.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-6">
            {text.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {integrations.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm bg-background-50 border border-background-200/70 text-foreground-700 rounded-full whitespace-nowrap"
            >
              <i className="ri-plug-line w-3.5 h-3.5 flex items-center justify-center text-primary-600" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
import { ptClinicFeaturesTitle, ptClinicFeatures } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtClinicFeatures() {
  const lang = useLang();
  const text = ptClinicFeaturesTitle[lang];
  const features = ptClinicFeatures[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 shrink-0">
                  <i className={`${feature.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 leading-snug">
                  {feature.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {feature.items.map((item) => (
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
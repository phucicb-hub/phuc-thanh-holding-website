import {
  ptDatalakeLayersTitle,
  ptDatalakeLayers,
  ptDatalakeLakehouseTitle,
  ptDatalakeLakehouseFeatures,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeLayers() {
  const lang = useLang();
  const text = ptDatalakeLayersTitle[lang];
  const layers = ptDatalakeLayers[lang];
  const lakehouse = ptDatalakeLakehouseTitle[lang];
  const lakehouseFeatures = ptDatalakeLakehouseFeatures[lang];

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
          {layers.map((layer) => (
            <article
              key={layer.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors flex flex-col"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 mb-4">
                <i className={`${layer.icon} w-5 h-5 flex items-center justify-center text-lg`} />
              </div>
              <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-2">
                {layer.title}
              </h3>
              <p className="text-xs md:text-sm text-foreground-600 mb-3 leading-relaxed">
                {layer.description}
              </p>
              <ul className="space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs md:text-sm text-foreground-700">
                    <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-600 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </RevealStagger>

        <div className="mt-12 md:mt-16 bg-primary-900 rounded-xl p-6 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-3 tracking-tight">
              {lakehouse.title}
            </h3>
            <p className="text-sm md:text-base text-background-200 leading-relaxed">
              {lakehouse.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {lakehouseFeatures.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs md:text-sm font-medium bg-primary-800 text-background-100 rounded-full whitespace-nowrap"
              >
                <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-accent-400" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
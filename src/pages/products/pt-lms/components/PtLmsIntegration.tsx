import {
  ptLmsIntegration,
  ptLmsIntegrations,
  ptLmsModelsTitle,
  ptLmsModels,
} from '@/mocks/ptlms';
import useLang from '@/hooks/useLang';

export default function PtLmsIntegration() {
  const lang = useLang();
  const integration = ptLmsIntegration[lang];
  const integrations = ptLmsIntegrations[lang];
  const modelsTitle = ptLmsModelsTitle[lang];
  const models = ptLmsModels[lang];

  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
              {integration.title}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-6">
              {integration.description}
            </p>
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

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
              {modelsTitle.title}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed mb-6">
              {modelsTitle.description}
            </p>
            <div className="space-y-4">
              {models.map((model) => (
                <div
                  key={model.id}
                  className="flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-lg p-5"
                >
                  <div className="w-11 h-11 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                    <i className={`${model.icon} w-5 h-5 flex items-center justify-center text-lg`} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-1">
                      {model.title}
                    </h3>
                    <p className="text-xs md:text-sm text-foreground-600 leading-relaxed">
                      {model.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
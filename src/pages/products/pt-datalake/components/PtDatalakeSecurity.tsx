import {
  ptDatalakeSecurityTitle,
  ptDatalakeSecurityMeasures,
  ptDatalakePrivacyTitle,
  ptDatalakePrivacyItems,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeSecurity() {
  const lang = useLang();
  const security = ptDatalakeSecurityTitle[lang];
  const measures = ptDatalakeSecurityMeasures[lang];
  const privacy = ptDatalakePrivacyTitle[lang];
  const privacyItems = ptDatalakePrivacyItems[lang];

  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {security.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {security.description}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-12 md:mb-16">
          {measures.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 bg-background-50 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
            >
              <i className="ri-shield-keyhole-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </RevealStagger>

        <div className="bg-primary-900 rounded-xl p-6 md:p-10">
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
            <h3 className="text-lg md:text-2xl font-bold text-white mb-3 tracking-tight">
              {privacy.title}
            </h3>
            <p className="text-sm md:text-base text-background-200 leading-relaxed">
              {privacy.description}
            </p>
          </div>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {privacyItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 bg-primary-800 rounded-lg p-4 text-sm text-background-100"
              >
                <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
                {item}
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
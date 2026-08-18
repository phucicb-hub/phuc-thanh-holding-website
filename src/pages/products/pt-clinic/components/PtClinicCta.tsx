import { ptClinicCta } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

export default function PtClinicCta() {
  const lang = useLang();
  const cta = ptClinicCta[lang];

  return (
    <section className="py-14 md:py-20 bg-primary-900">
      <div className="container-main">
        <div className="px-6 md:px-12 py-12 md:py-16">
            <div className="text-center">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-3">
                {cta.title}
              </h2>
              <p className="text-sm md:text-base text-background-200 leading-relaxed max-w-2xl mx-auto mb-8">
                {cta.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
                >
                  {cta.primaryCta}
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
                >
                  {cta.secondaryCta}
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                </a>
                <a
                  href={getLocalizedPath('contact', lang)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-semibold border border-background-50/60 text-background-50 rounded-md hover:bg-background-50/10 transition-colors whitespace-nowrap"
                >
                  {cta.tertiaryCta}
                  <i className="ri-mail-send-line w-4 h-4 flex items-center justify-center" />
                </a>
              </div>
            </div>

            <div className="border-t border-primary-700/60 pt-8">
              <h3 className="text-sm font-semibold text-white mb-4 text-center">
                {cta.contactTitle}
              </h3>
              <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-center gap-4 md:gap-8 text-sm text-background-200">
                <div className="flex items-center gap-2">
                  <i className="ri-building-4-line w-4 h-4 flex items-center justify-center text-accent-400" />
                  <span className="max-w-xs">{cta.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-accent-400" />
                  <span>{cta.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-accent-400" />
                  <a
                    href={`mailto:${cta.email}`}
                    className="hover:text-accent-400 transition-colors"
                  >
                    {cta.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-time-line w-4 h-4 flex items-center justify-center text-accent-400" />
                  <span>{cta.workingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-accent-400" />
                  <span className="max-w-xs">{cta.address}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
import {
  ptClinicSecurity,
  ptClinicSecurityMeasures,
  ptClinicLegal,
  ptClinicLegalItems,
} from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';

export default function PtClinicSecurity() {
  const lang = useLang();
  const security = ptClinicSecurity[lang];
  const measures = ptClinicSecurityMeasures[lang];
  const legal = ptClinicLegal[lang];
  const legalItems = ptClinicLegalItems[lang];

  return (
    <section className="py-12 md:py-16 bg-primary-900">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
              <i className="ri-shield-check-line w-3.5 h-3.5 flex items-center justify-center" />
              {lang === 'vi' ? 'Bảo mật' : 'Security'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
              {security.title}
            </h2>
            <p className="text-sm md:text-base text-background-200 leading-relaxed mb-6">
              {security.description}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {measures.map((measure) => (
                <li key={measure} className="flex items-start gap-2.5 text-sm text-background-200">
                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
                  {measure}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-800/60 border border-primary-700/40 rounded-lg p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              {legal.title}
            </h3>
            <p className="text-sm text-background-200 leading-relaxed mb-6">
              {legal.description}
            </p>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-background-100">
                  <i className="ri-file-shield-2-line w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
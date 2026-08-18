import {
  ptDatalakeQualityTitle,
  ptDatalakeQualityDimensions,
  ptDatalakeQualityRules,
  ptDatalakeQualityDashboard,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';

export default function PtDatalakeQuality() {
  const lang = useLang();
  const text = ptDatalakeQualityTitle[lang];
  const dimensions = ptDatalakeQualityDimensions[lang];
  const rules = ptDatalakeQualityRules[lang];
  const dashboard = ptDatalakeQualityDashboard[lang];

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

        <div className="mb-8 md:mb-10">
          <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4">
            {lang === 'vi' ? 'Các chiều kiểm soát chất lượng' : 'Quality control dimensions'}
          </h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {dimensions.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-accent-100 text-accent-900 rounded-full whitespace-nowrap"
              >
                <i className="ri-check-double-line w-3.5 h-3.5 flex items-center justify-center" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          <div className="bg-background-100 border border-background-200/70 rounded-lg p-5 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4">
              {lang === 'vi' ? 'Các quy tắc kiểm tra' : 'Validation rules'}
            </h3>
            <ul className="space-y-2.5">
              {rules.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground-700">
                  <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-primary-600 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary-900 rounded-lg p-5 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-white mb-4">
              {lang === 'vi' ? 'Dashboard chất lượng dữ liệu' : 'Data quality dashboard'}
            </h3>
            <ul className="space-y-2.5">
              {dashboard.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-background-100">
                  <i className="ri-dashboard-line w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
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
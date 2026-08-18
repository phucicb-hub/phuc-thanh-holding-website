import {
  ptDatalakeReportsTitle,
  ptDatalakeReportTypes,
  ptDatalakeMetricRequirements,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeReports() {
  const lang = useLang();
  const text = ptDatalakeReportsTitle[lang];
  const reports = ptDatalakeReportTypes[lang];
  const metrics = ptDatalakeMetricRequirements[lang];

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

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-12">
          {reports.map((item) => (
            <div
              key={item}
              className="flex items-start gap-2.5 bg-background-50 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
            >
              <i className="ri-file-chart-line w-4 h-4 flex items-center justify-center text-accent-700 mt-0.5 shrink-0" />
              {item}
            </div>
          ))}
        </RevealStagger>

        <div className="bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-8">
          <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4 text-center">
            {lang === 'vi' ? 'Mỗi chỉ tiêu cần có' : 'Every metric must have'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {metrics.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-secondary-100 text-secondary-900 rounded-full whitespace-nowrap"
              >
                <i className="ri-check-line w-3.5 h-3.5 flex items-center justify-center" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
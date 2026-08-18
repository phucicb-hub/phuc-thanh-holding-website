import { ptClinicDashboard, ptClinicDashboardMetrics } from '@/mocks/ptclinic';
import useLang from '@/hooks/useLang';

export default function PtClinicDashboard() {
  const lang = useLang();
  const text = ptClinicDashboard[lang];
  const metrics = ptClinicDashboardMetrics[lang];

  return (
    <section className="py-12 md:py-16 bg-primary-900">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest bg-accent-500/15 text-accent-400 rounded-full mb-4">
              <i className="ri-dashboard-line w-3.5 h-3.5 flex items-center justify-center" />
              {lang === 'vi' ? 'Quản trị vận hành' : 'Operations management'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
              {text.title}
            </h2>
            <p className="text-sm md:text-base text-background-200 leading-relaxed">
              {text.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics.map((metric) => (
              <div
                key={metric}
                className="flex items-start gap-2.5 bg-primary-800/60 border border-primary-700/40 rounded-lg p-4 text-sm text-background-100"
              >
                <i className="ri-line-chart-line w-4 h-4 flex items-center justify-center text-accent-400 mt-0.5 shrink-0" />
                {metric}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
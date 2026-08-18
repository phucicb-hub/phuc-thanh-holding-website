import { ptLmsProblem, ptLmsPainPoints } from '@/mocks/ptlms';
import useLang from '@/hooks/useLang';

export default function PtLmsProblem() {
  const lang = useLang();
  const text = ptLmsProblem[lang];
  const painPoints = ptLmsPainPoints[lang];

  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-alert-line w-3.5 h-3.5 flex items-center justify-center" />
              {lang === 'vi' ? 'Vấn đề hiện tại' : 'Current challenges'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-4 tracking-tight">
              {text.title}
            </h2>
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
              {text.description}
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {painPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 bg-background-100 border border-background-200/70 rounded-lg p-4 text-sm text-foreground-700"
              >
                <i className="ri-close-circle-line w-4 h-4 flex items-center justify-center text-secondary-600 mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
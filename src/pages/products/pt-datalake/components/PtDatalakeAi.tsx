import {
  ptDatalakeAiTitle,
  ptDatalakeBadData,
  ptDatalakeAiPrep,
} from '@/mocks/ptdatalake';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PtDatalakeAi() {
  const lang = useLang();
  const text = ptDatalakeAiTitle[lang];
  const badData = ptDatalakeBadData[lang];
  const prep = ptDatalakeAiPrep[lang];

  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-brain-line w-3.5 h-3.5 flex items-center justify-center" />
            {lang === 'vi' ? 'AI & dữ liệu' : 'AI & data'}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {text.title}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {text.description}
          </p>
        </div>

        <div className="mb-8 md:mb-10">
          <h3 className="text-sm md:text-base font-semibold text-foreground-900 mb-4 text-center">
            {lang === 'vi' ? 'Dữ liệu không sẵn sàng cho AI khi' : 'Data is not AI-ready when it is'}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {badData.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium bg-accent-100 text-accent-900 rounded-full whitespace-nowrap"
              >
                <i className="ri-close-circle-line w-3.5 h-3.5 flex items-center justify-center" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-primary-900 rounded-xl p-6 md:p-10">
          <h3 className="text-base md:text-lg font-semibold text-white mb-6 text-center">
            {lang === 'vi' ? 'PT-DataLake chuẩn bị dữ liệu cho AI thông qua' : 'PT-DataLake prepares data for AI through'}
          </h3>
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {prep.map((item) => (
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
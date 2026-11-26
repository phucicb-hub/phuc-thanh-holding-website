import { useTranslation } from 'react-i18next';
import { partners } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PartnersSection() {
  const { t } = useTranslation();
  const lang = useLang();
  if (partners[lang].length === 0) return null;
  return (
    <section className="py-10 md:py-14 bg-background-50">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-team-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('partners.badge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
            {t('partners.title')}
          </h2>
          <p className="text-sm text-foreground-600 mt-2 max-w-xl mx-auto">
            {t('partners.desc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {partners[lang].map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center bg-background-100 border border-background-200/70 rounded-lg px-4 py-5 hover:border-primary-300 transition-colors"
            >
              <span className="text-xs md:text-sm font-bold text-foreground-800 text-center uppercase tracking-wide">
                {partner.name}
              </span>
              <span className="text-[10px] md:text-xs text-foreground-500 text-center mt-1">
                {partner.category}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

import { useTranslation } from 'react-i18next';
import { partners } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PartnersSection() {
  const { t } = useTranslation();
  const lang = useLang();
  if (partners[lang].length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-[#f8fafc] text-[#1d1d1f] border-t border-gray-200/80">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-widest text-[#046842] bg-[#046842]/8 border border-[#046842]/20 rounded-full mb-4">
            <i className="ri-team-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('partners.badge')}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
            {t('partners.title')}
          </h2>
          <p className="text-sm text-[#4b5563] mt-2 max-w-xl mx-auto">
            {t('partners.desc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners[lang].map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center bg-white rounded-xl px-4 py-5 border border-gray-200 shadow-xs hover:border-[#046842] hover:shadow-md transition-all duration-300 group"
            >
              <span className="text-xs md:text-sm font-bold text-gray-800 group-hover:text-[#046842] text-center uppercase tracking-wide transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 text-center mt-1">
                {partner.category}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

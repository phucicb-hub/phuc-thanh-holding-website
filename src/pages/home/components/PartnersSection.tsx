import { useTranslation } from 'react-i18next';
import { partners } from '@/mocks/home';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function PartnersSection() {
  const { t } = useTranslation();
  const lang = useLang();
  if (partners[lang].length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-[#07080a] text-[#f5f5f7]">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-[#00f0b5] bg-white/[0.05] border border-white/10 rounded-full mb-4">
            <i className="ri-team-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('partners.badge')}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
            {t('partners.title')}
          </h2>
          <p className="text-sm text-[#8b949e] mt-2 max-w-xl mx-auto">
            {t('partners.desc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners[lang].map((partner) => (
            <div
              key={partner.id}
              className="flex flex-col items-center justify-center apple-glass rounded-xl px-4 py-5 border border-white/10 hover:border-[#00f0b5]/40 transition-all duration-300 group"
            >
              <span className="text-xs md:text-sm font-bold text-white/90 group-hover:text-[#00f0b5] text-center uppercase tracking-wide transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] md:text-xs text-[#8b949e] text-center mt-1">
                {partner.category}
              </span>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

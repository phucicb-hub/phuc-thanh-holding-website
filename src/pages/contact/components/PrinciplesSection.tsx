import { useTranslation } from 'react-i18next';
import { cooperationPrinciples, legalInfo } from '@/mocks/contact';
import useLang from '@/hooks/useLang';

export default function PrinciplesSection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section className="py-12 md:py-16 bg-background-100">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-background-50 rounded-full mb-4">
            <i className="ri-shield-star-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('contact.principlesBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
            {t('contact.principlesTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 mt-3 leading-relaxed">
            {t('contact.principlesDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {cooperationPrinciples[lang].map((principle) => (
            <div
              key={principle.id}
              className="bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-700 mb-4">
                <i className={`${principle.icon} w-6 h-6 flex items-center justify-center text-xl`} />
              </span>
              <h3 className="text-base font-bold text-foreground-900 mb-2">{principle.title}</h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>

        {/* Legal info panel */}
        <div className="mt-8 md:mt-10 bg-primary-800 rounded-lg overflow-hidden">
          <div className="px-6 md:px-8 py-6 md:py-8">
            <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
              <i className="ri-scales-3-line w-5 h-5 flex items-center justify-center text-accent-400" />
              {t('contact.legalTitle')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
              <div className="flex items-start gap-2.5">
                <i className="ri-building-2-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <p className="text-sm text-background-100 leading-relaxed">{legalInfo[lang].companyName}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <i className="ri-file-list-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <p className="text-sm text-background-100 leading-relaxed">
                  {t('contact.taxCode')} {legalInfo[lang].taxCode}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <i className="ri-user-star-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <p className="text-sm text-background-100 leading-relaxed">
                  {legalInfo[lang].representative}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <p className="text-sm text-background-100 leading-relaxed">{legalInfo[lang].address}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <a
                  href="tel:0343089666"
                  className="text-sm text-background-100 leading-relaxed hover:text-accent-300 transition-colors"
                >
                  {legalInfo[lang].hotline}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-accent-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:phucthanhholding@gmail.com"
                  className="text-sm text-background-100 leading-relaxed hover:text-accent-300 transition-colors"
                >
                  {legalInfo[lang].email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import { businessFields } from '@/mocks/overview';
import useLang from '@/hooks/useLang';
import RevealStagger from '@/components/base/RevealStagger';

export default function FieldsSection() {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="linh-vuc" className="py-14 md:py-20 bg-background-100 scroll-mt-24">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
            <i className="ri-layout-grid-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('overview.fieldsBadge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('overview.fieldsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 leading-relaxed">
            {t('overview.fieldsDesc')}
          </p>
        </div>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {businessFields[lang].map((field) => (
            <div
              key={field.id}
              className="group bg-background-50 border border-background-200/70 rounded-lg p-5 md:p-6 hover:border-primary-300 transition-colors"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4 group-hover:bg-primary-500 group-hover:text-background-50 transition-colors">
                <i className={`${field.icon} w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-xl`} />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors">
                {field.title}
              </h3>
              <p className="text-sm text-foreground-600 leading-relaxed">{field.description}</p>
            </div>
          ))}
        </RevealStagger>

        <p className="text-center text-xs text-foreground-500 mt-8">
          {t('overview.fieldsNote')}
        </p>
      </div>
    </section>
  );
}
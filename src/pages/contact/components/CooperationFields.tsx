import { useTranslation } from 'react-i18next';
import { cooperationFields } from '@/mocks/contact';
import useLang from '@/hooks/useLang';

interface CooperationFieldsProps {
  onSelectField: (field: string) => void;
}

export default function CooperationFields({ onSelectField }: CooperationFieldsProps) {
  const { t } = useTranslation();
  const lang = useLang();
  return (
    <section id="linh-vuc-hop-tac" className="scroll-mt-24 py-12 md:py-16 bg-primary-50">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-background-50 rounded-full mb-4">
            <i className="ri-grid-line w-3.5 h-3.5 flex items-center justify-center" />
            {t('contact.fieldsBadge')}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
            {t('contact.fieldsTitle')}
          </h2>
          <p className="text-sm md:text-base text-foreground-600 mt-3 leading-relaxed">
            {t('contact.fieldsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cooperationFields[lang].map((field) => (
            <div
              key={field.id}
              className="flex flex-col bg-background-50 border border-background-200/70 rounded-lg p-6 hover:border-primary-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary-100 text-primary-700 shrink-0">
                  <i className={`${field.icon} w-5 h-5 flex items-center justify-center text-xl`} />
                </span>
                <h3 className="text-base font-bold text-foreground-900 leading-snug">
                  {field.title}
                </h3>
              </div>

              <p className="text-sm text-foreground-600 leading-relaxed mb-4">
                {field.description}
              </p>

              <ul className="space-y-2 mb-5">
                {field.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground-700">
                    <i className="ri-checkbox-circle-line w-4 h-4 flex items-center justify-center text-primary-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {field.note && (
                <div className="mb-5 p-3 rounded-md bg-accent-50 border border-accent-200/70 flex items-start gap-2">
                  <i className="ri-information-line w-4 h-4 flex items-center justify-center text-accent-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-accent-900 leading-relaxed">{field.note}</p>
                </div>
              )}

              <a
                href="#gui-de-xuat"
                onClick={() => onSelectField(field.title)}
                className="mt-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-primary-300 text-primary-700 rounded-md hover:bg-primary-50 transition-colors whitespace-nowrap"
              >
                {field.buttonLabel}
                <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/base/Reveal';
import RevealStagger from '@/components/base/RevealStagger';
import useLang from '@/hooks/useLang';
import { businessFieldDetails } from '@/mocks/fields';

interface RelatedFieldsSectionProps {
  currentHref: string;
}

export default function RelatedFieldsSection({ currentHref }: RelatedFieldsSectionProps) {
  const { t } = useTranslation();
  const lang = useLang();

  const related = businessFieldDetails[lang].filter((f) => f.href && f.href !== currentHref);

  if (related.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-background-100">
      <div className="container-main">
        <Reveal>
          <h2 className="text-xl md:text-2xl font-bold text-foreground-950 text-center mb-8 md:mb-10">
            {t('relatedFields.title', 'Bạn cũng có thể quan tâm')}
          </h2>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {related.map((field) => (
            <a
              key={field.id}
              href={field.href}
              className="group flex items-start gap-4 bg-background-50 border border-background-200/70 rounded-lg p-5 hover:border-primary-300 transition-colors"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-primary-100 shrink-0 group-hover:bg-primary-200 group-hover:scale-110 transition-all duration-300">
                <i
                  className={`${field.icon} w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-primary-600 text-lg group-hover:text-primary-700 transition-colors duration-300`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-foreground-900 group-hover:text-primary-700 transition-colors duration-300 mb-1">
                  {field.title}
                </h3>
                <p className="text-xs md:text-sm text-foreground-600 line-clamp-2 group-hover:text-foreground-700 transition-colors duration-300">
                  {field.description}
                </p>
              </div>
            </a>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
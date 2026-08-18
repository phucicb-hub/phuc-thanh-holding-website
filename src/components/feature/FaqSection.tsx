import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  scriptId: string;
  title?: string;
  description?: string;
}

export default function FaqSection({
  items,
  scriptId,
  title,
  description,
}: FaqSectionProps) {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const existing = document.getElementById(scriptId);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    };

    let script = existing as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [items, scriptId]);

  return (
    <section className="py-12 md:py-16 bg-background-100/60">
      <div className="container-main max-w-4xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-2">{title || t('faq.title')}</h2>
          {description && (
            <p className="text-sm md:text-base text-foreground-600 leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="bg-background-50 border border-background-200/70 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-background-100 transition-colors"
                >
                  <span className="text-sm md:text-base font-semibold text-foreground-900">
                    {item.question}
                  </span>
                  <span
                    className={`w-6 h-6 flex items-center justify-center shrink-0 rounded-full ${
                      isOpen ? 'bg-primary-500 text-background-50' : 'bg-secondary-100 text-secondary-700'
                    } transition-colors`}
                  >
                    <i
                      className={`${
                        isOpen ? 'ri-subtract-line' : 'ri-add-line'
                      } w-4 h-4 flex items-center justify-center text-base`}
                    />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm md:text-base text-foreground-600 leading-relaxed border-t border-background-200/70 pt-4">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
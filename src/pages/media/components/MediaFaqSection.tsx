import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mediaFaq } from '@/mocks/media';
import useLang from '@/hooks/useLang';

export default function MediaFaqSection() {
  const { t } = useTranslation();
  const lang = useLang();
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('faq.title')}
          </h2>
        </div>

        <div className="space-y-3">
          {mediaFaq[lang].map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-background-100 border border-background-200/70 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-3.5 md:py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm md:text-base font-medium text-foreground-900">
                    {item.question}
                  </span>
                  <i
                    className={`${
                      isOpen ? 'ri-subtract-line' : 'ri-add-line'
                    } w-5 h-5 flex items-center justify-center text-primary-600 shrink-0`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 md:px-5 pb-4">
                    <p className="text-sm text-foreground-600 leading-relaxed">{item.answer}</p>
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
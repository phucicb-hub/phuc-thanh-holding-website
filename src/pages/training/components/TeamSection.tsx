import { useTranslation } from 'react-i18next';

export default function TeamSection() {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-background-50">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-3 tracking-tight">
            {t('training.teamTitle')}
          </h2>
          <div className="flex flex-col items-center gap-3 py-8 md:py-10">
            <i className="ri-user-search-line w-10 h-10 flex items-center justify-center text-2xl text-foreground-400" />
            <p className="text-sm md:text-base text-foreground-600">
              {t('training.teamUpdating')}
            </p>
            <p className="text-xs text-foreground-500 max-w-md">
              {t('training.teamNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
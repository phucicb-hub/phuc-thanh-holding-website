import { useTranslation } from 'react-i18next';
import { useNews } from '@/hooks/useContent';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';
import RevealStagger from '@/components/base/RevealStagger';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function LatestNews() {
  const { t } = useTranslation();
  const lang = useLang();
  const { items: articles, loading, error, retry } = useNews();

  const latest = articles.slice(0, 3);

  return (
    <section className="py-10 md:py-14 bg-background-100">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest text-primary-700 bg-primary-50 rounded-full mb-4">
              <i className="ri-newspaper-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('home.newsBadge')}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-foreground-900 tracking-tight">
              {t('home.newsTitle')}
            </h2>
            <p className="text-sm text-foreground-600 mt-2 max-w-xl">
              {t('home.newsDesc')}
            </p>
          </div>
          <a
            href={getLocalizedPath('news', lang)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
          >
            {t('home.newsViewAll')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
            <p className="text-sm text-foreground-600">{t('news.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-3 text-3xl" />
            <p className="text-sm text-foreground-600 mb-4">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
              {t('common.retry')}
            </button>
          </div>
        ) : (
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {latest.map((article) => (
              <article
                key={article.id}
                className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
              >
                <a
                  href={detailHref('news', article.id, lang)}
                  className="relative block overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    title={article.title}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-semibold bg-accent-500 text-foreground-950 rounded-sm">
                    {article.category}
                  </span>
                </a>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1 text-xs text-foreground-500 mb-2">
                    <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                    {formatDate(article.date)}
                  </span>
                  <a
                    href={detailHref('news', article.id, lang)}
                    className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2"
                  >
                    {article.title}
                  </a>
                  <p className="text-xs md:text-sm text-foreground-600 mb-4 flex-1 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a
                    href={detailHref('news', article.id, lang)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors whitespace-nowrap"
                  >
                    {t('common.readMore')}
                    <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
                  </a>
                </div>
              </article>
            ))}
          </RevealStagger>
        )}
      </div>
    </section>
  );
}
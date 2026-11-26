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
    <section className="py-16 md:py-24 bg-white text-[#1d1d1f]">
      <div className="container-main max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-widest text-[#046842] bg-[#046842]/8 border border-[#046842]/20 rounded-full mb-4">
              <i className="ri-newspaper-line w-3.5 h-3.5 flex items-center justify-center" />
              {t('home.newsBadge')}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight">
              {t('home.newsTitle')}
            </h2>
            <p className="text-sm text-[#4b5563] mt-2 max-w-xl">
              {t('home.newsDesc')}
            </p>
          </div>
          <a
            href={getLocalizedPath('news', lang)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#046842] hover:text-[#025938] transition-colors whitespace-nowrap"
          >
            {t('home.newsViewAll')}
            <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
          </a>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-[#046842] mb-3 text-3xl animate-spin" />
            <p className="text-sm text-[#4b5563]">{t('news.loading')}</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-gray-400 mb-3 text-3xl" />
            <p className="text-sm text-[#4b5563] mb-4">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-[#046842] text-white rounded-lg hover:bg-[#025938] transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
              {t('common.retry')}
            </button>
          </div>
        ) : (
          <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300 flex flex-col"
              >
                <a
                  href={detailHref('news', article.id, lang)}
                  className="relative block overflow-hidden aspect-[16/10]"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    title={article.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold bg-white/90 backdrop-blur-md text-[#046842] border border-gray-200 rounded-md shadow-xs">
                    {article.category}
                  </span>
                </a>
                <div className="p-6 flex flex-col flex-1">
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 mb-2.5">
                    <i className="ri-calendar-line text-sm" />
                    {formatDate(article.date)}
                  </span>
                  <a
                    href={detailHref('news', article.id, lang)}
                    className="text-base sm:text-lg font-bold text-[#1d1d1f] mb-2.5 group-hover:text-[#046842] transition-colors line-clamp-2"
                  >
                    {article.title}
                  </a>
                  <p className="text-xs sm:text-sm text-[#4b5563] mb-5 flex-1 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <a
                    href={detailHref('news', article.id, lang)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#046842] hover:text-[#025938] transition-colors whitespace-nowrap mt-auto"
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
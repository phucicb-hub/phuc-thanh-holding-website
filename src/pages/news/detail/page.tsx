import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { useNews, useNewsDetail } from '@/hooks/useContent';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function NewsDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const lang = useLang();
  const articleId = Number(id);
  const { item: article, loading, error, retry } = useNewsDetail(articleId);
  const { items: allArticles } = useNews();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
            <p className="text-sm text-foreground-600">{t('detail.loadingNews')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <p className="text-sm text-foreground-600 mb-6">{error}</p>
            <button
              onClick={retry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-refresh-line w-4 h-4 flex items-center justify-center" />
              {t('common.retry')}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-24">
          <div className="text-center px-4">
            <i className="ri-file-unknow-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
            <h1 className="text-xl font-bold text-foreground-900 mb-2">{t('detail.newsNotFound')}</h1>
            <p className="text-sm text-foreground-600 mb-6">
              {t('detail.newsNotFoundDesc')}
            </p>
            <a
              href={getLocalizedPath('news', lang)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
            >
              {t('detail.backToNews')}
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center" />
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = allArticles.filter((a) => a.id !== articleId).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={article.category.toUpperCase()}
          badgeIcon="ri-newspaper-line"
          title={article.title}
          breadcrumb={[
            { label: t('common.home'), href: getLocalizedPath('home', lang) },
            { label: t('detail.newsCategory'), href: getLocalizedPath('news', lang) },
            { label: article.title },
          ]}
          image={article.image}
        />

        <article className="py-12 md:py-16 bg-background-50">
          <div className="container-main max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-foreground-500 mb-6">
              <span className="inline-flex items-center gap-1">
                <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent-100 text-accent-900 font-medium">
                {article.category}
              </span>
            </div>

            {article.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-sm md:text-base text-foreground-700 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 pt-6 border-t border-background-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs bg-background-100 text-foreground-600 rounded-full whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-12 md:py-16 bg-background-100">
            <div className="container-main">
              <h2 className="text-xl md:text-2xl font-bold text-foreground-900 mb-6 md:mb-8">
                {t('detail.relatedNews')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {related.map((item) => (
                  <a
                    key={item.id}
                    href={detailHref('news', item.id, lang)}
                    className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img
                        src={item.image}
                        alt={item.title}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-1">
                      <span className="text-xs text-foreground-500 mb-2">
                        {formatDate(item.date)}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-foreground-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
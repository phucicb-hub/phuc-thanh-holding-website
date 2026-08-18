import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import { newsCategories } from '@/mocks/news';
import useLang from '@/hooks/useLang';
import { getLocalizedPath, detailHref } from '@/lib/routes';
import { useNews } from '@/hooks/useContent';
import RevealStagger from '@/components/base/RevealStagger';

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export default function News() {
  const { t } = useTranslation();
  const lang = useLang();
  const [activeCategory, setActiveCategory] = useState(newsCategories[lang][0]);
  const { items: articles, loading, error, retry } = useNews();

  useEffect(() => {
    setActiveCategory(newsCategories[lang][0]);
  }, [lang]);

  const filtered =
    activeCategory === newsCategories[lang][0]
      ? articles
      : articles.filter((article) => article.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('news.badge')}
          badgeIcon="ri-newspaper-line"
          title={t('news.title')}
          description={t('news.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('news.title') }]}
          image="https://readdy.ai/api/search-image?query=Clean%20editorial%20news%20and%20media%20concept%2C%20abstract%20digital%20newspaper%20and%20content%20network%20visualization%2C%20deep%20emerald%20green%20gradient%20with%20subtle%20golden%20light%20accents%2C%20minimal%20modern%20corporate%20style&width=1600&height=600&seq=news-hero-1&orientation=landscape"
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            {/* Category filter */}
            <div className="flex flex-wrap items-center gap-2 mb-8 md:mb-10">
              {newsCategories[lang].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-primary-500 text-background-50'
                      : 'bg-background-100 text-foreground-700 hover:bg-background-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="text-center py-16">
                <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
                <p className="text-sm text-foreground-600">{t('news.loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
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
            ) : filtered.length === 0 ? (
              <p className="text-center text-sm text-foreground-500 py-12">
                {t('news.empty')}
              </p>
            ) : (
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filtered.map((article) => (
                  <article
                    key={article.id}
                    className="group bg-background-50 border border-background-200/70 rounded-lg overflow-hidden hover:border-primary-300 transition-colors flex flex-col"
                  >
                    <a href={detailHref('news', article.id, lang)} className="relative block overflow-hidden aspect-[16/10]">
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
      </main>
      <Footer />
    </div>
  );
}
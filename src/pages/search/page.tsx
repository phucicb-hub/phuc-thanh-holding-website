import { useEffect, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';
import { searchContent, type SearchResult, type SearchResultType } from '@/lib/content';

type Filter = 'all' | SearchResultType;

function formatDate(dateStr: string): string {
  if (dateStr.includes('-')) {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  }
  return dateStr;
}

const TYPE_ICONS: Record<SearchResultType, string> = {
  news: 'ri-newspaper-line',
  products: 'ri-box-3-line',
  projects: 'ri-folder-2-line',
};

export default function Search() {
  const { t } = useTranslation();
  const lang = useLang();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [input, setInput] = useState(query);
  const [filter, setFilter] = useState<Filter>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInput(query);
  }, [query]);

  useEffect(() => {
    let active = true;
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    searchContent(query)
      .then((data) => {
        if (active) setResults(data);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : t('common.loadError'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [query, t]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = input.trim();
    setSearchParams(next ? { q: next } : {});
  };

  const filterOptions: { value: Filter; label: string }[] = [
    { value: 'all', label: t('search.type.all') },
    { value: 'news', label: t('search.type.news') },
    { value: 'products', label: t('search.type.products') },
    { value: 'projects', label: t('search.type.projects') },
  ];

  const visible = filter === 'all' ? results : results.filter((r) => r.type === filter);
  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('search.badge')}
          badgeIcon="ri-search-line"
          title={t('search.title')}
          description={t('search.desc')}
          breadcrumb={[
            { label: t('common.home'), href: getLocalizedPath('home', lang) },
            { label: t('search.title') },
          ]}
          image="https://readdy.ai/api/search-image?query=Abstract%20concept%20of%20content%20search%20and%20information%20discovery%2C%20magnifying%20glass%20over%20digital%20document%20network%2C%20deep%20emerald%20green%20gradient%20with%20subtle%20golden%20light%20accents%2C%20minimal%20modern%20corporate%20style&width=1600&height=600&seq=search-hero-1&orientation=landscape"
        />

        <section className="py-10 md:py-14 bg-background-50">
          <div className="container-main max-w-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="search-input" className="sr-only">
                {t('search.placeholder')}
              </label>
              <div className="relative flex-1">
                <i className="ri-search-line w-5 h-5 flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-sm" />
                <input
                  id="search-input"
                  type="search"
                  name="q"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('search.placeholder')}
                  className="w-full pl-11 pr-4 py-3 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 transition-colors whitespace-nowrap"
              >
                <i className="ri-search-line w-4 h-4 flex items-center justify-center" />
                {t('search.button')}
              </button>
            </form>
          </div>
        </section>

        <section className="pb-14 md:pb-20 bg-background-50">
          <div className="container-main max-w-3xl">
            {loading ? (
              <div className="text-center py-16">
                <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
                <p className="text-sm text-foreground-600">{t('search.loading')}</p>
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <i className="ri-error-warning-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-3 text-3xl" />
                <p className="text-sm text-foreground-600">{error}</p>
              </div>
            ) : !hasQuery ? (
              <div className="text-center py-16">
                <i className="ri-search-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
                <p className="text-sm text-foreground-600">{t('search.enterQuery')}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <p className="text-sm text-foreground-700">
                    {t('search.resultsCount', { count: visible.length, query })}
                  </p>
                  <div className="flex items-center gap-1 px-1 py-1 bg-background-100 rounded-full">
                    {filterOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setFilter(opt.value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                          filter === opt.value
                            ? 'bg-primary-500 text-background-50'
                            : 'text-foreground-600 hover:text-foreground-900'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {visible.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="ri-inbox-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-4 text-3xl" />
                    <p className="text-sm text-foreground-700 mb-2">
                      {t('search.noResults', { query })}
                    </p>
                    <p className="text-xs text-foreground-500">{t('search.noResultsDesc')}</p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {visible.map((result) => (
                      <li key={`${result.type}-${result.id}`}>
                        <a
                          href={result.href}
                          className="group flex items-start gap-4 p-4 bg-background-50 border border-background-200/70 rounded-lg hover:border-primary-300 transition-colors"
                        >
                          <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 shrink-0">
                            <i className={`${TYPE_ICONS[result.type]} w-5 h-5 flex items-center justify-center text-lg`} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold bg-accent-100 text-accent-900 rounded-full">
                                {t(`search.type.${result.type}`)}
                              </span>
                              {result.date && (
                                <span className="inline-flex items-center gap-1 text-xs text-foreground-500">
                                  <i className="ri-calendar-line w-3.5 h-3.5 flex items-center justify-center" />
                                  {formatDate(result.date)}
                                </span>
                              )}
                            </div>
                            <h2 className="text-sm md:text-base font-semibold text-foreground-900 mb-1 group-hover:text-primary-700 transition-colors line-clamp-2">
                              {result.title}
                            </h2>
                            {result.excerpt && (
                              <p className="text-xs md:text-sm text-foreground-600 leading-relaxed line-clamp-2">
                                {result.excerpt}
                              </p>
                            )}
                          </div>
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center text-foreground-300 group-hover:text-primary-600 transition-colors shrink-0" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { productCategories } from '@/mocks/products';
import useLang from '@/hooks/useLang';
import { useProducts } from '@/hooks/useContent';
import CategorySidebar from './CategorySidebar';
import ProductCard from './ProductCard';
import RevealStagger from '@/components/base/RevealStagger';

export default function ProductsSection() {
  const { t } = useTranslation();
  const lang = useLang();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '');
  const [sortBy, setSortBy] = useState('latest');
  const [sortOpen, setSortOpen] = useState(false);
  const { items: products, loading, error, retry } = useProducts();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearch(q);
  }, [searchParams]);

  const sortOptions = [
    { id: 'latest', label: t('products.sortLatest') },
    { id: 'az', label: t('products.sortAz') },
    { id: 'featured', label: t('products.sortFeatured') },
  ];

  const activeLabel = productCategories[lang].find((c) => c.id === activeCategory)?.label || productCategories[lang][0].label;

  const filtered = useMemo(() => {
    let list = products.filter((p) => activeCategory === 'all' || p.categoryId === activeCategory);

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      );
    }

    const sorted = [...list];
    if (sortBy === 'az') {
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    } else if (sortBy === 'featured') {
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));
    } else {
      sorted.sort((a, b) => b.date.localeCompare(a.date));
    }
    return sorted;
  }, [activeCategory, search, sortBy, products]);

  return (
    <section className="py-10 md:py-14 bg-background-50">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-8">
          <CategorySidebar
            categories={productCategories[lang]}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-foreground-900 mb-1">{activeLabel}</h2>
                  <p className="text-sm text-foreground-600">
                    {!loading && filtered.length > 0
                      ? t('products.solutionCount', { count: filtered.length })
                      : t('products.explore')}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  {/* Search */}
                  <div className="relative">
                    <i className="ri-search-line w-4 h-4 flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 text-foreground-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder={t('products.searchPlaceholder')}
                      className="w-full sm:w-64 pl-9 pr-3 py-2 text-sm bg-background-50 border border-background-200 rounded-md focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-colors"
                    />
                  </div>

                  {/* Sort */}
                  <div className="relative">
                    <button
                      onClick={() => setSortOpen(!sortOpen)}
                      className="w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm text-foreground-700 bg-background-50 border border-background-200 rounded-md hover:border-primary-300 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-arrow-up-down-line w-4 h-4 flex items-center justify-center" />
                      {sortOptions.find((o) => o.id === sortBy)?.label}
                      <i className="ri-arrow-down-s-line w-4 h-4 flex items-center justify-center" />
                    </button>
                    {sortOpen && (
                      <div className="absolute right-0 top-full mt-1 bg-background-50 border border-background-200 rounded-md py-1 min-w-[140px] z-30">
                        {sortOptions.map((o) => (
                          <button
                            key={o.id}
                            onClick={() => {
                              setSortBy(o.id);
                              setSortOpen(false);
                            }}
                            className={`block w-full px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                              o.id === sortBy
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-foreground-700 hover:bg-background-100'
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="text-center py-16">
                <i className="ri-loader-4-line w-10 h-10 flex items-center justify-center mx-auto text-primary-500 mb-3 text-3xl animate-spin" />
                <p className="text-sm text-foreground-600">{t('products.loading')}</p>
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
            ) : filtered.length > 0 ? (
              <RevealStagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </RevealStagger>
            ) : (
              <div className="text-center py-16">
                <i className="ri-inbox-line w-12 h-12 flex items-center justify-center mx-auto text-foreground-300 mb-3 text-3xl" />
                <p className="text-sm text-foreground-600">{t('products.noResult')}</p>
                <button
                  onClick={() => setSearch('')}
                  className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
                >
                  {t('products.clearSearch')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
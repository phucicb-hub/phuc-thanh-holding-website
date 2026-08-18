import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import PageHero from '@/components/feature/PageHero';
import SitemapGroupCard from './components/SitemapGroup';
import { sitemapGroups } from '@/mocks/sitemap';
import useLang from '@/hooks/useLang';
import { getLocalizedPath } from '@/lib/routes';

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export default function Sitemap() {
  const { t } = useTranslation();
  const lang = useLang();
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const filteredGroups = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return sitemapGroups[lang];

    return sitemapGroups[lang]
      .map((group) => {
        const titleMatch = normalize(group.title).includes(q);
        const descMatch = normalize(group.description).includes(q);
        const links =
          titleMatch || descMatch
            ? group.links
            : group.links.filter((link) => normalize(link.label).includes(q));
        return {
          ...group,
          links,
          matched: links.length > 0 || titleMatch || descMatch,
        };
      })
      .filter((group) => group.matched);
  }, [query, lang]);

  const totalLinks = useMemo(
    () => sitemapGroups[lang].reduce((sum, g) => sum + g.links.length, 0),
    [lang]
  );

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const hasResults = filteredGroups.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHero
          badge={t('sitemap.badge')}
          badgeIcon="ri-map-2-line"
          title={t('sitemap.title')}
          description={t('sitemap.desc')}
          breadcrumb={[{ label: t('common.home'), href: getLocalizedPath('home', lang) }, { label: t('sitemap.title') }]}
          image="https://readdy.ai/api/search-image?query=Abstract%20minimalist%20sitemap%20and%20information%20architecture%20concept%2C%20clean%20network%20of%20connected%20nodes%20and%20branch%20lines%20organizing%20content%20into%20a%20clear%20hierarchy%2C%20soft%20emerald%20green%20gradient%20background%20with%20subtle%20golden%20yellow%20accent%20glow%2C%20floating%20folder%20and%20document%20icons%20arranged%20in%20an%20orderly%20tree%20structure%2C%20modern%20corporate%20style%2C%20elegant%20uncluttered%20composition%2C%20high%20detail&width=1600&height=640&seq=sitemap-hero-1&orientation=landscape"
        />

        <section className="py-12 md:py-16 bg-background-50">
          <div className="container-main">
            {/* Search box */}
            <div className="max-w-2xl mb-8 md:mb-10">
              <label
                htmlFor="sitemap-search"
                className="block text-sm font-semibold text-foreground-900 mb-2"
              >
                {t('sitemap.searchLabel')}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-foreground-400">
                  <i className="ri-search-line w-5 h-5 flex items-center justify-center text-lg" />
                </span>
                <input
                  id="sitemap-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('sitemap.searchPlaceholder')}
                  className="w-full pl-11 pr-11 py-3 text-sm border border-background-300 rounded-md bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                  aria-label={t('sitemap.searchAria')}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-foreground-500 hover:bg-background-100 hover:text-foreground-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-colors"
                    aria-label={t('sitemap.clearSearch')}
                  >
                    <i className="ri-close-line w-4 h-4 flex items-center justify-center text-lg" />
                  </button>
                )}
              </div>
              <p className="text-xs text-foreground-500 mt-2">
                {query.trim()
                  ? hasResults
                    ? t('sitemap.foundCount', {
                        count: filteredGroups.reduce((s, g) => s + g.links.length, 0),
                        query: query.trim(),
                      })
                    : t('sitemap.noResultCount', { query: query.trim() })
                  : t('sitemap.totalCount', {
                      groups: sitemapGroups[lang].length,
                      links: totalLinks,
                    })}
              </p>
            </div>

            {/* Groups grid */}
            {hasResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredGroups.map((group) => (
                  <SitemapGroupCard
                    key={group.id}
                    group={group}
                    query={query}
                    isOpen={!collapsed.has(group.id)}
                    onToggle={toggleGroup}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 md:py-20 bg-background-50 border border-background-200/70 rounded-lg">
                <span className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-secondary-100 text-secondary-700 mb-4">
                  <i className="ri-search-line w-6 h-6 flex items-center justify-center text-2xl" />
                </span>
                <h2 className="text-lg font-semibold text-foreground-900 mb-2">
                  {t('sitemap.noResultTitle')}
                </h2>
                <p className="text-sm text-foreground-600 max-w-md mx-auto">
                  {t('sitemap.noResultDesc')}
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-primary-500 text-background-50 rounded-md hover:bg-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 active:bg-primary-700 transition-colors whitespace-nowrap"
                >
                  {t('sitemap.clearSearchCta')}
                  <i className="ri-arrow-go-back-line w-4 h-4 flex items-center justify-center" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
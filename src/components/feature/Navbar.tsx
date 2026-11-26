import { useState, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import useLang from '@/hooks/useLang';
import {
  getLocalizedPath,
  getEquivalentPath,
  getDynamicDetail,
  type PageKey,
  type Locale,
} from '@/lib/routes';
import { checkContentTranslation } from '@/lib/content';
import LanguageNotice from '@/components/feature/LanguageNotice';

const logoUrl = '/logo.webp';

const navKeys: { pageKey: PageKey; labelKey: string }[] = [
  { pageKey: 'home', labelKey: 'nav.home' },
  { pageKey: 'overview', labelKey: 'nav.about' },
  { pageKey: 'fields', labelKey: 'nav.fields' },
  { pageKey: 'services', labelKey: 'nav.services' },
  { pageKey: 'products', labelKey: 'nav.products' },
  { pageKey: 'projects', labelKey: 'nav.projects' },
  { pageKey: 'news', labelKey: 'nav.news' },
  { pageKey: 'careers', labelKey: 'nav.careers' },
  { pageKey: 'contact', labelKey: 'nav.contact' },
];

function normalize(path: string): string {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
}

function isActivePath(pathname: string, href: string): boolean {
  const p = normalize(pathname);
  const h = normalize(href);
  if (h === '#') return false;
  if (h === '/vi' || h === '/en') return p === h;
  return p === h || p.startsWith(`${h}/`);
}

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [noticeTarget, setNoticeTarget] = useState<Locale | null>(null);

  const normalizedPath = normalize(location.pathname);
  const isHome = normalizedPath === '/vi' || normalizedPath === '/en';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = navKeys.map((item) => ({
    ...item,
    label: t(item.labelKey),
    href: getLocalizedPath(item.pageKey, lang),
  }));

  const homeHref = getLocalizedPath('home', lang);
  const sitemapHref = getLocalizedPath('sitemap', lang);
  const searchHref = getLocalizedPath('search', lang);
  const partnershipHref = getLocalizedPath('partnership', lang);
  const viHref = getEquivalentPath(location.pathname, 'vi');
  const enHref = getEquivalentPath(location.pathname, 'en');

  const handleLangSwitch = (target: Locale, e: ReactMouseEvent<HTMLAnchorElement>) => {
    const detail = getDynamicDetail(location.pathname);
    if (!detail) return;
    e.preventDefault();
    if (target === lang) return;
    checkContentTranslation(detail.section, detail.param, target)
      .then((has) => {
        if (has) {
          navigate(getEquivalentPath(location.pathname, target));
        } else {
          setNoticeTarget(target);
        }
      })
      .catch(() => {
        navigate(getEquivalentPath(location.pathname, target));
      });
  };

  return (
    <>
      <header className="w-full">
        {/* Top bar */}
        <div className="bg-[#060709] border-b border-white/[0.06]">
          <div className="container-main">
            <div className="flex items-center justify-end h-9 gap-4 text-xs text-[#8b949e]">
              <a
                href={searchHref}
                className={`hidden md:flex items-center gap-1 transition-colors whitespace-nowrap ${isActivePath(location.pathname, searchHref)
                    ? 'text-[#00f0b5] font-medium'
                    : 'hover:text-[#00f0b5]'
                  }`}
              >
                <i className="ri-search-line w-3 h-3 flex items-center justify-center" />
                {t('nav.search')}
              </a>
              <a
                href={sitemapHref}
                className={`hidden md:flex items-center gap-1 transition-colors whitespace-nowrap ${isActivePath(location.pathname, sitemapHref)
                    ? 'text-[#00f0b5] font-medium'
                    : 'hover:text-[#00f0b5]'
                  }`}
              >
                <i className="ri-map-2-line w-3 h-3 flex items-center justify-center" />
                {t('nav.sitemap')}
              </a>

              {/* Language switcher VI | EN */}
              <div className="flex items-center gap-2">
                <a
                  href={viHref}
                  onClick={(e) => handleLangSwitch('vi', e)}
                  aria-label="Tiếng Việt"
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${lang === 'vi' ? 'text-[#00f0b5] font-semibold' : 'hover:text-[#00f0b5]'
                    }`}
                >
                  <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-4 h-3 object-cover rounded-xs" />
                  VI
                </a>
                <span className="text-white/20">|</span>
                <a
                  href={enHref}
                  onClick={(e) => handleLangSwitch('en', e)}
                  aria-label="English"
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${lang === 'en' ? 'text-[#00f0b5] font-semibold' : 'hover:text-[#00f0b5]'
                    }`}
                >
                  <img src="https://flagcdn.com/w20/gb.png" alt="EN" className="w-4 h-3 object-cover rounded-xs" />
                  EN
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation (Apple Pro Glass bar) */}
        <div
          className={`transition-all duration-300 ${scrolled
              ? 'fixed top-0 left-0 right-0 z-40 bg-[#07080a]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
              : 'relative bg-[#07080a] border-b border-white/[0.06]'
            }`}
        >
          <div className="container-main">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              {isHome ? (
                <h1 className="flex items-center gap-2.5 shrink-0 m-0">
                  <a href={homeHref} className="flex items-center gap-2.5 shrink-0 group">
                    <img
                      src={logoUrl}
                      alt="PT Phuc Thanh Holding"
                      className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_0_12px_rgba(0,240,181,0.2)]"
                    />
                    <div className="hidden sm:block">
                      <div className="text-sm font-bold text-white tracking-wider leading-tight group-hover:text-[#00f0b5] transition-colors">
                        PT HOLDING
                      </div>
                      <div className="text-[10px] text-[#8b949e] tracking-tight leading-tight">
                        {t('brand.subtitle')}
                      </div>
                    </div>
                  </a>
                </h1>
              ) : (
                <a href={homeHref} className="flex items-center gap-2.5 shrink-0 group">
                  <img
                    src={logoUrl}
                    alt="PT Phuc Thanh Holding"
                    className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_0_12px_rgba(0,240,181,0.2)]"
                  />
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-white tracking-wider leading-tight group-hover:text-[#00f0b5] transition-colors">
                      PT HOLDING
                    </div>
                    <div className="text-[10px] text-[#8b949e] tracking-tight leading-tight">
                      {t('brand.subtitle')}
                    </div>
                  </div>
                </a>
              )}

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActivePath(location.pathname, item.href);
                  return (
                    <a
                      key={item.pageKey}
                      href={item.href}
                      className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap rounded-lg ${active
                          ? 'text-[#00f0b5] bg-white/[0.04]'
                          : 'text-[#8b949e] hover:text-white hover:bg-white/[0.03]'
                        }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 bg-[#00f0b5] rounded-full shadow-[0_0_8px_#00f0b5]" />
                      )}
                    </a>
                  );
                })}
                <a
                  href={partnershipHref}
                  className="ml-4 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#00f0b5] text-[#07080a] rounded-full hover:bg-white hover:text-[#07080a] transition-all duration-300 shadow-[0_0_20px_rgba(0,240,181,0.25)] whitespace-nowrap"
                >
                  {t('nav.contactCta')}
                </a>
              </nav>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-[#00f0b5] transition-colors"
                aria-label="Toggle menu"
              >
                <i className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-line'} w-6 h-6 flex items-center justify-center text-xl`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-background-50 border-l border-background-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <img src={logoUrl} alt="PT" className="h-10 w-10 object-contain" />
                <button onClick={() => setMobileOpen(false)} className="p-2">
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center text-xl" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = isActivePath(location.pathname, item.href);
                  return (
                    <a
                      key={item.pageKey}
                      href={item.href}
                      className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${active
                          ? 'bg-background-100 text-primary-600'
                          : 'text-foreground-700 hover:text-primary-600 hover:bg-background-100'
                        }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-3 border-t border-background-200 pt-3">
                <a
                  href={searchHref}
                  className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${isActivePath(location.pathname, searchHref)
                      ? 'bg-background-100 text-primary-600'
                      : 'text-foreground-600 hover:text-primary-600 hover:bg-background-100'
                    }`}
                >
                  {t('nav.search')}
                </a>
                <a
                  href={sitemapHref}
                  className={`block px-3 py-3 text-sm font-medium rounded-md transition-colors ${isActivePath(location.pathname, sitemapHref)
                      ? 'bg-background-100 text-primary-600'
                      : 'text-foreground-600 hover:text-primary-600 hover:bg-background-100'
                    }`}
                >
                  {t('nav.sitemap')}
                </a>
              </div>
              <a
                href={partnershipHref}
                className="mt-6 block w-full py-3 text-center text-sm font-semibold bg-accent-500 text-primary-950 rounded-md hover:bg-accent-400 transition-colors whitespace-nowrap"
              >
                {t('nav.contactCta')}
              </a>
            </div>
          </div>
        </div>
      )}

      {noticeTarget && (
        <LanguageNotice target={noticeTarget} onClose={() => setNoticeTarget(null)} />
      )}
    </>
  );
}
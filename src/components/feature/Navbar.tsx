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
        <div className="bg-[#f8fafc] border-b border-gray-200/80">
          <div className="container-main">
            <div className="flex items-center justify-end h-9 gap-4 text-xs text-gray-600">
              <a
                href={searchHref}
                className={`hidden md:flex items-center gap-1 transition-colors whitespace-nowrap ${isActivePath(location.pathname, searchHref)
                  ? 'text-[#046842] font-semibold'
                  : 'hover:text-[#046842]'
                  }`}
              >
                <i className="ri-search-line w-3 h-3 flex items-center justify-center" />
                {t('nav.search')}
              </a>
              <a
                href={sitemapHref}
                className={`hidden md:flex items-center gap-1 transition-colors whitespace-nowrap ${isActivePath(location.pathname, sitemapHref)
                  ? 'text-[#046842] font-semibold'
                  : 'hover:text-[#046842]'
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
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${lang === 'vi' ? 'text-[#046842] font-bold' : 'text-gray-600 hover:text-[#046842]'
                    }`}
                >
                  <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-4 h-3 object-cover rounded-xs" />
                  VI
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href={enHref}
                  onClick={(e) => handleLangSwitch('en', e)}
                  aria-label="English"
                  className={`flex items-center gap-1 transition-colors whitespace-nowrap ${lang === 'en' ? 'text-[#046842] font-bold' : 'text-gray-600 hover:text-[#046842]'
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
            ? 'fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'relative bg-white border-b border-gray-200/80'
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
                      className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_2px_8px_rgba(4,104,66,0.15)]"
                    />
                    <div className="hidden sm:block">
                      <div className="text-sm font-bold text-[#1d1d1f] tracking-wider leading-tight group-hover:text-[#046842] transition-colors">
                        PT HOLDING
                      </div>
                      <div className="text-[10px] text-gray-500 tracking-tight leading-tight">
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
                    className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_2px_8px_rgba(4,104,66,0.15)]"
                  />
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-[#1d1d1f] tracking-wider leading-tight group-hover:text-[#046842] transition-colors">
                      PT HOLDING
                    </div>
                    <div className="text-[10px] text-gray-500 tracking-tight leading-tight">
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
                        ? 'text-[#046842] bg-[#046842]/5 font-semibold'
                        : 'text-gray-700 hover:text-[#046842] hover:bg-gray-100/70'
                        }`}
                    >
                      {item.label}
                      {active && (
                        <span className="absolute left-2.5 right-2.5 -bottom-0.5 h-0.5 bg-[#046842] rounded-full shadow-[0_0_8px_rgba(4,104,66,0.4)]" />
                      )}
                    </a>
                  );
                })}
                <a
                  href={partnershipHref}
                  className="ml-4 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#046842] text-white rounded-full hover:bg-[#025938] transition-all duration-300 shadow-[0_4px_16px_rgba(4,104,66,0.25)] whitespace-nowrap"
                >
                  {t('nav.contactCta')}
                </a>
              </nav>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#046842] transition-colors"
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
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-2xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <img src={logoUrl} alt="PT" className="h-10 w-10 object-contain" />
                <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-600 hover:text-gray-900">
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
                      className={`block px-3 py-3 text-sm font-medium rounded-lg transition-colors ${active
                        ? 'bg-[#046842]/10 text-[#046842] font-semibold'
                        : 'text-gray-700 hover:text-[#046842] hover:bg-gray-50'
                        }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-3 border-t border-gray-200 pt-3">
                <a
                  href={searchHref}
                  className={`block px-3 py-3 text-sm font-medium rounded-lg transition-colors ${isActivePath(location.pathname, searchHref)
                    ? 'bg-[#046842]/10 text-[#046842] font-semibold'
                    : 'text-gray-700 hover:text-[#046842] hover:bg-gray-50'
                    }`}
                >
                  {t('nav.search')}
                </a>
                <a
                  href={sitemapHref}
                  className={`block px-3 py-3 text-sm font-medium rounded-lg transition-colors ${isActivePath(location.pathname, sitemapHref)
                    ? 'bg-[#046842]/10 text-[#046842] font-semibold'
                    : 'text-gray-700 hover:text-[#046842] hover:bg-gray-50'
                    }`}
                >
                  {t('nav.sitemap')}
                </a>
              </div>
              <a
                href={partnershipHref}
                className="mt-6 block w-full py-3 text-center text-sm font-bold uppercase tracking-wider bg-[#046842] text-white rounded-xl hover:bg-[#025938] transition-colors whitespace-nowrap shadow-md"
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
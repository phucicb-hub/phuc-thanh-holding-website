import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
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
import AppleSearchModal from '@/components/feature/AppleSearchModal';

const logoUrl = '/logo.webp';

interface MegaMenuSubItem {
  title: string;
  desc?: string;
  href: string;
  icon?: string;
  badge?: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuSubItem[];
}

interface NavItemConfig {
  pageKey: PageKey;
  labelKey: string;
  hasDropdown?: boolean;
  megaSections?: (lang: Locale) => MegaMenuSection[];
}

const navConfig: NavItemConfig[] = [
  {
    pageKey: 'home',
    labelKey: 'nav.home',
  },
  {
    pageKey: 'overview',
    labelKey: 'nav.about',
    hasDropdown: true,
    megaSections: (lang) => {
      const isVi = lang === 'vi';
      return [
        {
          title: isVi ? 'Khám phá Tập đoàn' : 'Corporate Identity',
          items: [
            {
              title: isVi ? 'Tổng quan Doanh nghiệp' : 'Enterprise Overview',
              desc: isVi ? 'Tầm nhìn, sứ mệnh & giá trị cốt lõi Phúc Thành Holding' : 'Vision, mission & corporate values',
              href: getLocalizedPath('overview', lang),
              icon: 'ri-building-4-line',
            },
            {
              title: isVi ? 'Xác minh Pháp lý & MST' : 'Legal Verification & Tax ID',
              desc: isVi ? 'Đăng ký kinh doanh số 2500716846 minh bạch' : 'Official incorporation and tax registration',
              href: getLocalizedPath('verification', lang),
              icon: 'ri-shield-check-line',
              badge: isVi ? 'Chính thức' : 'Verified',
            },
            {
              title: isVi ? 'Mạng lưới & Chi nhánh' : 'Ecosystem Network',
              desc: isVi ? 'Trụ sở chính Phú Thọ và hệ thống mạng lưới đối tác' : 'Headquarters and strategic presence',
              href: getLocalizedPath('network', lang),
              icon: 'ri-map-pin-2-line',
            },
          ],
        },
        {
          title: isVi ? 'Chuẩn mực & Năng lực' : 'Standards & Capabilities',
          items: [
            {
              title: isVi ? 'Kiến trúc Công nghệ & Zero-Trust' : 'Technology & Zero-Trust',
              desc: isVi ? 'Tiêu chuẩn an toàn thông tin & bảo vệ dữ liệu cấp tập đoàn' : 'Defense-in-depth and enterprise privacy',
              href: getLocalizedPath('technology', lang),
              icon: 'ri-lock-password-line',
            },
            {
              title: isVi ? 'Ứng dụng AI & Tự động hóa' : 'Enterprise AI & Automation',
              desc: isVi ? 'Mô hình tác tử AI Agentic tối ưu quy trình' : 'Autonomous AI agent workflows and analytics',
              href: getLocalizedPath('ai-product', lang),
              icon: 'ri-cpu-line',
              badge: 'AI Core',
            },
            {
              title: isVi ? 'Cơ hội Nghề nghiệp' : 'Careers at Phuc Thanh',
              desc: isVi ? 'Gia nhập đội ngũ kỹ sư và chuyên gia công nghệ' : 'Join our high-performing team',
              href: getLocalizedPath('careers', lang),
              icon: 'ri-user-star-line',
            },
          ],
        },
      ];
    },
  },
  {
    pageKey: 'fields',
    labelKey: 'nav.fields',
    hasDropdown: true,
    megaSections: (lang) => {
      const isVi = lang === 'vi';
      return [
        {
          title: isVi ? 'Trụ cột Công nghệ & Dữ liệu' : 'Tech & Data Pillars',
          items: [
            {
              title: isVi ? 'Chuyển đổi số Doanh nghiệp' : 'Digital Transformation',
              desc: isVi ? 'Tư vấn và số hóa toàn diện quy trình vận hành' : 'Full-spectrum digital consulting & workflows',
              href: getLocalizedPath('digital', lang),
              icon: 'ri-flow-chart',
            },
            {
              title: isVi ? 'Quản trị & Phân tích Dữ liệu' : 'Data Management & Analytics',
              desc: isVi ? 'Xây dựng Lakehouse, BI và báo cáo thông minh' : 'Data lakehouse architectures & BI analytics',
              href: getLocalizedPath('data', lang),
              icon: 'ri-pie-chart-2-line',
            },
            {
              title: isVi ? 'Đầu tư Công nghệ & Ươm tạo' : 'Venture Capital & Tech Incubation',
              desc: isVi ? 'Bảo trợ vốn và giải pháp công nghệ cho dự án mới' : 'Strategic capital and technical acceleration',
              href: getLocalizedPath('investment', lang),
              icon: 'ri-funds-line',
            },
          ],
        },
        {
          title: isVi ? 'Đào tạo & Truyền thông' : 'Education & Media',
          items: [
            {
              title: isVi ? 'Đào tạo & Phát triển Nhân lực số' : 'Workforce Upskilling & EdTech',
              desc: isVi ? 'Chuẩn hóa kỹ năng công nghệ và quản trị thực chiến' : 'Enterprise technology curriculum and certification',
              href: getLocalizedPath('training', lang),
              icon: 'ri-graduation-cap-line',
            },
            {
              title: isVi ? 'Truyền thông & Nội dung số' : 'Digital Media & Creative',
              desc: isVi ? 'Phát triển thương hiệu số và truyền thông đa kênh' : 'Brand identity systems and digital omnichannel',
              href: getLocalizedPath('media', lang),
              icon: 'ri-broadcast-line',
            },
            {
              title: isVi ? 'Xem tất cả Lĩnh vực' : 'View All Business Areas',
              desc: isVi ? 'Tổng quan 5 trụ cột hoạt động đồng bộ' : 'Explore our 5 integrated core disciplines',
              href: getLocalizedPath('fields', lang),
              icon: 'ri-arrow-right-up-line',
            },
          ],
        },
      ];
    },
  },
  {
    pageKey: 'services',
    labelKey: 'nav.services',
    hasDropdown: true,
    megaSections: (lang) => {
      const isVi = lang === 'vi';
      return [
        {
          title: isVi ? 'Dịch vụ Kỹ thuật Phần mềm' : 'Software Engineering',
          items: [
            {
              title: isVi ? 'Phần mềm theo yêu cầu' : 'Custom Software Development',
              desc: isVi ? 'Kiến trúc microservices, web app, mobile app hiệu năng cao' : 'High-concurrency bespoke web and mobile platforms',
              href: getLocalizedPath('software', lang),
              icon: 'ri-code-s-slash-line',
              badge: isVi ? 'Thế mạnh' : 'Core',
            },
            {
              title: isVi ? 'Tích hợp Hệ thống & ERP/CRM' : 'System Integration & ERP',
              desc: isVi ? 'Hợp nhất dữ liệu đa nền tảng và vận hành tự động' : 'Unified omnichannel enterprise workflows',
              href: getLocalizedPath('services', lang),
              icon: 'ri-git-merge-line',
            },
          ],
        },
        {
          title: isVi ? 'Dịch vụ Tư vấn & Triển khai' : 'Consulting & Implementation',
          items: [
            {
              title: isVi ? 'Tư vấn An ninh mạng & Zero-Trust' : 'Security Architecture Consulting',
              desc: isVi ? 'Đánh giá an toàn thông tin, thẩm định mã nguồn' : 'Vulnerability audits and hardened cloud deployments',
              href: getLocalizedPath('technology', lang),
              icon: 'ri-shield-keyhole-line',
            },
            {
              title: isVi ? 'Liên hệ Yêu cầu Báo giá Dịch vụ' : 'Request Service Quotation',
              desc: isVi ? 'Nhận tư vấn kỹ thuật trực tiếp từ đội ngũ chuyên gia' : 'Consult directly with our solution architects',
              href: getLocalizedPath('partnership', lang),
              icon: 'ri-mail-send-line',
            },
          ],
        },
      ];
    },
  },
  {
    pageKey: 'products',
    labelKey: 'nav.products',
    hasDropdown: true,
    megaSections: (lang) => {
      const isVi = lang === 'vi';
      return [
        {
          title: isVi ? 'Hệ sinh thái Y tế & Dữ liệu' : 'Digital Health & Big Data',
          items: [
            {
              title: 'PT Clinic Platform',
              desc: isVi ? 'Phần mềm quản lý phòng khám chuyên khoa, bệnh án điện tử EHR' : 'Cloud clinical management platform & telehealth',
              href: getLocalizedPath('pt-clinic', lang),
              icon: 'ri-heart-pulse-line',
              badge: 'Flagship',
            },
            {
              title: 'PT DataLake Engine',
              desc: isVi ? 'Kho dữ liệu lâm sàng y tế & phân tích dự báo thông minh' : 'Predictive healthcare data lakehouse architecture',
              href: getLocalizedPath('pt-datalake', lang),
              icon: 'ri-database-2-line',
            },
          ],
        },
        {
          title: isVi ? 'Hệ sinh thái Giáo dục & AI' : 'EdTech & Artificial Intelligence',
          items: [
            {
              title: 'PT LMS Ecosystem',
              desc: isVi ? 'Nền tảng quản lý đào tạo trực tuyến chuẩn doanh nghiệp' : 'Enterprise-grade cloud learning management suite',
              href: getLocalizedPath('pt-lms', lang),
              icon: 'ri-graduation-cap-line',
            },
            {
              title: isVi ? 'AI Agentic Workflow' : 'Autonomous AI Agents',
              desc: isVi ? 'Tự động hóa tác vụ chuyên sâu với mô hình AI đa tác nhân' : 'Enterprise multi-agent autonomous automation',
              href: getLocalizedPath('ai-product', lang),
              icon: 'ri-magic-line',
              badge: 'New',
            },
            {
              title: isVi ? 'Xem toàn bộ Sản phẩm' : 'View All Products',
              desc: isVi ? 'Danh mục các giải pháp phần mềm độc lập' : 'Complete portfolio of sovereign platforms',
              href: getLocalizedPath('products', lang),
              icon: 'ri-arrow-right-line',
            },
          ],
        },
      ];
    },
  },
  {
    pageKey: 'projects',
    labelKey: 'nav.projects',
  },
  {
    pageKey: 'news',
    labelKey: 'nav.news',
  },
  {
    pageKey: 'careers',
    labelKey: 'nav.careers',
  },
  {
    pageKey: 'contact',
    labelKey: 'nav.contact',
  },
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
  const isVi = lang === 'vi';

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeFlyout, setActiveFlyout] = useState<PageKey | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [noticeTarget, setNoticeTarget] = useState<Locale | null>(null);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
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
    setActiveFlyout(null);
  }, [location.pathname]);

  // Global hotkey: Cmd+K / Ctrl+K opens Apple Search Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const handleMouseEnterItem = (key: PageKey, hasDropdown?: boolean) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    if (hasDropdown) {
      setActiveFlyout(key);
    } else {
      setActiveFlyout(null);
    }
  };

  const handleMouseLeaveItem = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveFlyout(null);
    }, 180);
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const activeConfig = navConfig.find((c) => c.pageKey === activeFlyout);
  const activeMegaSections = activeConfig?.megaSections ? activeConfig.megaSections(lang) : [];

  return (
    <>
      <header className="w-full relative z-40">
        {/* Top bar (Corporate Utility Bar) */}
        <div className="bg-[#f8fafc] border-b border-gray-200/80">
          <div className="container-main">
            <div className="flex items-center justify-between h-9 text-xs text-gray-600">
              {/* Left: Quick Tax ID / Hotline status */}
              <div className="hidden sm:flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#046842]" />
                  <span className="font-semibold text-gray-800">MST: 2500716846</span>
                </span>
                <span className="text-gray-300">•</span>
                <a href="tel:0343089666" className="hover:text-[#046842] transition-colors font-medium">
                  Hotline: 0343.089.666
                </a>
              </div>

              {/* Right: Search, Sitemap, Language switcher */}
              <div className="flex items-center justify-end w-full sm:w-auto gap-4">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-[#046842] transition-colors whitespace-nowrap cursor-pointer"
                  title={isVi ? 'Tìm kiếm (Ctrl + K)' : 'Search (Ctrl + K)'}
                >
                  <i className="ri-search-line w-3 h-3 flex items-center justify-center text-xs" />
                  <span>{t('nav.search')}</span>
                  <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 text-[10px] text-gray-400 bg-gray-100 rounded border border-gray-200">
                    ⌘K
                  </kbd>
                </button>

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
        </div>

        {/* Main navigation (Apple Pro Glass bar) */}
        <div
          className={`transition-all duration-300 ${scrolled
              ? 'fixed top-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
              : 'relative bg-white border-b border-gray-200/80'
            }`}
          onMouseLeave={handleMouseLeaveItem}
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
                      className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_2px_8px_rgba(4,104,66,0.15)] transition-transform duration-300 group-hover:scale-105"
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
                    className="h-11 w-11 md:h-13 md:w-13 object-contain drop-shadow-[0_2px_8px_rgba(4,104,66,0.15)] transition-transform duration-300 group-hover:scale-105"
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

              {/* Desktop nav with Apple-style hover detection */}
              <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {navConfig.map((item) => {
                  const href = getLocalizedPath(item.pageKey, lang);
                  const active = isActivePath(location.pathname, href);
                  const isHovered = activeFlyout === item.pageKey;

                  return (
                    <div
                      key={item.pageKey}
                      className="relative py-2"
                      onMouseEnter={() => handleMouseEnterItem(item.pageKey, item.hasDropdown)}
                    >
                      <a
                        href={href}
                        className={`inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all rounded-lg whitespace-nowrap ${active || isHovered
                            ? 'text-[#046842] bg-[#046842]/8 font-semibold'
                            : 'text-gray-700 hover:text-[#046842] hover:bg-gray-100/70'
                          }`}
                      >
                        <span>{t(item.labelKey)}</span>
                        {item.hasDropdown && (
                          <i
                            className={`ri-arrow-down-s-line text-xs transition-transform duration-200 ${isHovered ? 'rotate-180 text-[#046842]' : 'text-gray-400'
                              }`}
                          />
                        )}
                      </a>
                      {active && (
                        <span className="absolute left-2.5 right-2.5 bottom-1 h-0.5 bg-[#046842] rounded-full shadow-[0_0_8px_rgba(4,104,66,0.4)]" />
                      )}
                    </div>
                  );
                })}

                {/* Search Quick Icon Button */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 ml-1 text-gray-600 hover:text-[#046842] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Open Search"
                  title={isVi ? 'Tìm kiếm' : 'Search'}
                >
                  <i className="ri-search-line text-base" />
                </button>

                {/* Contact CTA Button */}
                <a
                  href={partnershipHref}
                  className="ml-3 xl:ml-4 px-4 xl:px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#046842] text-white rounded-full hover:bg-[#025938] transition-all duration-300 shadow-[0_4px_16px_rgba(4,104,66,0.25)] hover:shadow-[0_6px_20px_rgba(4,104,66,0.35)] whitespace-nowrap"
                >
                  {t('nav.contactCta')}
                </a>
              </nav>

              {/* Mobile hamburger & search icons */}
              <div className="flex items-center gap-1 lg:hidden">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-700 hover:text-[#046842] transition-colors"
                  aria-label="Search"
                >
                  <i className="ri-search-line text-xl" />
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 text-gray-700 hover:text-[#046842] transition-colors"
                  aria-label="Toggle menu"
                >
                  <i
                    className={`${mobileOpen ? 'ri-close-line' : 'ri-menu-line'
                      } w-6 h-6 flex items-center justify-center text-2xl`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Apple-style Interactive Mega Menu Flyout (Desktop) */}
          {activeFlyout && activeMegaSections.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full bg-white/98 backdrop-blur-2xl border-b border-gray-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] z-50 animate-fade-in"
              onMouseEnter={() => {
                if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
              }}
              onMouseLeave={handleMouseLeaveItem}
            >
              <div className="container-main max-w-7xl mx-auto py-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeMegaSections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">
                        {section.title}
                      </div>
                      <div className="space-y-2">
                        {section.items.map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            onClick={() => setActiveFlyout(null)}
                            className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#f8fafc] border border-transparent hover:border-gray-200/80 transition-all"
                          >
                            {sub.icon && (
                              <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-[#046842]/10 text-gray-600 group-hover:text-[#046842] flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                                <i className={`${sub.icon} text-base`} />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900 group-hover:text-[#046842] transition-colors">
                                  {sub.title}
                                </span>
                                {sub.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#046842]/10 text-[#046842]">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              {sub.desc && (
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                  {sub.desc}
                                </p>
                              )}
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Spotlight Quick Action Card (Apple-Style) */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] border border-gray-200/90 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#046842]/10 text-[#046842] text-xs font-bold mb-3">
                        <i className="ri-verified-badge-line" />
                        <span>MST: 2500716846</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 mb-2">
                        {isVi ? 'Hợp Tác Chiến Lược Cùng Phúc Thành' : 'Strategic Partnership Terminal'}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {isVi
                          ? 'Đồng hành phát triển giải pháp phần mềm, chuyển giao công nghệ y tế số hoặc cùng đầu tư ươm tạo dự án.'
                          : 'Partner with us on bespoke software engineering, clinical digital health, and high-impact tech ventures.'}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-gray-200">
                      <a
                        href={partnershipHref}
                        onClick={() => setActiveFlyout(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#046842] hover:text-[#025938] transition-colors"
                      >
                        <span>{isVi ? 'Gửi đề xuất hợp tác ngay' : 'Submit direct proposal'}</span>
                        <i className="ri-arrow-right-line" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Apple-style Mobile Menu Overlay & Accordion Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-84 max-w-[85vw] bg-white border-l border-gray-200 overflow-y-auto shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logoUrl} alt="PT" className="h-9 w-9 object-contain" />
                <span className="font-bold text-sm text-gray-900">PT HOLDING</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900"
                aria-label="Close menu"
              >
                <i className="ri-close-line text-2xl" />
              </button>
            </div>

            {/* Mobile Search Button Trigger */}
            <div className="p-4 pb-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-500 text-xs text-left transition-colors"
              >
                <i className="ri-search-line text-[#046842] text-sm" />
                <span>{isVi ? 'Tìm kiếm nhanh (sản phẩm, tin tức)...' : 'Search solutions, products...'}</span>
              </button>
            </div>

            {/* Navigation List with Accordions */}
            <nav className="flex-1 p-4 space-y-1">
              {navConfig.map((item) => {
                const href = getLocalizedPath(item.pageKey, lang);
                const active = isActivePath(location.pathname, href);
                const sections = item.megaSections ? item.megaSections(lang) : [];
                const isExpanded = openAccordion === item.pageKey;

                return (
                  <div key={item.pageKey} className="rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between">
                      <a
                        href={href}
                        className={`flex-1 px-3 py-2.5 text-sm font-semibold rounded-lg transition-colors ${active
                            ? 'bg-[#046842]/10 text-[#046842]'
                            : 'text-gray-800 hover:text-[#046842] hover:bg-gray-50'
                          }`}
                      >
                        {t(item.labelKey)}
                      </a>
                      {item.hasDropdown && (
                        <button
                          onClick={() => toggleAccordion(item.pageKey)}
                          className="p-2 text-gray-400 hover:text-gray-700"
                          aria-label="Toggle submenu"
                        >
                          <i
                            className={`ri-arrow-down-s-line text-lg transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#046842]' : ''
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Accordion Sub-links */}
                    {item.hasDropdown && isExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-1 bg-gray-50/80 rounded-lg mt-1 border border-gray-100">
                        {sections.flatMap((s) => s.items).map((sub, sIdx) => (
                          <a
                            key={sIdx}
                            href={sub.href}
                            className="flex items-center gap-2 py-2 px-2 text-xs font-medium text-gray-600 hover:text-[#046842] hover:bg-white rounded-md transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#046842]" />
                            <span className="flex-1 truncate">{sub.title}</span>
                            {sub.badge && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#046842]/10 text-[#046842] font-semibold">
                                {sub.badge}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="p-4 border-t border-gray-200 bg-[#f8fafc] space-y-3">
              <a
                href={partnershipHref}
                className="block w-full py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#046842] text-white rounded-xl hover:bg-[#025938] transition-colors shadow-md whitespace-nowrap"
              >
                {t('nav.contactCta')}
              </a>
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-200">
                <a href={sitemapHref} className="hover:text-[#046842] transition-colors">
                  {t('nav.sitemap')}
                </a>
                <a href="tel:0343089666" className="font-semibold text-gray-700 hover:text-[#046842] transition-colors">
                  0343.089.666
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apple Command Search Palette Modal */}
      <AppleSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Dynamic Content Translation Notice Modal */}
      {noticeTarget && (
        <LanguageNotice target={noticeTarget} onClose={() => setNoticeTarget(null)} />
      )}
    </>
  );
}

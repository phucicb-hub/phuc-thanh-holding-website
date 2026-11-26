export type Locale = 'vi' | 'en';

export type PageKey =
  | 'technology'
  | 'verification'
  | 'ai-product'
  | 'home'
  | 'overview'
  | 'fields'
  | 'services'
  | 'products'
  | 'pt-lms'
  | 'pt-clinic'
  | 'pt-datalake'
  | 'projects'
  | 'news'
  | 'careers'
  | 'contact'
  | 'partnership'
  | 'sitemap'
  | 'terms'
  | 'service-terms'
  | 'privacy'
  | 'disclaimer'
  | 'network'
  | 'training'
  | 'software'
  | 'digital'
  | 'data'
  | 'investment'
  | 'media'
  | 'search';

interface PageEntry {
  vi: string;
  en: string;
}

export const DEFAULT_LOCALE: Locale = 'vi';

const PAGES: Record<PageKey, PageEntry> = {
  technology: { vi: '/vi/cong-nghe', en: '/en/technology' },
  verification: { vi: '/vi/xac-minh-doanh-nghiep', en: '/en/company-verification' },
  'ai-product': { vi: '/vi/san-pham-ai', en: '/en/ai-products' },
  home: { vi: '/vi', en: '/en' },
  overview: { vi: '/vi/ve-phuc-thanh/tong-quan', en: '/en/about/overview' },
  fields: { vi: '/vi/linh-vuc-hoat-dong', en: '/en/business-areas' },
  services: { vi: '/vi/dich-vu', en: '/en/services' },
  products: { vi: '/vi/san-pham', en: '/en/products' },
  'pt-lms': { vi: '/vi/san-pham/pt-lms', en: '/en/products/pt-lms' },
  'pt-clinic': { vi: '/vi/san-pham/pt-clinic', en: '/en/products/pt-clinic' },
  'pt-datalake': { vi: '/vi/san-pham/pt-datalake', en: '/en/products/pt-datalake' },
  projects: { vi: '/vi/du-an', en: '/en/projects' },
  news: { vi: '/vi/tin-tuc', en: '/en/news' },
  careers: { vi: '/vi/tuyen-dung', en: '/en/careers' },
  contact: { vi: '/vi/lien-he', en: '/en/contact' },
  partnership: { vi: '/vi/lien-he-hop-tac', en: '/en/partnership-contact' },
  sitemap: { vi: '/vi/so-do-trang', en: '/en/sitemap' },
  terms: { vi: '/vi/dieu-khoan', en: '/en/terms-conditions' },
  'service-terms': { vi: '/vi/dieu-khoan-dich-vu', en: '/en/service-terms' },
  privacy: { vi: '/vi/chinh-sach-quyen-rieng-tu', en: '/en/privacy-policy' },
  disclaimer: { vi: '/vi/khuyen-cao', en: '/en/disclaimer' },
  network: { vi: '/vi/mang-luoi', en: '/en/network' },
  training: {
    vi: '/vi/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
    en: '/en/business-areas/training-human-resource-development',
  },
  software: {
    vi: '/vi/dich-vu/phan-mem-theo-yeu-cau',
    en: '/en/services/custom-software-development',
  },
  digital: {
    vi: '/vi/linh-vuc/chuyen-doi-so-doanh-nghiep',
    en: '/en/business-areas/digital-transformation',
  },
  data: {
    vi: '/vi/linh-vuc/quan-tri-phan-tich-du-lieu',
    en: '/en/business-areas/data-management-analytics',
  },
  investment: {
    vi: '/vi/linh-vuc/dau-tu-cong-nghe',
    en: '/en/business-areas/investment-technology',
  },
  media: {
    vi: '/vi/linh-vuc/truyen-thong-noi-dung-so',
    en: '/en/business-areas/digital-media-content',
  },
  search: { vi: '/vi/tim-kiem', en: '/en/search' },
};

function normalize(path: string): string {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const match = pathname.match(/^\/(vi|en)(?:\/|$)/);
  return match ? (match[1] as Locale) : null;
}

export function getLocalizedPath(key: PageKey, locale: Locale): string {
  return PAGES[key][locale];
}

export function getPageKeyFromPath(pathname: string): PageKey | null {
  const path = normalize(pathname);
  for (const key of Object.keys(PAGES) as PageKey[]) {
    if (PAGES[key].vi === path || PAGES[key].en === path) return key;
  }
  return null;
}

const DYNAMIC_PREFIXES: { vi: string; en: string }[] = [
  { vi: '/vi/tin-tuc', en: '/en/news' },
  { vi: '/vi/san-pham', en: '/en/products' },
  { vi: '/vi/du-an', en: '/en/projects' },
];

export function getEquivalentPath(pathname: string, targetLocale: Locale): string {
  const path = normalize(pathname);

  const staticKey = getPageKeyFromPath(path);
  if (staticKey) return PAGES[staticKey][targetLocale];

  for (const prefixes of DYNAMIC_PREFIXES) {
    for (const prefix of [prefixes.vi, prefixes.en]) {
      if (path === prefix || path.startsWith(`${prefix}/`)) {
        const param = path.slice(prefix.length + 1);
        const targetPrefix = targetLocale === 'vi' ? prefixes.vi : prefixes.en;
        return param ? `${targetPrefix}/${param}` : targetPrefix;
      }
    }
  }

  return PAGES.home[targetLocale];
}

export function detailHref(
  section: 'news' | 'products' | 'projects',
  param: string | number,
  locale: Locale,
): string {
  const prefixes: Record<string, { vi: string; en: string }> = {
    news: { vi: '/vi/tin-tuc', en: '/en/news' },
    products: { vi: '/vi/san-pham', en: '/en/products' },
    projects: { vi: '/vi/du-an', en: '/en/projects' },
  };
  return `${prefixes[section][locale]}/${param}`;
}

export type DynamicSection = 'news' | 'products' | 'projects';

export function getDynamicDetail(
  pathname: string,
): { section: DynamicSection; param: string; locale: Locale } | null {
  const path = normalize(pathname);
  if (getPageKeyFromPath(path)) return null;

  const prefixes: { section: DynamicSection; vi: string; en: string }[] = [
    { section: 'news', vi: '/vi/tin-tuc', en: '/en/news' },
    { section: 'products', vi: '/vi/san-pham', en: '/en/products' },
    { section: 'projects', vi: '/vi/du-an', en: '/en/projects' },
  ];

  for (const p of prefixes) {
    if (path.startsWith(`${p.vi}/`)) {
      const param = path.slice(p.vi.length + 1);
      if (param) return { section: p.section, param, locale: 'vi' };
    }
    if (path.startsWith(`${p.en}/`)) {
      const param = path.slice(p.en.length + 1);
      if (param) return { section: p.section, param, locale: 'en' };
    }
  }
  return null;
}

export function resolveLocaleFromStorage(): Locale {
  try {
    const saved = window.localStorage.getItem('i18nextLng');
    if (saved?.startsWith('en')) return 'en';
    if (saved?.startsWith('vi')) return 'vi';
  } catch {
    /* ignore */
  }
  if (
    typeof navigator !== 'undefined' &&
    navigator.language?.toLowerCase().startsWith('en')
  ) {
    return 'en';
  }
  return DEFAULT_LOCALE;
}

export function resolveLocale(pathname?: string): Locale {
  const current =
    pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const fromPath = getLocaleFromPath(current);
  if (fromPath) return fromPath;
  return resolveLocaleFromStorage();
}

// Maps the legacy (pre-bilingual) Vietnamese slugs to page keys, so mock data
// and any remaining hard-coded links can be resolved to the correct locale.
const LEGACY_PATH_TO_KEY: Record<string, PageKey> = {
  '/': 'home',
  '/tong-quan': 'overview',
  '/linh-vuc': 'fields',
  '/dich-vu': 'services',
  '/san-pham': 'products',
  '/du-an': 'projects',
  '/tin-tuc': 'news',
  '/tuyen-dung': 'careers',
  '/lien-he': 'contact',
  '/so-do-trang': 'sitemap',
  '/dieu-khoan': 'terms',
  '/dieu-khoan-dich-vu': 'service-terms',
  '/chinh-sach-bao-mat': 'privacy',
  '/khuyen-cao': 'disclaimer',
  '/mang-luoi': 'network',
  '/linh-vuc/dau-tu-cong-nghe': 'investment',
  '/linh-vuc/phat-trien-phan-mem': 'software',
  '/linh-vuc/chuyen-doi-so-doanh-nghiep': 'digital',
  '/linh-vuc/quan-tri-phan-tich-du-lieu': 'data',
  '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc': 'training',
  '/linh-vuc/truyen-thong-noi-dung-so': 'media',
  '/tim-kiem': 'search',
};

export function localizeLegacyHref(href: string, locale: Locale): string {
  const key = LEGACY_PATH_TO_KEY[href];
  if (key) return PAGES[key][locale];
  if (getLocaleFromPath(href)) return href;
  return href;
}

// Maps a page key back to its legacy (pre-bilingual) Vietnamese path, used by
// SEO components that key their metadata on the old URL structure.
const KEY_TO_LEGACY: Record<PageKey, string> = {
  technology: '/cong-nghe',
  verification: '/xac-minh-doanh-nghiep',
  'ai-product': '/san-pham-ai',
  home: '/',
  overview: '/tong-quan',
  fields: '/linh-vuc',
  services: '/dich-vu',
  products: '/san-pham',
  'pt-lms': '/san-pham/pt-lms',
  'pt-clinic': '/san-pham/pt-clinic',
  'pt-datalake': '/san-pham/pt-datalake',
  projects: '/du-an',
  news: '/tin-tuc',
  careers: '/tuyen-dung',
  contact: '/lien-he',
  partnership: '/lien-he',
  sitemap: '/so-do-trang',
  terms: '/dieu-khoan',
  'service-terms': '/dieu-khoan-dich-vu',
  privacy: '/chinh-sach-bao-mat',
  disclaimer: '/khuyen-cao',
  network: '/mang-luoi',
  training: '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc',
  software: '/linh-vuc/phat-trien-phan-mem',
  digital: '/linh-vuc/chuyen-doi-so-doanh-nghiep',
  data: '/linh-vuc/quan-tri-phan-tich-du-lieu',
  investment: '/linh-vuc/dau-tu-cong-nghe',
  media: '/linh-vuc/truyen-thong-noi-dung-so',
  search: '/tim-kiem',
};

export function getLegacyPath(pathname: string): string {
  const key = getPageKeyFromPath(pathname);
  if (key) return KEY_TO_LEGACY[key];
  const bare = pathname.replace(/^\/(vi|en)(?=\/|$)/, '') || '/';
  return bare;
}

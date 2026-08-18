import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchNewsById, fetchProductById, fetchProjectById } from '@/lib/content';
import type { Localized } from '@/lib/lang';
import useLang from '@/hooks/useLang';
import { getLegacyPath } from '@/lib/routes';
import { SITE_URL } from '@/lib/site';

interface BreadcrumbEntry {
  name: string;
  path: string;
}

const PAGES: Localized<Record<string, BreadcrumbEntry>> = {
  vi: {
    '/tong-quan': { name: 'Tổng quan', path: '/tong-quan' },
    '/san-pham': { name: 'Sản phẩm & Giải pháp', path: '/san-pham' },
    '/linh-vuc': { name: 'Lĩnh vực hoạt động', path: '/linh-vuc' },
    '/du-an': { name: 'Dự án', path: '/du-an' },
    '/tin-tuc': { name: 'Tin tức', path: '/tin-tuc' },
    '/tuyen-dung': { name: 'Tuyển dụng', path: '/tuyen-dung' },
    '/lien-he': { name: 'Liên hệ', path: '/lien-he' },
    '/so-do-trang': { name: 'Sơ đồ trang', path: '/so-do-trang' },
    '/dieu-khoan': { name: 'Điều kiện và Điều khoản', path: '/dieu-khoan' },
    '/dieu-khoan-dich-vu': { name: 'Điều khoản dịch vụ', path: '/dieu-khoan-dich-vu' },
    '/chinh-sach-bao-mat': { name: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' },
    '/khuyen-cao': { name: 'Khuyến cáo', path: '/khuyen-cao' },
    '/mang-luoi': { name: 'Mạng lưới', path: '/mang-luoi' },
  },
  en: {
    '/tong-quan': { name: 'Overview', path: '/tong-quan' },
    '/san-pham': { name: 'Products & Solutions', path: '/san-pham' },
    '/linh-vuc': { name: 'Business Fields', path: '/linh-vuc' },
    '/du-an': { name: 'Projects', path: '/du-an' },
    '/tin-tuc': { name: 'News', path: '/tin-tuc' },
    '/tuyen-dung': { name: 'Careers', path: '/tuyen-dung' },
    '/lien-he': { name: 'Contact', path: '/lien-he' },
    '/so-do-trang': { name: 'Sitemap', path: '/so-do-trang' },
    '/dieu-khoan': { name: 'Terms & Conditions', path: '/dieu-khoan' },
    '/dieu-khoan-dich-vu': { name: 'Service Terms', path: '/dieu-khoan-dich-vu' },
    '/chinh-sach-bao-mat': { name: 'Privacy Policy', path: '/chinh-sach-bao-mat' },
    '/khuyen-cao': { name: 'Disclaimer', path: '/khuyen-cao' },
    '/mang-luoi': { name: 'Network', path: '/mang-luoi' },
  },
};

// Các trang con thuộc Lĩnh vực hoạt động — sinh breadcrumb 3 cấp:
// Trang chủ → Lĩnh vực hoạt động → [tên lĩnh vực]
const FIELD_CHILDREN: Localized<Record<string, string>> = {
  vi: {
    '/linh-vuc/dau-tu-cong-nghe': 'Đầu tư & Công nghệ',
    '/linh-vuc/phat-trien-phan-mem': 'Phát triển phần mềm',
    '/linh-vuc/chuyen-doi-so-doanh-nghiep': 'Chuyển đổi số doanh nghiệp',
    '/linh-vuc/quan-tri-phan-tich-du-lieu': 'Quản trị & Phân tích dữ liệu',
    '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc': 'Đào tạo & Phát triển nguồn nhân lực',
    '/linh-vuc/truyen-thong-noi-dung-so': 'Truyền thông & Nội dung số',
  },
  en: {
    '/linh-vuc/dau-tu-cong-nghe': 'Investment & Technology',
    '/linh-vuc/phat-trien-phan-mem': 'Software Development',
    '/linh-vuc/chuyen-doi-so-doanh-nghiep': 'Enterprise Digital Transformation',
    '/linh-vuc/quan-tri-phan-tich-du-lieu': 'Data Management & Analytics',
    '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc': 'Training & Workforce Development',
    '/linh-vuc/truyen-thong-noi-dung-so': 'Media & Digital Content',
  },
};

const LABELS: Localized<{
  home: string;
  fields: string;
  news: string;
  products: string;
  projects: string;
}> = {
  vi: {
    home: 'Trang chủ',
    fields: 'Lĩnh vực hoạt động',
    news: 'Tin tức',
    products: 'Sản phẩm & Giải pháp',
    projects: 'Dự án',
  },
  en: {
    home: 'Home',
    fields: 'Business Fields',
    news: 'News',
    products: 'Products & Solutions',
    projects: 'Projects',
  },
};

const DETAIL_PATH_RE = /^\/(tin-tuc|san-pham|du-an)\/\d+$/;

async function resolveDetailBreadcrumb(
  path: string,
  lang: 'vi' | 'en',
): Promise<{ name: string; url: string }[] | null> {
  const labels = LABELS[lang];

  const newsMatch = path.match(/^\/tin-tuc\/(\d+)$/);
  if (newsMatch) {
    const article = await fetchNewsById(Number(newsMatch[1]));
    if (article) {
      return [
        { name: labels.home, url: `${SITE_URL}/` },
        { name: labels.news, url: `${SITE_URL}/tin-tuc` },
        { name: article.title, url: `${SITE_URL}${path}` },
      ];
    }
    return null;
  }

  const productMatch = path.match(/^\/san-pham\/(\d+)$/);
  if (productMatch) {
    const product = await fetchProductById(Number(productMatch[1]));
    if (product) {
      return [
        { name: labels.home, url: `${SITE_URL}/` },
        { name: labels.products, url: `${SITE_URL}/san-pham` },
        { name: product.title, url: `${SITE_URL}${path}` },
      ];
    }
    return null;
  }

  const projectMatch = path.match(/^\/du-an\/(\d+)$/);
  if (projectMatch) {
    const project = await fetchProjectById(Number(projectMatch[1]));
    if (project) {
      return [
        { name: labels.home, url: `${SITE_URL}/` },
        { name: labels.projects, url: `${SITE_URL}/du-an` },
        { name: project.title, url: `${SITE_URL}${path}` },
      ];
    }
    return null;
  }

  return null;
}

const SCRIPT_ID = 'breadcrumb-jsonld';

export default function BreadcrumbSeo() {
  const location = useLocation();
  const lang = useLang();

  useEffect(() => {
    const path = getLegacyPath(location.pathname);
    const existing = document.getElementById(SCRIPT_ID);
    let cancelled = false;

    const applyItems = (items: { name: string; url: string }[]) => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

      let script = existing as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = SCRIPT_ID;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    };

    const fieldChildName = FIELD_CHILDREN[lang][path];

    if (DETAIL_PATH_RE.test(path)) {
      resolveDetailBreadcrumb(path, lang).then((items) => {
        if (cancelled) return;
        if (items) {
          applyItems(items);
        } else if (existing) {
          existing.remove();
        }
      });
      return () => {
        cancelled = true;
      };
    }

    if (fieldChildName) {
      // Trang con của Lĩnh vực hoạt động → breadcrumb 3 cấp
      applyItems([
        { name: LABELS[lang].home, url: `${SITE_URL}/` },
        { name: LABELS[lang].fields, url: `${SITE_URL}/linh-vuc` },
        { name: fieldChildName, url: `${SITE_URL}${path}` },
      ]);
      return;
    }

    const entry = PAGES[lang][path];
    if (!entry) {
      if (existing) existing.remove();
      return;
    }
    applyItems([
      { name: LABELS[lang].home, url: `${SITE_URL}/` },
      { name: entry.name, url: `${SITE_URL}${entry.path}` },
    ]);
  }, [location.pathname, lang]);

  return null;
}
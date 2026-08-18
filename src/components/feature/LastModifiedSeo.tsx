import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchNewsById, fetchProductById, fetchProjectById } from '@/lib/content';
import { getLegacyPath } from '@/lib/routes';

const META_ID = 'meta-last-modified';

const PAGES: Record<string, string> = {
  '/': '2026-08-15',
  '/tong-quan': '2026-08-10',
  '/san-pham': '2026-08-12',
  '/linh-vuc': '2026-08-09',
  '/linh-vuc/dao-tao-phat-trien-nguon-nhan-luc': '2026-08-09',
  '/linh-vuc/phat-trien-phan-mem': '2026-08-10',
  '/linh-vuc/chuyen-doi-so-doanh-nghiep': '2026-08-11',
  '/linh-vuc/quan-tri-phan-tich-du-lieu': '2026-08-12',
  '/linh-vuc/dau-tu-cong-nghe': '2026-08-08',
  '/linh-vuc/truyen-thong-noi-dung-so': '2026-08-07',
  '/du-an': '2026-08-08',
  '/tin-tuc': '2026-08-14',
  '/tuyen-dung': '2026-08-07',
  '/lien-he': '2026-08-13',
  '/so-do-trang': '2026-08-06',
  '/dieu-khoan': '2026-08-05',
  '/dieu-khoan-dich-vu': '2026-08-05',
  '/chinh-sach-bao-mat': '2026-08-05',
  '/khuyen-cao': '2026-08-04',
  '/mang-luoi': '2026-08-06',
};

async function resolveLastModified(path: string): Promise<string | null> {
  const newsMatch = path.match(/^\/tin-tuc\/(\d+)$/);
  if (newsMatch) {
    const article = await fetchNewsById(Number(newsMatch[1]));
    return article?.date ?? null;
  }

  const productMatch = path.match(/^\/san-pham\/(\d+)$/);
  if (productMatch) {
    const product = await fetchProductById(Number(productMatch[1]));
    return product?.date ?? null;
  }

  const projectMatch = path.match(/^\/du-an\/(\d+)$/);
  if (projectMatch) {
    const project = await fetchProjectById(Number(projectMatch[1]));
    return project ? `${project.year}-01-01` : null;
  }

  return null;
}

export default function LastModifiedSeo() {
  const location = useLocation();

  useEffect(() => {
    const path = getLegacyPath(location.pathname);
    const staticDate = PAGES[path];

    let cancelled = false;

    const apply = (lastModified: string) => {
      if (cancelled) return;
      let meta = document.getElementById(META_ID) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.id = META_ID;
        meta.setAttribute('http-equiv', 'Last-Modified');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', lastModified);
    };

    if (staticDate) {
      apply(staticDate);
    } else {
      resolveLastModified(path)
        .then((lastModified) => {
          if (lastModified) apply(lastModified);
        })
        .catch(() => {
          // Bỏ qua lỗi fetch — không chặn hiển thị trang
        });
    }

    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  return null;
}
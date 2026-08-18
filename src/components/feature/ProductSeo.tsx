import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProductById } from '@/lib/content';
import { productCategories } from '@/mocks/products';
import type { Localized } from '@/lib/lang';
import useLang from '@/hooks/useLang';
import { getLegacyPath } from '@/lib/routes';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'product-jsonld';

const ORG_NAME: Localized<string> = {
  vi: 'Phúc Thành Holding',
  en: 'Phuc Thanh Holding',
};

export default function ProductSeo() {
  const location = useLocation();
  const lang = useLang();

  useEffect(() => {
    const path = location.pathname;
    const productMatch = getLegacyPath(path).match(/^\/san-pham\/(\d+)$/);
    let cancelled = false;

    if (!productMatch) {
      document.getElementById(SCRIPT_ID)?.remove();
      return;
    }

    const productId = Number(productMatch[1]);

    fetchProductById(productId)
      .then((product) => {
        if (cancelled || !product) return;

        const categoryLabel =
          productCategories[lang].find((c) => c.id === product.categoryId)?.label ?? '';

        const schema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.description,
          image: product.image,
          category: categoryLabel,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${path}`,
          },
          brand: {
            '@type': 'Brand',
            name: ORG_NAME[lang],
            logo: LOGO_URL,
          },
        };

        let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (!script) {
          script = document.createElement('script');
          script.type = 'application/ld+json';
          script.id = SCRIPT_ID;
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
      })
      .catch(() => {
        // Bỏ qua lỗi fetch — không chặn hiển thị trang
      });

    return () => {
      cancelled = true;
    };
  }, [location.pathname, lang]);

  return null;
}
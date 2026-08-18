import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchNewsById } from '@/lib/content';
import type { Localized } from '@/lib/lang';
import useLang from '@/hooks/useLang';
import { getLegacyPath } from '@/lib/routes';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'article-jsonld';

const ORG_NAME: Localized<string> = {
  vi: 'Phúc Thành Holding',
  en: 'Phuc Thanh Holding',
};

export default function ArticleSeo() {
  const location = useLocation();
  const lang = useLang();

  useEffect(() => {
    const path = location.pathname;
    const newsMatch = getLegacyPath(path).match(/^\/tin-tuc\/(\d+)$/);
    let cancelled = false;

    if (!newsMatch) {
      document.getElementById(SCRIPT_ID)?.remove();
      return;
    }

    const articleId = Number(newsMatch[1]);

    fetchNewsById(articleId)
      .then((article) => {
        if (cancelled || !article) return;

        const schema = {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: article.title,
          description: article.excerpt,
          image: [article.image],
          datePublished: article.date,
          dateModified: article.date,
          articleSection: article.category,
          keywords: article.tags.join(', '),
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${path}`,
          },
          author: {
            '@type': 'Organization',
            name: ORG_NAME[lang],
            url: `${SITE_URL}/`,
          },
          publisher: {
            '@type': 'Organization',
            name: ORG_NAME[lang],
            url: `${SITE_URL}/`,
            logo: {
              '@type': 'ImageObject',
              url: LOGO_URL,
            },
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
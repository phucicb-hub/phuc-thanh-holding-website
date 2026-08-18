import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchProjectById } from '@/lib/content';
import type { Localized } from '@/lib/lang';
import useLang from '@/hooks/useLang';
import { getLegacyPath } from '@/lib/routes';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'project-jsonld';

const ORG_NAME: Localized<string> = {
  vi: 'Phúc Thành Holding',
  en: 'Phuc Thanh Holding',
};

export default function ProjectSeo() {
  const location = useLocation();
  const lang = useLang();

  useEffect(() => {
    const path = location.pathname;
    const projectMatch = getLegacyPath(path).match(/^\/du-an\/(\d+)$/);
    let cancelled = false;

    if (!projectMatch) {
      document.getElementById(SCRIPT_ID)?.remove();
      return;
    }

    const projectId = Number(projectMatch[1]);

    fetchProjectById(projectId)
      .then((project) => {
        if (cancelled || !project) return;

        const schema = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: project.title,
          description: project.description,
          image: project.image,
          serviceType: project.category,
          category: project.category,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}${path}`,
          },
          provider: {
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
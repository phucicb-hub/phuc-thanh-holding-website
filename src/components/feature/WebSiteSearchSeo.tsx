import { useEffect } from 'react';
import { SITE_URL } from '@/lib/site';

const SCRIPT_ID = 'website-search-jsonld';

export default function WebSiteSearchSeo() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: `${SITE_URL}/`,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/vi/tim-kiem?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };

    let script = existing as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SCRIPT_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, []);

  return null;
}
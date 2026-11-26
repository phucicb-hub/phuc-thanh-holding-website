import { useEffect } from 'react';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'organization-jsonld';

export default function OrganizationSeo() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
      alternateName: 'Phuc Thanh Holding',
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      description:
        'A trusted investment and technology partner providing software solutions, digital transformation and training for businesses.',
      email: 'phuclv@phucthanhholding.com',
      telephone: '+84343089666',
      taxID: '2500716846',
      foundingDate: '2024-04-04',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '424 Me Linh Street, Vinh Phuc Ward',
        addressLocality: 'Phu Tho',
        addressCountry: 'VN',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+84343089666',
          contactType: 'customer service',
          email: 'phuclv@phucthanhholding.com',
          areaServed: 'VN',
          availableLanguage: ['Vietnamese', 'English'],
        },
      ],
      sameAs: [
        'https://facebook.com/phucthanhholding',
        'https://youtube.com/phucthanhholding',
        'https://zalo.me/phucthanhholding',
      ],
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
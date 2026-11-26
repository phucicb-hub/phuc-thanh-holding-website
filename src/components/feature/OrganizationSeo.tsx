import { useEffect } from 'react';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'organization-jsonld';

export default function OrganizationSeo() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Organization', 'Corporation'],
          '@id': `${SITE_URL}/#organization`,
          name: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
          alternateName: [
            'Phuc Thanh Holding',
            'Phuc Thanh Holding Investment and Technology Joint Stock Company',
            'Phúc Thành Holding',
          ],
          url: `${SITE_URL}/`,
          logo: {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#logo`,
            url: LOGO_URL,
            caption: 'Phuc Thanh Holding Logo',
          },
          image: LOGO_URL,
          description:
            'Đối tác tin cậy về đầu tư công nghệ, phát triển phần mềm và chuyển đổi số toàn diện cho doanh nghiệp.',
          email: 'info@phucthanhholding.com',
          telephone: '+84-343-089-666',
          taxID: '2500716846',
          foundingDate: '2024-04-04',
          founder: {
            '@type': 'Person',
            name: 'Lê Văn Phúc',
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc',
            addressLocality: 'Phú Thọ',
            addressRegion: 'Phú Thọ',
            postalCode: '290000',
            addressCountry: 'VN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 21.3228,
            longitude: 105.403,
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+84-343-089-666',
              contactType: 'customer service',
              email: 'info@phucthanhholding.com',
              areaServed: 'VN',
              availableLanguage: ['Vietnamese', 'English'],
            },
          ],
          sameAs: [
            'https://facebook.com/phucthanhholding',
            'https://youtube.com/phucthanhholding',
            'https://zalo.me/phucthanhholding',
          ],
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: 'Phuc Thanh Holding',
          description: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
          inLanguage: ['vi-VN', 'en-US'],
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_URL}/vi/tim-kiem?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
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

import { useEffect } from 'react';
import type { Localized } from '@/lib/lang';
import useLang from '@/hooks/useLang';
import { SITE_URL, LOGO_URL } from '@/lib/site';

const SCRIPT_ID = 'localbusiness-contact-jsonld';

const BUSINESS: Localized<{
  name: string;
  alternateName: string;
  description: string;
  priceRange: string;
  paymentAccepted: string;
  streetAddress: string;
  locality: string;
  region: string;
}> = {
  vi: {
    name: 'Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding',
    alternateName: 'Phúc Thành Holding',
    description:
      'Đối tác đầu tư và công nghệ đáng tin cậy, cung cấp giải pháp phần mềm, chuyển đổi số và đào tạo cho doanh nghiệp.',
    priceRange: 'Liên hệ',
    paymentAccepted: 'Chuyển khoản, Tiền mặt',
    streetAddress: 'Số 424 Đường Mê Linh, Phường Vĩnh Phúc',
    locality: 'Phú Thọ',
    region: 'Phú Thọ',
  },
  en: {
    name: 'Phuc Thanh Holding Investment and Technology Joint Stock Company',
    alternateName: 'Phuc Thanh Holding',
    description:
      'A trusted investment and technology partner providing software solutions, digital transformation and training for businesses.',
    priceRange: 'Contact us',
    paymentAccepted: 'Bank transfer, Cash',
    streetAddress: '424 Me Linh Street, Vinh Phuc Ward',
    locality: 'Phu Tho',
    region: 'Phu Tho',
  },
};

export default function LocalBusinessSeo() {
  const lang = useLang();

  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID);
    const info = BUSINESS[lang];

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: info.name,
      alternateName: info.alternateName,
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      image: LOGO_URL,
      description: info.description,
      telephone: '+84343089666',
      email: 'phuclv@phucthanhholding.com',
      priceRange: info.priceRange,
      currenciesAccepted: 'VND',
      paymentAccepted: info.paymentAccepted,
      address: {
        '@type': 'PostalAddress',
        streetAddress: info.streetAddress,
        addressLocality: info.locality,
        addressRegion: info.region,
        addressCountry: 'VN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '21.3228',
        longitude: '105.4030',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:30',
        },
      ],
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
  }, [lang]);

  return null;
}
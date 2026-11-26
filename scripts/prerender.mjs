import { build } from 'vite';
import { pathToFileURL } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(process.argv[2] ?? 'out');
const template = await readFile(path.join(output, 'index.html'), 'utf8');
const escape = value => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const runtime = path.resolve('deployment/prerender-runtime');
if (!runtime.startsWith(path.resolve('deployment') + path.sep)) throw new Error('Invalid renderer output');
await build({ build: { ssr: 'src/prerender.tsx', outDir: runtime, emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'entry.mjs' } } } });

{
  const { renderPublicPage } = await import(pathToFileURL(path.join(runtime, 'entry.mjs')).href);
  const pairs = [
    ['/en', '/vi'],
    ['/en/company-verification', '/vi/xac-minh-doanh-nghiep'],
    ['/en/ai-products', '/vi/san-pham-ai'],
    ['/en/technology', '/vi/cong-nghe'],
    ['/en/about', '/vi/ve-phuc-thanh/tong-quan'],
    ['/en/about/overview', '/vi/ve-phuc-thanh/tong-quan']
  ];

  for (const route of [...new Set(pairs.flat())]) {
    const page = await renderPublicPage(route);
    const canonical = 'https://phucthanhholding.com' + route;
    const counterpart = pairs.find(pair => pair.includes(route)).find(item => item !== route);
    const viHref = page.lang === 'vi' ? canonical : `https://phucthanhholding.com${counterpart}`;
    const enHref = page.lang === 'en' ? canonical : `https://phucthanhholding.com${counterpart}`;

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Organization', 'Corporation'],
          '@id': 'https://phucthanhholding.com/#organization',
          name: page.company.nameVi,
          alternateName: [
            page.company.nameEn,
            'Phuc Thanh Holding',
            'Phúc Thành Holding'
          ],
          url: 'https://phucthanhholding.com',
          logo: {
            '@type': 'ImageObject',
            '@id': 'https://phucthanhholding.com/#logo',
            url: 'https://phucthanhholding.com/logo.png',
            caption: 'Phuc Thanh Holding Logo'
          },
          image: 'https://phucthanhholding.com/logo.png',
          description: page.description,
          taxID: page.company.registrationNumber,
          foundingDate: '2024-04-04',
          founder: {
            '@type': 'Person',
            name: page.company.representative
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: page.lang === 'en' ? page.company.addressEn : page.company.addressVi,
            addressLocality: 'Phú Thọ',
            addressRegion: 'Phú Thọ',
            postalCode: '290000',
            addressCountry: 'VN'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 21.3228,
            longitude: 105.4030
          },
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: '+84-343-089-666',
              contactType: 'customer service',
              email: page.company.email,
              areaServed: 'VN',
              availableLanguage: ['Vietnamese', 'English']
            }
          ],
          sameAs: [
            'https://facebook.com/phucthanhholding',
            'https://youtube.com/phucthanhholding',
            'https://zalo.me/phucthanhholding'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': 'https://phucthanhholding.com/#website',
          url: 'https://phucthanhholding.com',
          name: 'Phuc Thanh Holding',
          description: page.description,
          publisher: {
            '@id': 'https://phucthanhholding.com/#organization'
          },
          inLanguage: page.lang === 'en' ? 'en-US' : 'vi-VN',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `https://phucthanhholding.com/${page.lang === 'en' ? 'en/search' : 'vi/tim-kiem'}?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        }
      ]
    };

    const hreflangTags = `<link rel="alternate" hreflang="vi" href="${viHref}" />\n  <link rel="alternate" hreflang="en" href="${enHref}" />\n  <link rel="alternate" hreflang="x-default" href="${viHref}" />`;
    const schemaScript = `<script id="organization-jsonld" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;

    let document = template
      .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
      .replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(page.description)}" />`)
      .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(page.title)}" />`)
      .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(page.description)}" />`)
      .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
      .replace(/<meta property="og:locale"[^>]*>/, `<meta property="og:locale" content="${page.lang === 'en' ? 'en_US' : 'vi_VN'}" />`)
      .replace(/<meta property="og:locale:alternate"[^>]*>/, `<meta property="og:locale:alternate" content="${page.lang === 'en' ? 'vi_VN' : 'en_US'}" />`)
      .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escape(page.title)}" />`)
      .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escape(page.description)}" />`)
      .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
      .replace(/<link rel="alternate"[^>]*>\n?/g, '')
      .replace('</head>', `  ${hreflangTags}\n</head>`)
      .replace(/<script id="organization-jsonld"[^>]*>[\s\S]*?<\/script>/, schemaScript)
      .replace('<div id="root"></div>', `<div id="root">${page.html}</div>`);

    const directory = path.join(output, route.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), document);
    if (route === '/vi') await writeFile(path.join(output, 'index.html'), document);
    console.log('Prerendered ' + route);
  }
}

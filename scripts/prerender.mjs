import { build } from 'vite';
import { pathToFileURL } from 'node:url';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(process.argv[2] ?? 'out');
const template = await readFile(path.join(output,'index.html'),'utf8');
const escape = value => value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const runtime = path.resolve('deployment/prerender-runtime');
if (!runtime.startsWith(path.resolve('deployment') + path.sep)) throw new Error('Invalid renderer output');
await build({build:{ssr:'src/prerender.tsx',outDir:runtime,emptyOutDir:true,rollupOptions:{output:{entryFileNames:'entry.mjs'}}}});
{
  const { renderPublicPage } = await import(pathToFileURL(path.join(runtime,'entry.mjs')).href);
  const pairs = [['/en','/vi'],['/en/company-verification','/vi/xac-minh-doanh-nghiep'],['/en/ai-products','/vi/san-pham-ai'],['/en/technology','/vi/cong-nghe'],['/en/about','/vi/ve-phuc-thanh/tong-quan'],['/en/about/overview','/vi/ve-phuc-thanh/tong-quan']];
  for(const route of [...new Set(pairs.flat())]) {
    const page = await renderPublicPage(route);
    const canonical = 'https://phucthanhholding.com'+route;
    const counterpart = pairs.find(pair => pair.includes(route)).find(item => item !== route);
    const schema = { '@context':'https://schema.org','@type':'Organization',name:page.company.nameVi,alternateName:page.company.nameEn,url:'https://phucthanhholding.com',foundingDate:'2024-04-04',taxID:page.company.registrationNumber,email:page.company.email };
    let document=template.replace(/<html lang="[^"]*">/,`<html lang="${page.lang}">`)
      .replace(/<title>.*?<\/title>/s,`<title>${escape(page.title)}</title>`)
      .replace(/<meta name="description"[^>]*>/,`<meta name="description" content="${escape(page.description)}" />`)
      .replace(/<meta property="og:title"[^>]*>/,`<meta property="og:title" content="${escape(page.title)}" />`)
      .replace(/<meta property="og:description"[^>]*>/,`<meta property="og:description" content="${escape(page.description)}" />`)
      .replace(/<meta property="og:url"[^>]*>/,`<meta property="og:url" content="${canonical}" />`)
      .replace(/<link rel="canonical"[^>]*>/,`<link rel="canonical" href="${canonical}" />`)
      .replace(/<link rel="alternate"[^>]*>/g,'')
      .replace('</head>',`<link rel="alternate" hreflang="${page.lang}" href="${canonical}" /><link rel="alternate" hreflang="${page.lang==='en'?'vi':'en'}" href="https://phucthanhholding.com${counterpart}" /><script id="organization-jsonld" type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script></head>`)
      .replace('<div id="root"></div>',`<div id="root">${page.html}</div>`);
    const directory=path.join(output,route.slice(1));
    await mkdir(directory,{recursive:true});
    await writeFile(path.join(directory,'index.html'),document);
    if(route==='/vi') await writeFile(path.join(output,'index.html'),document);
    console.log('Prerendered '+route);
  }
}

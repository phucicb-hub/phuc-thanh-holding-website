import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const output=path.resolve(root,'../deployment/shop-studio/html');
await build({configFile:false,root,plugins:[react()],build:{outDir:output,emptyOutDir:true}});
const runtime=path.resolve(root,'../deployment/shop-runtime');
await build({configFile:false,root,plugins:[react()],build:{ssr:path.join(root,'src/prerender.tsx'),outDir:runtime,emptyOutDir:true,rollupOptions:{output:{entryFileNames:'entry.mjs'}}}});
const {render}=await import(pathToFileURL(path.join(runtime,'entry.mjs')).href);
const template=await readFile(path.join(output,'index.html'),'utf8');
for(const route of ['/','/tool/PtIQ','/dashboard','/verify-email']){const title=route==='/'?'Phúc Thành AI Shop · PT Studio':route==='/dashboard'?'Dashboard · Phúc Thành AI Shop':route==='/verify-email'?'Xác minh email · Phúc Thành AI Shop':'PtIQ · Nghiên cứu và phát triển kênh';let html=template.replace('<div id="root"></div>','<div id="root">'+render(route)+'</div>').replace(/<title>.*?<\/title>/,'<title>'+title+'</title>').replace('</head>','<link rel="canonical" href="https://shop.phucthanhholding.com'+route+'"/></head>');const directory=path.join(output,route.slice(1));await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html);console.log('Shop prerendered '+route);}

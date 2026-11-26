import { build } from 'vite';
import { spawnSync } from 'node:child_process';
const args=process.argv.slice(2);
let output='out';
for(let i=0;i<args.length;i++) {
  if(args[i]==='--outDir' && args[i+1]) output=args[++i];
  else throw new Error('Unsupported build argument: '+args[i]);
}
await build({build:{outDir:output}});
const result=spawnSync(process.execPath,['scripts/prerender.mjs',output],{stdio:'inherit'});
if(result.status!==0) process.exit(result.status??1);

import {analyticsReader} from './analytics.mjs';
try { const r=await analyticsReader(process.env)(7);for(const s of r.sites)console.log('ANALYTICS_SITE_OK='+s.domain);console.log('ANALYTICS_CONNECTION_OK'); }
catch { console.log('ANALYTICS_CONNECTION_FAILED');process.exitCode=1; }

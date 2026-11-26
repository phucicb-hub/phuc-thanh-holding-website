import json, re
from pathlib import Path

sites = json.loads(Path('/srv/phucthanhholding/analytics/websites.json').read_text())
guard = '''window.ptAnalyticsFilter=function(type,payload){
 if(!payload||typeof payload!=="object")return false;
 const clean=function(v){try{const u=new URL(v,location.origin);return u.origin+u.pathname;}catch{return "";}};
 if(payload.url)payload.url=clean(payload.url);
 if(payload.referrer)payload.referrer=clean(payload.referrer);
 // Keep admin, credential verification and password pages out of analytics.
 const p=new URL(payload.url||location.href,location.origin).pathname;
 if(/(^|\\/)(admin|verify-email|password)(\\/|$)/.test(p))return false;
 return payload;
};
'''
for domain, directory in [('phucthanhholding.com','fresh-stack'),('shop.phucthanhholding.com','ai-shop')]:
    root = Path('/srv/phucthanhholding') / directory
    html = root / 'html'
    if not (html / 'index.html').is_file():
        raise SystemExit('HTML_ROOT_NOT_FOUND:' + directory)
    assets = html / 'assets'
    assets.mkdir(exist_ok=True)
    (assets / 'pt-analytics-guard-v1.js').write_text(guard, encoding='utf-8')
    tags = ('<script defer src="/assets/pt-analytics-guard-v1.js"></script>'
            f'<script defer src="/_analytics/script.js" data-host-url="https://{domain}/_analytics" '
            f'data-website-id="{sites[domain]}" data-domains="{domain},www.{domain}" '
            'data-exclude-search="true" data-exclude-hash="true" data-do-not-track="true" '
            'data-performance="true" data-before-send="ptAnalyticsFilter"></script>')
    for path in html.rglob('*.html'):
        content = path.read_text(encoding='utf-8')
        if '/_analytics/script.js' in content:
            raise SystemExit('ANALYTICS_ALREADY_PRESENT')
        if '</head>' not in content:
            raise SystemExit('HTML_HEAD_NOT_FOUND')
        path.write_text(content.replace('</head>', tags + '</head>', 1), encoding='utf-8')
    config = root / 'nginx.conf'
    content = config.read_text(encoding='utf-8')
    marker = '    location /assets/ {'
    if content.count(marker) != 1 or 'location = /_analytics/' in content:
        raise SystemExit('NGINX_CONFIG_UNEXPECTED')
    routes = '''    location = /_analytics/script.js {
        proxy_pass http://pt-analytics:3000/script.js;
        proxy_set_header Host $host;
        proxy_hide_header Set-Cookie;
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options nosniff always;
    }
    location = /_analytics/api/send {
        limit_except POST { deny all; }
        client_max_body_size 16k;
        proxy_pass http://pt-analytics:3000/api/send;
        proxy_set_header Host $host;
        proxy_set_header Cookie "";
        proxy_set_header Authorization "";
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_hide_header Set-Cookie;
        add_header Cache-Control "no-store" always;
    }
    location /_analytics/ { return 404; }
'''
    config.write_text(content.replace(marker, routes + marker, 1), encoding='utf-8')
print('ANALYTICS_HTML_AND_NGINX_PATCHED')

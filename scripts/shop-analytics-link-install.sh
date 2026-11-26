#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/ai-shop
backup="/srv/phucthanhholding/backups/shop-analytics-link-$(date +%Y%m%d-%H%M%S)"
test -s "$target/html/index.html"
install -d -m 700 "$backup"
tar -czf "$backup/html.tar.gz" -C "$target" html
chmod 600 "$backup/html.tar.gz"
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
tar -xzf "$backup/html.tar.gz" -C /srv/phucthanhholding/ai-shop
echo SHOP_ANALYTICS_LINK_ROLLED_BACK
ROLLBACK
chmod 600 "$backup/rollback.sh"
rollback(){ trap - ERR; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
python3 - "$release" <<'PY'
from pathlib import Path
import re,sys
root=Path('/srv/phucthanhholding/ai-shop/html')
html=Path(sys.argv[1])/'html'
tags=re.findall(r'<script\b[^>]*(?:pt-analytics-guard-v1\.js|/_analytics/script\.js)[^>]*>\s*</script>',(root/'index.html').read_text())
if len(tags)!=2: raise SystemExit('TRACKER_NOT_FOUND_STOP')
for page in html.rglob('*.html'):
    content=page.read_text()
    if '</head>' not in content: raise SystemExit('HTML_INVALID')
    content=re.sub(r'<script\b[^>]*(?:pt-analytics-guard-v1\.js|/_analytics/script\.js)[^>]*>\s*</script>','',content)
    page.write_text(content.replace('</head>',''.join(tags)+'</head>',1))
PY
cp -a "$release/html/." "$target/html/"
curl --fail --silent --show-error --max-time 15 -o /dev/null -w 'Dashboard HTTP %{http_code}\n' http://127.0.0.1:3001/dashboard/
trap - ERR
printf 'BACKUP_PATH=%s\nROLLBACK_COMMAND=sudo bash %s/rollback.sh\n' "$backup" "$backup"
echo SHOP_ANALYTICS_LINK_UPDATED

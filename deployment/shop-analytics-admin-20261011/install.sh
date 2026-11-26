#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/ai-shop
cd "$target"
test -s /srv/phucthanhholding/analytics/admin-password.txt
test -s /srv/phucthanhholding/analytics/websites.json
test -s .env.runtime
backup="/srv/phucthanhholding/backups/shop-analytics-admin-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
tar -czf "$backup/files.tar.gz" server html .env .env.runtime
container="$(docker compose ps -q api </dev/null)"
test -n "$container"
image="$(docker inspect "$container" --format '{{.Config.Image}}')"
old_tag="phucthanh-shop-analytics-backup:$(date +%Y%m%d%H%M%S)"
docker image tag "$(docker inspect "$container" --format '{{.Image}}')" "$old_tag"
printf '%s\n' "$image" > "$backup/image.txt"
printf '%s\n' "$old_tag" > "$backup/old-image.txt"
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
cd /srv/phucthanhholding/ai-shop
tar -xzf "$backup/files.tar.gz" -C /srv/phucthanhholding/ai-shop
docker image tag "$(cat "$backup/old-image.txt")" "$(cat "$backup/image.txt")"
docker compose up -d --no-deps --force-recreate api </dev/null
echo SHOP_ANALYTICS_ROLLED_BACK
ROLLBACK
chmod 600 "$backup"/*
rollback(){ trap - ERR; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
python3 - "$release" <<'PY'
import json,re,sys
from pathlib import Path
root=Path('/srv/phucthanhholding/ai-shop')
release=Path(sys.argv[1])
sites=json.loads(Path('/srv/phucthanhholding/analytics/websites.json').read_text())
password=Path('/srv/phucthanhholding/analytics/admin-password.txt').read_text().strip()
if not re.fullmatch(r'[A-Za-z0-9_-]{20,100}',password):
    raise SystemExit('ANALYTICS_CREDENTIAL_FORMAT_INVALID')
values={'ANALYTICS_PASSWORD':password,'ANALYTICS_COMPANY_ID':sites['phucthanhholding.com'],'ANALYTICS_SHOP_ID':sites['shop.phucthanhholding.com']}
for key in ('ANALYTICS_COMPANY_ID','ANALYTICS_SHOP_ID'):
    if not re.fullmatch(r'[a-f0-9-]{36}',values[key]): raise SystemExit('WEBSITE_ID_INVALID')
# Preserve the working tracker and URL privacy filter in every new HTML page.
old=(root/'html/index.html').read_text()
tags=re.findall(r'<script\b[^>]*(?:pt-analytics-guard-v1\.js|/_analytics/script\.js)[^>]*>\s*</script>',old)
if len(tags)!=2: raise SystemExit('EXISTING_TRACKER_NOT_FOUND')
for page in (release/'html').rglob('*.html'):
    text=page.read_text()
    text=re.sub(r'<script\b[^>]*(?:pt-analytics-guard-v1\.js|/_analytics/script\.js)[^>]*>\s*</script>','',text)
    if '</head>' not in text: raise SystemExit('HTML_HEAD_MISSING')
    page.write_text(text.replace('</head>',''.join(tags)+'</head>',1))
for name in ('.env','.env.runtime'):
    path=root/name
    text=path.read_text()
    for key,value in values.items():
        text=re.sub(r'^'+key+r'=.*\n?','',text,flags=re.M)
        text=text.rstrip()+'\n'+key+'='+value+'\n'
    path.write_text(text)
    path.chmod(0o600)
PY
cp "$release/server/"* server/
docker compose config --quiet </dev/null
docker compose build api </dev/null
cp -a "$release/html/." html/
docker compose up -d --no-deps api </dev/null
ready=false
for attempt in $(seq 1 30); do
 if curl --fail --silent --max-time 3 http://127.0.0.1:3001/api/shop/health >/dev/null; then ready=true; break; fi
 sleep 1
done
test "$ready" = true
docker compose exec -T api node analytics-check.mjs </dev/null
status="$(curl --silent --max-time 10 -o /dev/null -w '%{http_code}' http://127.0.0.1:3001/api/shop/admin/analytics)"
test "$status" = 401
echo "ANONYMOUS_ANALYTICS_HTTP=$status"
curl --fail --silent --show-error --max-time 15 -o /dev/null -w 'Dashboard HTTP %{http_code}\n' http://127.0.0.1:3001/dashboard/
trap - ERR
printf 'BACKUP_PATH=%s\nROLLBACK_COMMAND=sudo bash %s/rollback.sh\n' "$backup" "$backup"
echo SHOP_ANALYTICS_ADMIN_UPDATED

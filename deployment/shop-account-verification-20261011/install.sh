#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/ai-shop
cd "$target"
test -s server/app.mjs
test -s "$release/html/index.html"
backup="/srv/phucthanhholding/backups/shop-account-verification-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
tar -czf "$backup/files.tar.gz" server/app.mjs html
rollback() {
 trap - ERR
 tar -xzf "$backup/files.tar.gz" -C "$target"
 docker compose build api </dev/null
 docker compose up -d --no-deps api </dev/null
 echo "ROLLBACK_PATH=$backup"
 exit 1
}
trap rollback ERR
cp "$release/app.mjs" server/app.mjs
cp -a "$release/html/." html/
docker compose build api </dev/null
docker compose up -d --no-deps api </dev/null
ready=false
for attempt in $(seq 1 30); do
 if curl --fail --silent --max-time 3 http://127.0.0.1:3001/api/shop/health > "$backup/health.json"; then ready=true; break; fi
 sleep 1
done
test "$ready" = true
status="$(curl --silent --max-time 10 -o "$backup/anonymous.json" -w '%{http_code}' -H 'Origin: https://shop.phucthanhholding.com' -H 'Content-Type: application/json' -d '{"tool":"merge-audio","input":"test"}' http://127.0.0.1:3001/api/shop/run)"
test "$status" = 401
for path in / /dashboard/ /tool/PtIQ/ /verify-email/; do
 curl --fail --silent --show-error --location --max-time 15 -o /dev/null -w "$path HTTP %{http_code}\n" "http://127.0.0.1:3001$path"
done
docker compose exec -T api node smtp-check.mjs </dev/null
trap - ERR
echo "ANONYMOUS_TOOL_HTTP=$status"
echo "BACKUP_PATH=$backup"
echo SHOP_ACCOUNT_VERIFICATION_UPDATED

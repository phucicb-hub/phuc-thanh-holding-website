#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/ai-shop
cd "$target"
test -s html/index.html
test -s "$release/html/verify-email/index.html"
backup="/srv/phucthanhholding/backups/shop-verification-ui-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
tar -czf "$backup/html.tar.gz" html
rollback() { trap - ERR; tar -xzf "$backup/html.tar.gz" -C "$target"; echo "RESTORED_FROM=$backup"; exit 1; }
trap rollback ERR
cp -a "$release/html/." html/
curl --fail --silent --show-error --location --max-time 15 -o /dev/null http://127.0.0.1:3001/verify-email/
trap - ERR
echo "BACKUP_PATH=$backup"
echo SHOP_VERIFICATION_UI_UPDATED

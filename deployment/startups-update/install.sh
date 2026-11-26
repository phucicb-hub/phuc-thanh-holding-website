#!/usr/bin/env bash
set -euo pipefail
package_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
target=/srv/phucthanhholding/fresh-stack/html
test -s "$package_dir/html/en/company-verification/index.html"
test -s "$package_dir/html/en/ai-products/index.html"
test -s "$target/index.html"
grep -q '4 April 2024' "$package_dir/html/en/company-verification/index.html"
grep -q 'thuvienphapluat.vn' "$package_dir/html/en/company-verification/index.html"
grep -q 'product catalog and shop policies' "$package_dir/html/en/ai-products/index.html"
backup="/srv/phucthanhholding/backups/startups-html-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
cp -a "$target" "$backup/html"
printf 'HTML_BACKUP_PATH=%s\n' "$backup"
# Copy assets first, keeping earlier assets for visitors with an older page open.
install -d "$target/assets"
cp -a "$package_dir/html/assets/." "$target/assets/"
cp -a "$package_dir/html/." "$target/"
for page in en/company-verification en/ai-products; do
  file="$(mktemp)"
  curl --fail --silent --show-error --location "http://192.168.1.238:3000/$page/" > "$file"
  if [ "$page" = en/company-verification ]; then
    grep -q '4 April 2024' "$file"
    grep -q 'thuvienphapluat.vn' "$file"
  else
    grep -q 'product catalog and shop policies' "$file"
  fi
  printf 'HTML_VERIFIED=%s\n' "$page"
  rm -f "$file"
done
curl --fail --silent --show-error http://192.168.1.238:3000/api/health
printf '\nSTARTUPS_HTML_UPDATED\n'

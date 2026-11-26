#!/usr/bin/env bash
set -euo pipefail
package_dir="$(cd -- "$(dirname -- "$0")" && pwd)"
target=/srv/phucthanhholding/fresh-stack/html
test -s "$target/index.html"
for page in en/about en/technology en/ai-products en/company-verification; do
  test -s "$package_dir/html/$page/index.html"
done
grep -q 'In Development' "$package_dir/html/en/ai-products/index.html"
grep -q 'not yet integrated' "$package_dir/html/en/technology/index.html"
backup="/srv/phucthanhholding/backups/startups-completion-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
cp -a "$target" "$backup/html"
printf 'HTML_BACKUP_PATH=%s\n' "$backup"
rollback() {
  echo 'Verification failed; restoring previous HTML.'
  cp -a "$backup/html/." "$target/"
  for page in en/about en/technology vi/cong-nghe; do
    if [ ! -e "$backup/html/$page/index.html" ]; then
      rm -f -- "$target/$page/index.html"
    fi
  done
}
trap rollback ERR
install -d "$target/assets"
cp -a "$package_dir/html/assets/." "$target/assets/"
cp -a "$package_dir/html/." "$target/"
for page in en/about en/technology en/ai-products en/company-verification; do
  file="$(mktemp)"
  curl --fail --silent --show-error --location --max-time 20 "http://192.168.1.238:3000/$page/" > "$file"
  case "$page" in
    en/about) grep -q '2500716846' "$file" ;;
    en/technology) grep -q 'not yet integrated' "$file" ;;
    en/ai-products) grep -q 'In Development' "$file" ;;
    en/company-verification) grep -q '4 April 2024' "$file" ;;
  esac
  rm -f -- "$file"
  printf 'HTML_VERIFIED=%s\n' "$page"
done
curl --fail --silent --show-error --max-time 20 http://192.168.1.238:3000/api/health
trap - ERR
printf '\nSTARTUPS_COMPLETION_UPDATED\n'

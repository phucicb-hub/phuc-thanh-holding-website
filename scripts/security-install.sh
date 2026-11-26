#!/usr/bin/env bash
set -euo pipefail
test "$(id -u)" = 0 || { echo "Run with sudo bash"; exit 1; }
bundle="$(cd -- "$(dirname -- "$0")" && pwd)"
root="/srv/phucthanhholding"
shop="$root/ai-shop"
company="$root/fresh-stack"
test -s "$shop/compose.yaml"
test -s "$company/compose.yaml"
test -s "$shop/.env"
test -s "$company/.env"
backup="$root/backups/security-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
printf 'BACKUP_PATH=%s\n' "$backup"

# Backup application files and consistent PostgreSQL logical snapshots. No environment is printed.
tar -czf "$backup/files.tar.gz" -C "$root" ai-shop fresh-stack
for stack in "$shop" "$company"; do
  cd "$stack"
  if [ "$stack" = "$shop" ]; then dbuser=shop; dbname=shop; label=shop; else dbuser=website; dbname=phucthanhholding; label=company; fi
  docker compose exec -T database pg_dump -U "$dbuser" -d "$dbname" </dev/null | gzip > "$backup/$label.sql.gz"
  container="$(docker compose ps -q api </dev/null)"
  image_id="$(docker inspect "$container" --format '{{.Image}}')"
  image_ref="$(docker inspect "$container" --format '{{.Config.Image}}')"
  printf '%s\t%s\n' "$image_id" "$image_ref" >> "$backup/images.tsv"
  docker image tag "$image_id" "pht-security-backup-$label:$(basename "$backup")"
done
tar -tzf "$backup/files.tar.gz" >/dev/null
gzip -t "$backup/shop.sql.gz" "$backup/company.sql.gz"
chmod 600 "$backup"/*

cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
test "$(id -u)" = 0
backup="$(cd -- "$(dirname -- "$0")" && pwd)"
test -s "$backup/files.tar.gz"
tar -xzf "$backup/files.tar.gz" -C /srv/phucthanhholding
while IFS=$'\t' read -r image_id image_ref; do
  docker image tag "$image_id" "$image_ref"
done < "$backup/images.tsv"
for stack in ai-shop fresh-stack; do
  cd "/srv/phucthanhholding/$stack"
  docker compose up -d --no-build --no-deps api website </dev/null
done
echo SECURITY_FILES_AND_IMAGES_RESTORED
ROLLBACK
chmod 700 "$backup/rollback.sh"
rollback() {
  trap - ERR
  echo "Update failed; restoring application files and images. Database data is preserved."
  bash "$backup/rollback.sh" || echo "Automatic restore failed; inspect backup before retrying."
  exit 1
}
trap rollback ERR

# Preserve the verified production origin port.
python3 - "$shop/compose.yaml" "$bundle/shop/compose.yaml" <<'PY'
from pathlib import Path
import re,sys
current=Path(sys.argv[1]); template=Path(sys.argv[2])
matches=re.findall(r'127\.0\.0\.1:(3001):80',current.read_text())
if len(matches)!=1:raise SystemExit('Unexpected shop binding; no switch performed')
current.write_text(template.read_text().replace('127.0.0.1:3015:80','127.0.0.1:'+matches[0]+':80'))
PY
python3 "$bundle/security-config.py"
cp -a "$bundle/shop/server/." "$shop/server/"
cp -p "$bundle/shop/Dockerfile" "$shop/Dockerfile"
cp -p "$bundle/shop/.dockerignore" "$shop/.dockerignore"
cp -p "$bundle/shop/nginx.conf" "$shop/nginx.conf"
cp -a "$bundle/shop/html/." "$shop/html/"
cp -a "$bundle/company/server/." "$company/server/"
cp -p "$bundle/company/create-admin.sh" "$company/create-admin.sh"
cp -p "$bundle/company/nginx.conf" "$company/nginx.conf"
cp -a "$bundle/company/html/." "$company/html/"
cp -p "$bundle/configure-shop-smtp.py" "$shop/configure-smtp.py"

for stack in "$shop" "$company"; do
  cd "$stack"
  docker compose config --quiet </dev/null
  docker compose build api </dev/null
  # Apply database logging rotation without changing any volume or publishing ports.
  docker compose up -d database </dev/null
  ready=false
  for attempt in $(seq 1 30); do
    if docker compose exec -T database pg_isready </dev/null >/dev/null 2>&1; then ready=true; break; fi
    sleep 1
  done
  test "$ready" = true
  container="$(docker compose ps -q api </dev/null)"
  image_ref="$(docker inspect "$container" --format '{{.Config.Image}}')"
  network="$(docker inspect "$container" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{println}}{{end}}' | head -n 1)"
  if [ "$stack" = "$shop" ]; then label=shop; else label=company; fi
  docker run --rm --network "$network" --env-file "$stack/.env" \
    -e "SECURITY_STACK=$label" \
    -v "$bundle/security-db.mjs:/app/security-db.mjs:ro" \
    -v "$bundle/security-grants.mjs:/app/security-grants.mjs:ro" \
    -v "$stack/server/schema.sql:/app/security-schema.sql:ro" \
    "$image_ref" node /app/security-db.mjs </dev/null
  docker compose up -d --no-deps api website </dev/null
  docker compose exec -T website nginx -t </dev/null
  docker compose exec -T website nginx -s reload </dev/null
done

for url in http://127.0.0.1:3001/api/shop/health http://192.168.1.238:3000/api/health; do
  ready=false
  for attempt in $(seq 1 30); do
    if curl --fail --silent --max-time 3 "$url" >/dev/null; then ready=true; break; fi
    sleep 1
  done
  test "$ready" = true
done
curl --fail --silent --show-error http://127.0.0.1:3001/api/shop/auth/config
printf '\n'
trap - ERR
echo SECURITY_UPDATE_INSTALLED
echo 'SMTP must be configured and checked before email registration becomes available.'
printf 'ROLLBACK_COMMAND=sudo bash %s/rollback.sh\n' "$backup"

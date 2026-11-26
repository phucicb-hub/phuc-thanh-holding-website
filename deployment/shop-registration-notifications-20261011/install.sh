#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/ai-shop
cd "$target"
test -s .env
test -s .env.runtime
test -s server/email.mjs
test -s "$release/server/marketing.mjs"
container="$(docker compose ps -q api </dev/null)"
test -n "$container"
image_ref="$(docker inspect "$container" --format '{{.Config.Image}}')"
old_image="$(docker inspect "$container" --format '{{.Image}}')"
network="$(docker inspect "$container" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{println}}{{end}}' | head -n 1)"
stamp="$(date +%Y%m%d-%H%M%S)"
backup="/srv/phucthanhholding/backups/shop-notifications-$stamp"
install -d -m 700 "$backup"
tar -czf "$backup/files.tar.gz" server html
docker compose exec -T database pg_dump -U shop -d shop </dev/null | gzip > "$backup/database.sql.gz"
gzip -t "$backup/database.sql.gz"
old_tag="phucthanh-shop-notifications-backup:$stamp"
docker image tag "$old_image" "$old_tag"
printf '%s\n' "$image_ref" > "$backup/image-ref.txt"
printf '%s\n' "$old_tag" > "$backup/old-image.txt"
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
cd /srv/phucthanhholding/ai-shop
tar -xzf "$backup/files.tar.gz" -C /srv/phucthanhholding/ai-shop
docker image tag "$(cat "$backup/old-image.txt")" "$(cat "$backup/image-ref.txt")"
docker compose up -d --no-deps --force-recreate api </dev/null
echo SHOP_NOTIFICATIONS_ROLLED_BACK
ROLLBACK
chmod 600 "$backup"/*
rollback(){ trap - ERR; echo "Cài đặt lỗi; khôi phục bản trước."; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
cp "$release/server/"* server/
docker compose config --quiet </dev/null
docker compose build api </dev/null
docker run --rm --network "$network" --env-file "$target/.env" \
 -e SECURITY_STACK=shop \
 -v "$release/security-db.mjs:/app/security-db.mjs:ro" \
 -v "$release/security-grants.mjs:/app/security-grants.mjs:ro" \
 -v "$target/server/schema.sql:/app/security-schema.sql:ro" \
 "$image_ref" node /app/security-db.mjs </dev/null
cp -a "$release/html/." html/
docker compose up -d --no-deps api </dev/null
ready=false
for attempt in $(seq 1 30); do
 if curl --fail --silent --max-time 3 http://127.0.0.1:3001/api/shop/health > "$backup/health.json"; then ready=true; break; fi
 sleep 1
done
test "$ready" = true
for path in / /dashboard/ /verify-email/; do
 curl --fail --silent --show-error --location --max-time 15 -o /dev/null -w "$path HTTP %{http_code}\n" "http://127.0.0.1:3001$path"
done
for path in admin/users admin/marketing.csv; do
 status="$(curl --silent --max-time 10 -o /dev/null -w '%{http_code}' "http://127.0.0.1:3001/api/shop/$path")"
 test "$status" = 401
 echo "UNAUTHORISED_$path=$status"
done
docker compose exec -T api node smtp-check.mjs </dev/null
trap - ERR
echo "BACKUP_PATH=$backup"
echo "ROLLBACK_COMMAND=sudo bash $backup/rollback.sh"
echo SHOP_REGISTRATION_NOTIFICATIONS_UPDATED
#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/srv/phucthanhholding/analytics
test ! -e "$target" || { echo ANALYTICS_ALREADY_EXISTS_STOP; exit 1; }
for stack in fresh-stack ai-shop; do
 test -s "/srv/phucthanhholding/$stack/compose.yaml"
 test -s "/srv/phucthanhholding/$stack/nginx.conf"
 test -s "/srv/phucthanhholding/$stack/html/index.html"
done
test "$(awk '/MemAvailable/ {print $2}' /proc/meminfo)" -ge 1500000 || { echo INSUFFICIENT_AVAILABLE_RAM; exit 1; }
test "$(df -Pk /srv | awk 'NR==2 {print $4}')" -ge 5000000 || { echo INSUFFICIENT_FREE_DISK; exit 1; }
if ss -ltnH | awk '{print $4}' | grep -q ':3020$'; then echo PORT_3020_BUSY; exit 1; fi
company="$(docker compose -f /srv/phucthanhholding/fresh-stack/compose.yaml ps -q website </dev/null)"
shop="$(docker compose -f /srv/phucthanhholding/ai-shop/compose.yaml ps -q website </dev/null)"
test -n "$company"; test -n "$shop"
company_network="$(docker inspect "$company" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{println}}{{end}}' | head -n1)"
shop_network="$(docker inspect "$shop" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{println}}{{end}}' | head -n1)"
test "$company_network" != "$shop_network"
backup="/srv/phucthanhholding/backups/analytics-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup" "$target"
for stack in fresh-stack ai-shop; do
 tar -czf "$backup/$stack.tar.gz" -C "/srv/phucthanhholding/$stack" html nginx.conf
done
cp "$release/"*.py "$target/"
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
for stack in fresh-stack ai-shop; do
 tar -xzf "$backup/$stack.tar.gz" -C "/srv/phucthanhholding/$stack"
 cd "/srv/phucthanhholding/$stack"
 docker compose exec -T website nginx -t </dev/null
 docker compose exec -T website nginx -s reload </dev/null
done
cd /srv/phucthanhholding/analytics
if [ -f compose.yaml ]; then docker compose stop </dev/null; fi
echo ANALYTICS_ROLLED_BACK_DATA_PRESERVED
ROLLBACK
chmod 600 "$backup"/*
rollback(){ trap - ERR; echo ANALYTICS_INSTALL_FAILED; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
docker pull ghcr.io/umami-software/umami:latest </dev/null
image="$(docker image inspect ghcr.io/umami-software/umami:latest --format '{{index .RepoDigests 0}}')"
export ANALYTICS_IMAGE="$image" COMPANY_NETWORK="$company_network" SHOP_NETWORK="$shop_network"
python3 - <<'PY'
import os,secrets
from pathlib import Path
root=Path('/srv/phucthanhholding/analytics')
owner=secrets.token_hex(24);app=secrets.token_hex(24)
values={'ANALYTICS_IMAGE':os.environ['ANALYTICS_IMAGE'],'COMPANY_NETWORK':os.environ['COMPANY_NETWORK'],'SHOP_NETWORK':os.environ['SHOP_NETWORK'],'POSTGRES_PASSWORD':owner,'DATABASE_URL':'postgresql://umami:'+app+'@database:5432/analytics','APP_SECRET':secrets.token_hex(32),'TWO_FACTOR_ENCRYPTION_KEY':secrets.token_hex(32)}
p=root/'.env';p.write_text(''.join(k+'='+v+'\n' for k,v in values.items()));p.chmod(0o600)
p=root/'init.sql';p.write_text("CREATE ROLE umami LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE PASSWORD '"+app+"';\nALTER DATABASE analytics OWNER TO umami;\n");p.chmod(0o644)
PY
cat > "$target/compose.yaml" <<'COMPOSE'
name: phucthanh-analytics
services:
  database:
    image: postgres:17-alpine
    environment:
      POSTGRES_DB: analytics
      POSTGRES_USER: analytics_owner
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - analytics-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/10-app.sql:ro
    restart: unless-stopped
    mem_limit: 512m
    cpus: 1.0
    networks: [default]
    healthcheck:
      test: [CMD-SHELL, "pg_isready -U analytics_owner -d analytics"]
      interval: 5s
      timeout: 5s
      retries: 30
    logging: {driver: json-file, options: {max-size: 10m, max-file: "3"}}
  umami:
    image: ${ANALYTICS_IMAGE}
    environment:
      DATABASE_URL: ${DATABASE_URL}
      APP_SECRET: ${APP_SECRET}
      TWO_FACTOR_ENCRYPTION_KEY: ${TWO_FACTOR_ENCRYPTION_KEY}
      DISABLE_TELEMETRY: "1"
      CLIENT_IP_HEADER: "cf-connecting-ip"
    depends_on:
      database: {condition: service_healthy}
    ports: ["127.0.0.1:3020:3000"]
    restart: unless-stopped
    init: true
    mem_limit: 1g
    cpus: 1.0
    security_opt: [no-new-privileges:true]
    networks:
      default: {}
      company: {aliases: [pt-analytics]}
      shop: {aliases: [pt-analytics]}
    logging: {driver: json-file, options: {max-size: 10m, max-file: "3"}}
networks:
  company: {external: true, name: "${COMPANY_NETWORK}"}
  shop: {external: true, name: "${SHOP_NETWORK}"}
volumes:
  analytics-data:
COMPOSE
cd "$target"
docker compose config --quiet </dev/null
docker compose up -d </dev/null
python3 analytics-bootstrap.py
# Docker initialization has consumed the SQL; hide its credential afterwards.
chmod 600 init.sql
python3 analytics-integrate.py
for stack in fresh-stack ai-shop; do
 cd "/srv/phucthanhholding/$stack"
 docker compose exec -T website nginx -t </dev/null
 docker compose exec -T website nginx -s reload </dev/null
done
for url in http://192.168.1.238:3000 http://127.0.0.1:3001; do
 curl --fail --silent --show-error --max-time 15 -o /dev/null "$url/_analytics/script.js"
 curl --fail --silent --show-error --max-time 15 -o /dev/null "$url/"
done
trap - ERR
echo "BACKUP_PATH=$backup"
echo "ROLLBACK_COMMAND=sudo bash $backup/rollback.sh"
echo ANALYTICS_INSTALLED
echo 'Dashboard: SSH tunnel to 127.0.0.1:3020; username phuclv; password stored in /srv/phucthanhholding/analytics/admin-password.txt'

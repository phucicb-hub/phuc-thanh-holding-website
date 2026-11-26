#!/usr/bin/env bash
set -euo pipefail
target=/srv/phucthanhholding/9router
test ! -e "$target" || { echo TARGET_EXISTS_STOP; exit 1; }
if docker container inspect phucthanh-9router >/dev/null 2>&1; then echo CONTAINER_EXISTS_STOP; exit 1; fi
if ss -ltnH | awk '{print $4}' | grep -q ':20128$'; then echo PORT_20128_BUSY; exit 1; fi
docker compose version >/dev/null
curl --fail --silent --max-time 10 http://127.0.0.1:5678/healthz >/dev/null
docker pull decolua/9router:latest </dev/null
image="$(docker image inspect decolua/9router:latest --format '{{index .RepoDigests 0}}')"
test -n "$image"
install -d -m 700 "$target"
install -d -m 700 -o 1000 -g 1000 "$target/data"
export NINEROUTER_IMAGE="$image"
python3 - <<'PY'
import os,secrets
from pathlib import Path
root=Path('/srv/phucthanhholding/9router')
values={'JWT_SECRET':secrets.token_hex(32),'INITIAL_PASSWORD':secrets.token_urlsafe(24),'API_KEY_SECRET':secrets.token_hex(32),'MACHINE_ID_SALT':secrets.token_hex(32)}
path=root/'.env'
path.write_text(''.join(k+'='+v+'\n' for k,v in values.items()))
path.chmod(0o600)
path=root/'initial-password.txt'
path.write_text(values['INITIAL_PASSWORD']+'\n')
path.chmod(0o600)
(root/'image-digest.txt').write_text(os.environ['NINEROUTER_IMAGE']+'\n')
PY
cat > "$target/compose.yaml" <<COMPOSE
name: phucthanh-9router
services:
  router:
    image: "$image"
    container_name: phucthanh-9router
    user: "1000:1000"
    entrypoint: [node]
    command: [custom-server.js]
    restart: unless-stopped
    init: true
    ports: ["127.0.0.1:20128:20128"]
    env_file: .env
    environment:
      DATA_DIR: /app/data
      PORT: "20128"
      HOSTNAME: 0.0.0.0
      NODE_ENV: production
      BASE_URL: http://127.0.0.1:20128
      NEXT_PUBLIC_BASE_URL: http://127.0.0.1:20128
      AUTH_COOKIE_SECURE: "false"
      REQUIRE_API_KEY: "true"
      ENABLE_REQUEST_LOGS: "false"
      OBSERVABILITY_ENABLED: "false"
      TZ: Asia/Ho_Chi_Minh
    volumes: ["./data:/app/data"]
    cap_drop: [ALL]
    security_opt: [no-new-privileges:true]
    mem_limit: 1g
    cpus: 1.0
    logging:
      driver: json-file
      options: {max-size: "10m", max-file: "3"}
COMPOSE
cat > "$target/stop-install.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
cd /srv/phucthanhholding/9router
docker compose stop router </dev/null
echo NINEROUTER_STOPPED_DATA_PRESERVED
ROLLBACK
chmod 700 "$target/stop-install.sh"
cd "$target"
stop_on_error(){ trap - ERR; bash "$target/stop-install.sh" || true; echo NINEROUTER_INSTALL_FAILED; exit 1; }
trap stop_on_error ERR
docker compose config --quiet </dev/null
docker compose up -d --pull never </dev/null
ready=false
for attempt in $(seq 1 60); do
 if curl --fail --silent --max-time 3 http://127.0.0.1:20128/api/health >/dev/null; then ready=true; break; fi
 sleep 2
done
test "$ready" = true
status="$(curl --silent --max-time 15 -o /dev/null -w '%{http_code}' http://127.0.0.1:20128/v1/models)"
case "$status" in 401|403) echo "ANONYMOUS_API_HTTP=$status";; *) echo "API_AUTH_CHECK_FAILED_HTTP=$status"; stop_on_error;; esac
curl --fail --silent --max-time 10 http://127.0.0.1:5678/healthz >/dev/null
trap - ERR
docker compose ps </dev/null
echo 'STOP_COMMAND=sudo bash /srv/phucthanhholding/9router/stop-install.sh'
echo NINEROUTER_LOCAL_READY

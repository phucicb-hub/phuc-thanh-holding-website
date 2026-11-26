#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
old=phucthanhholding-website
test "$(docker inspect "$old" --format '{{.State.Running}}')" = true
curl --fail --silent --show-error http://127.0.0.1:3004/api/health >/dev/null
admin_count="$(docker compose exec -T database psql -U website -d phucthanhholding -Atc 'SELECT count(*) FROM admin_users')"
test "$admin_count" -ge 1
bash backup.sh
cp -p .env .env.before-activate
old_restart="$(docker inspect "$old" --format '{{.HostConfig.RestartPolicy.Name}}')"
rollback() {
  echo 'Activation failed; restoring previous website'
  cp -p .env.before-activate .env
  docker compose up -d --no-deps website || true
  docker update --restart="$old_restart" "$old" >/dev/null
  docker start "$old" >/dev/null
}
trap rollback ERR
docker update --restart=no "$old" >/dev/null
docker stop "$old" >/dev/null
python3 - <<'PY'
from pathlib import Path
path=Path('.env')
content=path.read_text()
if 'WEBSITE_BIND=127.0.0.1:3004' not in content:
    raise SystemExit('Unexpected bind configuration; stopped')
path.write_text(content.replace('WEBSITE_BIND=127.0.0.1:3004','WEBSITE_BIND=192.168.1.238:3000'))
PY
docker compose up -d --no-deps website
for path in /api/health /en /en/company-verification /en/ai-products; do
  curl --fail --silent --show-error --retry 8 --retry-connrefused -o /dev/null -w "$path HTTP %{http_code}\n" "http://192.168.1.238:3000$path"
done
trap - ERR
echo FRESH_STACK_ACTIVE

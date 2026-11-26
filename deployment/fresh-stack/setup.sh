#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
if [ ! -f .env ]; then
  umask 077
  python3 - <<'PY'
import secrets
from pathlib import Path
with Path('.env').open('x') as file:
    file.write('POSTGRES_PASSWORD=' + secrets.token_hex(32) + '\nWEBSITE_BIND=127.0.0.1:3004\n')
PY
fi
chmod 600 .env
docker compose config --quiet
docker compose up -d --build --wait --wait-timeout 180
docker compose exec -T -e TEST_POSTGRES=true api node --test test/backend.test.mjs
curl --fail --silent --show-error http://127.0.0.1:3004/api/health
printf '\nFRESH_STACK_READY\n'

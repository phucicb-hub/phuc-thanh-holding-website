#!/usr/bin/env bash
set -euo pipefail
release="$(cd "$(dirname "$0")" && pwd)"
target=/home/phuclv/n8n-server
cd "$target"
test -s docker-compose.yml
test "$(docker inspect n8n --format '{{range .Mounts}}{{if eq .Destination "/home/node/.n8n"}}{{.Source}}{{end}}{{end}}')" = "$target/n8n_data"
backup="/srv/phucthanhholding/backups/n8n-flash-lite-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
stamp="$(date +%Y%m%d%H%M%S)"
export_file=".model-export-$stamp.json"
update_file=".model-update-$stamp.json"
docker exec -u node n8n n8n export:workflow --all --output="/home/node/.n8n/$export_file" </dev/null
chmod 600 "n8n_data/$export_file"
python3 "$release/n8n-flash-lite-patch.py" "n8n_data/$export_file" "n8n_data/$update_file"
chown 1000:1000 "n8n_data/$update_file"
docker stop n8n >/dev/null
trap 'docker start n8n >/dev/null' EXIT
tar -czf "$backup/data.tar.gz" -C "$target" n8n_data
chmod 600 "$backup/data.tar.gz"
tar -tzf "$backup/data.tar.gz" >/dev/null
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
target=/home/phuclv/n8n-server
test "$backup" = "$(realpath "$backup")"
case "$backup" in /srv/phucthanhholding/backups/n8n-flash-lite-*) ;; *) exit 1;; esac
test ! -e "$backup/failed-n8n-data"
cd "$target"
docker stop n8n >/dev/null
mv "$target/n8n_data" "$backup/failed-n8n-data"
tar -xzf "$backup/data.tar.gz" -C "$target"
docker compose up -d --no-deps --force-recreate n8n </dev/null
echo N8N_MODEL_ROLLED_BACK
ROLLBACK
chmod 700 "$backup/rollback.sh"
rollback(){ trap - ERR; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
docker compose run --rm --no-deps --entrypoint n8n n8n import:workflow --input="/home/node/.n8n/$update_file" </dev/null
docker compose up -d --no-deps n8n </dev/null
python3 - <<'PY'
import json,time,urllib.request
for attempt in range(45):
    try:
        with urllib.request.urlopen('http://127.0.0.1:5678/rest/settings',timeout=3) as response: data=json.load(response)
        if (data.get('data',data)).get('userManagement',{}).get('showSetupOnFirstLoad') is False: break
    except Exception: pass
    time.sleep(2)
else: raise SystemExit('N8N_NOT_READY')
PY
verify_file=".model-verify-$stamp.json"
docker exec -u node n8n n8n export:workflow --all --output="/home/node/.n8n/$verify_file" </dev/null
chmod 600 "n8n_data/$verify_file"
python3 - "n8n_data/$update_file" "n8n_data/$verify_file" <<'PY'
import json,sys
from pathlib import Path
expected=json.loads(Path(sys.argv[1]).read_text())
actual={w['id']:w for w in json.loads(Path(sys.argv[2]).read_text())}
for workflow in expected:
    if actual.get(workflow['id'],{}).get('nodes')!=workflow.get('nodes'): raise SystemExit('WORKFLOW_MODEL_VERIFY_FAILED')
print('N8N_MODEL_VERIFIED=gemini/gemini-3.1-flash-lite-preview')
PY
trap - ERR EXIT
printf 'BACKUP_PATH=%s\nROLLBACK_COMMAND=sudo bash %s/rollback.sh\n' "$backup" "$backup"
echo N8N_FLASH_LITE_UPDATED

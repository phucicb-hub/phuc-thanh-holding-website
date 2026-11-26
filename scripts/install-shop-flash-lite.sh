#!/usr/bin/env bash
set -euo pipefail
cd /srv/phucthanhholding/ai-shop
test -s .env; test -s .env.runtime
backup="/srv/phucthanhholding/backups/shop-flash-lite-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$backup"
cp -p .env .env.runtime "$backup/"
chmod 600 "$backup"/*
cat > "$backup/rollback.sh" <<'ROLLBACK'
#!/usr/bin/env bash
set -euo pipefail
backup="$(cd "$(dirname "$0")" && pwd)"
cd /srv/phucthanhholding/ai-shop
cp -p "$backup/.env" .env
cp -p "$backup/.env.runtime" .env.runtime
docker compose up -d --no-deps --force-recreate api </dev/null
echo SHOP_MODEL_ROLLED_BACK
ROLLBACK
chmod 700 "$backup/rollback.sh"
rollback(){ trap - ERR; bash "$backup/rollback.sh"; exit 1; }
trap rollback ERR
python3 - <<'PY'
import re
from pathlib import Path
for name in ('.env','.env.runtime'):
    path=Path(name)
    content=path.read_text()
    content=re.sub(r'^GEMINI_TEXT_MODEL=.*\n?','',content,flags=re.M)
    path.write_text(content.rstrip()+'\nGEMINI_TEXT_MODEL=gemini-3.1-flash-lite-preview\n')
    path.chmod(0o600)
PY
docker compose config --quiet </dev/null
docker compose up -d --no-deps --force-recreate api </dev/null
ready=false
for attempt in $(seq 1 30); do
 if curl --fail --silent --max-time 3 http://127.0.0.1:3001/api/shop/health >/dev/null; then ready=true; break; fi
 sleep 2
done
test "$ready" = true
docker compose exec -T api node --input-type=module - <<'JS'
import {gemini} from './providers.mjs';
try {
 if(process.env.GEMINI_TEXT_MODEL!=='gemini-3.1-flash-lite-preview')throw Error();
 const result=await gemini('Chỉ trả lời một từ: OK','viral-prompts',{},process.env);
 if(!result.result)throw Error();
 console.log('SHOP_GEMINI_MODEL_VERIFIED='+result.model);
}catch(e){console.log('SHOP_GEMINI_CHECK_FAILED_HTTP='+(e.status||'unknown'));process.exitCode=1;}
JS
trap - ERR
printf 'BACKUP_PATH=%s\nROLLBACK_COMMAND=sudo bash %s/rollback.sh\n' "$backup" "$backup"
echo SHOP_FLASH_LITE_UPDATED

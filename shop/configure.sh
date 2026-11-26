#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
python3 - <<'PY'
from pathlib import Path
import getpass, secrets, shutil, time
p=Path('.env')
values={}
if p.exists():
    values=dict(line.split('=',1) for line in p.read_text().splitlines() if '=' in line and not line.startswith('#'))
    shutil.copy2(p, '.env.backup-'+str(time.time_ns()))
def ask(label):
    with open('/dev/tty','w') as out:
        out.write(label+': '); out.flush()
    with open('/dev/tty','r') as inp:
        return inp.readline().strip()
values.setdefault('POSTGRES_PASSWORD',secrets.token_hex(32))
values.setdefault('SHOP_RUNTIME_PASSWORD',secrets.token_hex(32))
values.setdefault('GEMINI_TEXT_MODEL','gemini-3.6-flash')
values.setdefault('GOOGLE_REDIRECT_URI','https://shop.phucthanhholding.com/api/shop/google/callback')
for key in ('GEMINI_API_KEY','YOUTUBE_API_KEY','GOOGLE_CLIENT_SECRET'):
    value=getpass.getpass(key+' (để trống giữ giá trị cũ): ')
    if value: values[key]=value
for key in ('GEMINI_TEXT_MODEL','GEMINI_TTS_MODEL','GEMINI_IMAGE_MODEL','GOOGLE_CLIENT_ID','GOOGLE_REDIRECT_URI'):
    value=ask(key+' (model được phép trong tài khoản; trống giữ giá trị cũ)')
    if value: values[key]=value
for key,value in {'ALLOWED_ORIGINS':'https://shop.phucthanhholding.com','COOKIE_SECURE':'true','GEMINI_VOICE':'Kore','ENABLE_PROVIDER_REQUESTS':'false','ENABLE_YOUTUBE_REQUESTS':'false','ENABLE_GEMINI_REQUESTS':'false','USER_DAILY_REQUESTS':'20','GLOBAL_DAILY_REQUESTS':'100'}.items(): values.setdefault(key,value)
if any('\n' in v or '\r' in v or '$' in v or '#' in v for v in values.values()): raise SystemExit('Giá trị có ký tự không phù hợp; chưa ghi cấu hình.')
p.write_text(''.join(k+'='+v+'\n' for k,v in values.items()))
p.chmod(0o600)
runtime=Path('.env.runtime')
runtime.write_text(''.join(k+'='+v+'\n' for k,v in values.items() if k not in ('POSTGRES_PASSWORD','SHOP_RUNTIME_PASSWORD')))
runtime.chmod(0o600)
print('CONFIGURED. Provider requests remain disabled unless explicitly enabled in .env.')
PY

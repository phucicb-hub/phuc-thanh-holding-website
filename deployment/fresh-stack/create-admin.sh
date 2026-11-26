#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
python3 - <<'PY'
import getpass, json, subprocess
from pathlib import Path
print('Admin email [info@phucthanhholding.com]: ', end='', flush=True)
with open('/dev/tty', 'r') as terminal:
    email = terminal.readline().strip() or 'info@phucthanhholding.com'
password = getpass.getpass('Admin password (14-128 characters): ')
if not 14 <= len(password) <= 128:
    raise SystemExit('Password must contain 14-128 characters')
if password != getpass.getpass('Confirm password: '):
    raise SystemExit('Passwords do not match')
container=subprocess.check_output(['docker','compose','ps','-q','api'],text=True).strip()
metadata=json.loads(subprocess.check_output(['docker','inspect',container],text=True))[0]
network=next(iter(metadata['NetworkSettings']['Networks']))
image=metadata['Image']
subprocess.run(['docker','run','--rm','-i','--network',network,'--env-file',str(Path('.env').resolve()),'-e','ADMIN_PROVISION=true',image,'node','create-admin.mjs'],input=json.dumps({'email':email,'password':password}),text=True,check=True)
PY

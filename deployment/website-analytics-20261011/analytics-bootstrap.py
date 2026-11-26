import json, secrets, time, urllib.request
from pathlib import Path

root = Path('/srv/phucthanhholding/analytics')
password_path = root / 'admin-password.txt'
password = secrets.token_urlsafe(24)
base = 'http://127.0.0.1:3020'

def call(path, data, token=None):
    headers = {'Content-Type': 'application/json'}
    if token:
        headers['Authorization'] = 'Bearer ' + token
    request = urllib.request.Request(base + '/api/' + path, data=json.dumps(data).encode(), headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return json.load(response)

for attempt in range(120):
    try:
        with urllib.request.urlopen(base + '/api/heartbeat', timeout=3) as response:
            if response.status == 200:
                break
    except Exception:
        time.sleep(2)
else:
    raise SystemExit('UMAMI_START_TIMEOUT')

# Save a recovery credential before changing the default account; never print it.
password_path.write_text(password + '\n', encoding='utf-8')
password_path.chmod(0o600)
auth = call('auth/login', {'username': 'admin', 'password': 'umami'})
call('users/' + auth['user']['id'], {'username': 'phuclv', 'password': password}, auth['token'])
auth = call('auth/login', {'username': 'phuclv', 'password': password})
sites = {}
for domain, name in [('phucthanhholding.com', 'Phuc Thanh Holding'), ('shop.phucthanhholding.com', 'Phuc Thanh AI Shop')]:
    site = call('websites', {'name': name, 'domain': domain}, auth['token'])
    sites[domain] = site['id']
(root / 'websites.json').write_text(json.dumps(sites, indent=2), encoding='utf-8')
print('UMAMI_ADMIN_SECURED_AND_WEBSITES_CREATED')

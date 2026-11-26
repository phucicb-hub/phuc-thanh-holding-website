from pathlib import Path
import getpass, os, shutil, time
path=Path('/srv/phucthanhholding/ai-shop/.env')
def ask(label):
    while True:
        with open('/dev/tty','w',encoding='utf-8') as out:out.write(label+': ');out.flush()
        with open('/dev/tty','rb',buffering=0) as inp:raw=inp.readline()
        if not raw:raise SystemExit('Terminal input closed; configuration unchanged')
        try:return raw.decode('utf-8').strip()
        except UnicodeDecodeError:print('Invalid terminal encoding. Please type this field again.')
content=path.read_text()
values=dict(line.split('=',1) for line in content.splitlines() if '=' in line and not line.startswith('#'))
values={k:v[1:-1] if v.startswith("'") and v.endswith("'") else v for k,v in values.items()}
for key,default in [('SMTP_HOST','mail.phucthanhholding.com'),('SMTP_PORT','587'),('SMTP_USER','info@phucthanhholding.com'),('SMTP_FROM','info@phucthanhholding.com')]:
    while True:
        value=ask(key+' ['+(values.get(key) or default)+']') or values.get(key) or default
        if key=='SMTP_HOST' and ('@' in value or '://' in value or any(c.isspace() for c in value)):
            print('SMTP_HOST must be a hostname, not an email or URL.');continue
        if key=='SMTP_PORT' and value not in ['465','587']:
            print('Use SMTP TLS port 465 or 587.');continue
        if key in ['SMTP_USER','SMTP_FROM'] and ('@' not in value or any(c.isspace() for c in value)):
            print('Enter a mailbox email address.');continue
        values[key]=value;break
password=getpass.getpass('Mật khẩu hộp thư SMTP (không hiển thị): ')
if password:values['SMTP_PASSWORD']=password
if not values.get('SMTP_PASSWORD'):raise SystemExit('SMTP password required')
values['PUBLIC_SHOP_URL']='https://shop.phucthanhholding.com'
if values['SMTP_PORT'] not in ['465','587']:raise SystemExit('Use SMTP TLS port 465 or 587')
if any('\n' in v or '\r' in v or "'" in v for v in values.values()):raise SystemExit('Unsupported configuration character; no changes made')
backup=path.with_name('.env.smtp-backup-'+str(time.time_ns()));shutil.copy2(path,backup);backup.chmod(0o600)
# Compose single-quoted values preserve dollar/hash characters in mailbox passwords.
fd=os.open(path,os.O_WRONLY|os.O_TRUNC,0o600)
with os.fdopen(fd,'w') as out:out.write(''.join(k+"='"+v+"'\n" for k,v in values.items()))
path.chmod(0o600)
runtime=path.with_name('.env.runtime')
runtime.write_text(''.join(k+"='"+v+"'\n" for k,v in values.items() if k not in ['POSTGRES_PASSWORD','SHOP_RUNTIME_PASSWORD']))
runtime.chmod(0o600)
print('SMTP_CONFIG_SAVED')

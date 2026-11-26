from pathlib import Path
import os, secrets

root=Path('/srv/phucthanhholding')
for stack,key in [('ai-shop','SHOP_RUNTIME_PASSWORD'),('fresh-stack','WEBSITE_RUNTIME_PASSWORD')]:
    path=root/stack/'.env'
    content=path.read_text()
    values=dict(line.split('=',1) for line in content.splitlines() if '=' in line and not line.startswith('#'))
    values={k:v[1:-1] if v.startswith("'") and v.endswith("'") else v for k,v in values.items()}
    if not values.get(key):
        content+='\n'+key+'='+secrets.token_hex(32)+'\n'
    if stack=='ai-shop':
        defaults={'PUBLIC_SHOP_URL':'https://shop.phucthanhholding.com','SMTP_HOST':'mail.phucthanhholding.com','SMTP_PORT':'587','SMTP_USER':'','SMTP_PASSWORD':'','SMTP_FROM':'info@phucthanhholding.com','HISTORY_RETENTION_DAYS':'90','MEASUREMENTS_RETENTION_DAYS':'30','INTERESTS_RETENTION_DAYS':'180'}
        for k,v in defaults.items():
            if k not in values:content+=k+'='+v+'\n'
    fd=os.open(path,os.O_WRONLY|os.O_TRUNC,0o600)
    with os.fdopen(fd,'w') as out:out.write(content)
    path.chmod(0o600)
    if stack=='ai-shop':
        runtime=path.with_name('.env.runtime')
        runtime.write_text('\n'.join(line for line in content.splitlines() if not line.startswith(('POSTGRES_PASSWORD=','SHOP_RUNTIME_PASSWORD=')))+'\n')
        runtime.chmod(0o600)

path=root/'fresh-stack'/'compose.yaml';content=path.read_text()
if 'PGUSER: website_runtime' not in content:
    if 'PGUSER: website' not in content or 'PGPASSWORD: ${POSTGRES_PASSWORD' not in content:
        raise SystemExit('Company Compose does not match')
    content=content.replace('PGUSER: website','PGUSER: website_runtime',1)
    import re
    content=re.sub(r'PGPASSWORD: \$\{POSTGRES_PASSWORD[^}]*\}', 'PGPASSWORD: ${WEBSITE_RUNTIME_PASSWORD:?Runtime password required}',content,count=1)
    content=content.replace('PGUSER: website_runtime','PGUSER: website_runtime\n      RUN_MIGRATIONS: "false"',1)
path.write_text(content)
print('SECURITY_CONFIG_READY')

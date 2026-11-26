#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"
destination="/srv/phucthanhholding/backups/fresh-$(date +%Y%m%d-%H%M%S)"
install -d -m 700 "$destination"
umask 077
docker compose exec -T database pg_dump -U website -d phucthanhholding -Fc > "$destination/database.dump"
tar -czf "$destination/application.tar.gz" --exclude=./server/node_modules --exclude=./.git .
test -s "$destination/database.dump"
gzip -t "$destination/application.tar.gz"
printf 'BACKUP_PATH=%s\n' "$destination"

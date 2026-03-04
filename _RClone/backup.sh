#!/bin/bash
set -e

DATE=$(date +%Y-%m-%d_%H-%M-%S)
LOGFILE="$HOME/bin/backup-$DATE.log"
SOURCE="$HOME/Sites"
DEST="gdrive:BACKUPS/Sites"
DELETED="gdrive:BACKUPS/_deleted/$DATE"

echo "===== Backup started: $DATE =====" | tee -a "$LOGFILE"

rclone sync "$SOURCE" "$DEST" \
  --exclude-from "$HOME/.rcloneignore" \
  --backup-dir "$DELETED" \
  --progress \
  --transfers=4 \
  --checkers=8 \
  --fast-list \
  --log-file="$LOGFILE" \
  --log-level=INFO

echo "===== Backup finished successfully =====" | tee -a "$LOGFILE"

osascript -e 'display notification "Backup completed successfully" with title "Rclone Backup"'

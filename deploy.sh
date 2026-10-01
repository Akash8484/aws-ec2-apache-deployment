#!/bin/bash
# -----------------------------------------------------------------------------
# deploy.sh
# Copies the website files to Apache's web folder and reloads Apache.
#
# Run this ON THE EC2 SERVER, from the root of the repository:
#   chmod +x scripts/deploy.sh
#   ./scripts/deploy.sh
# -----------------------------------------------------------------------------

set -e   # stop the script if any command fails

SOURCE_DIR="./website"
WEB_ROOT="/var/www/html"

echo "==> Checking source folder..."
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Error: $SOURCE_DIR not found. Run this script from the repo root."
  exit 1
fi

echo "==> Copying website files to $WEB_ROOT ..."
sudo rsync -av --delete "$SOURCE_DIR"/ "$WEB_ROOT"/

echo "==> Setting ownership and permissions..."
sudo chown -R www-data:www-data "$WEB_ROOT"
sudo find "$WEB_ROOT" -type d -exec chmod 755 {} \;
sudo find "$WEB_ROOT" -type f -exec chmod 644 {} \;

echo "==> Testing Apache configuration..."
sudo apache2ctl configtest

echo "==> Reloading Apache..."
sudo systemctl reload apache2

echo "==> Done. Apache status:"
sudo systemctl is-active apache2

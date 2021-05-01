#!/bin/bash
echo "redeploying..."

sudo -u ubuntu git pull
npm ci
npm run build
sudo rm -rf /var/www/html/relative_gui
sudo mkdir /var/www/html/relative_gui
sudo cp -R build/. /var/www/html/relative_gui

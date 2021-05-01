#!/bin/bash
echo "redeploying..."

sudo -u ubuntu git pull
npm run build
sudo rm -rf /var/www/html/frontend
sudo mkdir /var/www/html/frontend
sudo cp -R build/. /var/www/html/frontend

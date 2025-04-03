#!/bin/bash
# setup.sh by RimuruTempest750
# Github : https://github.com/RimuruTempest750

apt update && apt upgrade -y
apt install npm nodejs git -y

if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    echo "Node.js is already installed. Skipping installation."
fi

git clone https://github.com/RimuruTempest750/Mudae_cheat.git
cd Mudae_cheat/
npm i

if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing..."
    npm i pm2 -g
else
    echo "PM2 is already installed. Skipping installation."
fi
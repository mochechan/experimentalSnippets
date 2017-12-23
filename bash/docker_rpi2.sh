#!/bin/bash

echo installing docker for rpi2

curl -fsSL https://get.docker.com/ | sh 

sudo groupadd docker
sudo usermod -aG docker $USER


downloadLink=$(curl -s 'https://github.com/docker/compose/releases' | grep -o '/docker/compose/releases/download/.*'docker-compose-`uname -s`-`uname -m` |head -1)

wget https://github.com$downloadLink
sudo mv -iv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version



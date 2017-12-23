#!/bin/bash

echo install nodejs

sudo apt install -y jq git htop vim 

#echo "deb http://ubuntu.kurento.org trusty kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
echo "deb http://ubuntu.kurento.org xenial kms6" | sudo tee /etc/apt/sources.list.d/kurento.list
wget -O - http://ubuntu.kurento.org/kurento.gpg.key | sudo apt-key add -
sudo apt update -y
sudo apt install -y kurento-media-server-6.0

sudo service kurento-media-server-6.0 start
sudo service kurento-media-server-6.0 stop

mkdir -pv ~/kurento
cd ~/kurento
curl -s https://api.github.com/users/kurento/repos | grep -o 'https://github.com/.*\.git' | 
while read i;
do
	git clone "$i" 
done


#!/bin/bash

echo installing docker, docker-compose, community edition for ubuntu16.04, 


function ec {
    errorlevel=$?
    echo errorlevel: $errorlevel 
    if [ "$errorlevel" -gt "0" ]; then 
				ps -ef >/tmp/bash_stack_trace.$$
        echo Install: The current errorlevel code is invalid. Please check. 
        exit $errorlevel;
    else 
        echo Install: so far so good. 
    fi
}


cd 
pwd

sudo apt -y update
ec
sudo apt -y install apt-transport-https ca-certificates curl software-properties-common 
ec

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
ec
sudo apt-key fingerprint 0EBFCD88
ec
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu   $(lsb_release -cs)  stable"
ec
sudo apt update
ec
sudo apt -y install docker-ce
ec
sudo apt-cache madison docker-ce
ec
sudo groupadd docker
sudo usermod -aG docker $USER
ec

#TODO: https://github.com/docker/compose/releases

downloadLink=$(curl -s 'https://github.com/docker/compose/releases' | grep -o '/docker/compose/releases/download/.*'docker-compose-`uname -s`-`uname -m` |head -1)

#sudo curl -L "https://github.com/docker/compose/releases/download/1.17.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
 

wget https://github.com$downloadLink
ec
sudo mv -iv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
ec 
docker-compose --version
ec


cd /tmp
wget "https://github.com$(curl -s 'https://github.com/docker/kitematic/releases' | grep -o '/docker/kitematic/releases/download/v0.17.*/Kitematic-0.17.*-Ubuntu.zip' | head -1)"

#wget https://github.com/docker/kitematic/releases/download/v0.17.2/Kitematic-0.17.2-Ubuntu.zip
unzip Kitematic-0.17.*-Ubuntu.zip
sudo dpkg -i Kitematic_0.17.*_amd64.deb
sudo apt -y -f install
echo "please reboot"

sync
exit


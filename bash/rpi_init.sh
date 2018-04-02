#!/bin/bash

echo This script initiates your Raspberry PI/ ubuntu. 

echo swappiness: "$(cat /proc/sys/vm/swappiness)" 

# for error check
function ec {
    errorlevel=$?
    echo errorlevel: $errorlevel 
    if [ "$errorlevel" -gt "0" ]; then 
        echo Install: The current errorlevel code is invalid. Please check. 
        exit $errorlevel;
    else 
        echo Install: so far so good. 
    fi
}


# for general Raspberry PI installation
function general(){

	echo MQTT broker
	echo 'docker run -tid -p 1883:1883 -p 9001:9001 pascaldevink/rpi-mosquitto' | sudo tee -a /etc/rc.local

	echo saving your SD card
	echo 'vm.swappiness = 10' | sudo tee -a /etc/sysctl.conf 

	docker version 
	errorlevel=$?
	echo errorlevel: $errorlevel
	if [ "$errorlevel" != "0" ]; then
		echo going to install docker 
		sudo apt -y install bridge-utils
		curl -sSL https://get.docker.com | sh 
		sudo usermod -aG docker pi 
	else
		echo ignoring to install docker 
	fi

	# TODO: docker-compose for armv6l

	downloadLink=$(curl -s 'https://github.com/docker/compose/releases' | grep -o '/docker/compose/releases/download/.*'docker-compose-`uname -s`-`uname -m` |head -1)

	wget https://github.com$downloadLink
	sudo mv -iv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
	docker-compose --version

	ec 

	git config --global push.default simple
	git config --global core.editor vi
	git config --global help.autocorrect 1
	git config --global color.ui true
	git config --global credential.helper cache
	git config --global credential.helper "cache --timeout=99999999"
}

function installGolang(){

	downloadLink=$(curl https://golang.org/dl/ | grep -o 'href="https://dl.google.com/go/.*">' | head -19 | sed 's/href="//g' | sed 's/">$//g' | grep $1)
	wget $downloadLink 


}

#rpimodel=$(cat /proc/device-tree/model)
rpimodel=$(tr -d '\0' </proc/device-tree/model)

if [ "$(uname -m)" == "armv7l" ]; then
	echo This is a Raspberry PI 2. armv7l 
	general
	installGolang armv
	docker run -it resin/raspberrypi2-debian:latest /bin/bash  # rpi2 or above

elif [ "$(uname -m)" == "armv6l" ]; then
	echo	This is a Raspberry PI. armv6l 
	general
	installGolang armv
	docker run -it -v $HOME:/root resin/rpi-raspbian:latest /bin/bash # rpi 1 

elif [ "$(uname -m)" == "x86_64" ]; then
	echo for x86_64
	echo "FROM " | cat - dockerfile.{environment,apt,x86_64,npm} | tee -a Dockerfile

elif [ "$(uname -m)" == "i686" ]; then
	echo for i686
	echo "FROM " | cat - dockerfile.{environment,apt,i686,npm} | tee -a Dockerfile

else
	echo This is not a Raspberry PI.

fi




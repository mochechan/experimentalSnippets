#!/bin/bash

echo This script initiates your Raspberry PI. 

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


	echo 'docker run -tid -p 1883:1883 -p 9001:9001 pascaldevink/rpi-mosquitto' | sudo tee -a /etc/rc.local

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
	#sudo curl -L "https://github.com/docker/compose/releases/download/1.19.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	#ec
	#sudo chmod +x /usr/local/bin/docker-compose
	#ec 
	#docker-compose --version

	#git config --global user.email "chan@alumni.ncu.edu.tw"
	#git config --global user.name "Moche Chan"
	git config --global push.default simple
	git config --global core.editor vi
	git config --global help.autocorrect 1
	git config --global color.ui true
	git config --global credential.helper cache
	git config --global credential.helper "cache --timeout=99999999"


}

#rpimodel=$(cat /proc/device-tree/model)
rpimodel=$(tr -d '\0' </proc/device-tree/model)

if [ "${rpimodel}" == "Raspberry Pi 2 Model B Rev 1.1" ]; then
	echo This is a Raspberry PI 2. armv7l 
	general

	docker run -it resin/raspberrypi2-debian:latest /bin/bash  # rpi2 or above


elif [ "${rpimodel}" == "Raspberry Pi Model B Rev 2" ]; then
	echo	This is a Raspberry PI. armv6l 
	general

	docker run -it -v $HOME:/root resin/rpi-raspbian:latest /bin/bash # rpi 1 

else
	echo This is not a Raspberry PI.

fi




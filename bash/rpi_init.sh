#!/bin/bash

echo This script initiates your Raspberry PI. 

echo swappiness: "$(cat /proc/sys/vm/swappiness)" 


function general(){

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




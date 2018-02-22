#!/bin/bash

rpimodel=$(tr -d '\0' </proc/device-tree/model)



if [ "${rpimodel}" == "Raspberry Pi 2 Model B Rev 1.1" ]; then
	echo for Raspberry PI 2 test 
	echo 'FROM resin/raspberrypi2-debian:latest' | cat - dockerfile.rpi | tee -a ./Dockerfilerpi

elif [ "${rpimodel}" == "Raspberry Pi Model B Rev 2" ]; then
	echo for Raspberry PI 1 test 
	echo "FROM resin/rpi-raspbian:latest" | cat - dockerfile.rpi | tee -a Dockerfilerpi

else
	echo This is not a Raspberry PI.

fi


docker build --file Dockerfilerpi --build-arg USER=$USER --tag rpitest .
rm -v Dockerfilerpi

docker run -it --volume $HOME:$HOME -p 8080:8080 --privileged=true --net=host rpitest /bin/bash  



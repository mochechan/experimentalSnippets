#!/bin/bash

rm -v Dockerfile

if [ "$(uname -m)" == "armv7l" ]; then
	echo for Raspberry PI 2 
	echo 'FROM resin/raspberrypi2-debian:latest' | cat - dockerfile.{environment,apt,armv7l,npm} | tee -a Dockerfile 

elif [ "$(uname -m)" == "armv6l" ]; then
	echo for Raspberry PI 1  
	echo "FROM resin/rpi-raspbian:latest" | cat - dockerfile.{environment,apt,armv6l,npm} | tee -a Dockerfile

elif [ "$(uname -m)" == "x86_64" ]; then
	echo for x86_64
	echo "FROM " | cat - dockerfile.{environment,apt,x86_64,npm} | tee -a Dockerfile

elif [ "$(uname -m)" == "i686" ]; then
	echo for i686
	echo "FROM " | cat - dockerfile.{environment,apt,i686,npm} | tee -a Dockerfile

else
	echo exception...

fi


time docker build --file Dockerfile --build-arg USER=$USER --tag dockertest . | tee -a /tmp/dockerbuild.log
echo errorlevel:$?
rm -v Dockerfile
docker run -it --volume $HOME:$HOME -p 8080:8080 --privileged=true --net=host dockertest 

# docker build --file rpi1 --build-arg USER=$USER --tag rpi1test .
# docker run -it --rm --volume $HOME:$HOME rpi1test 



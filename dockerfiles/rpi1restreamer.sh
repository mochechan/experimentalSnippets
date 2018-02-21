#!/bin/bash

echo https://datarhei.github.io/restreamer/docs/installation-linux-arm.html#raspberry-pi-1

docker run -d --name restreamer --restart always -e "RESTREAMER_USERNAME=YOUR-USERNAME" -e "RESTREAMER_PASSWORD=YOUR-PASSWORD" -p 8080:8080 -v /mnt/restreamer/db:/restreamer/db datarhei/restreamer-armv6l:latest



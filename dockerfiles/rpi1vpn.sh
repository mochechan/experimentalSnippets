#!/bin/bash


docker run -it --name vpnserver \
             --env HOSTNAME=kay.dlinkddns.com \
             --env VPN_USER=name \
             --env VPN_PASSWORD=secret \
             --cap-add NET_ADMIN \
             --publish 500:500/udp \
             --publish 4500:4500/udp \
             --volume /vpn-secrets:/mnt \
             --restart unless-stopped \
             --detach \
             netzfisch/rpi-vpn-server

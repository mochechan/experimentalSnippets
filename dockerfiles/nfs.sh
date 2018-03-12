#!/bin/bash

# rpi1: Illegal instruction(core dumped); 
docker run -it --name nfs --privileged -v /home:/nfsshare --net=host -p 2049:2049 -e SHARED_DIRECTORY=/nfsshare itsthenetwork/nfs-server-alpine:latest-arm

# ubuntu x86_64 is fine; 
#docker run -it --name nfs --privileged -v /home:/nfsshare --net=host -p 2049:2049 -e SHARED_DIRECTORY=/nfsshare itsthenetwork/nfs-server-alpine:latest
# client runs: $ sudo apt install nfs-common && sudo mount.nfs -v 127.0.0.1:/ /mnt 



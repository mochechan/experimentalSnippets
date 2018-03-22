#!/bin/bash

docker run -it --volume $HOME:$HOME -p 8080:8080 --privileged=true --net=host dockertest 

exit 0;
# useful docker images
docker run -it -p 8080:8080 -v $(pwd):/root library/node:8-alpine npx http-server /root
docker run -it -p 8080:8080 -v $(pwd):/root arm32v7/node:8 npx http-server /root

docker run -it library/node:8-alpine npx bitaddress bulkwallet 99999999 | tee -a bitaddress${RANDOM}.txt

# not yet success
docker run -d -e USERNAME=test -e PASSWORD=test -p 8888:80 -v $(pwd):/var/webdav morrisjobke/webdav
docker run -it --name samba -p 139:139 -p 445:445 -v $(pwd):/mount -d dperson/samba
docker run -d -it --name samba -h samba -p 138:138/udp -p 139:139 -p 445:445 -p 445:445/udp --volumes-from apache -e SMB_USER='admin' -e SMB_PASS='connect' appcontainers/samba

# wanted list
vpn 
mysql
mongodb
wordpress https://medium.com/@rothgar/wordpress-in-docker-on-a-raspberry-pi-149b4301195
docker run --name bind -d --restart=always --publish 53:53/tcp --publish 53:53/udp --publish 10000:10000/tcp --volume /srv/docker/bind:/data sameersbn/bind:9.10.3-20180127

# windows command line
npx bitaddress bulkwallet 999999 >> bitaddress%RANDOM%.txt
npx vanity-eth -n 999999 >> ethaddr%RANDOM%.txt
Windows becomes very slow when the piped file exceeds about 30MB.



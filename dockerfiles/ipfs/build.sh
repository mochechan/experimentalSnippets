#!/bin/bash

#sudo rm -rfv testbed
#docker build -t ipfs . 

#docker run -it ipfs go version
#docker run -it ipfs go env
#docker run -it -v $(pwd)/testbed:/root/testbed ipfs iptb init -n 9
#docker run -it -v $(pwd)/testbed:/root/testbed ipfs iptb start
docker run -it -v $(pwd)/testbed:/root/testbed ipfs 



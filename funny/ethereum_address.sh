#!/bin/bash

mkdir -pv /data/ethereum_main_net 
docker run -it -p 8545:8545 -p 30303:30303 -v /data/ethereum_main_net:/root/.ethereum ethereum/client-go --rpc --rpcaddr "0.0.0.0"



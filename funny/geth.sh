#!/bin/bash

echo connecting Ethereum main-net

docker run -it ethereum/client-go:alltools-stable --syncmode "light" 



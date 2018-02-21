#!/bin/bash

docker run -it --volume $HOME:$HOME rpi1test npx bitaddress bulkwallet 999999 | tee -a $HOME/bitaddresses.txt


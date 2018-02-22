#!/bin/bash

docker run -it --volume $HOME:$HOME rpitest npx bitaddress bulkwallet 99999999 | tee -a $HOME/bitaddresses$RANDOM.txt


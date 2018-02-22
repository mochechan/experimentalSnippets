#!/bin/bash

docker run -it --volume $HOME:$HOME rpitest npx bitaddress bulkwallet 999999 | tee -a $HOME/bitaddresses.txt


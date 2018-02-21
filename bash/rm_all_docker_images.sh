#!/bin/bash
echo This script deletes all docker images.
docker images -a
docker --log-level="debug" stop  $(docker ps -aq)
docker --log-level="debug" kill  $(docker ps -aq)
docker --log-level="debug" rm -f $(docker ps -aq)
docker --log-level="debug" rmi -f $(docker images -aq)
docker --log-level="debug" volume ls -qf dangling=true | xargs -r docker volume rm 
docker images -a



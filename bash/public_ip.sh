#!/bin/bash

myIP=`curl -s http://whatismyip.akamai.com/`
echo public IP is $myIP
curl http://pubsub.pubnub.com/publish/pub-c-ef0fc78d-2db3-49bf-b31c-59ecb4dfe378/sub-c-64fada00-1c48-11e7-b284-02ee2ddab7fe/0/my_public_ip_list/callback/%7B%22$HOSTNAME%22%3A%22$myIP%22%2C%22time%22%3A%22$(date +%Y%m%d-%H%M:%S)%22%7D?store=1?uuid=$(uuid)

echo 
echo To periodically publish every 10 minutes, please add this by using crontab -e 
echo '*/10 * * * * ' `realpath "$0"`

exit;
https://unix.stackexchange.com/questions/22615/how-can-i-get-my-external-ip-address-in-a-shell-script



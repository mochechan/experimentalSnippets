#!/bin/bash

result=`curl 'http://pubsub.pubnub.com:80/v2/history/sub-key/sub-c-64fada00-1c48-11e7-b284-02ee2ddab7fe/channel/my_public_ip_list'`

echo $result | jq .

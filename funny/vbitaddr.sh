#!/bin/bash
echo mining bitcoin address

npx bitaddress bulkwallet 9999999 | while read i
do
	echo $i
	ku0=`echo $i | grep -o '\".*\",'`
	ku1=$(echo $ku0 | sed "s/\"//g")
	ku2=$(echo $ku1 | sed "s/,//g")
	if [ "${#ku2}" == "0" ]; then 
		continue;
	fi 
	echo $ku2

	echo ==== stage 1
	response=`curl --silent https://bitaps.com/api/address/$ku2`
	sent=`echo $response | jq '.sent'`
	balance=`echo $response | jq '.balance'`
	received=`echo $response | jq '.received'`
	tx_total=`echo $response | jq '.tx_total'`
	echo $sent $balance $received $tx_total $response
	if [ "$sent" != "0" ]; then
		echo found! $ku2
		exit;
	fi
	if [ "$balance" != "0" ]; then
		echo found! $ku2
		exit;
	fi
	if [ "$received" != "0" ]; then
		echo found! $ku2
		exit;
	fi
	if [ "$tx_total" != "0" ]; then
		echo found! $ku2
		exit;
	fi

	echo ==== stage 2
	if [ "`curl --silent https://blockchain.info/q/addressbalance/$ku2`" != 0 ]; then
		echo found!! $ku2
		exit;
	fi

	continue;
	echo ==== stage 3
	response=`curl http://api.blockcypher.com/v1/btc/main/addrs/$ku2/balance`
	address=`echo $response | jq '.address'`
	total_received=`echo $response | jq '.total_received'`
	total_sent=`echo $response | jq '.total_sent'`
	balance=`echo $response | jq '.balance'`
	final_balance=`echo $response | jq '.final_balance'`
	echo $total_sent $balance $total_received $final_balance $response
	if [ "$total_received" != "0" ]; then
		echo found!!! $ku
		exit;
	fi
	if [ "$total_sent" != "0" ]; then
		echo found!!! $ku
		exit;
	fi
	if [ "$balance" != "0" ]; then
		echo found!!! $ku
		exit;
	fi
	if [ "$final_balance" != "0" ]; then
		echo found!!! $ku
		exit;
	fi
done 

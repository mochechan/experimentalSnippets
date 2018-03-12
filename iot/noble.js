
var noble = require('noble');
console.log("loaded");

var perip = {};

noble.on('stateChange', function(state){
	switch(noble.state){
	case "poweredOn":
		noble.startScanning([],false,function(error){}); // any service UUID, no duplicates
		//noble.stopScanning(); // scanning stops automatically when connecting a device
	break;
	case "unauthorized":
		require("child_process").exec("sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)");
	break;
	default:
		console.log("please debug");
	break;
	}
});

noble.on('scanStart', function(error){
	console.log("scanStart:");
	console.log(error);
});

noble.on('scanStop', function(){
	console.log("scanStop:");
	console.log(arguments);
});

noble.on('warning', function(){
	console.log("warning:");
	console.log(arguments);
});

noble.on('discover', function(peripheral){
	console.log("discover:");
	console.log(peripheral.address + " " + peripheral.advertisement.localName);
	perip[peripheral.address] = peripheral;
		if(peripheral.connectable && peripheral.state === "disconnected"){
			peripheral.connect(function(err){
				if(err) return;
				//console.log("connected: " + perip[i].address + " " + perip[i].advertisement.localName );
				peripheral.discoverAllServicesAndCharacteristics(function(){
					//console.log(arguments);
				});
			});
		}

	peripheral.once('connect', function(error){
		console.log("connect:");
		console.log(arguments);
	});
	peripheral.once('disconnect', function(){
		console.log("disconnect:");
		console.log(arguments);
	});
	peripheral.once('rssiUpdate', function(rssi){
		console.log("rssiUpdate:");
		console.log(arguments);
	});
	peripheral.once('serviceDiscover', function(services){
		console.log("serviceDiscover:");
		console.log(arguments);
	});
});


setInterval(function(){
	for(var i in perip){
		console.log(perip[i].address + " " + perip[i].advertisement.localName + " " + perip[i].connectable + " " + perip[i].state);
		//console.log(perip[i]);
		if(perip[i].connectable && perip[i].state === "disconnected"){
			perip[i].connect(function(err){
				if(err) return;
				//console.log("connected: " + perip[i].address + " " + perip[i].advertisement.localName );
				perip[i].discoverAllServicesAndCharacteristics(function(){
					//console.log(arguments);
				});
			});
		}
	}
}, 20000);



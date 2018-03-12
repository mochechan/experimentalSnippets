/*
	npm install noble

*/

var noble = require('noble');


noble.on('stateChange', function(state){
	console.log("on_statChange");
	console.log(arguments);
  if (state === 'poweredOn') {
		noble.startScanning();
  } else {
		console.log("not poweredOn");
  }
});

noble.on('scanStart', function(state){
	console.log("on_scanStart");
	console.log(arguments);
});

noble.on('scanStop', function(state){
	console.log("on_scanStop");
});

noble.on('discover', function(peripheral){
	console.log("on_discover:" + peripheral.uuid + " " + peripheral.advertisement.localName);
	peripheral.connect(function(error) {
		if(error){
			console.log(error);
			exit(0);
		} else {
	  	console.log('connected to peripheral: ' + peripheral.uuid);
			peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics){
				if(error){
					console.log(error);
					exit(0);
				} else {
					console.log("discovered "+ services.length+" services:");
					//for(var i in services) console.log(services[i]);


					console.log("discovered "+ characteristics.length +" characteristics:");
					for(var i in characteristics){

						var characteristic = characteristics[i];

						characteristics[i].discoverDescriptors(function(error, descriptors){
							if(error){
								console.log(error);
								exit(0);
							} else {
								console.log(descriptors);
							}
						});

						characteristics[i].subscribe(function(error){
							if(error){
								console.log(error);
								exit(0);
							} else {
								console.log("subscribe");
							}
						});

						characteristics[i].on('data', ondata_callback(i, characteristic));

						characteristics[i].once('broadcast', function(state){
							console.log(state);
						});
						characteristics[i].once("ontify", function(state){
							console.log(state);
						});
						characteristics[i].once("descriptorsDiscover",function(descriptors){
							console.log(descriptors);
						});
						//console.log(characteristics[i]);
					}
				}
			});
		}
	});
});

noble.on('warning', function(state){
	console.log("on_warning");
	console.log(arguments);
});


function ondata_callback(i,characteristic){
	return function(data, isNotification){
		console.log("" + i + " " +characteristic._serviceUuid + " " + characteristic.uuid + " on_data:" + data + " " + isNotification);
		//console.log(characteristic);
	}
}

function exit(i){
	process.exit(i);
}


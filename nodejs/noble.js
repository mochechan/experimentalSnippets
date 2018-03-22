/*
  https://github.com/sivann-tw/sivann-modules/blob/master/ble/WeatherStation.md

	npm install noble restify 
*/

var noble = require('noble');
var restify = require('restify');
var cp = require('child_process');
var fs = require('fs');

var server = restify.createServer({
  name: 'RESTful wrapper',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.jsonp());
server.use(restify.plugins.bodyParser());

//server.get(/\/public\/?.*/, restify.plugins.serveStatic({ directory: __dirname }));

server.get('/query/:key', function(req, res, next){
	res.send(device.data);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


var device = {
	peripheral:{},
	data:{},
};


noble.on('stateChange', function(state){
	console.log("on_statChange");
  if (state === 'poweredOn') {
		noble.startScanning();
	} else if(state === "unauthorized"){
		require("child_process").exec("sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)");
  } else {
		exit("wrong state");
  }
});

noble.on('scanStart', function(state){
	console.log("on_scanStart " + state);
});

noble.on('scanStop', function(state){
	console.log("on_scanStop ");
});

noble.on('discover', function(peripheral){
	console.log("on_discover:" + peripheral.uuid + " " + peripheral.advertisement.localName + " rssi:" + peripheral.rssi + " connectable:" + peripheral.connectable );
	device.peripheral[peripheral.uuid] = {
		uuid: peripheral.uuid,
		name: peripheral.advertisement.localName,
		peripheral: peripheral,
	};
	//console.log(peripheral);
	delayConnect(peripheral, 5500);
}); // end of noble on_discover

noble.on('warning', function(state){
	console.log("on_warning");
	console.log(arguments);
});


function delayConnect(peripheral, milliseconds = 5000){
	setTimeout(function(){
		peripheral.connect(function(error) {
			if(error){
				exit(error);
			} else {
		  	//console.log('connected to peripheral: ' + peripheral.uuid);
				peripheral.discoverAllServicesAndCharacteristics(function(error, services, characteristics){
					if(error){
						exit(error);
					} else {
						console.log("peripheral:" + peripheral.uuid + " discovered "+ services.length+" services:");
						//for(var i in services) console.log(services[i]);

						console.log("peripheral:" + peripheral.uuid + " discovered "+ characteristics.length +" characteristics:");
						for(var i in characteristics){

							var characteristic = characteristics[i];

							characteristics[i].discoverDescriptors(function(error, descriptors){
								if(error){
									exit(error);
								} else {
									//console.log(descriptors);
								}
							});

							characteristics[i].subscribe(function(error){
								if(error){
									exit(error);
								} else {
									//console.log("subscribed");
								}
							});

							characteristics[i].on('data', ondata_callback(i, characteristic));

							characteristics[i].once('broadcast', function(state){
								console.log(state);
							});
							characteristics[i].once("ontify", function(state){
								console.log("once_notify");
								//console.log(state);
							});
							characteristics[i].once("descriptorsDiscover",function(descriptor){
								//console.log(descriptor);
								//for(let i in descriptor) console.log("once_descriptorsDiscover " + descriptor[i].uuid + " " + descriptor[i].name + " " + descriptor[i].type);
							});
							//console.log(characteristics[i]);
						}
					}
				});
			}
		});

		peripheral.once("connect", function(error) {
			if(error) exit(error);
			console.log("once_connect:" + peripheral.uuid);
			//console.log(peripheral);
		});
		peripheral.once("disconnect", function(error) {
			if(error) exit(error);
			console.log("once_disconnect:" + peripheral.uuid);
		});
		peripheral.once("rssiUpdate", function(rssi) {
			console.log("once_rssiUpdate:" + rssi);
		});
		peripheral.once("serviceDiscover", function(services) {
			console.log("once_serviceDiscover" + services.length);
		});
	}, milliseconds);
} // end of delayConnect()  

function ondata_callback(i, characteristic){
	return function(data, isNotification){
		//console.log(characteristic);
		//process.stdout.write(typeof(data)+ " " + data.length + " ondata ");
		let pid = characteristic._peripheralId;
		let sid = characteristic._serviceUuid;
		let cid = characteristic.uuid;

		let str = data.toString("hex");
		let id = str.substring(0,2);
		let flag = str.substring(2,4);
		let sensorValue, unitHex = "";
		//console.log("--------------" + str);
		//console.log("peripheral:" + pid + " " + i + " sid:" + characteristic._serviceUuid + " cid:" + characteristic.uuid + " on_data:" + data + " " + isNotification);

		if(				sid === "bb50"){
			// Gas alarm
			if(			sid === "cc04") unitHex = "70706d";
			else if(sid === "bb54") unitHex = "";
			else if(sid === "cc02") unitHex = "";
		} else if(sid === "bb80"){
			//weather
			if(			cid === "cc11") unitHex = "685061"; //685061 = hPa ascii code
			else if(cid === "cc07")	unitHex = "0143"; 
			else if(cid === "cc08")	unitHex = "255248";
			else if(cid === "cc05"){
				if(RegExp("6c7578").test(str)){
					unitHex = "6c7578";
				} else {
					exit("please debug");
				}
			} else if(cid === "cc1a")	unitHex = "64422d53504c"; 
			else if(cid === "cc1b")	unitHex = "7063732f302e30316366"; 
		} else if(sid === "bb10" && cid === "cc02"){
			unitHex = "6d56"; 
		} else if(sid === "bb30"){
			//power relay
			if(			cid === "cc1e") unitHex = "57"; 
			else if(cid === "cc13") unitHex = "41"; 
			else if(cid === "cc31") {}
			else if(cid === "cc32")	{} 
		} else if(sid === "bb40"){
			if(cid === "cc0e"){}
		} else if(sid === "bb10"){
			if(cid === "cc02") unitHex = "6d56";
		} else if(sid === "bb90"){
			if(cid === "cc06") unitHex = "";
		} else {
			console.log("============= " + sid + " " + cid );
		}

		//process.stdout.write("peripheral:" + pid + " sid:" + sid + " cid:" + cid + " " + id + " " + flag + " " );

		if(unitHex == ""){
			console.log("no unitHex, pid:" + pid + " sid:" + sid + " cid:" + cid + " " + str);
			//exit("no unitHex");
		} else {
			sensorValue = parseSensorValue(str, unitHex); 
			//console.log(sensorValue + " " + unitHex + " " + hex2ascii(unitHex) + " ");
			let buf = Buffer.from(sensorValue, "hex");
			//console.log(buf);
			//console.log(buf.readFloatLE());

			if(device.data[pid]){ 
				if(device.data[pid][sid+cid] != buf.readFloatLE()){
					device.data[pid][sid+cid] = {value: buf.readFloatLE(), unit: hex2ascii(unitHex) };
				}
			} else {
				device.data[pid] = {};
					device.data[pid][sid+cid] = {value: buf.readFloatLE(), unit: hex2ascii(unitHex) };
			}
		}

	}
}

function parseSensorValue(data, unit){
	//console.log(data + " " + hex2ascii(unit));
	let sensorValue = data.substring(4).replace(new RegExp(unit + "$"), ""); 
	return sensorValue;
}

function parseFloatx(str, radix) {
        var parts = str.split(".");
        if ( parts.length > 1 ) {
                return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
        }
        return parseInt(parts[0], radix);
}

function hex2ascii(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function exit(i){
	console.log(i);
	var stack = new Error().stack
	console.log(stack)
	console.trace("Here going to exit!")
	process.exit(i);
}


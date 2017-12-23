const 
	user = "admin",
	pass = "admin";

const onvif = require('node-onvif');

console.log('Start the onvif discovery process.');

// Find the ONVIF network cameras. // It will take about 3 seconds.
onvif.startProbe().then((device_info_list) => {
  console.log(device_info_list.length + ' devices were found.');
  // Show the device name and the URL of the end point.
	console.log(device_info_list);

  device_info_list.forEach((info) => {
    console.log('- ' + info.urn);
    console.log('  - ' + info.name);
    console.log('  - ' + info.xaddrs[0]);
		
		var rtspUrl = "";
		rtspUrl = queryStreamUrl({
			xaddr: info.xaddrs[0],
			user : user,
			pass : pass,
		});
		console.log(rtspUrl);
		
	});
}).catch((error) => {
  console.error(error);
});

function queryStreamUrl(arg){
	let device = new onvif.OnvifDevice(arg);
	device.init().then(() => {
	  let url = device.getUdpStreamUrl();
	  console.log(url);
		return url;
	}).catch((error) => {
  	console.error(error);
  	return error;
	});
}


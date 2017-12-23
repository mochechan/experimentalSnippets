var getCurrentTimestamp = function () {
	// Create a date object with the current time
	var now = new Date();
	var dt = [now.getFullYear().toString(), (now.getMonth() + 1).toString(), now.getDate().toString(), now.getHours().toString(), now.getMinutes().toString(), now.getSeconds().toString(), now.getMilliseconds().toString()];
 
	// If seconds and minutes are less than 10, add a zero
	for (var i in dt) if (dt[i].length <= 1) dt[i] = "0" + dt[i];  
  
	return dt.join("");
}

var getRandom = function () { 
	return Math.floor((1 + Math.random()) * 0x10000) .toString(16) .substring(1);
}

for (var i=0; i<10000; i++)
	console.log(getCurrentTimestamp() + getRandom());



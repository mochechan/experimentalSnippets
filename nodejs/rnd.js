var card=[];


var drawn=[];
/*
for(var i = 0; i <= 80; i++){
	card[i] = [];
	for(var j = 1; j <= 24; j++){
		card[i].push(Math.floor(Math.random()*75+1));
		//FIXME: prevent duplicates 
	}
	console.log(i + " [" + card[i].join(" ") + "]");
}
*/

card[1]=[5,18,45,57,73,2,27,43,55,61,15,19,59,71,7,22,31,48,69,10,20,40,52,66];

card[2]=[4,25,38,46,62,13,29,37,53,74,8,23,49,63,9,26,32,56,67,11,28,34,51,64];

card[3]=[4,30,45,51,63,1,23,41,48,70,12,17,55,67,15,18,32,49,62,7,20,40,46,61];

card[4]=[12,22,40,55,73,1,29,45,57,72,7,21,59,62,11,25,37,54,63,9,20,32,47,65];

card[5]=[3,29,38,60,62,2,23,44,57,61,6,26,53,70,11,25,42,46,75,10,20,45,52,69];

card[6]=[9,29,39,60,75,12,18,41,52,65,8,26,47,68,10,28,38,48,66,14,19,44,59,74];

card[7]=[9,24,37,46,63,3,18,36,49,66,8,26,48,71,15,16,31,57,64,12,30,41,54,70];

card[8]=[11,30,39,54,64,6,21,45,49,72,5,17,57,66,7,28,42,51,63,12,27,35,56,70];

card[9]=[4,20,42,58,62,2,17,34,59,75,6,16,53,71,1,18,44,52,68,3,28,43,57,61];

card[10]=[10,18,42,57,61,15,17,36,55,69,1,25,53,65,4,29,41,46,75,14,26,38,56,62];

card[11]=[11,27,38,55,68,4,22,35,54,63,10,24,47,70,6,19,40,48,66,7,23,31,52,74];

card[12]=[3,29,32,60,65,15,18,44,53,70,10,23,51,64,1,25,33,52,72,6,26,45,47,67];

card[13]=[3,28,42,54,61,10,23,31,48,69,7,27,51,67,13,24,33,53,72,14,19,41,60,71];

card[14]=[2,23,36,58,69,14,26,40,59,65,15,19,49,74,11,24,38,55,75,7,27,32,56,61];

card[15]=[15,22,33,54,69,3,30,40,55,65,6,28,53,68,9,21,31,56,71,4,19,32,58,65];

card[16]=[10,17,44,50,64,14,25,35,48,70,6,29,49,69,15,30,38,46,73,8,19,34,54,71];

card[17]=[9,17,37,55,62,11,29,41,46,66,15,23,59,67,10,25,34,58,70,7,27,39,54,74];

card[18]=[6,17,45,60,73,1,19,39,47,62,9,28,48,67,11,22,40,58,65,3,27,35,53,66];

card[19]=[12,24,43,58,71,2,17,31,56,62,13,23,59,74,15,19,35,47,66,10,25,40,49,75];

card[20]=[9,29,38,57,75,8,22,35,56,73,10,20,60,71,4,17,40,58,62,14,21,42,49,74];

card[21]=[4,22,36,51,63,11,24,45,60,73,15,26,49,69,6,17,35,53,64,3,23,43,57,67];

card[22]=[4,26,32,54,66,6,25,45,46,64,15,17,52,74,11,27,34,49,71,10,20,36,47,61];

card[23]=[11,18,33,46,72,1,19,44,48,74,2,26,60,61,6,17,43,51,69,15,21,40,49,66];

card[24]=[15,18,38,56,70,12,20,43,52,64,3,26,57,75,8,16,45,48,69,6,22,44,54,66];

card[25]=[13,17,43,49,74,12,20,35,50,73,14,18,46,68,3,29,34,56,70,8,26,44,55,71];

card[26]=[8,22,45,57,63,13,20,36,47,62,15,23,60,75,4,24,39,52,69,9,29,37,59,64];

card[27]=[9,19,35,49,67,13,29,45,47,72,1,22,52,68,14,23,41,53,75,2,21,38,55,63];

card[28]=[14,20,34,59,69,12,29,41,54,74,7,29,46,65,3,18,31,60,71,15,22,40,56,66];

card[29]=[4,25,42,49,72,2,20,31,51,71,14,23,55,68,5,18,45,54,74,11,24,40,52,65];

card[30]=[11,28,35,50,63,7,30,41,54,62,2,29,51,66,9,24,44,58,67,12,25,33,53,72];

card[31]=[2,21,42,50,66,8,24,37,51,68,13,25,60,63,15,16,31,58,69,4,20,39,56,62];

card[32]=[11,20,44,49,63,9,21,33,53,70,13,24,46,64,1,26,36,52,62,8,22,40,55,72];

card[33]=[9,17,43,48,75,11,29,39,50,69,6,19,46,73,14,20,42,60,74,3,27,33,52,62];

card[34]=[2,20,35,58,62,8,16,36,57,74,12,30,47,71,1,23,33,56,70,7,22,32,46,64];

card[35]=[9,18,41,55,73,10,29,37,56,70,11,28,48,69,13,17,32,51,68,5,22,31,59,65];

card[36]=[10,27,36,57,68,1,19,40,53,66,14,29,54,71,11,26,42,47,74,5,18,43,48,65];

card[37]=[3,24,34,48,72,13,18,32,49,71,11,26,51,65,8,16,31,60,70,7,17,45,57,66];

card[38]=[9,21,39,58,74,10,24,32,56,68,13,22,50,71,6,27,34,47,64,14,25,35,59,73];

card[39]=[14,26,39,55,66,12,17,38,47,74,9,21,49,75,11,22,45,59,62,7,18,43,50,65];

card[40]=[14,16,35,49,67,10,20,44,57,68,7,27,52,69,12,22,39,50,61,8,23,45,54,64];

card[41]=[2,21,42,50,71,4,30,44,60,66,8,27,56,62,12,17,43,55,65,6,20,39,57,70];

card[42]=[1,21,39,46,75,15,18,32,52,61,4,29,50,66,2,27,37,56,63,5,23,45,49,68];

card[43]=[10,17,38,53,72,2,23,43,46,65,13,24,47,69,5,26,39,51,61,11,27,34,60,64];

card[44]=[9,29,40,58,73,4,28,37,55,63,14,25,51,71,13,22,32,57,66,3,20,36,49,62];

card[45]=[14,16,42,50,63,7,22,31,53,75,8,24,49,69,10,23,44,46,65,15,25,33,52,66];

card[46]=[8,19,43,49,74,9,27,33,50,67,14,24,58,68,4,17,36,47,73,15,23,38,56,61];

card[47]=[9,18,32,56,75,11,20,34,55,69,14,27,46,72,10,16,33,49,65,12,26,36,50,66];

card[48]=[6,30,42,50,68,2,20,40,47,71,10,19,46,63,11,17,41,54,64,15,28,32,52,67];

card[49]=[2,26,40,47,63,7,20,35,49,61,12,19,60,72,13,30,41,56,73,5,25,33,46,71];

card[50]=[12,24,43,52,75,5,16,35,54,65,1,26,58,74,15,17,37,57,67,3,29,39,48,71];

card[51]=[7,22,43,53,64,4,20,44,50,62,9,25,46,68,1,24,31,57,61,10,26,40,54,69];

card[52]=[8,25,39,60,63,2,21,31,50,70,6,23,58,73,15,18,43,55,75,14,27,35,51,68];

card[53]=[11,24,45,48,73,12,22,41,58,72,9,17,53,63,3,16,39,60,64,7,26,42,56,75];

card[54]=[1,26,44,52,70,2,16,43,46,64,4,23,50,68,3,21,35,48,69,15,28,39,58,75];

card[55]=[11,29,39,50,66,15,24,41,59,72,6,20,55,64,14,19,44,57,62,1,27,37,47,67];

card[56]=[8,24,35,57,67,2,28,42,49,61,6,25,47,66,7,17,37,57,69,9,29,43,55,63];

card[57]=[9,25,34,55,73,6,20,45,48,67,4,23,58,75,12,27,39,50,61,8,24,44,52,74];

card[58]=[4,25,36,57,71,10,20,34,46,69,14,17,47,63,7,21,44,54,67,8,19,31,52,72];

card[59]=[12,21,34,52,71,3,20,38,53,72,8,23,57,64,5,17,43,56,63,4,27,45,50,62];

card[60]=[13,24,31,56,63,14,29,45,53,67,7,22,51,70,3,27,36,49,64,1,26,34,60,74];

card[61]=[14,26,45,47,70,1,22,39,53,67,6,29,56,64,4,16,40,51,73,15,24,38,50,63];

card[62]=[15,29,45,50,70,7,24,33,52,65,14,25,54,64,10,16,35,53,67,2,22,39,47,63];

card[63]=[3,20,36,58,66,9,21,37,50,74,8,18,53,65,14,27,33,47,64,4,22,42,52,63];

card[64]=[9,17,44,57,61,5,29,43,58,71,2,23,50,75,4,16,40,53,66,3,21,34,55,70];

card[65]=[4,21,36,60,71,2,18,39,53,67,12,16,46,61,15,29,40,49,75,13,22,31,59,68];

card[66]=[5,21,35,55,70,13,28,39,53,67,9,19,56,61,7,18,42,47,73,4,23,32,59,74];

card[67]=[12,28,40,47,72,7,29,42,52,65,11,27,57,62,15,26,33,56,63,6,17,37,54,69];

card[68]=[15,24,36,49,66,3,22,38,51,67,9,28,57,64,7,27,41,54,63,1,25,31,58,72];

card[69]=[1,29,40,60,63,15,23,44,51,75,3,25,58,74,6,30,42,46,69,4,20,41,47,68];

card[70]=[13,29,42,56,61,1,25,38,53,66,15,26,49,62,14,17,37,52,74,2,21,41,59,63];

card[71]=[12,21,42,57,72,11,25,41,47,63,14,23,56,61,8,30,35,55,62,7,27,33,48,73];

card[72]=[6,26,37,52,66,15,23,36,47,67,1,25,57,71,11,24,32,46,70,7,28,44,55,75];

card[73]=[11,26,39,49,75,12,30,41,50,68,14,29,57,69,8,27,37,60,66,10,16,43,53,67];

card[74]=[2,22,40,58,64,8,25,42,48,66,12,20,56,62,7,26,37,46,67,3,30,33,53,63];

card[75]=[15,20,45,52,61,10,22,31,56,70,9,25,54,72,6,27,33,47,67,5,21,39,53,71];

card[76]=[3,25,37,52,67,5,23,45,56,61,12,30,59,72,9,17,41,54,75,2,22,31,48,73];

card[77]=[5,29,33,58,68,8,16,44,47,73,15,25,59,61,12,24,32,51,67,3,26,40,54,69];

card[78]=[1,24,32,56,61,14,28,34,53,62,11,29,46,66,15,25,31,58,74,3,30,33,59,65];

card[79]=[8,18,39,53,70,7,26,40,54,65,4,30,46,62,10,25,33,59,61,11,17,41,57,75];

card[0]=[8,18,32,53,70,4,25,36,50,66,14,16,48,72,2,19,41,57,74,9,21,43,59,63];





console.log();
for(var i in card){
	console.log(i + "[" + card[i].join(",") + "]");
}


for(;(card.length) > 2;){
	var draw = Math.floor(Math.random()*75+1);
	drawn.push(draw);
	console.log("length:" + card.length + " to draw:" + draw);
	for(var j = 0; j <=80; j++){
		for(var i in card){
			var index = card[i].indexOf(draw);
			if(index >= 0){
				//console.log(index);
				//console.log(card[i].join(" "));
				card.splice(i, 1);
				break;
			}
		}
	}
}

console.log("length:" + (card.length));

for(var i in card){
	console.log("[" + card[i].join(",") + "]");
}

console.log("drawn:[" + drawn.join(",") + "]");

for(var j in drawn){
	for(var i in card){
		if(card[i].indexOf(drawn[j]) != -1){
			console.log("ERROR: " + drawn[j]);
		}
	}
}

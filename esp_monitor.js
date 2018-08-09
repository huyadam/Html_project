var ws;

var host = document.getElementById("host");
var port = document.getElementById("port");
var result = document.getElementById("result");
var status = document.getElementById("status");
var cmt = ["cmt1","cmt2","cmt3","cmt4","cmt5","cmt6","cmt7","cmt8","cmt9","cmt10","cmt11","cmt12","cmt13","cmt14","cmt15","cmt16","cmt17","cmt18","cmt19","cmt20"];
var stt = ["stt1","stt2","stt3","stt4","stt5","stt6","stt7","stt8","stt9","stt10","stt11","stt12","stt13","stt14","stt15","stt16","stt17","stt18","stt19","stt20"];
var sn = ["sn1","sn2","sn3","sn4","sn5","sn6","sn7","sn8","sn9","sn10","sn11","sn12","sn13","sn14","sn15","sn16","sn17","sn18","sn19","sn20"];
var device = ["device1","device2","device3","device4","device5","device6","device7","device8","device9","device10","device11","device12","device13","device14","device15","device16","device17","device18","device19","device20"];
var d = ["d1","d2","d3","d4","d5"];
var raw_data = {
	function: "",
	data: "",
	auth: ""
}
function getText(a) {
	return document.getElementById(a).innerText;
}
function getdevice(a) {
	return d[a];
}
function count(obj) {
   var count=0;
   for(var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
         ++count;
      }
   }
   return count;
}
function open(event){
	console.log("Connected to server");
	status.innerText = "Connected";
	infor();
}
function message(event){
	console.log(event.data);
	var json_parse = JSON.parse(event.data);
	result.innerText = json_parse.function;
	switch (json_parse.function) {
		case "monitor-ok":
			for (var x=0;x<num_sn*5;x++) {
				if (Object.keys(json_parse.data)[0] == getText(sn[x])) {
					document.getElementById(stt[x]).innerText = json_parse.data[getText(sn[x])][getdevice(x%5)];
					document.getElementById(cmt[x]).innerText = "DONE";
				}
			}
			break;
		case "control-ok":
			for (var x=0;x<num_sn*5;x++) {
				if ((json_parse.data.sn == getText(sn[x])) && (json_parse.data.device == getText(device[x]))) {
					document.getElementById(cmt[x]).innerText = "Server OK";
				}
			}
			break;
		case "infor-ok":
			num_sn = count(json_parse.data); 
			tableCreate(num_sn);
			for (var x=0; x<num_sn*5; x++) {
				document.getElementById(sn[x]).innerText=Object.keys(json_parse.data)[parseInt(x/5)];
				document.getElementById(stt[x]).innerText=json_parse.data[getText(sn[x])][getdevice(x%5)];
			}
			break;
		default:
			console.log("Not oke");
	}
	
}
function connect() {
	status.innerText = "Connecting..."
	ws = new WebSocket("ws://" + host.value + ":" + port.value);
	ws.onopen = open;
	//ws.onerror = error;
	ws.onmessage = message;
}

function refresh() {
    setTimeout(function () {
        location.reload()
    }, 100);
}

function infor() {
	raw_data.function = "infor";
	raw_data.data = {
		device : "",
		sn : ""
	};
	ws.send(JSON.stringify(raw_data));
}

function ctrl(des,sn,devc) {
	console.log(sn+devc);
	raw_data.function = "control";
	raw_data.data = {
		device : devc,
		sn: sn,
		ctrl: des
	};
	ws.send(JSON.stringify(raw_data));
	console.log(raw_data);
}

function monitor(sn) {
	console.log(sn);
	raw_data.function = "monitor";
	raw_data.data = {
		device : "",
		sn: sn
	};
	ws.send(JSON.stringify(raw_data));
}
function tableCreate(a) {
	//body reference 
	body = document.getElementsByTagName("body")[0];
	//body = document.getElementById("wrapped");
	// create elements <table> and a <tbody>
	tbl     = document.createElement("table");
	tbl.style="width:100%";
	tblBody = document.createElement("tbody");

	// cells creation

	var row = document.createElement("tr");
	var hd = document.createElement("th");   
	hd.innerText = "SN";
	row.appendChild(hd);
	var hd = document.createElement("th");   
	hd.innerText = "Device";
	row.appendChild(hd);
	var hd = document.createElement("th");   
	hd.innerText = "Monitor";
	row.appendChild(hd);
	var hd = document.createElement("th");   
	hd.innerText = "Control";
	row.appendChild(hd);
	var hd = document.createElement("th");   
	hd.innerText = "State";
	row.appendChild(hd);
	var hd = document.createElement("th");   
	hd.innerText = "Cmt";
	row.appendChild(hd);
	tblBody.appendChild(row);
	for (var j = 1; j <= 5*a; j++) {
		// table row creation
		row = document.createElement("tr");
		// create element <td> and text node 
		//Make text node the contents of <td> element
		// put <td> at end of the table row


		cell = document.createElement("td");   
		cell.id = "sn"+j;
		cell.innerText = "45ba78ab"; 
		row.appendChild(cell);

		cell = document.createElement("td");   
		cell.id = "device"+j;
		cell.innerText = (j-1)%5+1;
		row.appendChild(cell);

		cell = document.createElement("td");   
		monitor_btn = document.createElement('button');
		monitor_btn.type = "button";
		monitor_btn.id = j;
		monitor_btn.innerText = "Check";
		monitor_btn.setAttribute("onclick","monitor(getText(sn[this.id]))");
		cell.appendChild(monitor_btn); 
		row.appendChild(cell);

		cell = document.createElement("td");  
		on_btn = document.createElement('button');
		off_btn = document.createElement('button');
		on_btn.type = "button";
		off_btn.type = "button";
		on_btn.id = 2*(j-1);				//Kiem tra can than
		off_btn.id = 2*(j-1/2);
		on_btn.innerText = "ON";
		off_btn.innerText = "OFF";			
		on_btn.setAttribute("onclick","ctrl('on',getText(sn[this.id/2]),getText(device[this.id/2]))"); 
		off_btn.setAttribute("onclick","ctrl('off',getText(sn[this.id/2-1/2]),getText(device[this.id/2-1/2]))");
		cell.appendChild(on_btn); 
		cell.appendChild(off_btn); 
		row.appendChild(cell);

		cell = document.createElement("td");   
		cell.id = 'stt'+j;
		row.appendChild(cell);

		cell = document.createElement("td");   
		cell.id = 'cmt'+j;
		row.appendChild(cell);

		//row added to end of table body
		tblBody.appendChild(row);
	}

	// append the <tbody> inside the <table>
	tbl.appendChild(tblBody);
	// put <table> in the <body>
	body.appendChild(tbl);
	// tbl border attribute to 
	tbl.setAttribute("border", "2");
}

function wrap()	{
	document.getElementById("wrapper").style.height = "50px";
	document.getElementById("tablex").style.height = "240px";
}
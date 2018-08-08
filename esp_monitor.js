var ws;

var host = document.getElementById("host");
var port = document.getElementById("port");
var num1 = document.getElementById("num1");
var num2 = document.getElementById("num2");
var result = document.getElementById("result");
var status = document.getElementById("status");
var raw_data = {
	function: "",
	data: "",
	auth: ""
}
function getText(a) {
	return document.getElementById(a).innerText;
}
function open(event){
	console.log("Connected to server");
	status.innerText = "Connected";
}
function message(event){
	console.log(event.data);
	var json_parse = JSON.parse(event.data);
	result.innerText = json_parse.function;
	switch (json_parse.function) {
		case "monitor-ok":
			break;
		case "control-ok":
			break;
		case "infor-ok":
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
//	raw_data.function = "control";
//	raw_data.data = {
//		device : devc,
//		sn: sn,
//		ctrl: des
//	};
//	ws.send(JSON.stringify(raw_data));
}

function monitor(sn,devc) {
	raw_data.function = "monitor";
	raw_data.data = {
		device : devc,
		sn: sn
	};
	ws.send(JSON.stringify(raw_data));
}


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
function open(event){
	console.log("Connected to server");
	status.innerText = "Connected"
}
function message(event){
	console.log(event.data);
	var json_parse = JSON.parse(event.data);
	result.innerText = json_parse.data.result;
}
function connect() {
	status.innerText = "Connecting..."
	ws = new WebSocket("ws://" + host.value + ":" + port.value);
	ws.onopen = open;
	//ws.onerror = error;
	ws.onmessage = message;
}

function action(a) {
	raw_data.function = a;
	raw_data.data = {
		n1 : num1.value,
		n2 : num2.value,
		rs : ""
	}
	ws.send(JSON.stringify(raw_data));
}


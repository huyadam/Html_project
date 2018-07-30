var check_delete = [false, false, false, false, false, false, false, false,false];


var host = [document.getElementById("host1"),document.getElementById("host2"),document.getElementById("host3"),
			document.getElementById("host4"),document.getElementById("host5"),document.getElementById("host6"),
			document.getElementById("host7"),document.getElementById("host8"),document.getElementById("host9")]
var port = [document.getElementById("port1"),document.getElementById("port2"),document.getElementById("port3"),
			document.getElementById("port4"),document.getElementById("port5"),document.getElementById("port6"),
			document.getElementById("port7"),document.getElementById("port8"),document.getElementById("port9")]
var status = [document.getElementById("status1"),document.getElementById("status2"),document.getElementById("status3"),
			  document.getElementById("status4"),document.getElementById("status5"),document.getElementById("status6"),
			  document.getElementById("status7"),document.getElementById("status8"),document.getElementById("status9")]
var stream = [document.getElementById("stream1"),document.getElementById("stream2"),document.getElementById("stream3"),
			  document.getElementById("stream4"),document.getElementById("stream5"),document.getElementById("stream6"),
			  document.getElementById("stream7"),document.getElementById("stream8"),document.getElementById("stream9")]
var nameofstream = ["stream11", "stream22", "stream33", "stream44", "stream55", "stream66", "stream77", "stream88", "stream99"]
var canvas;
var url1, url2, url3, url4, url5, url6, url7, url8, url9;
var url = [url1, url2, url3, url4, url5, url6, url7, url8, url9];
var player1 = new JSMpeg.Player("", {canvas: canvas});
var player2 = new JSMpeg.Player("", {canvas: canvas});
var player3 = new JSMpeg.Player("", {canvas: canvas});
var player4 = new JSMpeg.Player("", {canvas: canvas});
var player5 = new JSMpeg.Player("", {canvas: canvas});
var player6 = new JSMpeg.Player("", {canvas: canvas});
var player7 = new JSMpeg.Player("", {canvas: canvas});
var player8 = new JSMpeg.Player("", {canvas: canvas});
var player9 = new JSMpeg.Player("", {canvas: canvas});
var player = [player1, player2, player3, player4, player5, player6, player7, player8, player9];
stream[0].style.display = "none"; stream[1].style.display = "none"; stream[2].style.display = "none";
stream[3].style.display = "none"; stream[4].style.display = "none"; stream[5].style.display = "none";
stream[6].style.display = "none"; stream[7].style.display = "none"; stream[8].style.display = "none";

function streamon(num){
	a = parseInt(num)-1;
	if (check_delete[a]==false) {	//delete link before
		player[a].destroy();
		document.getElementById(nameofstream[a]).remove();
	}
	check_delete[a] = false
	//create new link
	canvas = document.createElement("canvas");
	canvas.id = nameofstream[a];
	stream[a].appendChild(canvas);
	url[a] = "ws://" + host[a].value + ":" + port[a].value;
	player[a] = new JSMpeg.Player(url[a], {canvas: canvas});
	canvas.style.display = "initial";
	stream[a].style.display = "initial";
	console.log("Pushed");
}
function minimize(num){
	a = parseInt(num)-1;
	if (check_delete[a]==false) {
		player[a].destroy();
		document.getElementById(nameofstream[a]).remove();
		check_delete[a] = true;
		stream[a].style.display = "none";
	}
}

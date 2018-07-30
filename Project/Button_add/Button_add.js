function minimize(num){
	a = parseInt(num)-1;
	if (check_delete[a]==false) {
		player[a].destroy();
		document.getElementById(nameofstream[a]).remove();
		check_delete[a] = true;
		stream[a].style.display = "none";
	}
}

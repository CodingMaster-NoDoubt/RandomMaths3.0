var n1;
var n2;
var op;
var reponse;
var repu;
var score = 0;
var total = 0;
var emote;
var emoteC;
var nError = 1;
var inputInitSize = document.getElementById('input').style.fontSize;
var boutonInitSize = document.getElementById('bouton').style.fontSize;
var inputInitHeight = document.getElementById('input').style.height;
var boutonInitWidth = document.getElementById('bouton').style.width;
var rmhs = localStorage.getItem("rmhs");
var rmhs1 = localStorage.getItem("rmhs1");
document.getElementById('hs').innerHTML = rmhs1;
var hsAlert = true;
var addiN = {
	max: 501,
	min: 1
};
var sousN = {
	max: 501,
	min: 1
};
var multiN = {
	max: 16,
	min: 1
};
var diviN = {
	max: 16,
	min: 1
};
var oWAddition = true;
var oWSoustraction = true;
var oWMultiplication = true;
var oWDivision = true;
var oWB = false;



if (rmhs == undefined) {
	localStorage.setItem("rmhs", "0");
	console.log(localStorage.getItem("rmhs"));
}
if (rmhs1 == undefined) {
	localStorage.setItem("rmhs1", "0");
	console.log(localStorage.getItem("rmhs1"));
}

function replace() {
	/*document.getElementById("error").style.width = window.innerWidth / 5 + "px";
	document.getElementById("error").style.height = window.innerHeight * 0.66 + "px";
	document.getElementById("grades").style.width = window.innerWidth / 10;
	var restartB = document.getElementById("restartB");
	restartB.style.right = window.innerWidth / 2 - 20 + "px";
	var loadB = document.getElementById("loadB");
	loadB.style.right = window.innerWidth / 2 - 33 + "px";*/
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.getElementById("loadB").addEventListener('click', function() {
	var ndj = prompt("Please enter your name");
	let scoreontotal = ndj + "'s score : "+ score + " / " + total;
	download(ndj + ".txt", scoreontotal);
	//alert("Note: save the file with your player name and the extension .txt at the end (ex: toto.txt) and be sure that the popup window will be allowed");
	//window.open("data:application/txt," + encodeURIComponent(ndj + "'s score: " + score + " / " + total))
});

window.addEventListener('resize', replace);

document.getElementById('input').addEventListener('focus', function() {
	this.placeholder = "";
});

document.getElementById('input').addEventListener('focusout', function() {
	if (zoom) {
		this.placeholder = "Ent. Resp.";
	} else {
		this.placeholder = "Enter your response";
	}
});

window.addEventListener("keydown", function(e) {
	if (e.key == "Enter") {
		go();
	}
});

document.getElementById('param_btn').addEventListener('click', function() {
	let nav = document.querySelector(".nav");
	nav.classList.toggle('nav_open');
	this.classList.toggle('param_btn_rotate');
});

document.getElementById('chMMNumberPanel').addEventListener('click', function() {
	let nav = document.querySelectorAll(".nav");
	nav[1].classList.toggle('nav_open');
	verifParam(nav[1]);
});

document.getElementById('chOperation').addEventListener('click', function() {
	let nav = document.querySelectorAll(".nav");
	nav[2].classList.toggle('nav_open');
	verifParam(nav[2]);

	if (oWB == false) {
		oWB = true;
	} else if (oWB == true) {
		if ((op == "+" && oWAddition == false) || (op == "-" && oWSoustraction == false) || (op == "*" && oWMultiplication == false) || (op == "/" && oWDivision == false)) {
			generer();
		}
		
		oWB = false;
	}
});

function verifParam(itself) {
	let nav1 = document.querySelectorAll(".nav");
	for (let i = 1; i < nav1.length; i++) {
		if (i == 2 && itself != document.getElementsByClassName('chOperation')[0] && oWB == true) {
			document.getElementById("chOperation").click();
			document.getElementById("chMMNumberPanel").click();
		} else if (nav1[i] != itself) {
			nav1[i].classList.remove('nav_open');
		}
	}
}

document.getElementById('bouton_chMMNumber').addEventListener('click', function() {
	let nspan = document.querySelectorAll('#chMMNumberErrors span');
	let chNerror1 = false;
	let chNerror2 = false;
	if (!isNaN(document.getElementById("iMaxA").value)) {
		addiN.max = parseInt(document.getElementById("iMaxA").value, 10);
	} else {
		chNerror1 = true;
	}
	if (!isNaN(document.getElementById("iMinA").value)) {
		addiN.min = parseInt(document.getElementById("iMinA").value, 10);
	} else {
		chNerror1 = true;
	}
	if (!isNaN(document.getElementById("iMaxS").value)) {
		sousN.max = parseInt(document.getElementById("iMaxS").value, 10);
	} else {
		chNerror1 = true;
	}
	if (!isNaN(document.getElementById("iMinS").value)) {
		sousN.min = parseInt(document.getElementById("iMinS").value, 10);
	} else {
		chNerror1 = true;
	}
	if (!isNaN( document.getElementById("iMaxM").value)) {
		multiN.max = parseInt(document.getElementById("iMaxM").value, 10);
	} else {
		chNerror1 = true;
	}
	if (!isNaN( document.getElementById("iMinM").value)) {
		multiN.min = parseInt(document.getElementById("iMinM").value, 10);
	} else {
		chNerror1 = true;
	}
	if (document.getElementById("iMaxD").value == 0) {
		chNerror2 = true;
	} else if (!isNaN(document.getElementById("iMaxD").value)) {
		diviN.max = parseInt(document.getElementById("iMaxD").value, 10);
	} else {
		chNerror1 = true;
	}
	if (document.getElementById("iMinD").value == 0) {
		chNerror2 = true;
	} else if (!isNaN(document.getElementById("iMinD").value)) {
		diviN.min = parseInt(document.getElementById("iMinD").value, 10);
	} else {
		chNerror1 = true;
	}

	if (chNerror1) {
		nspan[0].innerHTML = "Please enter valid numbers";
	} else {
		chNerror1 = false;
		nspan[0].innerHTML = "";
	}
	if (chNerror2) {
		nspan[1].innerHTML = "Please do not enter 0 in division";
	} else {
		chNerror2 = false;
		nspan[1].innerHTML = "";
	}

	if (!chNerror1 && !chNerror2) {
		chMMNumberPanel.click();
		if (
			(op == "+" && addiN.min <= n1 && n1 <= addiN.max && addiN.min <= n2 && n2 <= addiN.max) || 
			(op == "-" && sousN.min <= n1 && n1 <= sousN.max && sousN.min <= n2 && n2 <= sousN.max) || 
			(op == "*" && multiN.min <= n1 && n1 <= multiN.max && multiN.min <= n2 && n2 <= multiN.max) || 
			(op == "/" && diviN.min <= n1 && n1 <= diviN.max && diviN.min <= n2 && n2 <= diviN.max)
			) {
			console.log("ok");
		} else {
			generer();
		}
		
	}

	/*console.log('');
	console.log("*******************");
	console.log('');*/
});

document.getElementById('additionBox').addEventListener('change', function() {
	if (!this.checked) {
		oWAddition = false;
	} else {
		oWAddition = true;
	}
});

document.getElementById('soustractionBox').addEventListener('change', function() {
	if (!this.checked) {
		oWSoustraction = false;
	} else {
		oWSoustraction = true;
	}
});

document.getElementById('multiplicationBox').addEventListener('change', function() {
	if (!this.checked) {
		oWMultiplication = false;
	} else {
		oWMultiplication = true;
	}
});

document.getElementById('divisionBox').addEventListener('change', function() {
	if (!this.checked) {
		oWDivision = false;
	} else {
		oWDivision = true;
	}
});


function restart() {
	window.location.reload();
}

/*
var agrandir = document.getElementById("agrandir");
agrandir.addEventListener("click", function() {
	zoom = true;
	var asp1 = document.getElementById('question');
	asp1.style.fontSize = "175%";
	var asp2 = document.getElementById('input');
	asp2.style.fontSize = "150%";
	asp2.style.height = "30px";
	asp2.placeholder = "Ent. Resp."
	var asp3 = document.getElementById('bouton');
	asp3.style.fontSize = "150%";
	asp3.style.width = '100px';
	var asp4 = document.getElementById('score2');
	asp4.style.fontSize = "160%";
	var asp5 = document.getElementById('check');
	asp5.style.fontSize = "150%";
	for (let i = 1; i < 4; i++) {
		document.getElementById("error" + i).style.fontSize = "150%";
	}
	document.getElementById("contenu").style.height = "420px";
	document.getElementById("contenu").style.width = "320px";
	document.getElementById('error').style.height = '420px';
	document.getElementById('error').style.transform = 'translate(0%, -50%)';
});

var reduire = document.getElementById("reduire");
reduire.addEventListener("click", function() {
	zoom = false;
	var asp1 = document.getElementById('question');
	asp1.style.fontSize = "125%";
	var asp2 = document.getElementById('input');
	asp2.style.fontSize = inputInitSize;
	asp2.style.height = inputInitHeight;
	asp2.placeholder = "Enter your response";
	var asp3 = document.getElementById('bouton');
	asp3.style.fontSize = boutonInitSize;
	asp3.style.width = boutonInitWidth;
	var asp4 = document.getElementById('score2');
	asp4.style.fontSize = "110%";
	var asp5 = document.getElementById('check');
	asp5.style.fontSize = "100%";
	for (let i = 1; i < 4; i++) {
		document.getElementById("error" + i).style.fontSize = "100%";
	}
	document.getElementById("contenu").style.height = "385px";
	document.getElementById("contenu").style.width = "300px";
	document.getElementById('error').style.height = '320px';
	document.getElementById('error').style.transform = 'translate(0%, -50%)';
});
*/


function rInt(min, max) {
	let response = Math.floor(Math.random() * max + min);
	/*let a = Math.random();
	let b = a * max;
	let c = b + min;
	let response = Math.floor(c);
	console.log("---------------------------");
	console.log("Rep : " + response);
	console.log("Random seul : " + a);
	console.log("Random * Max : " + b);
	console.log("Tout au complet : " + c);
	console.log("Max : " + max);
	console.log("Min : " + min);*/
	return response;
}
function getOp() {
	switch(rInt(0, 4)) {
		case 0:
		if (oWAddition == false) {
			return "fail";
		}
		return "+";
		case 1:
		if (oWSoustraction == false) {
			return "fail";
		}
		return "-";
		case 2:
		if (oWMultiplication == false) {
			return "fail";
		}
		return "*";
		case 3:
		if (oWDivision == false) {
			return "fail";
		}
		return "/";
	}
}
function generer() {
	do {
		op = getOp();
	} while (op == "fail");

	switch(op) {
		case "+":
		n1 = rInt(addiN.min, addiN.max);
		n2 = rInt(addiN.min, addiN.max);
		reponse = n1 + n2;
		break;
		case "-":
		n1 = rInt(sousN.min, sousN.max);
		n2 = rInt(sousN.min, sousN.max);
		reponse = n1 - n2;
		break;
		case "*":
		n1 = rInt(multiN.min, multiN.max);
		n2 = rInt(multiN.min, multiN.max);
		reponse = n1 * n2;
		break;
		case "/":
		let n3 = rInt(diviN.min, diviN.max);
		n2 = rInt(diviN.min, diviN.max);
		n1 = n3 * n2;
		reponse = n1 / n2;
		break;
	}
	var question = document.getElementById("question");
	question.innerHTML = n1 + " " + op + " " + n2 + " = ?";
	console.log(n1 + " " + op + " " + n2 + " = ?");
	console.log(reponse);
}
function go() {
	repu = document.getElementById('input');
	if (repu.value == "" || isNaN(repu.value)) {
		alert("Please enter a number ...");
		document.getElementById("check").innerHTML = "Please enter a number ...";
		document.getElementById('check').style.color = "red";
		document.getElementById('input').value = "";
		return;
	}
	console.log(repu.value);
	if (repu.value == reponse) {
		chScore("t");
	} else {
		chScore("f");
	}
	if (score / total * score > rmhs) {
		if (hsAlert) {
			alert('YOU BEAT YOUR HIGHT SCORE !!! Well done !');
			hsAlert = false;
		}
		rmhs1 = score + " / " + total;
		rmhs = score / total * score;
		document.getElementById('hs').innerHTML = rmhs1;
		localStorage.setItem("rmhs1", rmhs1);
		localStorage.setItem("rmhs", rmhs);
	}

	repu.value = "";
	generer();
}
function chScore(on) {
	if (on == "t") {
		score++;
		total++;
		emote = "\u2713";
		emoteC = "green";
	} else {
		total++;
		emote = "X";
		emoteC = "red";
		if (nError > 3) {
			nError = 3;
			let er01 = document.getElementById("error1");
			let er02 = document.getElementById("error2");
			let er03 = document.getElementById("error3");
			er01.innerHTML = er02.innerHTML;
			er02.innerHTML = er03.innerHTML;
		}
		var lerreur = document.getElementById("error" + nError)
		lerreur.innerHTML = total + ") " + n1 + " " + op + " " + n2 + " = " + reponse + "<br>You entered : " + repu.value;
		nError++;
	}
	var points = document.getElementById("score");
	points.innerHTML = score + " / " + total;
	var check = document.getElementById("check");
	check.innerHTML = emote;
	check.style.color = emoteC;
	
	function easterEggs() {
		// Easter eggs
		/*
		if (score ==  && total ==  ) {
			alert('');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:;"></span>'
		}
		*/
		/*if (score == 5 && total == 5 ) {
			alert('Ok ... 5 out of 5, but I\'m not convinced of your performance ...');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color: #8B4513;">-Poop</span>'
		}
		if (score < total && total == 10) {
			alert('You are definitively TRASH');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#556B2F;">-Trash</span>'
		}
		if (score == 25 && total == 25 ) {
			alert('Wow, you are more intelligent than I thought');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#FFD700;">-Intelligent</span>'
		}
		if (score == 50 && total == 50 ) {
			alert('WOW YOU ARE A GENIUS !!!');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#FF8C00;">-GENIUS</span>'
		}
		if (score > 47 && total == 50 ) {
			alert('I give you a B.');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#FF7F50;">-B grade</span>'
		}
		if (score == 100 && total == 100 ) {
			alert('Stop using the calculator please ...');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#DB7093;">-Using calculator</span>'
		}
		if (score == 200 && total == 200 ) {
			alert('STOP CHEATING !');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#B22222;">-Cheater</span>'
		}
		if (score > 1000  && total == score ) {
			alert('Oh you are a BIG cheater, gg');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:#8B0000;">-Big Cheater</span>'
		}
		if (score == 75 && total == 75 ) {
			alert('How old are you ? You are an adult (or a cheater but I don\'t think');
			let grades = document.getElementById('grades');
			grades.innerHTML += '<br><span style="color:4B0082;">-Adult</span>'
		}*/
	}
}
replace();
generer();
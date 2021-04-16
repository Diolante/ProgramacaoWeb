
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})


if (localStorage.Email) {
	document.getElementById('Email').value = localStorage.Email;
}
if (localStorage.pwd) {
	document.getElementById('pwd').value = localStorage.pwd;
}

var salvarData = function() {
	var Email = document.getElementById('Email').value;
	var pwd = document.getElementById('pwd').value;
	localStorage.setItem('Email', Email);
	localStorage.setItem('pwd', pwd);
};

document.onchange = salvarData;

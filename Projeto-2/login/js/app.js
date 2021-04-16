
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
if (localStorage.senha) {
	document.getElementById('senha').value = localStorage.senha;
}

var salvarData = function() {
	var Email = document.getElementById('Email').value;
	var senha = document.getElementById('senha').value;
	localStorage.setItem('Email', Email);
	localStorage.setItem('senha', senha);
};

document.onchange = salvarData;

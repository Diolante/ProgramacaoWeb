window.onload = function() {
    
	document.getElementById("signin").addEventListener("click", salvarData, false);
    
	if (sessionStorage.username) {
		document.getElementById('username').value = sessionStorage.username;
	}
	if (sessionStorage.pwd) {
		document.getElementById('pwd').value = sessionStorage.pwd;
	}
}

function salvarData() {
	var username = document.getElementById('username').value;
	var pwd = document.getElementById('pwd').value;
    
	sessionStorage.setItem('username', username);
	sessionStorage.setItem('pwd', pwd);
	sendDataLogIn(username,pwd);
};

function validaCampos(){

	if(validaEmail() && validaSenha())
	{
		document.getElementById("signin").disabled = false;
	}
	else
	{
		document.getElementById("signin").disabled = true; 		
	}
/*     if(document.getElementById('username').value.length < 3 || 
        document.getElementById('username').value.length > 20)
    {
        document.getElementById("myPopup").classList.toggle("show");
    }
    else if(document.getElementById('pwd').value.length < 3)
    {
        document.getElementById("myPopup2").classList.toggle("show");
    }
    else
    {  
        salvarData();
    } */
}

sendHttpRequest = (method, url, data) => 
{
    var promise = new Promise((resolve, reject) => 
	{
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.responseType = 'json';
		if (data) {
		  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
		}
		xhr.onload = () => {
		  if (xhr.status >= 400) {
			reject(xhr.response);
		  } else {
			resolve(xhr.response);
		  }
		};

		xhr.onerror = () => {
		  reject('Algo deu errado!');
		};

		xhr.send(JSON.stringify(data));
  });
  return promise;
};

sendDataLogIn = (username,pwd) => {
  sendHttpRequest('POST', 'https://reqres.in/api/register', {
    email: username,
    password: pwd
  })
    .then(responseData => {
      console.log(responseData);
	  //alert('Usuário registrado!')
    })
    .catch(err => {
      console.log(err);
	  //alert(err.error)
    });
};


function validaEmail()
{
	if(document.getElementById('username').value.includes('@'))
	{
	    document.getElementById('mensagem').style.visibility = "hidden";
		return true; 
	}
	else
	{
		document.getElementById('mensagem').style.visibility = "visible";
		return false; 
	}
}

function validaSenha()
{
	if(document.getElementById('pwd').value.length > 5)
	{
	    document.getElementById('mensagem_senha').style.visibility = "hidden";
		return true; 
	}
	else
	{
		document.getElementById('mensagem_senha').style.visibility = "visible";
		return false; 
	}
}

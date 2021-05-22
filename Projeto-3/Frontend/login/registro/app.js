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
  sendHttpRequest('POST', 'https://projeto3-progweb-backend.herokuapp.com/cadastro_usuario', {
    email: username,
    senha: pwd
  })
    .then(responseData => {
	  document.getElementById('mensagem_registro_erro').innerHTML = responseData.Ok_Msg;
	  document.getElementById('mensagem_registro').style.visibility = "visible";
	  document.getElementById('mensagem_registro_erro').style.visibility = "hidden";
	 location.href = '../login.html';
    })
    .catch(err => {
	  document.getElementById('mensagem_registro_erro').innerHTML = err.Err_Msg;
	  document.getElementById('mensagem_registro_erro').style.visibility = "visible";
      document.getElementById('mensagem_registro').style.visibility = "hidden";    
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

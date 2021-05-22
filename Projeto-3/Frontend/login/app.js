window.onload = function() {
        
    document.getElementById("signin").addEventListener("click", salvarData, false);
	if (sessionStorage.username) {
		document.getElementById('username').value = sessionStorage.username;
	}
	if (sessionStorage.pwd) {
		document.getElementById('pwd').value = sessionStorage.pwd;
	}
    

	if(sessionStorage.getItem('token') != null){
        var mensagemBoaVindas = "Logado como:  " + sessionStorage.getItem('username');
        document.getElementById('mensagem_logado').innerHTML = mensagemBoaVindas;
        document.getElementById('mensagem_logado').style.visibility = "visible";
		document.getElementById('signin').disabled = true;
		document.getElementById('username').disabled = true;
		document.getElementById('pwd').disabled = true;
    }
}


function concatenaToken(){
    
    var consultaUrl = "../public/public.html";
    
    var consultaUrlTokenizada = consultaUrl + '#token=' + sessionStorage.getItem('token');
       
	window.location.replace(consultaUrlTokenizada);
   
}

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


function salvarData() {
    
        var username = document.getElementById('username').value;
        var pwd = document.getElementById('pwd').value;
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('pwd', pwd);
        sendDataLogIn(username, pwd);		
};


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
		  reject('Something went wrong!');
		};

		xhr.send(JSON.stringify(data));
  });
  return promise;
};

sendDataLogIn = (username, pwd) => {
  sendHttpRequest('POST', 'https://projeto3-progweb-backend.herokuapp.com/login_usuario', {
    email: username,
    senha: pwd
  })
    .then(responseData => {
      sessionStorage.setItem('token', responseData.token);
	  concatenaToken();
    })
    .catch(err => {
	  document.getElementById('mensagem_login').innerHTML = err.Err_Msg;
	  document.getElementById('mensagem_login').style.visibility = "visible";
    });
};

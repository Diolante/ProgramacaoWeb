window.onload = function() {
	document.getElementById("signin").addEventListener("click", salvarData, false);
	if (localStorage.username) {
		document.getElementById('username').value = localStorage.username;
	}
	if (localStorage.pwd) {
		document.getElementById('pwd').value = localStorage.pwd;
	}
}

function salvarData() {
	var username = document.getElementById('username').value;
	var pwd = document.getElementById('pwd').value;
	localStorage.setItem('username', username);
	localStorage.setItem('pwd', pwd);
	sendDataLogIn(username,pwd);
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

sendDataLogIn = (username,pwd) => {
  sendHttpRequest('POST', 'https://reqres.in/api/login', {
    email: username,
    password: pwd
  })
    .then(responseData => {
      console.log(responseData);
	  alert('Usuário logado!')
    })
    .catch(err => {
      console.log(err);
	  alert(err.error)
    });
};

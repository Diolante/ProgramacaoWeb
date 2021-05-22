$(function(){
	$('#profilecardname').text(Cookies.get('name'));
	
	$statslistitemcount = $('#statslistitemcount');
	
	$totalchars = $('#totalchars');
	
	$posttweetta = $('#posttweetta');
	
	$tweetscontainer = $('#tweetscontainer');
	
	$posttweetta.keypress(function(e){
		if (e.keyCode == 13 && !e.shiftKey)
		{
		  e.preventDefault();
		  return false;
		}
		
	});
	
	$posttweetta.keyup(function(e){
		$totchars = $(this).val().length;
		if($totchars <= 250)
			$totalchars.text($totchars);
		else
		{
			$totalchars.text('250');
			$(this).val($(this).val().substring(0, 250));
		}
	});
	
	$('#posttweetbut').click(function(){
		if(($taval = $.trim($posttweetta.val())).length > 0)
		{
			$tweetscontainer.prepend(tweetitem($taval));
			$posttweetta.val('');	
			$statslistitemcount.text(parseInt($statslistitemcount.text()) + 1);	
		}
	});
	
	$tweetscontainer.on('click', 'span.retweet', function(){
		$tweetstatscount = $(this).children('.tweetstatscount');
		$tweetstatscount.text(parseInt($tweetstatscount.text()) + 1);
		
		$tweetscontainer.prepend(tweetitem($tweetstatscount.closest('.tweetcontainer').find('p').text()));
		$statslistitemcount.text(parseInt($statslistitemcount.text()) + 1);	
	});
	
	$tweetscontainer.on('click', 'span.like', function(){
		$tweetstatscount = $(this).children('.tweetstatscount');
		if($(this).hasClass('blue'))
		{
			$(this).removeClass('blue');
			$tweetstatscount.text(parseInt($tweetstatscount.text()) - 1);
		}
		else
		{
			$(this).addClass('blue');
			$tweetstatscount.text(parseInt($tweetstatscount.text()) + 1);
		}
	});
	
	function tweetitem($taval)
	{
		console.log($taval);
		var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
		var token = urlParams.get('token');
		console.log(token);  
		sendDataLogIn(token,$taval);
		
		return '<li class="tweetcontainer">'+
					'<img class="tweetprofimg" src="perfil.jpg">'+
					'<span class="tweetprofname">'+Cookies.get('name')+'</span>'+
					'<div class="ml58px">'+
						'<p style="margin: 0px;">'+$taval+'</p>'+
						'<div class="mt10px">'+
							'<span class="retweet tweetstats">'+
								'<i class="fa fa-retweet"></i>'+
								'<span class="tweetstatscount">0</span>'+
							'</span>'+
							'<span class="like tweetstats">'+
								'<i class="fa fa-heart-o"></i>'+
								'<span class="tweetstatscount">0</span>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</li>';
	}
	function carrega_public($taval)
	{
		console.log($taval);
		var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
		var token = urlParams.get('token');
		return '<li class="tweetcontainer">'+
					'<img class="tweetprofimg" src="perfil.jpg">'+
					'<span class="tweetprofname">'+Cookies.get('name')+'</span>'+
					'<div class="ml58px">'+
						'<p style="margin: 0px;">'+$taval+'</p>'+
						'<div class="mt10px">'+
							'<span class="retweet tweetstats">'+
								'<i class="fa fa-retweet"></i>'+
								'<span class="tweetstatscount">0</span>'+
							'</span>'+
							'<span class="like tweetstats">'+
								'<i class="fa fa-heart-o"></i>'+
								'<span class="tweetstatscount">0</span>'+
							'</span>'+
						'</div>'+
					'</div>'+
				'</li>';
	}
	var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
	var token = urlParams.get('token');
	sendHttpRequest('GET', ('https://projeto3-progweb-backend.herokuapp.com/carrega_publicacoes/' + token))
	.then(responseData => {
		for (var i = 0; i < responseData.Publicacoes_Usuario.length; i++){
			$tweetscontainer.prepend(carrega_public(responseData.Publicacoes_Usuario[i].conteudo))
		}
	})
	.catch(err => {
	  console.log(err.Err_Msg);
	});
});



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


sendDataLogIn = (token, conteudo) => {
  sendHttpRequest('POST', 'https://projeto3-progweb-backend.herokuapp.com/nova_publicacao', {
    email: 'teste@gmail.com',
    conteudo: conteudo,
	token: token
  })
    .then(responseData => {
		var nameval = 'N26 Banking - Ajuda';
    })
    .catch(err => {
      console.log(err.Err_Msg);
    });
};

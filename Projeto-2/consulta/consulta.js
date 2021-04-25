window.onload = function() {
    document.getElementById("btnMostreListaEspera").addEventListener("click", getUsuarios, false);
        
    var urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
    var token = urlParams.get('token');
    
    var btnMostreListaEspera = document.getElementById("btnMostreListaEspera");
    var infoLogin = document.getElementById("loginRequirementInfo");
    
    console.log(token)
    
    if(token == 'null')
    {
        btnMostreListaEspera.disabled = true; 
        infoLogin.style.visibility = "visible";
    }   
}



function popularTabela(response){
     
    document.getElementById("tblUsuarios").style.visibility = "visible";
    document.getElementById("headerTable").style.visibility = "visible";
     
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    
    for (var i = 0; i < 12; i++) {
     
        user = Math.round(Math.random() * (19 - 1) + 1);
        
        var tbodyRef = document.getElementById('tblUsuarios').getElementsByTagName('tbody')[0];
        var novaLinha = tbodyRef.insertRow();

        var novaCelula = novaLinha.insertCell();
        var posicao = document.createTextNode(response.data[user].id);
        novaCelula.appendChild(posicao);
        
        var novaCelula = novaLinha.insertCell();
        var nome = document.createTextNode(response.data[user].name);
        novaCelula.appendChild(nome);
    }
 }

function getUsuarios(){
    
    let xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://gorest.co.in/public-api/users');

    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    xhr.onprogress = function(){
     
        console.log("Aguarde..");
    }

    xhr.onload = function(){
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        popularTabela(response);
    }
    xhr.send();  
    
    
}



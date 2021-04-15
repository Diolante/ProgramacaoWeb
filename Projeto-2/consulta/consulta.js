window.onload = function() {
    document.getElementById("btnMostreUsuarios").addEventListener("click", getUsuarios, false);
}

 function popularTabela(response){
     
    document.getElementById("tblUsuarios").style.visibility = "visible";
    document.getElementById("headerTable").style.visibility = "visible";
     
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    
    for (var i = 0; i < 12; i++) {
     
        user = Math.round(Math.random() * (19 - 1) + 1);
        
        var tbodyRef = document.getElementById('tblUsuarios').getElementsByTagName('tbody')[0];
        var novaLinha = tbodyRef.insertRow();

        var novaCelula = newRow.insertCell();
        var posicao = document.createTextNode(response.data[user].id);
        novaCelula.appendChild(posicao);
        
        var novaCelula = newRow.insertCell();
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



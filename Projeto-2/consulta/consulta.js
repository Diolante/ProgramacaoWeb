window.onload = function() {
    document.getElementById("btnMostreUsuarios").addEventListener("click", getUsuarios, false);
}

 function popularTabela(response){
     
    document.getElementById("tblUsuarios").style.visibility = "visible";
    document.getElementById("headerTable").style.visibility = "visible";
     
    document.querySelectorAll("table tbody tr").forEach(function(e){e.remove()})
    
    for (var i = 0; i < 12; i++) {
     
        var tbodyRef = document.getElementById('tblUsuarios').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow();

        var newCell = newRow.insertCell();
        var pix = document.createTextNode(response.data[i].id);
        newCell.appendChild(pix);
        
        var newCell = newRow.insertCell();
        var nome = document.createTextNode(response.data[i].name);
        newCell.appendChild(nome);
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



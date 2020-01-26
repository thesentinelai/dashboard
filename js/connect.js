function sendRequest(authToken = "", userAddress = ""){
    const url = ENDPOINT + "/apps/connect";
    const data = "{\"user\":\""+userAddress+"\", \"auth_token\":\""+authToken+"\" }";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(e) {
       if (xhr['status'] == 201){
           console.log(xhr);
           document.getElementById("connectApp").innerText = "All done.";
       }
    }
    xhr.send(data);

}

function connect(){
    document.getElementById("connectApp").disabled = true;
    const authToken = document.getElementById("authToken").value;
    const userAddress = localStorage.getItem('userAddress');
    sendRequest(authToken, userAddress);
}

window.addEventListener('load', async function() {
    enforceSignIn();
    document.getElementById("logoutBtn").addEventListener("click", logout);
});

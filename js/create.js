function sendRequest(appName = "", userAddress = ""){
    const url = ENDPOINT + "/apps/new";
    const data = "{\"user\":\""+userAddress+"\", \"app_name\":\""+appName+"\" }";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(e) {
       if (xhr['status'] == 201){
           console.log(xhr);
           document.getElementById("registerApp").innerText = "All done.";
       }
    }
    xhr.send(data);

}

function register(){
    document.getElementById("registerApp").disabled = true;
    const appName = document.getElementById("appName").value;
    const userAddress = localStorage.getItem('userAddress');
    sendRequest(appName, userAddress);
}

window.addEventListener('load', async function() {
    enforceSignIn();
    document.getElementById("logoutBtn").addEventListener("click", logout);
});

async function signin(){

    const url = ENDPOINT + "/signin";
    const data = "{\"seed_sentence\":\""+document.getElementById("seedwords").value+"\"}";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(e) {
       if (xhr['status'] == 201){
           console.log(xhr);
            localStorage.setItem('userAddress', JSON.parse(xhr['responseText'])['public_key']);
            localStorage.setItem('userSeed', document.getElementById("seedwords").value);
            window.location = "/apps-myapps.html";
       }
    }
    xhr.send(data);

}

function enableSubmit(){

    const words = (document.getElementById("seedwords").value).split(" ");
    if (words.length == 15)
        document.getElementById("signin").disabled = false;
    else
        document.getElementById("signin").disabled = true;

}

window.addEventListener('load', async function() {
    if (localStorage.getItem('userAddress') !=null && typeof(localStorage.getItem('userAddress')) == "string")
        window.location = "/apps-myapps.html";
    document.getElementById("signin").addEventListener("click", signin);
    document.getElementById("signin").disabled = true;
    document.getElementById("seedwords").addEventListener("keyup", enableSubmit);
});

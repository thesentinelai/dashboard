let ENDPOINT  = "http://127.0.0.1:5000"

function trimAdd(add = "") {
    return add.slice(0,5) + "..."  + add.slice(add.length-5, add.length)
}

function enforceSignIn() {
    if (localStorage.getItem('userAddress') ==null || typeof(localStorage.getItem('userAddress')) != "string")
        window.location = "/main-signin.html";
}
function logout(){
    localStorage.clear();
    window.location = "/main-signin.html";
}

function getSessionUser() {
    enforceSignIn()
    return localStorage.getItem('userAddress');
}

function logout(){
    localStorage.clear();
    window.location = "/main-signin.html";
}

function connectApp(){
    window.location = "/apps-connect.html";
}


function createApp(){
    window.location = "/apps-create.html";
}

function copyToClipboard(text = accountData['seed_sentence']) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

function copyToken(authToken = ""){
    const authApp = document.getElementById(authToken) ;
    const appName = authApp.innerText;
    copyToClipboard(authToken);
    authApp.innerText = "Auth Token Copied";
    setTimeout(function () {
        authApp.innerText = appName;
    }, 500);
}


async function updateUI(){
    const url = ENDPOINT + "/apps/connected";
    const data = "{\"user\":\""+getSessionUser()+"\"}";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(e) {
        if (xhr['status'] == 201 && xhr['readyState'] == 4){
            let htmlData = "";
            const appdata = JSON.parse(xhr['responseText'])['apps'];
            console.table(appdata);
            for (var key in appdata) {
                const authToken = appdata[key][0]['auth_token'];
                htmlData += "<a onclick=copyToken('"+authToken+"') class='vacancy-item'> \
                                <div class='vacancy-title' id='"+authToken+"'>"+appdata[key][0]['app_name']+"</div> \
                                <div class='vacancy-text'>"+trimAdd(authToken)+"</div> \
                                <div class='vacancy-arrow'> \
                                    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'> \
                                    <path d='M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z'></path> \
                                    </svg> \
                                </div> \
                            </a> ";
            }
            document.getElementById("myApps").innerHTML = htmlData;
        }
    }
    xhr.send(data);
}

window.addEventListener('load', async function() {
    enforceSignIn();
    document.getElementById("logoutBtn").addEventListener("click", logout);
    await updateUI();
});

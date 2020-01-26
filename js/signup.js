
let accountData;

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

function copy() {
    copyToClipboard();
    document.getElementById("copy").innerText = "Copied.";
}

function backup() {
    const saveString  = "My Address : " + accountData['public_key'] + "\n" + "My Seed Words : "  +accountData['seed_sentence'];
    document.getElementById("backup").innerText = "Just a sec ...";
    var blob = new Blob([saveString],{ type: "text/plain;charset=utf-8" });
    saveAs(blob, "Lockdown Account Details.txt");
    document.getElementById("backup").innerText = "All Done.";
}

async function uiUpdateDetails(){
    let response = await fetch(ENDPOINT + "/signup");
    const data = await response.json()

    document.getElementById("userAddress").innerText =  trimAdd(data['public_key']);
    document.getElementById("seed").innerText =  data['seed_sentence'];
    accountData = data;
}

function updateBtntext(){
    document.getElementById("copy").innerText = "Copy";
    document.getElementById("backup").innerText = "Backup";
}

function backgroundUpdates(){
    timerId2 = setInterval(() => updateBtntext(), 2000);
}

window.addEventListener('load', async function() {
    document.getElementById("backup").addEventListener("click", backup);
    document.getElementById("copy").addEventListener("click", copy);
    await uiUpdateDetails();
    backgroundUpdates();

});

function updateUI(){
    const userAddress = localStorage.getItem('userAddress');
    var qrcode = new QRCode("userQR", {
        text: userAddress,
        width: 256,
        height: 256,
        colorDark : "#0034c1",
        colorLight : "#7ccfff",
        correctLevel : QRCode.CorrectLevel.H
    });
    document.getElementById("userAdd").innerText = trimAdd(userAddress);
}

function copyToClipboard(text = localStorage.getItem('userSeed')) {
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
    const userAddress = localStorage.getItem('userAddress');
    const userSeed = localStorage.getItem('userSeed');
    const saveString  = "My Address : " + userAddress + "\n" + "My Seed Words : "  +userSeed;
    document.getElementById("backup").innerText = "Just a sec ...";
    var blob = new Blob([saveString],{ type: "text/plain;charset=utf-8" });
    saveAs(blob, "Lockdown Account Details.txt");
    document.getElementById("backup").innerText = "All Done.";
}

function revealSeed(){
    const seedText = document.getElementById("userSeed");
    seedText.innerText = localStorage.getItem('userSeed');
    setTimeout(function () {
        seedText.innerText = "Triple Click to Reveal Seed";
    }, 4500);
}

function updateBtntext(){
    document.getElementById("copy").innerText = "Copy Seed";
    document.getElementById("backup").innerText = "Backup";
}

function backgroundUpdates(){
    timerId2 = setInterval(() => updateBtntext(), 2000);
}

window.addEventListener('load', async function() {
    enforceSignIn();
    document.getElementById("backup").addEventListener("click", backup);
    document.getElementById("copy").addEventListener("click", copy);
    document.getElementById("userSeed").addEventListener('click', function (evt) {
        if (evt.detail === 3) {
            revealSeed();
        }
    });
    // document.getElementById("userSeed").addEventListener("dblclick", revealSeed);
    document.getElementById("logoutBtn").addEventListener("click", logout);
    updateUI();
    backgroundUpdates();
});

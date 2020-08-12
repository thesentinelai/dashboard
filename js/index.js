let SentinelContract;

if (typeof window.ethereum !== 'undefined') {
    ethereum.autoRefreshOnNetworkChange = false;
}

window.addEventListener('load', async () => {

    if (window.web3) {

        web3.version.getNetwork((err, netId) => {
            if(netId != 80001){
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Network',
                    html: `Please switch to https://rpc-mumbai.matic.today`
                });
            }
        });


        try {

            window.web3 = new Web3(web3.currentProvider);
            SentinelContract = new web3.eth.Contract(contractABI, contractAddress);
            init();

        } catch (error) {
            console.log(error);
            alert(error);
        }

    } else{
        Swal.fire({
            icon: 'info',
            title: 'No Web3 Detected',
            html: `We Recommend Getting a Web3 Compatible browser like MetaMask.`
        });

        window.web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.matic.today'));
        SentinelContract = new web3.eth.Contract(contractABI, contractAddress);
        init();
    }

});


function format_two_digits(n) {return n < 10 ? '0' + n : n;}

function simpleDate(_timestamp = Date.now()){
    if(_timestamp == 0 ) return 0;
    const date1 = new Date(_timestamp*1000);
    hours = format_two_digits(date1.getHours());
    minutes = format_two_digits(date1.getMinutes());
    seconds = format_two_digits(date1.getSeconds());
    const format = date1.getDate() + "/" + (date1.getMonth()+1) + " " + hours + ":" + minutes + ":" + seconds
    return format;
}

function trimhash(_hash = "", w = 6){
    return _hash.slice(0, w) +"..."+ _hash.slice(_hash.length-w, _hash.length)
}

function trimAdd(_addr = ""){
    return _addr.slice(0, 5) +"..."+ _addr.slice(_addr.length-3, _addr.length)
}

function copyToClipboard(text) {
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

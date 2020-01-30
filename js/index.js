SentinelContract = undefined;
Sentinel = undefined;

window.addEventListener('load', async () => {

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
                await ethereum.enable();
                web3.version.getNetwork((err, netId) => {
                    if(netId != 8995){
                        alert("Please switch to https://testnet2.matic.network");
                    }
                });

                SentinelContract = web3.eth.contract(contractABI);
                Sentinel = SentinelContract.at(contractAddress);

                init();

        } catch (error) {
                console.log(error);
                alert("MetaMask Denied");
        }

    } else if (window.web3) {
        web3.version.getNetwork((err, netId) => {
            if(netId != 8995){
                alert("Please switch to https://testnet2.matic.network");
            }
        });
        window.web3 = new Web3(web3.currentProvider);
        SentinelContract = new web3.eth.contract(contractABI);
        Sentinel = SentinelContract.at(contractAddress);

        init();
    } else {
        alert("Get Web3 Compatible");
    }
});

function init(){}

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

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

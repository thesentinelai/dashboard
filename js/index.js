SentinelContract = undefined;
Sentinel = undefined;

window.addEventListener('load', async () => {

    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
                await ethereum.enable();

                ethereum.autoRefreshOnNetworkChange=false;

                web3.version.getNetwork((err, netId) => {
                    if(netId != 16110){
                        Swal.fire({
                            icon: 'error',
                            title: 'Wrong Network',
                            html: `Please switch to https://betav2.matic.network`
                        });
                    }
                });

                SentinelContract = web3.eth.contract(contractABI);
                Sentinel = SentinelContract.at(contractAddress);

                init();

        } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'MetaMask Rejected'
                });
        }

    } else if (window.web3) {
        web3.version.getNetwork((err, netId) => {
            if(netId != 16110){
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Network',
                    html: `Please switch to https://betav2.matic.network`
                });
            }
        });
        window.web3 = new Web3(web3.currentProvider);
        SentinelContract = new web3.eth.contract(contractABI);
        Sentinel = SentinelContract.at(contractAddress);

        init();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'MetaMask Rejected',
            html: `Get a Web3 Compatible Browser like MetaMask or TrustWallet`
        });
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

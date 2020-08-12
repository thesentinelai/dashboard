async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })

    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() });
    window.node = node;
    const status = node.isOnline() ? 'online' : 'offline';
    console.log(`Node status: ${status}`);


    document.getElementById("userAddress").innerText = trimAdd(web3.currentProvider.selectedAddress);

    web3.eth.getBalance(web3.currentProvider.selectedAddress).then((balance)=>{
        document.getElementById("userBalance").innerText = parseFloat(web3.utils.fromWei(balance, "ether")).toFixed(2)+" ETH";
    })

    var slider = document.getElementById("rndCount");
    var output = document.getElementById("rndCntLabel");
    output.innerHTML = slider.value;
    slider.oninput = function() {
      output.innerHTML = this.value;
    }

    refreshUI();
}


async function refreshUI(){
    let tasksElement = document.getElementById("userTasks");
    let taskData = await getTasks();

    document.getElementById("tasksTitle").innerText = "Your Tasks";
    if (taskData.length > 0){
        taskData.forEach((taskDetails, index, arr) => {
            tasksElement.innerHTML += `<a href='/tasks.html?taskID=${taskDetails[0]}' class='vacancy-item'> \
                <div class='vacancy-title'>Task ID: ${taskDetails[0]}</div> \
                <div class='vacancy-text'>${taskDetails[1]}</div> \
                <div class='vacancy-arrow'> \
                <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                    <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
                </svg> \
                </div> \
            </a>`;
        });
    }
    else{
        document.getElementById("tasksTitle").innerText = "No Tasks Found";
        document.getElementById("noTasks").setAttribute("style", "display:block;");
    }

}

async function modelhandle(event){
    event.preventDefault();
    const submitBtn = document.getElementById("submit");

    submitBtn.innerText = "Aww Yuss";
    submitBtn.disabled = true;

    if (document.querySelector('#modelfile').files.length < 1) {
        submitBtn.innerText = "Nani?!";
        setTimeout(function(){ submitBtn.innerText = "Start Learning"; submitBtn.disabled = false;}, 2000);
    }
    else {
        let data = await node.add(document.querySelector('#modelfile').files[0]);

        createTask(data['path']);


        submitBtn.innerText = "Almost there..";
        submitBtn.disabled = true;

        var wsWeb3 = new Web3(new Web3.providers.WebsocketProvider("wss://ws-mumbai.matic.today"));

        wsWeb3.eth.getBlockNumber()
        .then((currentBlock)=>{
            let topic2 = '0x000000000000000000000000' + web3.currentProvider.selectedAddress.slice(2,);
            var subscription = wsWeb3.eth.subscribe('logs', {
                fromBlock: currentBlock,
                address: contractAddress,
                topics: [
                    '0xceb55fb99742a0d2305c686897f79e89483a9725c0f5493808c9a4787f2a875a', // newTaskCreated
                    null,
                    topic2
                ]
            }, function(error, result){
                if (!error)
                    console.log("resolved in event tracking");
            })
            .on("connected", function(subscriptionId){
                console.log(`tracking : newTaskCreated ${subscriptionId}`);
            })
            .on("data", function(event){
                console.log(event);
                var xhr = new XMLHttpRequest();
                let taskID = parseInt(event.topics[1]);
                xhr.open("POST", `${COORDINATOR_NODE}${train_ep}/${taskID}`, true);
                xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                xhr.onreadystatechange = function(e) {
                    if(xhr['status'] == 200 && xhr['readyState'] == 4){
                        console.log(`Sending ${taskID} for training.`);
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Model has Started Training 🗺',
                            html: `You can now track you Model's progress.`,
                            backdrop: `rgba(0,0,123,0.4)
                                url("/img/landing/nyan-cat.gif")
                                left top
                                no-repeat
                            `,
                            confirmButtonColor: '#0016b9',
                            confirmButtonText: 'Track Progress'
                        }).then((result) => {
                            if (result.value) {
                                location = `/tasks.html?taskID=${taskID}`;
                            }
                        });
                        submitBtn.innerText = "Start Learning";
                        submitBtn.disabled = false;
                    }
                }
                xhr.send();
            })
        });

    }


}

async function createTask( _modelHash = ""){
    let promise = new Promise((res, rej) => {

        if(_modelHash.slice(0, 2) != "Qm"){
            Swal.fire({
                icon: 'error',
                title: 'Invalid Model File',
                text: 'Your can try Sentinel out by using the provided sample model file.'
            })
            rej("Invalid File");
        }
        else{
            const rndCount = parseInt(document.getElementById("rndCount").value);
            SentinelContract.methods.createTask(_modelHash, rndCount).send({from:web3.currentProvider.selectedAddress}, function(error, result) {
                document.getElementById("submit").disabled = false;

                if (!error){
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Model is Awaiting Deployment',
                        html: `Track your transaction <a href="https://mumbai-explorer.matic.today/tx/${result}">Here</a>`
                    })
                    res(result);
                }

                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Transaction Failed',
                        text: 'MetaMask Denied!'
                    })
                    rej(error);
                }
            });
        }



    });
    let result = await promise;
    return result;
}


async function getTasks(_userAddress = web3.currentProvider.selectedAddress) {

    let promise = new Promise((res, rej) => {

        let responseData = [];
        SentinelContract.getPastEvents('newTaskCreated', {
            filter: {_user: _userAddress},
            fromBlock: 2865232,
            toBlock: 'latest'
        }, function(error, logs){
            if(!error){
                logs.forEach(async function(log){
                    let logData = log.returnValues;
                    let date = simpleDate(parseInt(logData['_time']));
                    let taskIndex = parseInt(logData['taskID']);
                    responseData.push([taskIndex, date]);
                })
                res(responseData);
            }
            else{
                rej(error);
            }
        })

    });
    let result = await promise;
    return result.reverse();
}

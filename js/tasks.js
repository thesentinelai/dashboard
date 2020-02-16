
async function init() {

    let urldata = getQueryParams();

    refreshUI();
    document.getElementById("latestLink").addEventListener("click", await copyLatest);
}

async function refreshUI(){

    let urldata = getQueryParams();
    if ('taskID' in urldata){
        let taskDetails = await getTaskDetails(urldata['taskID']);
        document.getElementById('modelCost').innerText = taskDetails['cost'] + " ETH";
        document.getElementById('roundDetails').innerText = taskDetails['currentRound'] + "/" + taskDetails['totalRounds'];
        getTaskHashes(parseInt(urldata['taskID']));
    }
    else{
        window.location= '/dashboard.html';
    }

};

async function copyLatest(_userAddress = web3.eth.accounts[0]){
    let urldata = getQueryParams();
    let _taskId = urldata['taskID'];
    let modelUpdatedEvent = Sentinel.modelUpdated({ _user: _userAddress, taskID: _taskId}, {fromBlock: 1279028, toBlock: 'latest'})
    modelUpdatedEvent.get(async (error, logs) => {
        if (logs.length > 0){
            Swal.fire({
                icon: 'success',
                title: 'Here is your direct link',
                html: `<code id="lastestLink">https://ipfs.io/ipfs/${logs[logs.length-1].args['_modelHash']}</code>`,
                backdrop: `rgba(0,0,123,0.4)`,
                confirmButtonColor: '#0016b9',
                confirmButtonText: 'Copy'
            }).then((result) => {
                if (result.value) {
                    copyToClipboard(`https://ipfs.io/ipfs/${logs[logs.length-1].args['_modelHash']}`);
                }
            });
        }
        else {
            let newTaskCreatedEvent = Sentinel.newTaskCreated({ _user: _userAddress, taskID: _taskId}, {fromBlock: 1279028, toBlock: 'latest'})
            newTaskCreatedEvent.get(async (error, logs) => {
                console.log(`https://ipfs.io/ipfs/${logs[0].args['_modelHash']}`)
            });
        }

    });
}


async function viewModelLinks(){
    let promise = new Promise((res, rej) => {

        Sentinel.SentinelTasks(_taskId,function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    let resultDict = {
        'taskID':parseInt(result[0]),
        'currentRound':parseInt(result[1]),
        'totalRounds':parseInt(result[2]),
        'cost':parseInt(result[3]),
    };
    return resultDict;
}

const getQueryParams = () => {
    let queryParams = {};
    let anchor = document.createElement('a');
    anchor.href = window.location.href;
    let queryStrings = anchor.search.substring(1);
    let params = queryStrings.split('&');

    for (var i = 0; i < params.length; i++) {
        var pair = params[i].split('=');
        queryParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    return queryParams;
};

async function getTaskDetails(_taskId = 1) {

    let promise = new Promise((res, rej) => {

        Sentinel.SentinelTasks(_taskId,function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    let resultDict = {
        'taskID':parseInt(result[0]),
        'currentRound':parseInt(result[1]),
        'totalRounds':parseInt(result[2]),
        'cost':parseInt(result[3]),
    };
    return resultDict;
}

async function getTaskHashes(_taskId = 1, _userAddress = web3.eth.accounts[0]) {

    let promise = new Promise((res, rej) => {

        let hashsElement = document.getElementById("hashs");
        hashsElement.innerHTML="";

        let newTaskCreatedEvent = Sentinel.newTaskCreated({ _user: _userAddress, taskID: _taskId}, {fromBlock: 1279028, toBlock: 'latest'})
        newTaskCreatedEvent.get(async (error, logs) => {
            hashsElement.innerHTML += `<a href='https://ipfs.io/ipfs/${logs[0].args['_modelHash']}' class='vacancy-item'> \
                    <div class='vacancy-title'>Model ${1}</div> \
                    <div class='vacancy-text'>${trimhash(logs[0].args['_modelHash'])}</div> \
                    <div class='vacancy-arrow'> \
                    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                        <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
                    </svg> \
                    </div> \
                </a>`;
        });

        let modelUpdatedEvent = Sentinel.modelUpdated({ _user: _userAddress, taskID: _taskId}, {fromBlock: 1279028, toBlock: 'latest'})
        modelUpdatedEvent.get(async (error, logs) => {
            let i = 2;
            logs.forEach(async function(log){
                hashsElement.innerHTML += `<a href='https://ipfs.io/ipfs/${log.args['_modelHash']}' class='vacancy-item'> \
                    <div class='vacancy-title'>Model ${i}</div> \
                    <div class='vacancy-text'>${trimhash(log.args['_modelHash'])}</div> \
                    <div class='vacancy-arrow'> \
                    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                        <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
                    </svg> \
                    </div> \
                </a>`;
                i+=1;
            })
        });
        res(true);
    });
    let result = await promise;
    return result;
}



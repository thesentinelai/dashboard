async function init() {

    window.ethereum.on('accountsChanged', function (accounts) {
        location.reload();
    })
    // web3.currentProvider.publicConfigStore.on('update', callback);

    await refreshUI();
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

function modelhandle(event){
    event.preventDefault();
    const submitBtn = document.getElementById("submit");

    submitBtn.innerText = "Aww Yuss";
    submitBtn.disabled = true;

    if (Boolean(document.getElementsByTagName('input')[1]) === false){

        submitBtn.innerText = "Nani?!";
        setTimeout(function(){ submitBtn.innerText = "Start Learning"; submitBtn.disabled = false;}, 2000);
    }
    else {

        createTask(document.getElementsByTagName('input')[1].value);
        Sentinel.allEvents(async function(error, event) {
            if (error) {
                console.error(error);
                submitBtn.innerText = "Start Learning";
                submitBtn.disabled = false;
                return false
            }
            else {
                submitBtn.innerText = "Almost there..";
                submitBtn.disabled = true;
                if (event.event == "newTaskCreated"){
                    var xhr = new XMLHttpRequest();
                    let taskID = parseInt(event.args['taskID']);
                    xhr.open("POST", `${COORDINATOR_NODE}${train_ep}/${taskID}`, true);
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onreadystatechange = function(e) {
                        if(xhr['status'] == 200 && xhr['readyState'] == 4){
                            console.log(`Sending ${taskID} for training.`);
                            Swal.fire({
                                icon: 'success',
                                title: 'Your Model has Started Training 🗺',
                                html: `Track your model's progress <a href="/tasks.html?taskID=${taskID}" target="_blank">Here</a>`
                            });
                            submitBtn.innerText = "Start Learning";
                            submitBtn.disabled = false;
                        }
                    }
                    xhr.send();
                }
            }
        });

    }


}

async function createTask( _modelHash = ""){
    let promise = new Promise((res, rej) => {

        Sentinel.createTask(_modelHash, 3, {value: 0},function(error, result) {

            document.getElementById("submit").disabled = false;

            if (!error){
                Swal.fire({
                    icon: 'success',
                    title: 'Your Model is Awaiting Deployment',
                    html: `Track your transaction <a href="https://betav2-explorer.matic.network/tx/${result}">Here</a>`
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

    });
    let result = await promise;
    return result;
}


async function getTasks(_userAddress = web3.eth.accounts[0]) {

    let promise = new Promise((res, rej) => {

        let responseData = [];

        let newTaskCreatedEvent = Sentinel.newTaskCreated({ _user: _userAddress}, {fromBlock: 1279028, toBlock: 'latest'})
        newTaskCreatedEvent.get(async (error, logs) => {
            if(!error){
                logs.forEach(async function(log){
                    let logData = log.args;
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

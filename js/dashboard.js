async function init() {
    let form = document.getElementById( "modelSubmit" );
    form.addEventListener( "submit", function ( event ) {
        modelhandle(event);
    } );
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
    const url = COORDINATOR_NODE + upload_ep;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function(e) {
        if(xhr['status'] == 200 && xhr['readyState'] == 4){
            console.log("Starting Transaction with model hash : " + xhr['responseText']);
            Sentinel.allEvents(async function(error, event) {
                if (error) {
                  console.error(error);
                  return false
                }
                else {
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
                            }
                        }
                        xhr.send(JSON.stringify({ "file_name": document.getElementsByTagName('input')[1].value}));
                    }
                }
            });

        }
    }
    xhr.send(JSON.stringify({ "file_name": document.getElementsByTagName('input')[1].value}));
}

async function createTask( _modelHash = ""){
    let promise = new Promise((res, rej) => {

        Sentinel.createTask(_modelHash, 2, {value: 0},function(error, result) {
            if (!error){
                Swal.fire({
                    icon: 'success',
                    title: 'Your Model is Awaiting Deployment',
                    html: `Track your transaction <a href="https://explorer.testnet2.matic.network/tx/${result}">Here</a>`
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

        let newTaskCreatedEvent = Sentinel.newTaskCreated({ _user: _userAddress}, {fromBlock: 0, toBlock: 'latest'})
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

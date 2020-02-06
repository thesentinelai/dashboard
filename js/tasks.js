
async function init() {
    await refreshUI();
}

async function refreshUI(){
    let hashsElement = document.getElementById("hashs");
    let urldata = getQueryParams();
    if ('taskID' in urldata){
        let taskDetails = await getTaskDetails(urldata['taskID']);
        document.getElementById('modelCost').innerText = taskDetails['cost'] + " ETH";
        document.getElementById('roundDetails').innerText = taskDetails['currentRound'] + "/" + taskDetails['totalRounds'];
        let taskHashs = await getTaskHashs(urldata['taskID']);

        let i=0;
        for(i=0;i<taskDetails['currentRound'];i++) {
            console.log(i);
            hashsElement.innerHTML += `<a href='https://cloudflare-ipfs.com/ipfs/${taskHashs[i]}' class='vacancy-item'> \
                    <div class='vacancy-title'>Model ${i+1}</div> \
                    <div class='vacancy-text'>${taskHashs[i]}</div> \
                    <div class='vacancy-arrow'> \
                    <svg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12'> \
                        <polygon points='0 10.59 4.58 6 0 1.41 1.41 0 7.41 6 1.41 12'></polygon> \
                    </svg> \
                    </div> \
                </a>`;
        }
    }
};

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


async function getTaskHashs(_taskId = 1) {

    let promise = new Promise((res, rej) => {
        Sentinel.getTaskHashes(_taskId,function(error, result) {
            if (!error)
                res(result);
            else{
                rej(false);
            }
        });

    });
    let result = await promise;
    return result.reverse();
}

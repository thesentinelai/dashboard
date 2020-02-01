
async function init() {
    let form = document.getElementById( "modelSubmit" );
    form.addEventListener( "submit", function ( event ) {
        modelhandle(event);
    } );
}

function modelhandle(event){
    event.preventDefault();
    const url = COORDINATOR_NODE + upload_ep;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function(e) {
        if(xhr['status'] == 200){
            createTask(xhr['responseText']);
        }
    }
    xhr.send(JSON.stringify({ "file_name": document.getElementsByTagName('input')[1].value}));;
}

async function createTask( _modelHash = ""){

}

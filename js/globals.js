const contractABI=[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_fileHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"fileAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"taskID","type":"uint256"},{"indexed":false,"internalType":"string","name":"_modelHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"modelUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"taskID","type":"uint256"},{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"string","name":"_modelHash","type":"string"},{"indexed":false,"internalType":"uint256","name":"_amt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"newTaskCreated","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"SentinelTasks","outputs":[{"internalType":"uint256","name":"taskID","type":"uint256"},{"internalType":"uint256","name":"currentRound","type":"uint256"},{"internalType":"uint256","name":"totalRounds","type":"uint256"},{"internalType":"uint256","name":"cost","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"UserFiles","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"UserTaskIDs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_modelHash","type":"string"},{"internalType":"uint256","name":"_rounds","type":"uint256"}],"name":"createTask","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getFiles","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTaskCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_taskID","type":"uint256"}],"name":"getTaskHashes","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTasksOfUser","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"string","name":"_fileHash","type":"string"}],"name":"storeFile","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_taskID","type":"uint256"},{"internalType":"string","name":"_modelHash","type":"string"}],"name":"updateModelForTask","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0x50aef6CCEB3d12156F638195C626faF7eD4da706";

const COORDINATOR_NODE = "http://127.0.0.1:5000/";
const upload_ep = "first-run"

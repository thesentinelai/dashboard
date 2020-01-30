const contractABI=[
	{
		"constant": false,
		"inputs": [
			{
				"name": "_modelHash",
				"type": "string"
			},
			{
				"name": "_rounds",
				"type": "uint256"
			}
		],
		"name": "createTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_taskID",
				"type": "uint256"
			},
			{
				"name": "_modelHash",
				"type": "string"
			}
		],
		"name": "updateModelForTask",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "taskID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_user",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_amt",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "newTaskCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "taskID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_modelHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_time",
				"type": "uint256"
			}
		],
		"name": "modelUpdated",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTaskCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_taskID",
				"type": "uint256"
			}
		],
		"name": "getTaskHashes",
		"outputs": [
			{
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTasksOfUser",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "SentinelTasks",
		"outputs": [
			{
				"name": "taskID",
				"type": "uint256"
			},
			{
				"name": "currentRound",
				"type": "uint256"
			},
			{
				"name": "totalRounds",
				"type": "uint256"
			},
			{
				"name": "cost",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "UserTaskIDs",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xdFF74cBcD63811C050A6a2545E62bF7960C55671";

import web3 from "./web3";

// const deployedAddress = "0x947fb190B4B3E1a8c7C0C745E04E5a2657A063AA";
const deployedAddress = "0x21e3CFE644335Cc06fEb724b25eF7e96BCEE95Fa";

const contractABI = [
    {
      inputs: [],
      stateMutability: 'nonpayable',
      type: 'constructor',
      constant: undefined,
      payable: undefined,
      signature: 'constructor'
    },
    {
      inputs: [],
      name: 'enter',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
      constant: undefined,
      payable: true,
      signature: '0xe97dcb62'
    },
    {
      inputs: [],
      name: 'getPlayers',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x8b5b9ccc'
    },
    {
      inputs: [],
      name: 'lastWinner',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xfe188184'
    },
    {
      inputs: [],
      name: 'manager',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0x481c6a75'
    },
    {
      inputs: [],
      name: 'pickWinner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
      constant: undefined,
      payable: undefined,
      signature: '0x5d495aea'
    },
    {
      inputs: [ [Object] ],
      name: 'players',
      outputs: [ [Object] ],
      stateMutability: 'view',
      type: 'function',
      constant: true,
      payable: undefined,
      signature: '0xf71d96cb'
    }
];

export default new web3.eth.Contract(contractABI, deployedAddress);
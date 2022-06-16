import web3 from "./web3";

// const deployedAddress = "0x947fb190B4B3E1a8c7C0C745E04E5a2657A063AA";
// const deployedAddress = "0x32AdD97680A1891fdf30BC0132dF9d4d1eA93A6b";
const deployedAddress = "0x21e3CFE644335Cc06fEb724b25eF7e96BCEE95Fa";

const contractABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
		signature: "constructor",
	},
	{
		inputs: [],
		name: "enter",
		outputs: [],
		stateMutability: "payable",
		type: "function",
		payable: true,
		signature: "0xe97dcb62",
	},
	{
		inputs: [],
		name: "getPlayers",
		outputs: [
			{ internalType: "address payable[]", name: "", type: "address[]" },
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0x8b5b9ccc",
	},
	{
		inputs: [],
		name: "lastWinner",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0xfe188184",
	},
	{
		inputs: [],
		name: "manager",
		outputs: [{ internalType: "address", name: "", type: "address" }],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0x481c6a75",
	},
	{
		inputs: [],
		name: "pickWinner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
		signature: "0x5d495aea",
	},
	{
		inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		name: "players",
		outputs: [
			{ internalType: "address payable", name: "", type: "address" },
		],
		stateMutability: "view",
		type: "function",
		constant: true,
		signature: "0xf71d96cb",
	},
];

export default new web3.eth.Contract(contractABI, deployedAddress);

import Web3 from 'web3';
import axios from 'axios';

const abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "_tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
];
const getNFTIPFS = async (contract_address, token_id) => {

  try {

    const web3 = new Web3('https://bas-archive.ankr.com/rpc');
    let contract = new web3.eth.Contract(abi, contract_address);
    let resp_ipfs = await contract.methods.tokenURI(token_id).call();

    console.debug(`resp_ipfs:${JSON.stringify(resp_ipfs)}`);

    let resp_nft_json = await axios({
      method: 'get',
      url: resp_ipfs,
    });

    let nft_json = resp_nft_json.data;
    console.debug(`resp_nft_json:${JSON.stringify(nft_json)}`);

    return {
      ipfs: resp_ipfs,
      json: nft_json
    }
  } catch (error) {
    console.log(error);
  }
}
await getNFTIPFS('0xc805c32b3d9a29e54f6c01d4d0a322697be23c64', 2020146);
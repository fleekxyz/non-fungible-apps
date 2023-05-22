import Web3 from 'web3';
import * as abiFile from '../../../contracts/deployments/goerli/FleekERC721.json';

if (
  process.env.PRIVATE_KEY === undefined ||
  process.env.JSON_RPC === undefined
) {
  throw Error('Private key or the JSON RPC environment variable not set.');
}

const contract_address = abiFile.address;
export const abi = abiFile.abi as any;

export const web3 = new Web3(process.env.JSON_RPC);
export const nfaContract = new web3.eth.Contract(abi, contract_address);
export const account = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_KEY
);

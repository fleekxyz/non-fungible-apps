import { Contract, Wallet, ethers } from 'ethers';
import * as abiFile from '@libs/FleekERC721.json';
import Web3 from 'web3';

if (
  process.env.PRIVATE_KEY === undefined ||
  process.env.JSON_RPC === undefined ||
  process.env.CONTRACT_ADDRESS === undefined
) {
  throw Error('Private key or the JSON RPC environment variable not set.');
}

export const web3 = new Web3(process.env.JSON_RPC);
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
// RPC loaded from env file previously
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC);
// account key loaded from env file previously
export const signer = new Wallet(process.env.PRIVATE_KEY, provider);
export const contractInstance = new Contract(CONTRACT_ADDRESS, abiFile.abi, signer);
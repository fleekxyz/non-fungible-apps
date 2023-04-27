var Web3 = require('web3');

var web3 = new Web3(Web3.givenProvider || 'ws://localhost:17895');

export const logDecoder = (
  eventFieldsABI: {
    indexed: boolean;
    internalType: string;
    name: string;
    type: string;
  }[],
  data: string,
  topics: string[]
) => {
  return web3.eth.abi.decodeLog(eventFieldsABI, data, topics);
};

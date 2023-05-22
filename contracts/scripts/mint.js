// npx hardhat run scripts/mint.js --network mumbai/sepolia/goerli
const { getContract } = require('./util');
const { getSVGBase64, getSVGColor } = require('./utils/read-svg');
const path = require('path');

const DEFAULT_MINTS = {
  html5: [
    'HTML5 App', // name
    'Description for HTML5 app', // description
    'https://html.com/', // external url
    'html.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/html.svg'), // svg
  ],
  psych: [
    'Psychedelic App', // name
    'A decentralized product studio building web3 products for an omni-chain world', // description
    'https://psychedelic.com/', // external url
    'psychedelic.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/psych.svg'), // svg
  ],
  fleek: [
    'Fleek App', // name
    'The easiest way to build and deploy scalable web3 apps. Fleek is an open source, blockchain agnostic, extensible web3 development platform', // description
    'https://fleek.xyz/', // external url
    'fleek.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/fleek.svg'), // svg
  ],
  dydx: [
    'dydx', // name
    'Trade Perpetual Contracts with no fees*, deep liquidity, and up to 20× more Buying Power. Deposit just $10 to', // description
    'https://dydx.exchange/', // external url
    'dydx.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/dydx.svg'), // svg
  ],
  aave: [
    'aave', // name
    'Earn interest, borrow assets, and build applications', // description
    'https://aave.com/', // external url
    '', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash,
    'bafybeifc5pgon43a2xoeevwq45ftwghzbgtjxc7k4dqlzhqh432wpahigm', // ipfs hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/aave.svg'), // svg
  ],
  uniswap: [
    'Uniswap', // name
    'Swap, earn, and build on the leading decentralized crypto trading protocol', // description
    'https://uniswap.org/', // external url
    '', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    'bafybeidwf6m2lhkdifuxqucgaq547bwyxk2mljwmazvhmyryjr6yjoe3nu', // ipfs hash
    path.resolve(__dirname, '../assets/uniswap.svg'), // svg
  ],
  yearn: [
    'Yearn', // name
    'Yearn is a decentralized suite of products helping individuals, DAOs, and other protocols earn yield on their digital assets.', // description
    'https://yearn.finance/', // external url
    'yearn.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/yearn.svg'), // svg
  ],
  pancake: [
    'PancakeSwap', // name
    'Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.', // description
    'https://pancakeswap.finance/', // external url
    'pancake.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    path.resolve(__dirname, '../assets/pancakeswap.svg'), // svg
  ],
};

const params = DEFAULT_MINTS.uniswap;
const mintTo = '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049';
const verifier = '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049';

(async () => {
  const contract = await getContract('FleekERC721');

  params.unshift(mintTo);
  const svgPath = params.pop();
  console.log('SVG Path: ', svgPath);
  params.push(await getSVGBase64(svgPath));
  console.log('SVG length: ', params[params.length - 1].length);
  params.push(
    (await getSVGColor(svgPath))
      .reduce((a, b, i) => a | (b << ((2 - i) * 8)), 0)
      .toString()
  );
  params.push(false);
  params.push(verifier);

  const transaction = await contract.mint(...params);

  console.log('Response: ', transaction.hash);
})();

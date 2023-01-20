// npx hardhat run scripts/mint.js --network mumbai
const { getContract } = require('./util');
const { getSVGBase64, getSVGColor } = require('./assets/read-svg');

const DEFAULT_MINTS = {
  html5App: [
    'HTML5 App', // name
    'Description for HTML5 app', // description
    'https://html.com/', // external url
    'html.eth', // ens
    '6ea6ad16c46ae85faced7e50555ff7368422f57', // commit hash
    'https://github.com/org/repo', // repo
    'scripts/assets/html.svg', // svg
  ],
};

const params = DEFAULT_MINTS.html5App;
const mintTo = '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049';

(async () => {
  const contract = await getContract('FleekERC721');

  params.unshift(mintTo);
  const svgPath = params.pop();
  console.log('SVG Path: ', svgPath);
  params.push(await getSVGBase64(svgPath));
  params.push(await getSVGColor(svgPath));

  const transaction = await contract.mint(...params);

  console.log('Response: ', transaction);
})();

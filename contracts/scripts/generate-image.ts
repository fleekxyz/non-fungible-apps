// npx hardhat run scripts/generate-image.ts --network local

import { getContract } from './util';

export const generateImage = async (
  name: string,
  ens: string,
  logo: string,
  color: string
) => {
  const contract = await getContract('FleekSVG');

  const svg = await contract.generateBase64(name, ens, logo, color);

  console.log('SVG:', svg);
};

generateImage('Fleek', '', '', '#123456');

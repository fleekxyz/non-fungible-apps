const { getColor } = require('colorthief');
const sharp = require('sharp');
const fs = require('fs').promises;

module.exports.getSVGColor = async (path) => {
  const png = (await sharp(path).png().toBuffer()).toString('base64');
  const colorValues = await getColor(`data:image/png;base64,${png}`);
  return colorValues;
};

module.exports.getSVGBase64 = async (path) => {
  const svg = Buffer.from(
    await fs.readFile(path, { encoding: 'utf-8' })
  ).toString('base64');
  return `data:image/svg+xml;base64,${svg}`;
};
